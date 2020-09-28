(function () {
    'use strict';
    angular
        .module('app.data')
        .factory('repository.timer', RepositoryTimer);
    RepositoryTimer.$inject = ['Restangular', 'repository.abstract'];
    function RepositoryTimer(Restangular, AbstractRepository) {
        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'timer';
            this.start = start;
            this.stop = stop;
            this.resume = resume;
            this.getTimer = getTimer;
        }
        AbstractRepository.extend(Ctor);
        return new Ctor();
        ////////
        function start(id) {
            return this.restangular.one(this.entityName).post('start/' + id);
        }
        function stop(id) {
            return this.restangular.one(this.entityName).post('stop/' + id);
        }
        function resume(id) {
            return this.restangular.one(this.entityName).post('resume/' + id);
        }
        function getTimer() {
            return this.restangular.one(this.entityName).get();
        }
    }
})();