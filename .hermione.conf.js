module.exports = {
    gridUrl: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost',
    pageLoadTimeout: 0,
    httpTimeout: 60000,
    testTimeout: 90000,
    resetCursor: false,
    windowSize: {
        width: 1920,
        height: 10000
      },
    screenshotDelay:50,
    

    sets: {
        desktop: {
            files: ['test/**/*.hermione.js'],
            browsers: ['chrome'],
        },
    },
    browsers: {
        chrome: {
            automationProtocol: 'devtools',
            desiredCapabilities: {
                browserName: 'chrome',
            },
        },
    },
    plugins: {
        'html-reporter/hermione': {
            //   https://github.com/gemini-testing/html-reporter;
            enabled: true,
            path: 'hermione-html-report',
            defaultView: 'all',
            diffMode: '3-up-scaled',
        },
    },
};
