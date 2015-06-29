var EditSurveyDialog = function () {
    var self = this;
       

    self.pEditSurvey = element(by.css('.modal-title[ng-hide="editor.isAdd"]'));
    self.txtTitle = element(by.model('editor.survey.Name'));
    self.cboStatus = element(by.model('editor.survey.Status'));
    self.cboLayout = element(by.model('editor.survey.LayoutId'));
    self.btnClose = element(by.css('button.btn.btn-default[title="Cancel create survey"]'));
    self.btnDone = element(by.css('button.btn.btn-primary[title="Save survey"]'));

    self.isDisplayedPEditSurvey = isDisplayedPEditSurvey;
    self.getEditSurveyText = getEditSurveyText;
    self.appendTitle = appendTitle;
    self.setTitle = setTitle;
    self.setStatus = setStatus;
    self.setLayout = setLayout;
    self.clickCloseDialog = clickCloseDialog;
    self.clickDone = clickDone;

    init();

    function init() {
        browser.driver.wait(function () {
            return self.txtTitle.isDisplayed();
        }, 5000);
    }

    function isDisplayedPEditSurvey() {
        return self.pEditSurvey.isDisplayed();
    }

    function getEditSurveyText() {
        return self.pEditSurvey.getText();
    }

    function appendTitle(value) {
        return self.txtTitle.sendKeys(value);
    }

    function setTitle(value) {
        var deferred = protractor.promise.defer();
        self.txtTitle.clear().then(function () {
            self.txtTitle.sendKeys(value).then(function () {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    }

    function setStatus(optionText) {
        browser.driver.wait(function () {
            return self.cboStatus.element(by.cssContainingText('option', optionText)).isDisplayed();
        }, 5000);
        self.cboStatus.element(by.cssContainingText('option', optionText)).click();
    }

    function setLayout(optionText) {
        return self.cboLayout.element(by.cssContainingText('option', optionText)).click();
    }

    function clickCloseDialog() {
        self.btnClose.click();
    }

    function clickDone() {
        self.btnDone.click();
    }

};

module.exports = EditSurveyDialog;
