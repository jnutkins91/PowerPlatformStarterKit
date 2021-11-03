using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace NDXC.CWA
{

    public sealed class GenerateStringForEmailTemplateSend : CodeActivity
    {
        protected override void Execute(CodeActivityContext executionContext)
        {

            //Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();
            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            EntityReference emailTemplateSendId = EmailTemplateSendId.Get<EntityReference>(executionContext);

            Entity emailTemplateSend = service.Retrieve("ndxc_emailtemplatesend", emailTemplateSendId.Id, new ColumnSet("ndxc_accountid", "ndxc_emailtemplateid"));
            EntityReference accountId = emailTemplateSend.GetAttributeValue<EntityReference>("ndxc_accountid");
            EntityReference emailTemplateId = emailTemplateSend.GetAttributeValue<EntityReference>("ndxc_emailtemplateid");

            Entity emailTemplate = service.Retrieve("ndxc_emailtemplate", emailTemplateId.Id, new ColumnSet("ndxc_subject", "ndxc_body"));
            string templateSubject = emailTemplate.GetAttributeValue<string>("ndxc_subject");
            string templateBody = emailTemplate.GetAttributeValue<string>("ndxc_body");

            //  Regular expression to find the tags within the string content
            var regex = new Regex(@"{(.*?)}");

            //  Use the regex to grab the tags from the string
            MatchCollection subjectTags = regex.Matches(templateSubject);
            MatchCollection bodyTags = regex.Matches(templateBody);
            MatchCollection allTags = regex.Matches(templateSubject + templateBody);

            //  Create a new column set for each of the viable tables
            var accountColumnSet = new ColumnSet(false);

            //  For each tag found
            foreach (Match tag in allTags)
            {

                //  Get the tag name
                //  By removing the first and last characters
                //  '{' '}'
                var tagName = tag.Value.Substring(1, tag.Value.Length - 2);

                //  Split tagName by '#'
                //  Provides the entity logical name 
                //  And field name
                var tagComponents = tagName.Split('#');

                //  switch on the first tag component
                //  which is the logical name of the table
                //  then add the column - found in the second tag component
                switch (tagComponents[0])
                {
                    case "account":
                        accountColumnSet.AddColumn(tagComponents[1]);
                        break;
                }

            }

            //  Retrieve the records that have been passed as parameters
            //  Using the columnsets defined
            Entity account = service.Retrieve("account", accountId.Id, accountColumnSet);

            //  Now we have the data
            //  Loop through the tags again
            //  Retrieve the data for the given column from the record provided
            //  Replace the tag with the value
            foreach (Match tag in subjectTags)
            {

                var tagName = tag.Value.Substring(1, tag.Value.Length - 2);

                var tagComponents = tagName.Split('#');

                switch (tagComponents[0])
                {
                    case "account":
                        if (account != null)
                        {

                            var schemaTextValue = returnValueForSchemaName(service, account, tagComponents[1]);
                            templateSubject = templateSubject.Replace(tag.Value, schemaTextValue);
                        }
                        break;
                }

            }

            foreach (Match tag in bodyTags)
            {

                var tagName = tag.Value.Substring(1, tag.Value.Length - 2);

                var tagComponents = tagName.Split('#');

                switch (tagComponents[0])
                {
                    case "account":
                        if (account != null)
                        {

                            var schemaTextValue = returnValueForSchemaName(service, account, tagComponents[1]);
                            templateBody = templateBody.Replace(tag.Value, schemaTextValue);
                        }
                        break;
                }

            }

            //  Set the resultant string as the output for the CWA
            //  As well as the application reference 
            OutputSubject.Set(executionContext, templateSubject);
            OutputBody.Set(executionContext, templateBody);
        }

        /// <summary>
        /// Retrieves the textual value of the provided option-set value
        /// </summary>
        /// <param name="service">Dataverse organisation service</param>
        /// <param name="entity">Entity to retrieve a value from</param>
        /// <param name="schemaName">Field schema name to retrieve the value for</param>
        private string returnValueForSchemaName(IOrganizationService service, Entity entity, string schemaName)
        {

            if (!entity.Attributes.Contains(schemaName))
                return "#N/A#";

            var columnType = entity[schemaName].GetType();

            string value;
            switch (columnType.Name)
            {
                case "DateTime":
                    value = ((DateTime)entity[schemaName]).ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
                    break;
                case "EntityReference":
                    value = ((EntityReference)entity[schemaName]).Name;
                    break;
                case "String":
                    value = (string)entity[schemaName];
                    break;
                case "OptionSetValue":
                    value = GetOptionSetValueLabel(entity.LogicalName, schemaName, ((OptionSetValue)entity[schemaName]).Value, service);
                    break;
                case "OptionSetValueCollection":
                    value = GetMultiSelectOptionSetValues(service, entity, schemaName, (OptionSetValueCollection)entity[schemaName]);
                    break;
                default:
                    value = entity[schemaName].ToString();
                    break;
            }

            return value;
        }

        /// <summary>
        /// Retrieves the textual value of the provided option-set value
        /// </summary>
        /// <param name="entiyName">Logical name for the entity containing the option-set</param>
        /// <param name="fieldName">Schema name of the field of the option-set</param>
        /// <param name="optionSetValue">Numerical value of the option-set option to retrieve the label for</param>
        /// <param name="service">Dataverse organisation service</param>
        public string GetOptionSetValueLabel(string entityName, string fieldName, int optionSetValue, IOrganizationService service)

        {

            var attReq = new RetrieveAttributeRequest();
            attReq.EntityLogicalName = entityName;
            attReq.LogicalName = fieldName;
            attReq.RetrieveAsIfPublished = false;

            var attResponse = (RetrieveAttributeResponse)service.Execute(attReq);
            var attMetadata = (EnumAttributeMetadata)attResponse.AttributeMetadata;

            return attMetadata.OptionSet.Options.Where(x => x.Value == optionSetValue).FirstOrDefault().Label.UserLocalizedLabel.Label;

        }

        /// <summary>
        /// Retrieves the textual value of the provided multi-select option-set values
        /// </summary>
        /// <param name="service">Dataverse organisation service</param>
        /// <param name="entity">Logical name for the entity containing the option-set</param>
        /// <param name="fieldName">Schema name of the field of the option-set</param>
        /// <param name="multiSelect">Numerical value of the option-set option to retrieve the label for</param>
        public string GetMultiSelectOptionSetValues(IOrganizationService service, Entity entity, string fieldName, OptionSetValueCollection multiSelect)
        {

            StringBuilder sb = new StringBuilder();
            foreach (OptionSetValue value in multiSelect)
            {

                var label = GetOptionSetValueLabel(entity.LogicalName, fieldName, value.Value, service);
                sb.Append(label + ", ");
            }

            string returnString = sb.ToString();

            return returnString.Remove(returnString.Length - 2);
        }

        [ReferenceTarget("ndxc_emailtemplatesend")]
        [RequiredArgument]
        [Input("EmailTemplateSendId")]
        public InArgument<EntityReference> EmailTemplateSendId { get; set; }

        [Output("OutputSubject")]
        public OutArgument<string> OutputSubject { get; set; }

        [Output("OutputBody")]
        public OutArgument<string> OutputBody { get; set; }

    }
}
