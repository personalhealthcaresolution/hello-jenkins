var BasePage = requirePage('common/basePage');
var SurveyListPage = function (url) {
    var self = this;

    self.url = url || '#/surveys';
    self.txtSearchText = element(by.model('vm.searchString'));
    self.btnSearch = element(by.css('button[ng-click="vm.search()"]'));
    self.btnCreateSurvey = element(by.css('a.glyphicon.glyphicon-create-survey[ng-click="vm.showSurveyEditor()"]'));
    self.tblResult = element(by.css('table.table-striped'));
    self.dlgCreateSurvey = element(by.css('.modal-dialog .modal-content .modal-header'));
    self.spanPagingShowCount = element(by.exactBinding('vm.surveys.data.length'));
    self.surveyFoundCount = element.all(by.exactBinding('vm.surveysFound')).first();
    self.btnLoadMore = element(by.css('a.btn.btn-primary[ng-click="vm.loadMore()"]'));

    self.getDialogCreateSurvey = getDialogCreateSurvey;
    self.getSurveyShowFoundCount = getSurveyShowFoundCount;
    self.inputSearchText = inputSearchText;
    self.applySearch = applySearch;
    self.clickCreateSurvey = clickCreateSurvey;
    self.getAllRecordsOnPage1 = getAllRecordsOnPage1;
    self.getRecordAt = getRecordAt;
    self.getHeaders = getHeaders;
    self.getCellValue = getCellValue;
    self.clickLink = clickLink;
    self.getHref = getHref;
    self.clickLoadMore = clickLoadMore;

    function getDialogCreateSurvey() {
        browser.driver.wait(function () {
            return self.dlgCreateSurvey.isDisplayed();
        }, 5000);
        return self.dlgCreateSurvey;
    }

    function getSurveyShowFoundCount() {
        var deferred = protractor.promise.defer();
        browser.driver.wait(function () {
            return self.spanPagingShowCount.isDisplayed();
        }, 5000);
        self.spanPagingShowCount.getText().then(function (text) {
            // Sample value for text: Displaying 10/15 survey(s).
            var showCountValue = text.split(' ')[1];
            var tempArr = showCountValue.split('/');
            deferred.fulfill({
                show: tempArr[0],
                found: tempArr[1]
            });
        });
        return deferred.promise;
    }

    function inputSearchText(text) {
        return self.txtSearchText.sendKeys(text);
    }

    function applySearch() {
        self.btnSearch.click();
    }

    function clickCreateSurvey() {
        return self.btnCreateSurvey.click();
    }

    function getAllRecordsOnPage1() {
        browser.driver.wait(function () {
            return self.tblResult.isDisplayed();
        }, 5000);
        return self.tblResult.all(by.exactRepeater('survey in vm.surveys.data'));
    }

    function getHeaders() {
        return self.tblResult.all(by.css('thead tr th')).map(function (th) {
            return th.getText();
        });
    }

    function getRecordAt(index) {
        return getAllRecordsOnPage1().get(index);
    }

    function getCellValue(rowIndex, title) {
        var deferred = protractor.promise.defer();
              getHeaders().then(function (headers) {
            var cellIndex = -1;
            for (var i = 0; i < headers.length; i++) {
                if (headers[i] === title) {
                    cellIndex = i;
                    break;
                }
            }

            getRecordAt(rowIndex).all(by.css('td')).get(cellIndex).getText().then(function (text) {
              deferred.fulfill(text);
            });
        });
        return deferred.promise;
    }

    function clickLink(rowIndex, title) {
        var deferred = protractor.promise.defer();
        getHeaders().then(function (headers) {
            var cellIndex = -1;
            for (var i = 0; i < headers.length; i++) {
                if (headers[i] === title) {
                    cellIndex = i;
                    break;
                }
            }

            getRecordAt(rowIndex).all(by.css('td')).get(cellIndex).element(by.css('a')).click().then(function () {
                    deferred.fulfill();
            });
        });
        return deferred.promise;
    }

    function getHref(rowIndex, title) {
        var deferred = protractor.promise.defer();
        getHeaders().then(function (headers) {
            var cellIndex = -1;
            for (var i = 0; i < headers.length; i++) {
                if (headers[i] === title) {
                    cellIndex = i;
                    break;
                }
            }

            getRecordAt(rowIndex).all(by.css('td')).get(cellIndex).element(by.css('a')).getAttribute('href').then(function (href) {
                    deferred.fulfill(href);

            });
        });
        return deferred.promise;
    }

    function clickLoadMore() {
        return self.btnLoadMore.click();
    }

};

SurveyListPage.prototype = new BasePage();
SurveyListPage.prototype.goTo = function () {
    BasePage.prototype.goTo(this.url);
};

SurveyListPage.prototype.at = function () {
    return BasePage.prototype.at(this.url);
};

module.exports = SurveyListPage;
