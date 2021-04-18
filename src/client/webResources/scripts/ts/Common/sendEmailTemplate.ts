// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Common.SendEmailTemplate {
  export function enableSendEmailTemplate(formContext: Xrm.FormContext): boolean {
    //  Only show button if the form is NOT in the create state
    if (formContext.ui.getFormType() === XrmEnum.FormType.Create) return false;
    else return true;
  }

  export function sendEmailTemplate(): void {
    const entityFormOptions = {};
    entityFormOptions['entityName'] = 'ndxc_emailtemplatesend';
    entityFormOptions['useQuickCreateForm'] = true;

    //  Open the Email Template Send
    Xrm.Navigation.openForm(entityFormOptions);
  }
}
