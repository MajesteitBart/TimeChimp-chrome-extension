(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.project', RepositoryProject);

    RepositoryProject.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryProject(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'project';

            this.getDashboard = getDashboard;
            this.getProjectDashboardTasks = getProjectDashboardTasks;
            this.getProjectDashboardUsers = getProjectDashboardUsers;
            this.getProjectDashboardExpenses = getProjectDashboardExpenses;
            this.getProjectDashboardMileages = getProjectDashboardMileages
            this.getAccountProjects = getAccountProjects;
            this.getAccountProjectsByUser = getAccountProjectsByUser;
            this.archive = archive;
            this.restore = restore;
            this.getUISelect = getUISelect;
            this.getUISelectByUser = getUISelectByUser;
            this.getUISelectByCustomer = getUISelectByCustomer;
            this.getProjectChartsData = getProjectChartsData;
            this.getIntern = getIntern;
            this.copy = copy;
            this.getUninvoicedProject = getUninvoicedProject;
            this.getScheduleProjects = getScheduleProjects;
            this.addToSchedule = addToSchedule;
            this.removeFromSchedule = removeFromSchedule;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();

        ////////////////////

        function getAccountProjects(year) {
            return this.restangular.one(this.entityName, 'accountprojects').one(year).get();
        }

        function getAccountProjectsByUser(year, id) {
            return this.restangular.one(this.entityName, 'accountprojects').one(year).one(id).get();
        }

        function archive(id) {
            return this.restangular.one(this.entityName, 'archive/' + id).post();
        }

        function restore(id) {
            return this.restangular.one(this.entityName, 'restore/' + id).post();
        }

        function getUISelectByUser(userName) {
            return this.restangular.one(this.entityName, userName).one('uiselectbyuser').get();
        }

        function getUISelectByCustomer(customerId) {
            return this.restangular.one(this.entityName, 'uiselect').one('customer', customerId).get();
        }

        function getUISelect() {
            return this.restangular.one(this.entityName, 'uiselect').get();
        }

        function getProjectChartsData(projectId) {
            return this.restangular.one(this.entityName, 'chartsdata').one(projectId).get();
        }

        function getIntern() {
            return this.restangular.one(this.entityName, 'intern').get();
        }

        function copy(id) {
            return this.restangular.one(this.entityName, 'copy/' + id).post();
        }

        function getDashboard(id) {
            return this.restangular.one(this.entityName, 'dashboard').one(id).get();
        }

        function getProjectDashboardTasks(id, startDate, endDate) {
            return this.restangular.one(this.entityName, 'dashboard/tasks').one(id).one(startDate).one(endDate).get();
        }

        function getProjectDashboardUsers(id, startDate, endDate) {
            return this.restangular.one(this.entityName, 'dashboard/users').one(id).one(startDate).one(endDate).get();
        }

        function getProjectDashboardExpenses(id, startDate, endDate) {
            return this.restangular.one(this.entityName, 'dashboard/expenses').one(id).one(startDate).one(endDate).get();
        }

        function getProjectDashboardMileages(id, startDate, endDate) {
            return this.restangular.one(this.entityName, 'dashboard/mileages').one(id).one(startDate).one(endDate).get();
        }

        function getUninvoicedProject(id, startDate, endDate) {
            return this.restangular.one(this.entityName, 'uninvoiced').one(id).one(startDate).one(endDate).get();
        }

        function getScheduleProjects() {
            return this.restangular.one(this.entityName, 'schedule').get();
        }

        function addToSchedule(projectIds) {
            return this.restangular.one(this.entityName).post('addtoschedule', projectIds);
        }

        function removeFromSchedule(projectId) {
            return this.restangular.all(this.entityName).customDELETE('removefromschedule', { id: projectId });
        }
    }
})();