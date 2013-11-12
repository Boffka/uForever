'use strict';

/* Directives */



var uDirectives = angular.module('uDirectives', ['ngResource']);



uDirectives.directive('getUptime', function() {
    return {
        template: "{{instance.uptime.months}} month(s) {{instance.uptime.days}} days {{instance.uptime.hours}}h:{{instance.uptime.minutes}}m:{{instance.uptime.seconds}}s"
    };
    });