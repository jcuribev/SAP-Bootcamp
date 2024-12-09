# Welcome to the Learning Journey "Getting Started with the SAP Cloud Application Programming Model"

This project documents my journey through the SAP Cloud Application Programming Model tutorial.

I've learned about

- Creating domain models.
- Defining services.
- Setting up a persistent DB with SQLite for mock data.
- How to create associations bewteen entities.
- The fundamentals of aspects.
- How to localize texts and error messages.
- How to handle concurrency.
- Create new services by denormalizing an existing view.
- Using the `before` and `after` handlers.
- Creating custom actions.
- How to implement queries.
- How to control access to services and actions with the use ofroles and restrictions.

| Branch                     | Related Exercise                                                      |
| -------------------------- | --------------------------------------------------------------------- |
| `1_hello_world`            | Create a Hello World Application                                      |
| `2_domain_model`           | Capture a Domain Model                                                |
| `3_service_definition`     | Define a Service                                                      |
| `4_SQLite_database`        | Set Up a Persistent SQLite Database with Initial Data for Development |
| `5_associations`           | Add Associations to the Domain Model                                  |
| `6_common_reuse_aspects`   | Use Pre-Defined Aspects                                               |
| `7_localized_data`         | Work with Localized Data, Code Lists and Common Reuse Types           |
| `8_input_validation`       | Implement Input Validation                                            |
| `9_concurrency_control`    | Add Optimistic Concurrency Control                                    |
| `10_denormalized_views`    | Define a Service Based on Denormalized Views                          |
| `11_.before_event_handler` | Provide a .before Event Handler                                       |
| `12_.after_event_handler`  | Provide a .after Event Handler                                        |
| `13_custom_action`         | Define and Implement a Custom Action                                  |
| `14_queries`               | Use Queries in the Implementation of CAP Services                     |
| `15_error_messages`        | Use Localized Error Messages                                          |
| `16_access_control`        | Add Restrictions to the CDS Model                                     |

## Download and Installation

- Clone the repository.
- You might need to install the SAP CAP's (CLI) `npm install -g @sap/cds-dk`.
- Install dependencies with `npm i`
- Then, execute `cds watch` to start the server.
- Try out the services by accessing the `test` folder. REST Client extension is recommended for VSCode
