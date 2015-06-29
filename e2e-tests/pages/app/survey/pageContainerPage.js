var QuestionDisplay = function (html) {
    var self = this;

    self.rootElement = html;

    self.getTitleText = getTitleText;
    self.getDescriptionText = getDescriptionText;
    self.clickOn = clickOn;

    function getTitleText() {
        return self.rootElement.element(by.css('p.title-question')).getText();
    }

    function getDescriptionText() {
        return self.rootElement.element(by.css('p.description-question')).getText();
    }

    function clickOn() {
        return self.rootElement.element(by.css('div[ng-click="pageCtrl.showQuestionEditor(question, $index)"]')).click();
    }
};

var SurveyPage = function (html) {
    var self = this,
        CreateQuestionDialog = requirePage('app/survey/question/createQuestionDialog'),
        EditQuestionDialog = requirePage('app/survey/question/editQuestionDialog');        

    self.rootElement = html;
    self.firstCreateQuestionDialog = new CreateQuestionDialog(self.rootElement.element(by.tagName('create-question')));
    self.firstQuestionDisplay = new QuestionDisplay(self.rootElement.all(by.css('div.survey-question div.form-container')).first());
    self.firstEditQuestionDialog = new EditQuestionDialog(self.rootElement.all(by.tagName('edit-question')).first());

    self.clickAddTextQuestion = clickAddTextQuestion;
    self.clickAddSingleSelectionQuestion = clickAddSingleSelectionQuestion;
    self.clickAddMultipleSelectionQuestion = clickAddMultipleSelectionQuestion;
    self.clickAddInformationQuestion = clickAddInformationQuestion;
    self.clickAddNumericQuestion = clickAddNumericQuestion;
    self.clickAddNewPage = clickAddNewPage;
    self.getQuestionsCount = getQuestionsCount;

    function clickAddTextQuestion() {
        return selectQuestionTypeByText('Short Text');
    }

    function selectQuestionTypeByText(typeText) {
        var deferred = protractor.promise.defer();
        self.rootElement.element(by.css('div.btn-group button.dropdown-toggle[data-toggle="dropdown"]')).click().then(function () {
            self.rootElement.element(by.cssContainingText('div.btn-group ul.dropdown-menu[role="menu"] li a', typeText)).click().then(function () {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    }

    function clickAddSingleSelectionQuestion() {
        return selectQuestionTypeByText('Single Selection');
    }

    function clickAddMultipleSelectionQuestion() {
        return selectQuestionTypeByText('Multiple Selection');
    }

    function clickAddInformationQuestion() {
        return selectQuestionTypeByText('Information');
    }

    function clickAddNumericQuestion() {
        return selectQuestionTypeByText('Numeric');
    }

    function clickAddNewPage() {
        return selectQuestionTypeByText('New Page');
    }

    function getQuestionsCount() {
        return self.rootElement.all(by.repeater('question in pageCtrl.questionsInPage[pageCtrl.currentPage.Id].data')).count();
    }

};

var PageDisplay = function (html) {
    var self = this,
        DeleteDialog = requirePage('app/survey/common/deleteDialog');

    var deleteDialog;

    self.rootElement = html;

    self.getTitleText = getTitleText;
    self.getDescriptionText = getDescriptionText;
    self.clickEditIcon = clickEditIcon;
    self.clickDeleteIcon = clickDeleteIcon;
    self.clickCancelConfirmation = clickCancelConfirmation;
    self.clickDeleteConfirmation = clickDeleteConfirmation;

    function getTitleText() {
        return self.rootElement.element(by.exactBinding('pagetitle')).getText();
    }

    function getDescriptionText() {
        return self.rootElement.element(by.exactBinding('pagedescription')).getText();
    };

    function clickEditIcon() {
        browser.actions().mouseMove(self.rootElement).perform();
        self.rootElement.element(by.css('button.btn.btn-default[ng-click="pageCtrl.showPageEditor($event, $id)"]')).click();
    };

    function clickDeleteIcon() {
        browser.actions().mouseMove(self.rootElement).perform();
        browser.driver.wait(function () {
            return self.rootElement.element(by.css('button.btn.btn-default[ng-click="pageCtrl.onDeletePage($event)"]')).isDisplayed();
        }, 5000);
        self.rootElement.element(by.css('button.btn.btn-default[ng-click="pageCtrl.onDeletePage($event)"]')).click();
        browser.driver.wait(function () {
            return element(by.cssContainingText('h4.modal-title', 'Delete Confirmation')).isDisplayed();
        }, 5000);
    };

    function clickCancelConfirmation() {
        deleteDialog = new DeleteDialog();
        deleteDialog.clickCancel();
    }

    function clickDeleteConfirmation() {
        deleteDialog = new DeleteDialog();
        deleteDialog.clickDelete();
    }
};

var PageEditor = function (html) {
    var self = this;

    self.rootElement = html;

    self.setTitle = setTitle;
    self.getTitleText = getTitleText;
    self.isDisplayedTitle = isDisplayedTitle;
    self.setDescription = setDescription;
    self.getDescriptionText = getDescriptionText;
    self.isDisplayedDescription = isDisplayedDescription;
    self.clickDone = clickDone;

    var title = self.rootElement.element(by.model('pageCtrl.page.Name')),
        description = self.rootElement.element(by.model('pageCtrl.page.Description'));

    function setTitle(value) {
        var deferred = protractor.promise.defer();
        title.clear().then(function () {
            title.sendKeys(value).then(function () {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    }

    function getTitleText() {
        return title.getText();
    }

    function isDisplayedTitle() {
        return title.isDisplayed();
    }

    function setDescription(value) {
        var deferred = protractor.promise.defer();
        description.clear().then(function () {
            description.sendKeys(value).then(function () {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    }

    function getDescriptionText() {
        return description.getText();
    }

    function isDisplayedDescription() {
        return description.isDisplayed();
    }

    function clickDone() {
        return self.rootElement.element(by.css('button.btn.btn-primary[ng-click="pageCtrl.onEditPage()"]')).click();
    }
};

var PageContainerPage = function () {
    var self = this,
        firstPage = element.all(by.css('div.pageHeader[ng-click="pageCtrl.showPageEditor($id)"]')).first();

    self.firstSurveyPage = new SurveyPage(element.all(by.id('surveyPage-0')).first());
    self.firstPage = new PageDisplay(firstPage);
    self.firstPageEditor = new PageEditor(element.all(by.css('form.pageEditor[ng-show="pageCtrl.isShowPageEditor.value[$id]"]')).first());

    self.clickFirstPage = clickFirstPage;
    self.getPagesCount = getPagesCount;

    function clickFirstPage() {
        return firstPage.click();
    }

    function getPagesCount() {
        return element.all(by.css('div.pageHeader[ng-click="pageCtrl.showPageEditor($id)"]')).count();
    }

};

module.exports = PageContainerPage;
