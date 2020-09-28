(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.time', RepositoryTime);

    RepositoryTime.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryTime(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'time';

            this.getWeek = getWeek;
            this.approve = approve;
            this.changeStatus = changeStatus;
            this.createTimeSpecification = createTimeSpecification;
            this.getExcelExport = getExcelExport;
            this.getByProjectTask = getByProjectTask;
            this.getByProjectUser = getByProjectUser;
            this.getUninvoiced = getUninvoiced;
            this.copyWeekTasks = copyWeekTasks;
            this.copyWeekTimes = copyWeekTimes;
            this.bulkDelete = bulkDelete;
            this.submitClientApproval = submitClientApproval;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();
        
        ////////

        function getWeek(userName, date) {
            if (userName) {
                return this.restangular.one(this.entityName, 'week').one(userName, date).get();
            }
            else {
                return this.restangular.one(this.entityName, 'week').one(date).get();
            }
        }

        function approve(approveInfo) {
            return this.restangular.one(this.entityName).post('approve', approveInfo);
        }

        function changeStatus(changeStatusInfo) {
            return this.restangular.one(this.entityName).post('status', changeStatusInfo);
        }

        function createTimeSpecification(model) {
            return this.restangular.one(this.entityName).withHttpConfig({ responseType: 'arraybuffer' }).post('specification', model);
        }

        function getExcelExport(model) {
            return this.restangular.one(this.entityName, 'excelexport').withHttpConfig({ responseType: 'arraybuffer' }).get();
        }

        function getUninvoiced(projectId, startDate, endDate) {
            return this.restangular.one(this.entityName, 'uninvoiced').one(projectId).one(startDate).one(endDate).get();
        }

        function getByProjectTask(projectTaskId, startDate, endDate) {
            return this.restangular.one(this.entityName, 'projecttask').one(projectTaskId).one(startDate).one(endDate).get();
        }

        function getByProjectUser(projectUserId, startDate, endDate) {
            return this.restangular.one(this.entityName, 'projectuser').one(projectUserId).one(startDate).one(endDate).get();
        }

        function copyWeekTasks(userName, date) {
            return this.restangular.one(this.entityName, 'copyWeekTasks').one(userName, date).get();
        }

        function copyWeekTimes(userName, date) {
            return this.restangular.one(this.entityName, 'copyWeekTimes').one(userName, date).get();
        }

        function bulkDelete(ids) {
            return this.restangular.one(this.entityName).post('bulkdelete', ids);
        }

        function submitClientApproval(submitClientApprovalInfo) {
            return this.restangular.one(this.entityName).post('submitclientapproval', submitClientApprovalInfo);
        }
    }
})();