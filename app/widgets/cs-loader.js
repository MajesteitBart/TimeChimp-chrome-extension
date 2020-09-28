(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('scLoader', scLoader);
    
    scLoader.$inject = ['$timeout'];

    function scLoader($timeout) {
        return {
            restrict: 'A',  
            template: '<div class="cs-loader">' +
                            '<div class="cs-loader-inner">' +
                                '<label>	●</label>' +
                                '<label>	●</label>' +
                                '<label>	●</label>' +
                                '<label>	●</label>' +
                                '<label>	●</label>' +
                                '<label>	●</label>' +
                            '</div>' +
                        '</div>'
        };
    }
})();