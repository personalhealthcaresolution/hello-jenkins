var EditQuestionDialog = function (html) {
    var self = this,
        rootElement = html;

    self.setTitle = setTitle;
    self.setDescription = setDescription;
    self.clickDone = clickDone;

    var title = rootElement.element(by.model('editQuestionCtrl.question.Heading.Items[0].Text')),
        description = rootElement.element(by.model('editQuestionCtrl.question.Text.Items[0].Text'));

    function setTitle(value) {
        return setControlText(title, value);
    }

    function setDescription(value) {
        return setControlText(description, value);
    }

    function setControlText(control, value) {
        var deferred = protractor.promise.defer();
        control.clear().then(function () {
            control.sendKeys(value).then(function () {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    }

    function clickDone() {
        return rootElement.element(by.cssContainingText('button[ng-click="editQuestionCtrl.doneEditQuestion()"]', 'Done')).click();
    }

};

module.exports = EditQuestionDialog;