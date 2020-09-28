'use strict';

render('#Pagearea:not(.timechimp)', {observe: true}, function (elem) {
    var link, container = createTag('li', 'ticket-btns'),
        description,
        titleElem = $('h2.subject', elem),
        idElem = $('#ticket-display-id'),
        projectElem = $('.logo_text'),
        buttonsElem = $('.ticket-actions > ul');

    description = idElem.textContent.trim() + ' ' + titleElem.textContent.trim();
    link = createTimerLink({
        appName: 'Freshdesk',
        className: 'freshdesk',
        description: description,
        projectName: projectElem && projectElem.textContent.trim(),
        calculateTotal: true
    });

    container.appendChild(link);
    buttonsElem.appendChild(container, buttonsElem);

});
