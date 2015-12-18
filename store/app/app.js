/* App Module */
var store = angular.module('store', [
    'ngRoute',
    'ui.router'
]);

store.config(
        /* @ngInject */
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
        /*
         * Routing settings
         * */
        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: 'assets/templates/all.html',
                controller: function ($stateParams) {}
            });

            $urlRouterProvider.when('/', '/');

    }
);