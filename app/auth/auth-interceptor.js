(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', 'cacheFactory', '$rootScope', 'currentUser'];

    function authInterceptor($q, cacheFactory, $rootScope, currentUser) {

        var service = {
            request: request,
            responseError: responseError
        };

        return service;

        /////////////

        function request(config) {
            var login = currentUser.getLogin();  
            
            if (login && login.token) {
                config.headers.Authorization = "Bearer " + login.token;
            }
            
            return $q.when(config);
        }

        function responseError(response) {
            $rootScope.$broadcast('tc-error');
            return $q.reject(response);
        }
    }
})();