'use strict';

render('#docs-bars:not(.timechimp)', {}, function (elem) {
    var link, titleFunc;

    titleFunc = function () {
        var title = $(".docs-title-input");
        return title ? title.value : "";
    };

    link = createTimerLink({
        appName: 'Google-docs',
        className: 'google-docs',
        description: titleFunc
    });
    $('#docs-menubar').appendChild(link);
});
