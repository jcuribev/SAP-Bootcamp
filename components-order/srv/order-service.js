const cds = require('@sap/cds')
const axios = require('axios')

class OrderService extends cds.ApplicationService {
  async init() {
    this.on('createOrder', 'Orders', this.createOrder)
    this.after('createOrder', this.updateProductStock)
    this.on('fetchBusinessPartners', this.fetchBusinessPartners)

    this.on('READ', 'ExternalCustomer', this.readExternal)

    await super.init()
  }

  async createOrder(customer, items) {
    const { Orders, Products } = this.entities

    if (items.length === 0) {
      throw new Error('No items in the order')
    }

    const customerRecord = await this.findUserByName(customer)
    if (!customerRecord) {
      throw new Error('Customer not found')
    }

    const orderData = {
      customer: { ID: customerRecord.ID },
      status: 'OPEN',
      total: 0
    }
    const [order] = await INSERT.into(Orders).entries(orderData)

    let orderTotal = 0

    for (const item of items) {
      const productRecord = await SELECT.one.from(Products).where({ ID: item.product })
      if (!productRecord) {
        throw new Error(`Product with ID ${item.product} not found. Order Cancelled.`)
      } else if (productRecord.stock === 0) {
        throw new Error(`Product with ID ${item.product} is out of stock. Order Cancelled.`)
      } else if (productRecord.stock < item.quantity) {
        throw new Error(`Not enough stock for product with ID ${item.product}. Order Cancelled.`)
      }

      const itemTotalPrice = item.quantity * productRecord.price

      const orderItemData = {
        order: { ID: order.ID },
        product: { ID: productRecord.ID },
        quantity: item.quantity,
        total: itemTotalPrice
      }

      await this.createItemOrder(orderItemData)
      orderTotal += itemTotalPrice
    }

    await UPDATE(Orders).set({ total: orderTotal }).where({ ID: order.ID })

    return { ID: order.ID }
  }

  async createItemOrder(item) {
    const { OrderItems } = this.entities
    await INSERT.into(OrderItems).entries(item)
  }

  async findUserByName(userName) {
    const { Customers } = this.entities
    return await SELECT.one.from(Customers).where({ name: userName })
  }

  async readExternal(req) {
    const { ExternalCustomer } = this.entities

    const service = await cds.connect.to('API_BUSINESS_PARTNER')

    console.log('service', service)

    return service.tx(req).run(req.query)
  }

  async fetchBusinessPartners(req) {
    const x = []
    try {
      const { SAP_API_URL, SAP_USERNAME, SAP_PASSWORD } = process.env

      if (!SAP_API_URL || !SAP_USERNAME || !SAP_PASSWORD) {
        req.error(500, 'Missing environment variables: SAP_API_URL, SAP_USERNAME, SAP_PASSWORD')
        return
      }

      const auth = Buffer.from(`${SAP_USERNAME}:${SAP_PASSWORD}`).toString('base64')

      const response = await axios.get(SAP_API_URL, {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json'
        }
      })
      console.log(response.data.d)

      const entitySets = response.data.d?.EntitySets || []
      return entitySets
    } catch (error) {
      req.error(500, `Error fetching business partners: ${error.message}`)
    }
  }

  async updateProductStock(orderID) {
    const { OrderItems, Products } = this.entities

    const orderItems = await SELECT.from(OrderItems).where({ order: orderID.ID })

    for (const orderItem of orderItems) {
      const productID = orderItem.product_ID
      const quantitySold = orderItem.quantity

      const productRecord = await SELECT.one.from(Products).where({ ID: productID })

      if (productRecord) {
        const updatedStock = productRecord.stock - quantitySold
        await UPDATE(Products).set({ stock: updatedStock }).where({ ID: productID })
      }
    }
  }
}

module.exports = OrderService
