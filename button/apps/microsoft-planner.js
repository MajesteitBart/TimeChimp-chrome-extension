render('.ms-Dialog:not(.timechimp)', {observe: true}, function (elem) {
    var container = createTag('button', 'ms-Button button-link planner-tb-wrapper');
    var titleElem = $('.isTitleStyle input.value', elem);
    var projectElem = $('title');
    var descriptionElem = $('.ms-Dialog-topButton');

    var link = createTimerLink({
        appName: 'Planner',
        className: 'planner',
        description: function () { return titleElem.textContent; },
        projectName: projectElem.textContent,
        calculateTotal: true
    });

    container.appendChild(link);
    descriptionElem.parentNode.insertBefore(container, descriptionElem);
});
