# Power Platform - Naming Conventions & Rules

## Rule 1

Always name tables in the singular, e.g. 'Asset', not 'Assets'. Your schema name would then be 'ndxc_asset'.

## Rule 2

Ensure column names are all lowercase, e.g. 'ndxc_name', not 'ndxc_Name'.

## Rule 3

If you are using JavaScript on a table form, don't combine these with Business Rules - unless there is a CLEAR separation of the functionality provided.

## Naming Conventions

| Component Type                  | Schema                                 | Display                                                                    |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| Web Resource - Icon             | ndxc\_/tablename/icons/name.filetype   | Ndxc.Icon: Contact SVG                                                     |
| Web Resource - Script           | ndxc\_/tablename/scripts/name.filetype | Ndxc.Script: Account (Main)                                                |
| Web Resource - Webpage          | ndxc\_/tablename/pages/name.filetype   | Ndxc.WebPage: Account Tooltip                                              |
| Cloud Flow (Example 1)          | -                                      | Ndxc.CloudFlow: Convert Crypto Currency (PowerApps V2)                     |
| Cloud Flow (Example 2)          | -                                      | Ndxc.CloudFlow: Calculate Crypto Value (Dataverse: Financial Entry)        |
| Cloud Flow (Example 3 - Manual) | -                                      | Ndxc.CloudFlow.Manual: Calculate Crypto Value (Dataverse: Financial Entry) |
| Embedded Power BI Dashboard     | -                                      | Main Dashboard **[USER FACING]**                                           |
| Environment Variable            | ndxc_env_powerbimaindashboard          | Ndxc.Env: PowerBi Main Dashboard                                           |
| Custom Page                     | -                                      | Custom Page - Email CV                                                     |
| Connection Ref                  | -                                      | Ndxc.ConRef: Power Apps Notification                                       |
