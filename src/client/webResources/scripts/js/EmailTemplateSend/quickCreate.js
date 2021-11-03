"use strict";
var EmailTemplateSend;
(function (EmailTemplateSend) {
    var QuickCreate;
    (function (QuickCreate) {
        //  This variable prevent us getting into a loop
        let saveConfirmed = false;
        //  onSave is registered on the save event of the Email Template Send quick-create form
        function onSave(executionContext) {
            //  Check if the user has confirmed the first save
            if (!saveConfirmed) {
                //  If not, prevent default save action
                //  Confirm the action
                //  If action confrimed, all the Action and update saveConfirmed value
                //  Call save & close
                executionContext.getEventArgs().preventDefault();
                const confirmStrings = {
                    text: "This action will create an Email in the timeline, even if you don't actually send the Email at this time.",
                    title: 'Are you sure?',
                };
                const confirmOptions = { height: 200, width: 450 };
                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
                    if (success.confirmed) {
                        saveConfirmed = true;
                        const formContext = executionContext.getFormContext();
                        Xrm.Utility.showProgressIndicator('Creating Email');
                        const saveOptions = {
                            saveMode: 2 /* SaveAndClose */,
                            useSchedulingEngine: false,
                        };
                        formContext.data.save(saveOptions).then(function (data) {
                            const id = data['savedEntityReference']['id'];
                            RunAction(id);
                        }, function (error) {
                            //handle error here
                            Xrm.Utility.closeProgressIndicator();
                        });
                    }
                });
            }
        }
        QuickCreate.onSave = onSave;
        //  Calls our Action that generates the email
        function RunAction(id) {
            //  Set the target to the current Email Template Send record
            const target = {};
            target['entityType'] = 'ndxc_emailtemplatesend';
            target['id'] = id;
            const req = {};
            req['entity'] = target;
            req['getMetadata'] = function () {
                return {
                    boundParameter: 'entity',
                    parameterTypes: {
                        entity: {
                            typeName: 'mscrm.ndxc_emailtemplatesend',
                            structuralProperty: 5,
                        },
                    },
                    operationType: 0,
                    operationName: 'ndxc_NdxcBlogActionGenerateEmailFromTemplate',
                };
            };
            Xrm.WebApi.online.execute(req).then(function (data) {
                data.json().then(function (response) {
                    //  With a successful call to the action
                    //  Use the response to open the created Email record
                    const pageInput = {
                        pageType: 'entityrecord',
                        entityName: 'email',
                        entityId: response['activityid'],
                    };
                    const navigationOptions = {
                        target: 2,
                        height: { value: 80, unit: '%' },
                        width: { value: 70, unit: '%' },
                        position: 1,
                    };
                    Xrm.Utility.closeProgressIndicator();
                    Xrm.Navigation.navigateTo(pageInput, navigationOptions);
                });
            }, function (error) {
                Xrm.Utility.closeProgressIndicator();
            });
        }
    })(QuickCreate = EmailTemplateSend.QuickCreate || (EmailTemplateSend.QuickCreate = {}));
})(EmailTemplateSend || (EmailTemplateSend = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tDcmVhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9FbWFpbFRlbXBsYXRlU2VuZC9xdWlja0NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxpQkFBaUIsQ0EyRjFCO0FBM0ZELFdBQVUsaUJBQWlCO0lBQUMsSUFBQSxXQUFXLENBMkZ0QztJQTNGMkIsV0FBQSxXQUFXO1FBQ3JDLGdEQUFnRDtRQUNoRCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFMUIsdUZBQXVGO1FBQ3ZGLFNBQWdCLE1BQU0sQ0FBQyxnQkFBNkM7WUFDbEUsa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xCLHVDQUF1QztnQkFDdkMsc0JBQXNCO2dCQUN0QixzRUFBc0U7Z0JBQ3RFLHFCQUFxQjtnQkFDckIsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRWpELE1BQU0sY0FBYyxHQUFHO29CQUNyQixJQUFJLEVBQUUsMkdBQTJHO29CQUNqSCxLQUFLLEVBQUUsZUFBZTtpQkFDdkIsQ0FBQztnQkFDRixNQUFNLGNBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNuRCxHQUFHLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxPQUFPO29CQUNyRixJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7d0JBQ3JCLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUN0RCxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBQ3BELE1BQU0sV0FBVyxHQUFHOzRCQUNsQixRQUFRLHNCQUErQjs0QkFDdkMsbUJBQW1CLEVB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