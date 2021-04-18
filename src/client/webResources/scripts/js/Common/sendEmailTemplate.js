"use strict";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Common;
(function (Common) {
    var SendEmailTemplate;
    (function (SendEmailTemplate) {
        function enableSendEmailTemplate(formContext) {
            //  Only show button if the form is NOT in the create state
            if (formContext.ui.getFormType() === 1 /* Create */)
                return false;
            else
                return true;
        }
        SendEmailTemplate.enableSendEmailTemplate = enableSendEmailTemplate;
        function sendEmailTemplate() {
            const entityFormOptions = {};
            entityFormOptions['entityName'] = 'ndxc_emailtemplatesend';
            entityFormOptions['useQuickCreateForm'] = true;
            //  Open the Email Template Send
            Xrm.Navigation.openForm(entityFormOptions);
        }
        SendEmailTemplate.sendEmailTemplate = sendEmailTemplate;
    })(SendEmailTemplate = Common.SendEmailTemplate || (Common.SendEmailTemplate = {}));
})(Common || (Common = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEVtYWlsVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9Db21tb24vc2VuZEVtYWlsVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDtBQUM3RCxJQUFVLE1BQU0sQ0FlZjtBQWZELFdBQVUsTUFBTTtJQUFDLElBQUEsaUJBQWlCLENBZWpDO0lBZmdCLFdBQUEsaUJBQWlCO1FBQ2hDLFNBQWdCLHVCQUF1QixDQUFDLFdBQTRCO1lBQ2xFLDJEQUEyRDtZQUMzRCxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLG1CQUE0QjtnQkFBRSxPQUFPLEtBQUssQ0FBQzs7Z0JBQ3RFLE9BQU8sSUFBSSxDQUFDO1FBQ25CLENBQUM7UUFKZSx5Q0FBdUIsMEJBSXRDLENBQUE7UUFFRCxTQUFnQixpQkFBaUI7WUFDL0IsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDN0IsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEdBQUcsd0JBQXdCLENBQUM7WUFDM0QsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxJQUFJLENBQUM7WUFFL0MsZ0NBQWdDO1lBQ2hDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQVBlLG1DQUFpQixvQkFPaEMsQ0FBQTtJQUNILENBQUMsRUFmZ0IsaUJBQWlCLEdBQWpCLHdCQUFpQixLQUFqQix3QkFBaUIsUUFlakM7QUFBRCxDQUFDLEVBZlMsTUFBTSxLQUFOLE1BQU0sUUFlZiJ9