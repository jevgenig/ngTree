var allTestFiles = [];
var TEST_REGEXP = /test\.js$/;

var pathToModule = function (path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(pathToModule(file));
    }
});

window.IS_TEST = true;
window.ngViewPrefix = 'base/ngTree/';

require.config({
    baseUrl: '/base',
    packages: [
        {
            name: 'ngTree',
            location: 'ngTree/js/ngTree',
            main: 'ngTree'
        },
        {
            name: 'base',
            location: 'ngTree/js/base'
        }
    ],
    shim: {
    },
    paths: {
        'bootstrap': '/base/libs/twitter-bootstrap/js/bootstrap',
        'underscore': '/base/libs/lodash.js/lodash.compat',
        'jquery': '/base/libs/jquery/jquery',
        'angular': '/base/libs/angular.js/angular',
    },
    deps: allTestFiles,
    callback: window.__karma__.start
});