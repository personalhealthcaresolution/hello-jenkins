var CreateQuestionDialog = function (html) {
    var self = this,
        rootElement = html;

    self.setTitle = setTitle;
    self.setDescription = setDescription;
    self.clickDone = clickDone;
    self.clickAddSingleSelectionOption = clickAddSingleSelectionOption;
    self.clickAddMultipleSelectionOption = clickAddMultipleSelectionOption;

    function setTitle(value) {
        rootElement.element(by.model('createQuestionCtrl.question.Heading.Items[0].Text')).sendKeys(value);
    }

    function setDescription(value) {
        rootElement.element(by.model('createQuestionCtrl.question.Text.Items[0].Text')).sendKeys(value);
    }

    function clickDone() {
        return rootElement.element(by.cssContainingText('button[ng-click="createQuestionCtrl.createNewQuestion()"]', 'Done')).click();
    }

    function clickAddSingleSelectionOption() {
        return rootElement.element(by.tagName('single-selection-option-list')).element(by.css('div.add-single-selection-question')).click();
    }

    function clickAddMultipleSelectionOption() {
        return rootElement.element(by.tagName('multiple-selection-option-list')).element(by.css('div.add-multiple-selection-question')).click();
    }

};

module.exports = CreateQuestionDialog;