'use strict';

render('span.ember-view:first-child .conversation__text:not(.timechimp)', {observe: true}, function (elem) {
    var link,
        description = elem.textContent.trim();

    link = createTimerLink({
        appName: 'Intercom',
        className: 'intercom',
        description: description
    });

    if ($('.timechimp-button.intercom') !== null) {
        $('.timechimp-button.intercom').remove();
    }

    $('.tabs__discrete-tab__container').appendChild(link);
});