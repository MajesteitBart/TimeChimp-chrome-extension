(function () {
    'use strict';

    angular
        .module('app.time')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/time");

        $stateProvider

            .state('time', {
                url: '/time',
                templateUrl: 'app/time/time.html',
                controller: 'Time as vm'
            });
    }
})();
