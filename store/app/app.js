var store = angular.module('store', [
    'ngRoute',
]);

store.config(
        /* @ngInject */
        function ($routeProvider) {
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

    }
);