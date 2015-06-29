describe('Respondents testing', function () {
    var RespondentsPage = requirePage('app/survey/RespondentsPage');

    var respondentsPage;

    beforeEach(function (done) {
        respondentsPage = new RespondentsPage('#/respondents/4');
        respondentsPage.goTo();
        done();
    });

    describe('Testing Compose Message Dialog', function () {
        ComposeMessageDialog = requirePage('app/survey/common/composeMessageDialog');

        var composeMessageDialog;

        it('should show Compose Message dialog when clicking on Email', function (done) {
            respondentsPage.clickEmailIcon();
            composeMessageDialog = new ComposeMessageDialog();
            expect(composeMessageDialog.isDisplayed()).toBeTruthy();
            expect(composeMessageDialog.getTitle()).toEqual('Compose Message');
            done();
        });

        it('should show the Respondent when closing Compose Dialog dialog', function (done) {
            respondentsPage.clickEmailIcon();
            composeMessageDialog = new ComposeMessageDialog();
            composeMessageDialog.clickCloseDialog();
            expect(composeMessageDialog.isDisplayed()).not.toBeTruthy();
            done();
        });

        it('should show the Respondent when closing Compose Dialog dialog', function (done) {
            respondentsPage.clickEmailIcon();
            composeMessageDialog = new ComposeMessageDialog();
            composeMessageDialog.clickDone();
            expect(composeMessageDialog.isDisplayed()).not.toBeTruthy();
            done();
        });
    });

    describe('Testing Import Dialog', function () {
        ImportContactDialog = requirePage('app/survey/common/importContactDialog');
        var path = require('path');
        var importContactDialog;
        it('should show Import dialog when clicking on Import button', function (done) {
            var fileToUpload = '../../../sample-files/cvs.csv',
                absolutePath = path.resolve(__dirname, fileToUpload);
            respondentsPage.clickImportIcon();
            importContactDialog = new ImportContactDialog();
            importContactDialog.uploadFile(absolutePath);
            importContactDialog.clickImport();
            expect(respondentsPage.isDisplayedaEmailIcon()).toBeTruthy();

            done();
        });


    });

    describe('Testing Search Panel', function () {

        it('should show the return result when input valid data', function (done) {
            respondentsPage.clickExpandButton();
            respondentsPage.setNumberSent('Greater Than', 0);
            respondentsPage.setLastDateSent('After', '01/06/2015');
            respondentsPage.setEmailSearchText('khai.dao');
            respondentsPage.clickSearchButton();

            expect(respondentsPage.getTableRow()).toBeGreaterThan(0);
            done();
        });
    });
});
