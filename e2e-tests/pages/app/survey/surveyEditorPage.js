var BasePage = requirePage('common/basePage');
var SurveyEditorPage = function (url) {
    var self = this;

    self.url = url || '#/editsurvey/:surveyId';
    self.spanSurveyTitle = element(by.css('span.survey-edit-title[ng-click="vm.showSurveyEditor()"]'));

    self.clickSurveyTitle = clickSurveyTitle;
    self.getSurveyTitleText = getSurveyTitleText;
    self.isDisplayedSurveyTitle = isDisplayedSurveyTitle;

    function clickSurveyTitle() {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(self.spanSurveyTitle), 5000);
        self.spanSurveyTitle.click();
    }


    function getSurveyTitleText() {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(self.spanSurveyTitle), 5000);
        return self.spanSurveyTitle.getText();
    }

    function isDisplayedSurveyTitle() {
        return self.spanSurveyTitle.isDisplayed();
    }

};

SurveyEditorPage.prototype = new BasePage();
SurveyEditorPage.prototype.goTo = function () {
    BasePage.prototype.goTo(this.url);

};

SurveyEditorPage.prototype.at = function () {
    return BasePage.prototype.at(this.url);
};

module.exports = SurveyEditorPage;