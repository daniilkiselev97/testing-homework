module.exports = {
  gridUrl: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost',
  pageLoadTimeout: 0,
  httpTimeout: 60000,
  testTimeout: 90000,
  resetCursor: false,
  sets: {
      desktop: {
          files: [
              'test/**/*.hermione.js'
          ],
          browsers: [
              'chrome'
          ]
      }
  },
  browsers: {
      chrome: {
          automationProtocol: 'devtools',
          desiredCapabilities: {
              browserName: 'chrome'
          }
      }
  },
  plugins: {
      'html-reporter/hermione': {
          // https://github.com/gemini-testing/html-reporter
          enabled: true,
          path: 'hermione-report',
          defaultView: 'all',
          diffMode: '3-up-scaled'
      }
  }
}