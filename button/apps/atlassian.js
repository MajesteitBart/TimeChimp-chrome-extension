'use strict';

// Jira 2017 board sidebar
render('#ghx-detail-view [spacing] h1:not(.timechimp)', {observe: true}, function () {
    var link, description,
        rootElem = $('#ghx-detail-view'),
        container = createTag('div', 'jira-ghx-timechimp-button'),
        titleElem = $('[spacing] h1', rootElem),
        numElem = $('[spacing] a', rootElem),
        projectElem = $('.bgdPDV');

    description = titleElem.textContent;
    if (numElem !== null) {
        description = numElem.textContent + " " + description;
    }

    link = createTimerLink({
        appName: 'Jira',
        className: 'jira2017',
        description: description,
        buttonType: 'minimal',
        projectName: projectElem && projectElem.textContent
    });

    container.appendChild(link);
    numElem.parentNode.appendChild(container);
});


// Jira 2018 sprint modal
// Using the h1 as selector to make sure that it will only try to render the button
// after Jira has fully rendered the modal content
render('div[role="dialog"] h1:not(.timechimp)', {observe: true}, function (titleElem) {
    // need to go all the way up until we find the modal wrapper (for the rootElem)

    var link, description,
        rootElem = titleElem.offsetParent.offsetParent.offsetParent.offsetParent,
        container = createTag('div', 'jira-ghx-timechimp-button'),
        numElem = $('[spacing] a', rootElem),
        projectElem = $('.bgdPDV');

    description = titleElem.textContent;
    if (numElem !== null) {
        description = numElem.textContent + " " + description;
    }

    link = createTimerLink({
        appName: 'Jira',
        className: 'jira2017',
        description: description,
        projectName: projectElem && projectElem.textContent
    });

    container.appendChild(link);
    numElem.parentNode.appendChild(container);
});

// Jira 2017 issue page
render('.issue-header-content:not(.timechimp)', {observe: true}, function (elem) {
    var link, description,
        numElem = $('#key-val', elem),
        titleElem = $('#summary-val', elem) || "",
        projectElem = $('.bgdPDV');

    if (!!titleElem) {
        description = titleElem.textContent;
    }

    if (numElem !== null) {
        if (!!description) {
            description = " " + description;
        }
        description = numElem.textContent + description;
    }

    link = createTimerLink({
        appName: 'Jira',
        className: 'jira2017',
        description: description,
        projectName: projectElem && projectElem.textContent
    });

    $('.issue-link').parentElement.appendChild(link);
});

// Jira pre-2017
render('#ghx-detail-issue:not(.timechimp)', {observe: true}, function (elem) {
    var link, description,
        container = createTag('div', 'ghx-timechimp-button'),
        titleElem = $('[data-field-id="summary"]', elem),
        numElem = $('.ghx-fieldname-issuekey a'),
        projectElem = $('.ghx-project', elem);

    description = titleElem.textContent;
    if (numElem !== null) {
        description = numElem.textContent + " " + description;
    }

    link = createTimerLink({
        appName: 'Jira',
        className: 'jira',
        description: description,
        projectName: projectElem && projectElem.textContent
    });

    container.appendChild(link);
    $('#ghx-detail-head').appendChild(container);
});

// Jira pre-2017
render('.issue-header-content:not(.timechimp)', {observe: true}, function (elem) {
    var link, description, ul, li,
        numElem = $('#key-val', elem),
        titleElem = $('#summary-val', elem) || "",
        projectElem = $('#project-name-val', elem);

    if (!!titleElem) {
        description = titleElem.textContent;
    }

    if (numElem !== null) {
        if (!!description) {
            description = " " + description;
        }
        description = numElem.textContent + description;
    }

    link = createTimerLink({
        appName: 'Jira',
        className: 'jira',
        description: description,
        projectName: projectElem && projectElem.textContent
    });

    ul = createTag('ul', 'toolbar-group');
    li = createTag('li', 'toolbar-item');
    li.appendChild(link);
    ul.appendChild(li);
    $('.toolbar-split-left').appendChild(ul);
});

//Confluence
render('#title-heading:not(.timechimp)', {observe: true}, function (elem) {
    var link, description,
        titleElem = $('[id="title-text"]', elem);

    description = titleElem.textContent;

    link = createTimerLink({
        appName: 'Confluence',
        className: 'confluence',
        description: description
    });

    $('#title-text').appendChild(link);
});
