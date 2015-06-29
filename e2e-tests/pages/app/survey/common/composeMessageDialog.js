﻿var ComposeMessageDialog = function () {
    var self = this;


    self.hTitle = element(by.cssContainingText('h4.modal-title', 'Compose Message'));
    self.txtSubject = element(by.model('emailMessage.subject'));
    self.txtbxMessage = element(by.model('emailMessage.content'));
    self.btnClose = element(by.cssContainingText('button.btn.btn-default', 'Cancel'));
    self.btnDone = element(by.cssContainingText('button.btn.btn-primary', 'Send'));


    self.getTitle = getTitle;
    self.setSubject = setSubject;
    self.setMessage = setMessage;
    self.clickCloseDialog = clickCloseDialog;
    self.clickDone = clickDone;
    self.isDisplayed = isDisplayed;
    init();

    function init() {
        browser.driver.wait(function () {
            return self.hTitle.isDisplayed();
        }, 5000);
    }

    function getTitle() {
        return self.hTitle.getText();
    }

    function setSubject(value) {

        self.txtSubject.clear().then(function () {
            self.txtSubject.sendKeys(value).then(function () {
            });
        });

    }

    function setMessage(value) {
        self.txtbxMessage.clear().then(function () {
            self.txtbxMessage.sendKeys(value).then(function () {
            });
        });

    }

    function isDisplayed() {
        return self.hTitle.isPresent();
    }

    function clickCloseDialog() {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(self.btnClose), 5000);

        self.btnClose.click();
        browser.wait(function () {
            return browser.isElementPresent(by.css('button.btn.btn-default[title="Cancel send"]')).then(function (presenceOfElement) { return !presenceOfElement }); // this modifies the previous line so that it evaluates to false until the element is no longer present.
        }, 15000);

    }

    function clickDone() {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(self.btnDone), 5000);
        self.btnDone.click();
        browser.wait(function () {
            return browser.isElementPresent(by.css('button.btn.btn-primary[title="Send email"]')).then(function (presenceOfElement) { return !presenceOfElement }); // this modifies the previous line so that it evaluates to false until the element is no longer present.
        }, 15000);
    }

};

module.exports = ComposeMessageDialog;
