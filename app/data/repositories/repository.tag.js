(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.tag', RepositoryTag);

    RepositoryTag.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryTag(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'tag';

            this.getByType = getByType;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();

        ///////////////////

        function getByType(type) {
            return this.restangular.one(this.entityName, 'type/' + type).get();
        }
    }
})();