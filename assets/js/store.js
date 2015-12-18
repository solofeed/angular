(function(){
"use strict";
/* App Module */
var store = angular.module('store', [
    'ngRoute',
    'ui.router'
]);

store.config(
        /* @ngInject */
        ["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
        /*
         * Routing settings
         * */
        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: 'assets/all.html',
                controller: ["$stateParams", function ($stateParams) {}]
            });

            $urlRouterProvider.when('/', '/');

    }]
);
/* Controllers */

function HomeController ($scope, $http) {
    $scope.title = 'Store Gadgets';

    $http.get('phones/phones.json').success(function (data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';

}
HomeController.$inject = ["$scope", "$http"];
store.controller('HomeController', HomeController);
})();