'use strict';

/* Services */

var uServices = angular.module('uServices', ['ngResource'])
    .factory('Instance', ['$resource',
        function ($resource) {
            return $resource('/api/get/instances/:instanceId', {}, {
                query: {method: 'GET', params: {instanceId: 'instances'}, isArray: true}
            });
        }])

    .factory('Units', ['$resource',
        function ($resource) {
            return $resource('/api/get/instances/:instanceId', {}, {
                query: {method: 'GET', params: {instanceId: 'instances'}, isArray: true}
            });
        }])

    .factory('activeMenu', ['$location',
        function ($location) {
        }])

