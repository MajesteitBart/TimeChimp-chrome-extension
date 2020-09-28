(function () {
    'use strict';

    angular.module('app.core')
           .run(run);

    run.$inject = ['$state', '$rootScope', '$timeout', 'currentUser', 'datacontext', '$transitions'];

    function run($state, $rootScope, $timeout, currentUser, datacontext, $transitions) {

        runAuthentication();

        ////////////////////

        function runAuthentication() {
            $transitions.onStart({ to: 'time' }, function(trans) {
                var login = currentUser.getLogin();  
                if (!login || !login.token) {
                    return trans.router.stateService.target('login');
                }
            });
        }
    }
})();