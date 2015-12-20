function ListController ($scope, $http) {

    $scope.name = "ListController";
    $http.get('phones/phones.json').success(function (data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';

}
store.controller('ListController', ListController);