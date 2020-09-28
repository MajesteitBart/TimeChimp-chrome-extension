(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('clickOutside', clickOutside);

    clickOutside.$inject = ['$document'];

    function clickOutside($document) {
        return {
            restrict: 'A',
            scope: {
                clickOutside: '&'
            },
            link: function (scope, el, attr) {
                $document.find('body').on('click', function (e) {
                    if (el !== e.target && !el[0].contains(e.target)) {
                        scope.$apply(function () {
                            scope.$eval(scope.clickOutside);
                        });
                    }
                });

                scope.$on('$destroy', function () {
                    $document.find('body').off('click');
                });
            }
        }
    }
})();