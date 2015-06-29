var ImportContactDialog = function () {
    var self = this;

    self.hTitle = element(by.cssContainingText('h4.modal-title', 'Import Contacts'));
    self.btnClose = element(by.cssContainingText('button.btn.btn-default[title="Cancel Import Contacts"]', 'Cancel'));
    self.btnDone = element(by.cssContainingText('button.btn.btn-primary', 'Imports'));


    self.getTitle = getTitle;
    self.clickCancelDialog = clickCancelDialog;
    self.clickImport = clickImport;
    self.isDisplayedPEditSurvey = isDisplayedPEditSurvey;
    self.uploadFile = uploadFile;
    init();

    function init() {
        browser.driver.wait(function () {
            return self.hTitle.isDisplayed();
        }, 5000);
    }

    function getTitle() {
        return self.hTitle.getText();
    }

    function isDisplayedPEditSurvey() {
        return self.hTitle.isDisplayed();
    }

    function clickCancelDialog() {
        self.btnClose.click();
    }

    function uploadFile(value) {
        var elm = $('input[type="file"]');
        browser.executeScript('arguments[0].style = {};', elm.getWebElement());
        elm.sendKeys(value);
    }
    function clickImport() {
        self.btnDone.click();
    }

};

module.exports = ImportContactDialog;
