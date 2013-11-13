'use strict';

/* App Module */

var uForever = angular.module('uForever', [
  'ngRoute',
  'uAnimations',
  'uControllers',
  'uFilters',
  'uServices',
  'uDirectives'
]);

uForever.config(
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
            templateUrl: '/assets/partials/inst-list.html',
            controller: 'IndexListCtrl'
      }).
      when('/units', {
        templateUrl: '/assets/partials/unit-list.html',
        controller: 'UnitListCtrl'
      }).
      when('/unit/add', {
            templateUrl: '/assets/partials/add-unit.html',
            controller: 'AddUnitCtrl'
        }).
      when('/instances', {
        templateUrl: '/assets/partials/inst-list.html',
        controller: 'InstListCtrl'
      }).
      when('/instances/:instanceId', {
        templateUrl: '/assets/partials/inst-detail.html',
        controller: 'InstDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix = '!';
  });
