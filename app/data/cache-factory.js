(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('cacheFactory', cacheFactory);

    cacheFactory.$inject = ['CacheFactory'];

    function cacheFactory(CacheFactory) {

        var service = {
            getCache: getCache,
            addToCache: addToCache,
            removeFromCache: removeFromCache,
            updateInCache: updateInCache,
            removeAllCaches: removeAllCaches
        };

        return service;

        ///////////////

        function getCache(entity, getData) {
            var key = entity + 'TimeChimp';
            var cache = CacheFactory.get(key);

            if (!cache) {
                if (!getData) {
                    cache = CacheFactory.createCache(key, {
                        deleteOnExpire: 'none',
                        storageMode: 'localStorage'
                    });
                }
                else {
                    cache = CacheFactory.createCache(key, {
                        deleteOnExpire: 'aggressive',
                        maxAge: 3600000,
                        storageMode: 'localStorage',
                        onExpire: function (key, value) {
                            var cache = this;

                            getData(key).then(function (data) {
                                cache.put(key, data);
                            }, function (error) {
                                cache.put(key, value);
                            });
                        }
                    });
                }
            }

            return cache;
        }

        function addToCache(cache, key, entity) {
            var entities = cache.get(key);
            if (!entities) {
                entities = [];
            }
            entities.push(entity);

            cache.remove(key);
            cache.put(key, entities);
        }

        function removeFromCache(cache, key, entity) {
            var entities = cache.get(key);
            if (entities) {
                if (entity.id) {
                    var toRemove = _.findWhere(entities, { id: entity.id });
                    entities = _.without(entities, toRemove);
                }
                else {
                    delete entity.$$hashKey;
                    var toRemove = _.filter(entities, function (e) {
                       return JSON.stringify(e) == JSON.stringify(entity);
                    });
                    entities = _.without(entities, _.first(toRemove));
                }

                cache.remove(key);
                cache.put(key, entities);
            }            
        }

        function updateInCache(cache, key, entity) {
            var entities = cache.get(key);
            if (entities) {
                var toRemove = _.findWhere(entities, { id: entity.id });
                entities = _.without(entities, toRemove);
                entities.push(entity);

                cache.remove(key);
                cache.put(key, entities);
            }
        }

        function removeAllCaches() {
            CacheFactory.destroyAll();
        }
    }
})();