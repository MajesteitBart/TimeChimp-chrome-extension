'use strict';

render('.container:not(.timechimp)', {observe: true}, function (elem) {
    var link, taskTitleElem = $('#title', elem), pageTitleElem = $('.content_t', elem), description;

    description = '';

    if (pageTitleElem !== null) {
        description += pageTitleElem.textContent.trim();
    }

    if (taskTitleElem !== null) {
        if (description.length > 0) {
            description += ": ";
        }
        description += taskTitleElem.textContent.trim();
    }

    link = createTimerLink({
        appName: 'Teamleader',
        className: 'teamleader',
        description: description
    });

    elem.getElementsByClassName('widgettitle')[0].appendChild(link);
});
