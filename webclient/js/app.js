'use strict';


// Declare app level module which depends on filters, and services
angular.module('demoApiSeet', ['demoApiSeet.filters', 'demoApiSeet.services', 'demoApiSeet.directives', 'demoApiSeet.interceptors','ngRoute'])
    .config(['twitterInterceptorProvider', '$routeProvider', '$locationProvider', '$httpProvider', function(twitterInterceptorProvider, $routeProvider, $locationProvider, $httpProvider) {
        twitterInterceptorProvider.RedirectUrl('/auth/twitter');
        $httpProvider.interceptors.push('twitterInterceptor');
        $routeProvider
            .when('/about', {templateUrl: 'partials/about', controller: EmptyCtrl})
            .when('/twitterService', {templateUrl: 'partials/twitterService', controller: TwitterCtrl})
            .otherwise({redirectTo: '/about'});
        $locationProvider.html5Mode(true);
  }]);
//angular.module('demoApiSeet', ['demoApiSeet.filters', 'demoApiSeet.services', 'demoApiSeet.directives', 'demoApiSeet.interceptors','ngRoute']);