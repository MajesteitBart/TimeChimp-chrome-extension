(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.customer', RepositoryCustomer);

    RepositoryCustomer.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryCustomer(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'customer';

            this.archive = archive;
            this.restore = restore;
            this.getUISelect = getUISelect;
            this.getUISelectByUser = getUISelectByUser;
            this.bulkCreate = bulkCreate;
            this.bulkCreateAndUpdate = bulkCreateAndUpdate;
            this.addContactPerson = addContactPerson;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();

        ///////////////////

        function archive(customer) {
            return this.restangular.one(this.entityName).post('archive', customer);
        }

        function restore(customer) {
            return this.restangular.one(this.entityName).post('restore', customer);
        }

        function getUISelect() {
            return this.restangular.one(this.entityName, 'uiselect').get();
        }

        function getUISelectByUser(userName) {
            return this.restangular.one(this.entityName, userName).one('uiselectbyuser').get();
        }

        function bulkCreate(customers) {
            return this.restangular.one(this.entityName).post('bulkcreate', customers);
        }

        function bulkCreateAndUpdate(customers) {
            return this.restangular.one(this.entityName).post('bulkcreateandupdate', customers);
        }

        function addContactPerson(contactPerson) {
            return this.restangular.one(this.entityName).post('addcontactperson', contactPerson);
        }
    }
})();