(function() {
    'use strict';

    angular
        .module('app.data')
        .factory('datacontext', datacontext);

    datacontext.$inject = ['$injector', 'config'];

    function datacontext($injector, config) {

        var repoNames = [
            'company',
            'customer',
            'project',
            'projectTask',
            'tag',
            'task',
            'time',
            'timer',
            'user'
        ];

        var service = {
            // Repositories to be added by defineLazyLoadedRepos
            // Add new repositories to repoNames
        };

        init();

        return service;

        function init() {
            defineLazyLoadedRepos();
        }

        function defineLazyLoadedRepos() {
            repoNames.forEach(function (name) {
                Object.defineProperty(service, name, {
                    configurable: true,
                    get: function () {
                        var repo = getRepo(name);
                        Object.defineProperty(service, name, {
                            value: repo,
                            configurable: false,
                            enumerable: true
                        });
                        return repo;
                    }
                });
            });
        }

        function getRepo(repoName) {
            var fullRepoName = 'repository.' + repoName;
            return $injector.get(fullRepoName);
        }
    }
})();