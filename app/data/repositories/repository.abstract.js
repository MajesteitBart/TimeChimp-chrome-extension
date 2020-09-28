(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.abstract', AbstractRepository);

    function AbstractRepository() {
        
        function Ctor(restangular, entityName) {
            this.restangular = restangular;
            this.entityName = entityName;
        }

        Ctor.prototype = {
            getList: getList,
            get: get,
            update: update,
            create: create,
            remove: remove,
            customUpdate: customUpdate,
            customRemove: customRemove,
            removeById: removeById
        };

        Ctor.extend = function (repoCtor) {
            repoCtor.prototype = new Ctor(repoCtor.restangular, repoCtor.entityName);
            repoCtor.prototype.constructor = repoCtor;
        };

        return Ctor;

        function getList(name) {
            return this.restangular.one(this.entityName).getList(name);
        }

        function get(id) {
            return this.restangular.one(this.entityName, id).get();
        }

        function update(entity) {
            return entity.put();
        }

        function create(entity) {
            return this.restangular.all(this.entityName).post(entity);
        }

        function remove(entity) {
            return entity.remove();
        }

        function customUpdate(entity) {
            return this.restangular.all(this.entityName).customPUT(entity, 'put');
        }

        function customRemove(entity) {
            return this.restangular.all(this.entityName).customDELETE('delete', { id: entity.id });
        }

        function removeById(id) {
            return this.restangular.all(this.entityName).customDELETE('delete', { id: id });
        }
    }
})();