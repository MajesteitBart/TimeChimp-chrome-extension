render('.window-header:not(.timechimp)', {observe: true}, function (elem) {
    var container = createTag('div', 'button-link trello-tb-wrapper');
    var titleElem = $('.window-title h2', elem);
    var projectElem = $('.board-header > a');
    var descriptionElem = $('.js-move-card');

    var link = createTimerLink({
        appName: 'Trello',
        className: 'trello',
        description: function () { return titleElem.textContent; },
        projectName: projectElem.textContent,
        calculateTotal: true
    });

    container.appendChild(link);
    descriptionElem.parentNode.insertBefore(container, descriptionElem);
});
