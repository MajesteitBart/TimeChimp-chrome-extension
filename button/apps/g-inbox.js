'use strict';

render('.bJ:not(.timechimp)', {observe: true}, function (elem) {
    var link,
        description = $('.eo > span', elem).textContent,
        toolbar = $('.iK', elem);

    link = createTimerLink({
        appName: 'Google-Inbox',
        className: 'google-inbox',
        description: description,
        buttonType: 'minimal'
    });

    toolbar.parentElement.insertBefore(link, toolbar);
});