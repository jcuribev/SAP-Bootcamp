const cds = require('@sap/cds')

class SupportService extends cds.ApplicationService {
  async init() {
    const { SupportTickets } = this.entities

    this.on('openTicket', SupportTickets, this.openTicket)

    this.on('READ', SupportTickets, async (req) => {
      console.log('ents', this.entities)
      console.log('reqread', req)
    })

    await super.init()
  }

  async openTicket(req) {
    console.log('req', req)
    const { order, subject, description } = req.data

    const currentUser = req.user

    if (!currentUser) {
      req.error('UNAUTHORIZED_USER')
    }

    const newTicket = {
      subject: subject,
      description: description,
      customer_ID: currentUser.id,
      order_ID: order
    }

    const tx = cds.transaction(req)
    const result = await tx.create(fabTe, newTicket)

    return { message: 'Your desired message', data: result }
  }
}

module.exports = SupportService
