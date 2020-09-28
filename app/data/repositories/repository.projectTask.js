(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.projectTask', RepositoryProjectTask);

    RepositoryProjectTask.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryProjectTask(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'projecttask';

            this.getIntern = getIntern;
            this.getUISelectByProject = getUISelectByProject;
            this.getUISelectByMilestone = getUISelectByMilestone;
            this.getUISelectByUser = getUISelectByUser;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();

        /////////////////

        function getIntern(year) {
            return this.restangular.one(this.entityName, 'intern').one(year).get();
        }

        function getUISelectByProject(projectId) {
            return this.restangular.one(this.entityName, 'uiselect/project').one(projectId).get();
        }

        function getUISelectByMilestone(projectId, projectMilestoneId) {
            if (projectMilestoneId) {
                return this.restangular.one(this.entityName, 'uiselect/milestone/' + projectId).one(projectMilestoneId).get();
            }
            else {
                return this.restangular.one(this.entityName, 'uiselect/milestone').one(projectId).get();
            }
        }

        function getUISelectByUser(userName) {
            return this.restangular.one(this.entityName, userName).one('uiselectbyuser').get();
        }
    }
})();