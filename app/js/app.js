'use strict';

/* App Module */
var store = angular.module('store', [
    'ngRoute'
]);

store.config(function ($routeProvider) {
    /*
     * Routing settings
     * */
    $routeProvider
        .when('/', {
        templateUrl: 'templates/list.html',
        controller: function () {}
        });
});