﻿exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 30000,

    //specs: [
    //  '*.js'
    //],

    capabilities: {
        'browserName': 'chrome'
    },
    
    onPrepare: function () {
        requirePage = function (name) {
            return require(__dirname + "/pages/" + name);
        };
        requireLib = function (name) {
            return require(__dirname + "/lib/" + name);
        };
        getBaseUrl = function () {
            return 'http://surveytool.orientsoftware.net/e2e/';
        };
    },

    suites: {
        survey: 'tests/app/survey/*[Ss]pec.js'
    },

    baseUrl: 'http://surveytool.orientsoftware.net/e2e/',

    framework: 'jasmine',
    
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    restartBrowserBetweenTests: true
};