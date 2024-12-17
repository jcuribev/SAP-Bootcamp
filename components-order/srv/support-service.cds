using fabTech as fab from '../db/schema.cds';

service SupportService @(path: '/support-service') {

  entity SupportTickets as projection on fab.SupportTickets
  action openTicket(order : fab.Orders:ID, subject : String, description : String)                             returns String;
  action assignTicket(ticket : fab.SupportTickets:ID)                                                          returns String;
  action resolveTicket(ticket : fab.SupportTickets:ID)                                                         returns String;
  action createSupportTicket(order : fab.Orders:ID, subject : String, description : String, customer : String) returns fab.SupportTickets:ID;
}
