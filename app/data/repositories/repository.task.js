(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.task', RepositoryTask);

    RepositoryTask.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryTask(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'task';

            this.getUISelect = getUISelect;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();

        //////

        function getUISelect() {
            return this.restangular.one(this.entityName, 'uiselect').get();
        }
    }
})();