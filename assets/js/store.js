(function(){
"use strict";
var store = angular.module('store', [
    'ngRoute',
]);

store.config(
        /* @ngInject */
        ["$routeProvider", function ($routeProvider) {
        /*
         * Routing settings
         * */
        $routeProvider
            .when('/list', {
                templateUrl: 'list.html',
            })
            .when('/', {
                templateUrl: 'main.html',
            })
            .when('/contact', {
                templateUrl: 'contact.html'
            })
            .otherwise({
                redirectTo: '/'
            });

    }]
);
function HeaderController ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}
HeaderController.$inject = ["$scope", "$location"];

store.controller('HeaderController', HeaderController);
function ListController ($scope, $http) {

    $scope.name = "ListController";
    $http.get('phones/phones.json').success(function (data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';

}
ListController.$inject = ["$scope", "$http"];
store.controller('ListController', ListController);
function MainController ($scope) {
    $scope.name = "MainController";
}
MainController.$inject = ["$scope"];

store.controller('MainController', MainController);
})();