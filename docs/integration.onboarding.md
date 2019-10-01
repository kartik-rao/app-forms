# Integration

## General Information
- App operating environment is AWS.
- App collects data on behalf of customers using forms.
- Each form will send data to one Connection and one or more Flows.
- Connections will be setup at a tenant level with the App.
- Ideally Flows should be reusable acorss all forms within the App tenant.
- MVP Destinations
    - Salesforce
    - Salesforce Marketing Cloud
    - Service Now
    - JIRA
    - SFTP (CSV/JSON micro batches)
    - REST Webhook

## Onboarding
- User creates new App account.
- App creates new tenant in ETL Works - **EW API Call**
- App saves EW tenant details and associates App Tenant Id with EW Tenant Id.

## New Connection
- User requests a new connection.
- App lists available EW destinations - **EW API Call**
- User picks a destination (e.g. Salesforce/ JIRA etc.)
- User provides credentials.
- App creates a new connection within associated tenant in ETL Works - **EW API Call**
- App saves a connection id within associated tenant in App.

## New Flow
- User requests a new flow
- App lists configured connections
- User picks a connection (e.g. Salesforce)
- App lists available objects for the connection - **EW API Call**
- User picks object (e.g. Contact)
- App lists available fields (along with metadata such as data types.) for selected object - **EW API Call**
- User maps source fields to destination fields
- User provides custom transformations
- App creates a new flow with chosen connection, object, field and transformations - **EW API Call**
- App creates a PUSH API that will invoke the flow for each batch of source data-  **EW API Call**

## Update Conenction
- User navigates to connection's index page in the App.
- User updates credentials
- App updates credentials - **EW API Call**

## Update Flow
- User navigates to flow's index page in the App.
- User updates mapping/transformations
- App updates flow - **EW API Call**

## Flow Status
- User navigates to source's index page in the App.
- App requests flow stats **EW API Call**
    - Rows
    - Errors
    - Latency
- App lists associated flows with stats.

## Questions
- Is it possible to update an existing record in a destination instead of insert ?
- How would app be notified if there are persistent failures with a flow ?
- How are rate limits handled ? (Exponential backoff etc.)
- How would change management be handled ?
    - Example: Destination object is changed (new fields added, existing fields updated)

## Security Considerations
- Audit Logs
- Security of credentials 
    - How are they stored ?
    - How are they secured ?
    - Who has access to them ?
- Security of data
    - How is data secured at rest ?
    - How is data secured in transit ?
    - If encryption is applied, what type ?
    - If encryption is applied, how are the keys managed and secured ?