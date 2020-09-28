'use strict';

render('.editor__header:not(.toggl)', {observe: true}, function (elem) {
    var link,
        tabs = $('.editor__switch-mode', elem),
        description = function () {
            return document.querySelector(".editor-title__input").value;
        };

    if (!!$('.timechimp-button')) {
        return;
    }

    link = createTimerLink({
        appName: 'Wordpress',
        className: 'wordpress',
        description: description
    });

    tabs.parentElement.insertBefore(link, tabs);
});