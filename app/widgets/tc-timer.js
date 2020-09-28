(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('tcTimer', tcTimer);

    tcTimer.$inject = ['$interval'];

    function tcTimer($interval) {
        return {
            restrict: 'EA',
            template: '<span>{{time}}<span>',
            scope: {
                start: '@start',
                break: '@break'
            },
            replace: true,
            link: function (scope, element, attr, ctrl) {
                setTime();

                const timerInterval = $interval(() => {
                    setTime();
                }, 1000)

                function setTime() {
                    if (isValidTime(scope.start)) {
                        let millis = moment().diff(moment.utc(scope.start));

                        if (!isNaN(scope.break)) {
                            const breakTime = scope.break * 3600000;
                            millis -= breakTime;
                        }

                        const time = convertMillisToHrsMinsSecs(millis);

                        scope.time = time;
                        document.title = scope.time + ' | TimeChimp';
                    }
                }

                function convertMillisToHrsMinsSecs(millis) {
                    let h = Math.floor(((millis / (3600000)) % 24));
                    let m = Math.floor((millis / (60000)) % 60);
                    let s = Math.floor((millis / 1000) % 60);
                    h = h < 10 ? '0' + h : h;
                    m = m < 10 ? '0' + m : m;
                    s = s < 10 ? '0' + s : s;
                    return `${h}:${m}:${s}`;
                  }

                  function isValidTime(startTime) {
                    return startTime 
                        && moment(startTime).isValid()
                          && moment.utc(startTime) < moment();
                  }

                scope.$on('$destroy', function () {
                    $interval.cancel(timerInterval);
                    document.title = 'TimeChimp';
                });
            }
        };
    }
})();