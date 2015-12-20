function HeaderController ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}

store.controller('HeaderController', HeaderController);