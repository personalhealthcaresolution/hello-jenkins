describe('Survey List testing', function () {
    var SurveyListPage = requirePage('app/survey/surveyListPage'),
        DashboardPage = requirePage('app/survey/dashboardPage');

    var surveyListPage,
        dashboardPage;

    beforeEach(function (done) {
        surveyListPage = new SurveyListPage();
        surveyListPage.goTo();
        done();
    });

    it('should show survey list after renderring page by default', function () {
        expect(surveyListPage.getAllRecordsOnPage1().count()).toBeGreaterThan(0);
    });

    describe('Testing Survey List', function () {
        it('should show search result correctly', function (done) {
            var titleMock = 'survey';
            surveyListPage.inputSearchText(titleMock);
            surveyListPage.applySearch();
            surveyListPage.getCellValue(0, 'SURVEY TITLE').then(function (text) {
                expect(text.toLowerCase()).toContain(titleMock.toLowerCase());
                done();
            });
        });

        it('should show popup when creating new survey', function (done) {
            surveyListPage.clickCreateSurvey().then(function () {
                expect(surveyListPage.getDialogCreateSurvey().isDisplayed()).toBeTruthy();
                done();
            });
        });

        it('should show dashboard screen when clicking on survey item', function (done) {
            surveyListPage.getHref(0, 'SURVEY TITLE').then(function (href) {
                surveyListPage.clickLink(0, 'SURVEY TITLE').then(function () {
                    dashboardPage = new DashboardPage(href);
                    expect(dashboardPage.at()).toBeTruthy();
                    done();
                });
            });
        });

        it('should load more data when clicking on Load More button', function (done) {
            surveyListPage.getSurveyShowFoundCount().then(function (data) {
                if (data.show !== data.found) {
                    surveyListPage.clickLoadMore().then(function () {
                        surveyListPage.getSurveyShowFoundCount().then(function (dataAfter) {
                            expect(data.show).not.toEqual(dataAfter.show);
                            done();
                        });
                    });
                } else {
                    done();
                }
            });
        });
    });

    describe('Testing Create Survey Dialog', function () {
        EditSurveyDialog = requirePage('app/survey/common/editSurveyDialog'); // Same dialog for create/update survey

        var createSurveyDialog;

        it('should create survey successfully', function (done) {
            surveyListPage.getSurveyShowFoundCount().then(function (oldText) {
                surveyListPage.clickCreateSurvey().then(function () {
                    createSurveyDialog = new EditSurveyDialog();
                    createSurveyDialog.setTitle('New survey');
                    createSurveyDialog.setLayout('Demo Layout');
                    createSurveyDialog.clickDone();
                    browser.driver.wait(function () {
                        return surveyListPage.getSurveyShowFoundCount().then(function (newText) {
                            return oldText.found != newText.found;
                        });
                    }, 5000);
                    surveyListPage.getSurveyShowFoundCount().then(function (newText) {
                        expect(oldText.found).toBeLessThan(newText.found);
                        done();
                    });
                });
            });
        });
    });
});
