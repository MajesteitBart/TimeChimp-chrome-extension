(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.company', RepositoryCompany);

    RepositoryCompany.$inject = ['Restangular', 'repository.abstract'];

    function RepositoryCompany(Restangular, AbstractRepository) {

        function Ctor() {
            this.restangular = Restangular;
            this.entityName = 'company';

            this.setup = setup;
            this.getUISelect = getUISelect;
            this.getUISelectAdmin = getUISelectAdmin;
            this.cleanCompany = cleanCompany;
            this.importDemoData = importDemoData;
            this.sendReferralInvitation = sendReferralInvitation;
        }

        AbstractRepository.extend(Ctor);

        return new Ctor();

        ////////

        function setup(company) {
            return this.restangular.one(this.entityName).post('setup', company);
        }

        function getUISelect() {
            return this.restangular.one(this.entityName, 'uiselect').get();
        }

        function getUISelectAdmin() {
            return this.restangular.one(this.entityName, 'uiselectadmin').get();
        }

        function cleanCompany() {
            return this.restangular.one(this.entityName).post('clean');
        }

        function importDemoData() {
            return this.restangular.one(this.entityName).post('demodata');
        }

        function sendReferralInvitation(sendReferralInvitationInfo) {
            return this.restangular.one(this.entityName).post('sendreferralinvitation', sendReferralInvitationInfo);
        }
    }
})();