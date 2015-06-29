var BasePage = requirePage('common/basePage');
var RespondentsPage = function (url) {
    var self = this;

    self.url = url || '#/respondents/:surveyId';
    self.aEmailIcon = element(by.id('email-icon'));
    self.aImportIcon = element(by.id('import-icon'));
    self.spanExpandButton = element(by.id('expand-icon'));
    self.cboResponseStatus = element(by.model('vm.searchModel.Status'));
    self.cboNumberSent = element(by.model('vm.searchModel.NumberSentOperator'));
    self.cboLastDateSent = element(by.model('vm.searchModel.LastTimeSentOperator'));
    self.txtEmail = element(by.model('vm.searchModel.Email'));
    self.btSearchButton = element(by.cssContainingText('button.btn', 'Search'));

    self.clickEmailIcon = clickEmailIcon;
    self.clickImportIcon = clickImportIcon;
    self.isDisplayedaEmailIcon = isDisplayedaEmailIcon;
    self.clickExpandButton = clickExpandButton;
    self.setLastDateSent = setLastDateSent;
    self.setNumberSent = setNumberSent;
    self.setEmailSearchText = setEmailSearchText;
    self.clickSearchButton = clickSearchButton;
    self.getTableRow = getTableRow;

    function clickEmailIcon() {
        browser.driver.wait(function () {
            return self.aEmailIcon.isDisplayed();
        }, 5000);
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(self.aEmailIcon), 5000);
        self.aEmailIcon.click();
    }

    function clickImportIcon() {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(self.aImportIcon), 5000);
        self.aImportIcon.click();
    }

    function isDisplayedaEmailIcon() {
        return self.aEmailIcon.isDisplayed();
    }

    function clickExpandButton() {
        browser.driver.wait(function () {
            return self.spanExpandButton.isDisplayed();
        }, 5000);
        if (self.spanExpandButton.isDisplayed()) {
            self.spanExpandButton.click();
        }
    }

    function setRespondentStatus(optionText) {
        browser.driver.wait(function () {
            return self.cboResponseStatus.element(by.cssContainingText('option', optionText)).isDisplayed();
        }, 5000);
        self.cboResponseStatus.element(by.cssContainingText('option', optionText)).click();
        
    }

    function setNumberSent(optionText, number) {
        browser.driver.wait(function () {
            return element(by.cssContainingText('option', optionText)).isPresent();
        }, 5000);
        self.cboNumberSent.element(by.cssContainingText('option', optionText)).click();
        element(by.css('input[data-ng-model="vm.searchModel.NumberSent"]')).sendKeys(number);
    }
    
    function setLastDateSent(optionText, datetime) {
        browser.driver.wait(function () {
            return self.cboLastDateSent.element(by.cssContainingText('option', optionText)).isDisplayed();
        }, 5000);
        self.cboLastDateSent.element(by.cssContainingText('option', optionText)).click();
        element(by.model('vm.searchModel.LastTimeSent')).sendKeys(datetime);
    }

    function setEmailSearchText(email) {
        self.txtEmail.sendKeys(email);
    }

    function clickSearchButton() {
        self.btSearchButton.click();
    }

    function getTableRow() {
       return element.all(by.repeater('respondent in vm.respondents.data')).count();
    }
};

RespondentsPage.prototype = new BasePage();
RespondentsPage.prototype.goTo = function () {
    BasePage.prototype.goTo(this.url);

};

RespondentsPage.prototype.at = function () {
    return BasePage.prototype.at(this.url);
};

module.exports = RespondentsPage;