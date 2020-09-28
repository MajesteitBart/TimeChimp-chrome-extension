(function () {
'use strict';

    angular
        .module('app.auth')
        .controller('Login', Login);

    Login.$inject = ['authService', '$state', 'datacontext'];

    function Login(authService, $state, datacontext) {

        var vm = this;

        vm.username = '';
        vm.password = '';
        vm.loading = false;
        vm.loginFailed = false;

        vm.login = login;

        ///////////////

        function login() {
            vm.loading = true;
            vm.loginFailed = false;

            authService.login(vm.username, vm.password)
                    .then(function (login) {
                        $state.go('time');
                        vm.loading = false;
                    })
                    .catch(function (data) {
                        vm.password = null;
                        vm.loading = false;
                        vm.loginFailed = true;
                    });
        }
    }
})();