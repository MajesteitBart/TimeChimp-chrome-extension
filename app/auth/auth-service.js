(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', authService);

    authService.$inject = ['$http', 'common', 'config', 'cacheFactory', '$q', 'datacontext', 'currentUser'];

    function authService($http, common, config, cacheFactory, $q, datacontext, currentUser) {

        var service = {
            login: login,
            logout: logout
        };

        return service;

        /////////////

        function login(username, password) {
            var httpConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            var data = common.formEncode({
                username: username,
                password: password,
                grant_type: 'password'
            });

            return $http.post(config.appTokenUrl, data, httpConfig)
                      .then(function (response) {
                            currentUser.setLogin(username, response.data.access_token);
                            return response.data.access_token;
                      });
        }

        function logout() {
            cacheFactory.removeAllCaches();
        }
    }
})();