using fabTech as fab from '../db/schema.cds';
using {API_BUSINESS_PARTNER as external} from './external/API_BUSINESS_PARTNER';

service OrderService @(path: '/order-service') {
  entity Manufacturers    as
    projection on fab.Manufacturers {
      *,
      originCountry.name as country,

    }

  entity Products         as projection on fab.Products;
  // {
  //   *,
  //   typeOfProduct     as type,
  //   manufacturer.name as manufacturerName,
  // }
  // excluding {
  //   typeOfProduct
  // }

  entity OrderItems       as projection on fab.OrderItems;
  entity Orders           as projection on fab.Orders;
  entity Customers        as projection on fab.Customers;
  entity Invoice          as projection on fab.Invoices;

  @readonly
  entity ExternalCustomer as
    projection on external.A_Customer {
      Customer,
      CustomerName,

    }

  action   createOrder(customer : fab.Customers:name,
                       items : array of {
    product : fab.Products:ID;
    quantity : Integer;
  })                               returns fab.Orders:ID;

  function fetchBusinessPartners() returns array of String;

}
