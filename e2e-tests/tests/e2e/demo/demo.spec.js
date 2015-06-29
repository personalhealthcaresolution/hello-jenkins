(function() {
    describe('Demo E2E testing for Penetrace', function () {
        beforeEach(function () {
            browser.ignoreSynchronization = true;
            browser.driver.get('https://app.penetrace.com/home/index.html#/brands/trend-monitors/a6355551013962');
            browser.driver.manage().window().maximize();
            browser.driver.wait(function () {
                    return browser.driver.isElementPresent(by.name('username'));
                }, 50000);
            browser.driver.findElement(by.name('username')).sendKeys('UnitTestUser');
            browser.driver.findElement(by.name('password')).sendKeys('MySSDIsFasterThanYourHDD1');
            browser.driver.findElement(by.css('button.btn.btn-primary[type="submit"]')).click();
            browser.driver.wait(function () {
                        return browser.driver.isElementPresent(by.css('a.ng-binding[ng-click="vm.navigateToTrendMonitor()"]'));
                    }, 110000);
            browser.ignoreSynchronization = false;
        });

        it('should show chart', function () {
          browser.wait(protractor.ExpectedConditions.elementToBeClickable(  element.all(by.css('span.pull-right.list-chart-btn.ng-scope[ng-click="vm.toggleAsideMenuView($event)"]')).get(0)), 15000);
          element.all(by.css('span.pull-right.list-chart-btn.ng-scope[ng-click="vm.toggleAsideMenuView($event)"]')).get(0).click();
          element(by.cssContainingText('a.col-xs-24.text-overflow[ng-click="vm.clickActive($index, graph.id, topic)"]', 'test bug')).click();
          browser.driver.wait(function () {
                            return element(by.exactBinding('vm.graph.objectEditOriginal.graph.title')).isDisplayed();
                        }, 5000);
          expect(element(by.exactBinding('vm.graph.objectEditOriginal.graph.title')).getText()).toEqual('test bug (copy) (copy) (copy)');
        });
    });
})();
