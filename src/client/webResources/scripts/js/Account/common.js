"use strict";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Account;
(function (Account) {
    var Common;
    (function (Common) {
        function showAlert(executionContext) {
            const formContext = executionContext.getFormContext();
            alert('Hello TypeScript! The Account GUID is: ' + formContext.data.entity.getId());
        }
        Common.showAlert = showAlert;
    })(Common = Account.Common || (Account.Common = {}));
})(Account || (Account = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMvQWNjb3VudC9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZEQUE2RDtBQUM3RCxJQUFVLE9BQU8sQ0FNaEI7QUFORCxXQUFVLE9BQU87SUFBQyxJQUFBLE1BQU0sQ0FNdkI7SUFOaUIsV0FBQSxNQUFNO1FBQ3RCLFNBQWdCLFNBQVMsQ0FBQyxnQkFBeUM7WUFDakUsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFdEQsS0FBSyxDQUFDLHlDQUF5QyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckYsQ0FBQztRQUplLGdCQUFTLFlBSXhCLENBQUE7SUFDSCxDQUFDLEVBTmlCLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQU12QjtBQUFELENBQUMsRUFOUyxPQUFPLEtBQVAsT0FBTyxRQU1oQiJ9