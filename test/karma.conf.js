// Karma configuration
// Generated on Tue Jun 10 2014 08:08:31 GMT+0900 (Tokyo Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    // ordering is important here since it is not using require js
    files: [
        {pattern: 'webclient/bower_components/jquery/dist/jquery.min.js', watched: false},
        {pattern: 'webclient/bower_components/angular/angular.min.js', watched: false},
        {pattern: 'webclient/bower_components/angular-route/angular-route.min.js', watched: false},
        {pattern: 'webclient/bower_components/angular-mocks/angular-mocks.js', watched: false},
        {pattern: 'webclient/bower_components/bootstrap/dist/js/bootstrap.min.js', watched: false},
        {pattern: 'node_modules/ng-midway-tester/src/ngMidwayTester.js', watched: false},
        'webclient/js/**/*.js',
        'test/spec/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
