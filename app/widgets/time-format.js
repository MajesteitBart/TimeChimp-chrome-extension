(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('timeFormat', timeFormat);

    timeFormat.$inject = ['common'];

    function timeFormat(common) {
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

                    if (time == '00:00') {
                        time = '';
                    }

                    return time;
                });

                elem.bind('focusout', function () {
                    var time = common.formatToTime(elem.val());

                    if (time == '00:00') {
                        time = '';
                    }

                    elem.val(time);
                });                
            }
        };
    }
})();