var BasePage = function () {
};

BasePage.prototype.goTo = function (url) {
    browser.driver.getCurrentUrl().then(function (currentUrl) {
        if (currentUrl === 'data:,' || currentUrl.indexOf(url) === -1) {
            // None actual page OR at another page
            browser.driver.get(getBaseUrl() + url);
        }
    });
};

BasePage.prototype.at = function (url) {
    var deferred = protractor.promise.defer();
    var baseUrl = getBaseUrl();
    var fullUrl = url.indexOf(baseUrl) === -1 ? getBaseUrl() + url : url;
    browser.driver.getCurrentUrl().then(function (currentUrl) {
        deferred.fulfill(currentUrl === fullUrl);
    });
    return deferred.promise;
};

module.exports = BasePage;
