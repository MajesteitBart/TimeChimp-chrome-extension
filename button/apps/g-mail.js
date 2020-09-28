render('.ha:not(.timechimp)', {observe: true}, function (elem) {
    var link,
        description = $('h2', elem),
        project = $('.hX:last-of-type .hN', elem);

    if (!description) {
        return;
    }

    link = createTimerLink({
        appName: 'Google-mail',
        className: 'google-mail',
        description: description.textContent,
        projectName: !!project && project.textContent.split('/').pop()
    });

    elem.appendChild(link);
});