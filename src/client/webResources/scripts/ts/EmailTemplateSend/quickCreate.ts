namespace EmailTemplateSend.QuickCreate {
  //  This variable prevent us getting into a loop
  let saveConfirmed = false;

  //  onSave is registered on the save event of the Email Template Send quick-create form
  export function onSave(executionContext: Xrm.Events.SaveEventContext): void {
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
            saveMode: XrmEnum.SaveMode.SaveAndClose,
            useSchedulingEngine: false,
          };
          formContext.data.save(saveOptions).then(
            function (data: any) {
              const id = data['savedEntityReference']['id'];
              RunAction(id);
            },
            function (error) {
              //handle error here
              Xrm.Utility.closeProgressIndicator();
            },
          );
        }
      });
    }
  }

  //  Calls our Action that generates the email
  function RunAction(id: string) {
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

    Xrm.WebApi.online.execute(req).then(
      function (data) {
        data.json().then(function (response) {
          //  With a successful call to the action
          //  Use the response to open the created Email record
          const pageInput: Xrm.Navigation.PageInputEntityRecord = {
            pageType: 'entityrecord',
            entityName: 'email',
            entityId: response['activityid'],
          };
          const navigationOptions: Xrm.Navigation.NavigationOptions = {
            target: 2,
            height: { value: 80, unit: '%' },
            width: { value: 70, unit: '%' },
            position: 1,
          };
          Xrm.Utility.closeProgressIndicator();
          Xrm.Navigation.navigateTo(pageInput, navigationOptions);
        });
      },
      function (error) {
        Xrm.Utility.closeProgressIndicator();
      },
    );
  }
}
