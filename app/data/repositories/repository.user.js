(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.user', RepositoryUser);

    RepositoryUser.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryUser(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'user';

            this.getYearInfo = getYearInfo;
            this.getYearInfoCurrentUser = getYearInfoCurrentUser;
            this.getChartsData = getChartsData;
            this.getChartsDataCurrentUser = getChartsDataCurrentUser;
            this.changePassword = changePassword;
            this.resetPassword = resetPassword;
            this.getAllWithNonActive = getAllWithNonActive;
            this.logout = logout;
            this.bulkCreate = bulkCreate;
            this.changeCompany = changeCompany;
            this.getCurrentUser = getCurrentUser;
            this.updateCurrentUser = updateCurrentUser;
            this.updateMileageAddresses = updateMileageAddresses;
            this.updateUserName = updateUserName;
            this.getUISelect = getUISelect;
            this.setup = setup;
            this.sendMessage = sendMessage;
            this.addToProjects = addToProjects;
            this.removeFromProjects = removeFromProjects;
            this.getUserAvailability = getUserAvailability;
            this.getUsersAvailability = getUsersAvailability;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();

        ////////////////

        function getYearInfoCurrentUser(year) {
            return this.restangular.one(this.entityName, 'yearinfo').one(year).get();
        }

        function getYearInfo(year, userId) {
            return this.restangular.one(this.entityName, 'yearinfo').one(year).one(userId).get();
        }

        function getChartsDataCurrentUser(year) {
            return this.restangular.one(this.entityName, 'chartsdata').one(year).get();
        }

        function getChartsData(year, userId) {
            return this.restangular.one(this.entityName, 'chartsdata').one(year).one(userId).get();
        }

        function changePassword(changePassword) {
            return this.restangular.one(this.entityName).post('changepassword', changePassword);
        }

        function resetPassword(user) {
            return this.restangular.one(this.entityName).post('resetPassword', user);
        }

        function getAllWithNonActive() {
            return this.restangular.one(this.entityName, 'nonactive').get();
        }

        function logout() {
            return this.restangular.one(this.entityName, 'logout').post();
        }

        function bulkCreate(users) {
            return this.restangular.one(this.entityName).post('bulk', users);
        }

        function changeCompany(companyId) {
            return this.restangular.one(this.entityName).one('changecompany', companyId).post();
        }

        function getCurrentUser() {
            return this.restangular.one(this.entityName, 'current').get();
        }

        function updateCurrentUser(currentUser) {
            return this.restangular.one(this.entityName).customPUT(currentUser, 'current');
        } 

        function updateMileageAddresses(mileageAddresses) {
            return this.restangular.one(this.entityName).customPUT(mileageAddresses, 'mileageaddresses');
        } 

        function updateUserName(changeUserName) {
            return this.restangular.one(this.entityName).one('username').customPUT(changeUserName);
        }

        function getUISelect() {
            return this.restangular.one(this.entityName, 'uiselect').get();
        }

        function setup(user) {
            return this.restangular.one(this.entityName).post('setup', user);
        }

        function sendMessage(usersSendMessageInfo) {
            return this.restangular.one(this.entityName).post('sendmessage', usersSendMessageInfo);
        }

        function addToProjects(userId, projectIds) {
            return this.restangular.one(this.entityName, 'addprojects').post(userId, projectIds);
        }

        function removeFromProjects(userId, projectIds) {
            return this.restangular.one(this.entityName, 'removeprojects').post(userId, projectIds);
        }

        function getUsersAvailability() {
            return this.restangular.one(this.entityName, 'availability').get();
        }

        function getUserAvailability(userId) {
            return this.restangular.one(this.entityName, 'availability').one(userId).get();
        }
    }
})();