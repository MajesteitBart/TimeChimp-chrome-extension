(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('timeFormatShowZero', timeFormatShowZero);

    timeFormatShowZero.$inject = ['common'];

    function timeFormatShowZero(common) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {

                if (!ctrl) {
                    return;
                }

                ctrl.$parsers.push(function (value) {
                    return common.formatTimeToFloat(value);
                });

                ctrl.$formatters.push(function (value) {
                    var time = common.formatToTime(value);

                    return time;
                });

                elem.bind('focusout', function () {
                    var time = common.formatToTime(elem.val());

                    elem.val(time);
                });                
            }
        };
    }
})();