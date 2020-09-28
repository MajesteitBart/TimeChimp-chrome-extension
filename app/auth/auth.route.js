(function() {
    'use strict';

    angular
        .module('app.auth')
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {

        $stateProvider

             .state('login', {
                 url: '/login',
                 templateUrl: 'app/auth/login.html',
                 controller: 'Login as vm'
             });
    }
})();
