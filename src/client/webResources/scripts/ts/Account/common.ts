// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Account.Common {
  export function showAlert(executionContext: Xrm.Events.EventContext): void {
    const formContext = executionContext.getFormContext();

    alert('Hello TypeScript! The Account GUID is: ' + formContext.data.entity.getId());
  }
}
