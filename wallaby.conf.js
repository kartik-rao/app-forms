var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {
  return {
    setup: function () {
      window.__moduleBundler.loadTests();
    },
    files: [
      { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
      {pattern: 'node_modules/airbnb-browser-shims/index', instrument: false},
      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'src/**/*.tsx', load: false }
    ],
    tests: [
      { pattern: 'test/spec.*.tsx', load: false }
    ],
    testFramework: 'jasmine',
    postprocessor: wallabyWebpack({}),
    middleware: (app, express) => {
      app.use('/assets',
        express.static(require('path').join(__dirname, 'public')));
    }
  };
};