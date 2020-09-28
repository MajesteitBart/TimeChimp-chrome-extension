(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('currentUser', currentUser);

    currentUser.$inject = ['cacheFactory'];

    function currentUser(cacheFactory) {
        var service = {
            setLogin: setLogin,
            getLogin: getLogin
        };

        return service;

        //////////////

        function setLogin(username, token) {
            cacheFactory.removeAllCaches();

            this.login = {
                username: username,
                token: token
            };

            var cache = cacheFactory.getCache('user');
            
            cache.remove('login');
            cache.put('login', this.login);
        }

        function getLogin() {
            if (this.login) {
                return this.login;
            }
            else {
                var cache = cacheFactory.getCache('user');
                return cache.get('login');   
            }
        }
    }
})();