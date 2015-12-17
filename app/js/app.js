'use strict';

/* App Module */
var store = angular.module('store', [
    'ngRoute',
    'ui.router'
]);

store.config(
        /* @ngInject */
        function ($routeProvider) {
        /*
         * Routing settings
         * */
        $routeProvider
            .when('/', {
            templateUrl: 'templates/list.html',
            controller: function () {}
            });
    }
);