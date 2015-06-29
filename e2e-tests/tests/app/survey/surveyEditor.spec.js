describe('Survey Editor testing', function () {
    var SurveyEditorPage = requirePage('app/survey/surveyEditorPage');

    var surveyEditorPage;

    beforeEach(function (done) {
        surveyEditorPage = new SurveyEditorPage('#/editsurvey/4');
        surveyEditorPage.goTo();
        done();
    });

    describe('Testing Edit Survey Dialog', function () {
        EditSurveyDialog = requirePage('app/survey/common/editSurveyDialog');

        var editSurveyDialog;

        it('should show Edit Survey dialog when clicking on survey title', function (done) {
            surveyEditorPage.clickSurveyTitle();
            editSurveyDialog = new EditSurveyDialog();
            expect(editSurveyDialog.isDisplayedPEditSurvey()).toBeTruthy();
            expect(editSurveyDialog.getEditSurveyText()).toEqual('Edit Survey');
            done();
        });

        it('should show survey title when closing Edit Survey dialog', function (done) {
            surveyEditorPage.clickSurveyTitle();
            editSurveyDialog = new EditSurveyDialog();
            editSurveyDialog.clickCloseDialog();
            expect(surveyEditorPage.isDisplayedSurveyTitle()).toBeTruthy();
            done();

        });

        it('should change survey title correctly', function (done) {
            surveyEditorPage.getSurveyTitleText().then(function (text) {
                var oldTitle = text.split('(')[0];
                surveyEditorPage.clickSurveyTitle();
                editSurveyDialog = new EditSurveyDialog();
                editSurveyDialog.appendTitle('-test').then(function () {
                    editSurveyDialog.clickDone();
                    browser.driver.wait(function () {
                        return surveyEditorPage.getSurveyTitleText().then(function (textAfter) {
                            return text != textAfter;
                        });
                    }, 5000);
                    surveyEditorPage.getSurveyTitleText().then(function (textAfter) {
                        var newTitle = textAfter.split('(')[0];
                        expect(newTitle).toEqual(oldTitle + '-test');
                        done();
                    });
                });
            });
        });

        it('should change status correctly', function (done) {
            surveyEditorPage.clickSurveyTitle();
            editSurveyDialog = new EditSurveyDialog();
            editSurveyDialog.setStatus('Open');
            editSurveyDialog.clickDone();
            //TODO have one problem with wait timeout
            browser.sleep(500);
            surveyEditorPage.getSurveyTitleText().then(function (text) {
                surveyEditorPage.clickSurveyTitle();
                editSurveyDialog.setStatus('Close');
                editSurveyDialog.clickDone();
                browser.driver.wait(function () {
                    return surveyEditorPage.getSurveyTitleText().then(function (textAfter) {
                        return text != textAfter;
                    });
                }, 5000);
                surveyEditorPage.getSurveyTitleText().then(function (textAfter) {
                    expect(text).not.toEqual(textAfter);
                    expect(textAfter.toLowerCase()).toContain('(close)');
                    done();
                });

            });
        });
    });

    describe('Testing Page Container', function () {
        var PageContainerPage = requirePage('app/survey/pageContainerPage');
        var pageContainer;

        describe('Testing Page Editor', function () {
            beforeEach(function () {
                pageContainer = new PageContainerPage();
            });

            it('should show Page Editor after clicking on first page', function (done) {
                pageContainer.clickFirstPage().then(function () {
                    expect(pageContainer.firstPageEditor.isDisplayedTitle()).toBeTruthy();
                    expect(pageContainer.firstPageEditor.isDisplayedDescription()).toBeTruthy();
                    done();
                });
            });

            it('should show Page Editor after clicking on Edit icon on first page', function (done) {
                pageContainer.firstPage.clickEditIcon();
                expect(pageContainer.firstPageEditor.isDisplayedTitle()).toBeTruthy();
                expect(pageContainer.firstPageEditor.isDisplayedDescription()).toBeTruthy();
                done();
            });

            it('should change page title correctly', function (done) {
                pageContainer.firstPage.getTitleText().then(function (originalTitle) {
                    pageContainer.clickFirstPage().then(function () {
                        pageContainer.firstPageEditor.setTitle(originalTitle + '-test').then(function () {
                            pageContainer.firstPageEditor.clickDone().then(function () {
                                pageContainer.firstPage.getTitleText().then(function (newTitle) {
                                    expect(originalTitle).not.toEqual(newTitle);
                                    expect(newTitle).toContain('-test');
                                    done();
                                });
                            });
                        });
                    });
                });
            });

            it('should change page description correctly', function (done) {
                pageContainer.firstPage.getDescriptionText().then(function (originalDescription) {
                    pageContainer.clickFirstPage().then(function () {
                        pageContainer.firstPageEditor.setDescription(originalDescription + '-test').then(function () {
                            pageContainer.firstPageEditor.clickDone().then(function () {
                                pageContainer.firstPage.getDescriptionText().then(function (newDescription) {
                                    expect(originalDescription).not.toEqual(newDescription);
                                    expect(newDescription).toContain('-test');
                                    done();
                                });
                            });
                        });
                    });
                });
            });

            it('should add new page successfully', function (done) {
                pageContainer.getPagesCount().then(function (firstCount) {
                    pageContainer.firstSurveyPage.clickAddNewPage().then(function () {
                        pageContainer.getPagesCount().then(function (secondCount) {
                            expect(secondCount).toBeGreaterThan(firstCount);
                            done();
                        });
                    });
                });
            });

            it('should not delete page when cancelling deleting page', function (done) {
                pageContainer.getPagesCount().then(function (firstCount) {
                    pageContainer.firstPage.clickDeleteIcon();
                    pageContainer.firstPage.clickCancelConfirmation();
                    pageContainer.getPagesCount().then(function (secondCount) {
                        expect(firstCount).toEqual(secondCount);
                        done();
                    });
                });
            });

            it('should delete page when accepting deleting page', function (done) {
                pageContainer.getPagesCount().then(function (firstCount) {
                    pageContainer.firstPage.clickDeleteIcon();
                    pageContainer.firstPage.clickDeleteConfirmation();
                    browser.driver.wait(function () {
                        return pageContainer.getPagesCount().then(function (secondCount) {
                            return firstCount != secondCount;
                        });
                    }, 5000);
                    pageContainer.getPagesCount().then(function (secondCount) {
                        expect(firstCount).toBeGreaterThan(secondCount);
                        done();
                    });
                });
            });
        });

        describe('Testing Creating Question', function () {
            beforeEach(function () {
                pageContainer = new PageContainerPage();
            });

            it('should add Text question on first page successfully', function (done) {
                pageContainer.firstSurveyPage.getQuestionsCount().then(function (firstCount) {
                    pageContainer.firstSurveyPage.clickAddTextQuestion().then(function () {
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setTitle('Title 1');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setDescription('Description 1');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.clickDone().then(function () {
                            pageContainer.firstSurveyPage.getQuestionsCount().then(function (secondCount) {
                                expect(firstCount).toBeLessThan(secondCount);
                                done();
                            });
                        });
                    });
                });
            });

            it('should add Single Selection question on first page successfully', function (done) {
                pageContainer.firstSurveyPage.getQuestionsCount().then(function (firstCount) {
                    pageContainer.firstSurveyPage.clickAddSingleSelectionQuestion().then(function () {
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setTitle('Title 2');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setDescription('Description 2');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.clickAddSingleSelectionOption();
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.clickDone().then(function () {
                            pageContainer.firstSurveyPage.getQuestionsCount().then(function (secondCount) {
                                expect(firstCount).toBeLessThan(secondCount);
                                done();
                            });
                        });
                    });
                });
            });

            it('should add Multiple Selection question on first page successfully', function (done) {
                pageContainer.firstSurveyPage.getQuestionsCount().then(function (firstCount) {
                    pageContainer.firstSurveyPage.clickAddMultipleSelectionQuestion().then(function () {
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setTitle('Title 3');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setDescription('Description 3');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.clickAddMultipleSelectionOption();
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.clickDone().then(function () {
                            pageContainer.firstSurveyPage.getQuestionsCount().then(function (secondCount) {
                                expect(firstCount).toBeLessThan(secondCount);
                                done();
                            });
                        });
                    });
                });
            });

            it('should add Information question on first page successfully', function (done) {
                pageContainer.firstSurveyPage.getQuestionsCount().then(function (firstCount) {
                    pageContainer.firstSurveyPage.clickAddInformationQuestion().then(function () {
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setTitle('Title 4');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setDescription('Description 4');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.clickDone().then(function () {
                            pageContainer.firstSurveyPage.getQuestionsCount().then(function (secondCount) {
                                expect(firstCount).toBeLessThan(secondCount);
                                done();
                            });
                        });
                    });
                });
            });

            it('should add Numeric question on first page successfully', function (done) {
                pageContainer.firstSurveyPage.getQuestionsCount().then(function (firstCount) {
                    pageContainer.firstSurveyPage.clickAddNumericQuestion().then(function () {
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setTitle('Title 5');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.setDescription('Description 4');
                        pageContainer.firstSurveyPage.firstCreateQuestionDialog.clickDone().then(function () {
                            pageContainer.firstSurveyPage.getQuestionsCount().then(function (secondCount) {
                                expect(firstCount).toBeLessThan(secondCount);
                                done();
                            });
                        });
                    });
                });
            });
        });

        describe('Testing Modifying Question (Updating, Deleting)', function () {
            beforeEach(function () {
                pageContainer = new PageContainerPage();
            });

            it('should update the title of first question on first page successfully', function (done) {
                pageContainer.firstSurveyPage.firstQuestionDisplay.getTitleText().then(function (originalTitle) {
                    pageContainer.firstSurveyPage.firstQuestionDisplay.clickOn().then(function () {
                        pageContainer.firstSurveyPage.firstEditQuestionDialog.setTitle(originalTitle + '-test').then(function () {
                            pageContainer.firstSurveyPage.firstEditQuestionDialog.clickDone().then(function () {
                                pageContainer.firstSurveyPage.firstQuestionDisplay.getTitleText().then(function (newTitle) {
                                    expect(originalTitle).not.toEqual(newTitle);
                                    expect(newTitle).toContain('-test');
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});