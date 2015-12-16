'use strict';

/* Controllers */

function HomeController ($scope, $http) {
    $scope.title = 'Store Gadgets';

    $http.get('phones/phones.json').success(function (data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';

}
store.controller('HomeController', HomeController);