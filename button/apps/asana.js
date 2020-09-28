render('#partial-discussion-sidebar', {observe: true}, function (elem) {
    var link, descFunc, projectFunc;
    var container = $('.sticky-view-placeholder', elem);
    var description = $('#details_property_sheet_title', elem);
    var project = $('#details_pane_project_tokenizer .token_name', elem);

    // Check for existing tag, create a new one if one doesn't exist or is not the first one
    // We want button to be the first one because it looks different from the other sidebar items
    // and looks very weird between them.


    div = document.createElement("div");
    div.classList.add("discussion-sidebar-item", "timechimp");

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana',
        description: descFunc,
        projectName: projectFunc
    });

    container.parentNode.insertBefore(link, container.nextSibling);
});


render('#right_pane__contents .SingleTaskPane:not(.timechimp)', {observe: true}, function (elem) {
    var link, descFunc, projectFunc;
    var container = $('.SingleTaskTitleRow', elem);
    var description = $('.SingleTaskTitleRow .simpleTextarea', elem);

    descFunc = function () {
        return !!description ? description.value : "";
    };

    projectFunc = function () {
        return (project && project.textContent) || ($('.TaskAncestry-ancestorProjects', elem) && $('.TaskAncestry-ancestorProjects', elem).textContent) || "";
    };

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana-new',
        description: descFunc,
        projectName: projectFunc
    });

    container.after(link);
});

render('.BoardColumnCardsContainer-item:not(.timechimp)', {observe: true}, function (elem) {
    if (!!$('.timechimp-button', elem)) {
        return;
    }
    var link;
    var container = $('.BoardCardWithCustomProperties-assigneeAndDueDate', elem);
    var description = $('.BoardCardWithCustomProperties-name', elem).textContent;
    var project = $('.SidebarItemRow.is-selected').textContent;

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana-board',
        description: description,
        projectName: project,
        buttonType: 'minimal'
    });

    container.appendChild(link);
});

// Board task detail view
render('.SingleTaskTitleRow:not(.timechimp)', {observe: true}, function (elem) {
    if (!!$('.timechimp-button', elem)) {
        return;
    }
    var link;
    var container = $('.SingleTaskPaneToolbar', elem.parentNode);
    var description = $('.SingleTaskTitleRow textarea', elem.parentNode).textContent;
    var projectElement = $('.SingleTaskPane-projects .TaskProjectPill-projectName', elem.parentNode);

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana-board',
        description: description,
        projectName: projectElement ? projectElement.textContent : '',
        buttonType: 'minimal'
    });

    container.appendChild(link);
});


// New UI v2
render('#right_pane__contents .SingleTaskPane-body:not(.timechimp)', {observe: true}, function (elem) {
    if (!!$('.timechimp-button', elem)) {
        return;
    }
    var link;
    var container = $('.TaskPaneAssigneeDueDateRowStructure', elem.parentNode);
    var description = $('.SingleTaskPane-titleRow .simpleTextarea', elem.parentNode).textContent;
    var projectElement = $('.TaskProjectPill-projectName div', elem.parentNode);

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana-new',
        description: description,
        projectName: projectElement ? projectElement.textContent : '',
        buttonType: 'minimal'
    });

    container.appendChild(link);
});

// New UI Board view v1 and v2
render('.BoardColumnCardsContainer-item:not(.timechimp)', {observe: true}, function (elem) {
    if (!!$('.timechimp-button', elem)) {
        return;
    }
    var link;
    var container = $('.BoardCardWithCustomProperties-assigneeAndDueDate', elem.parentNode);
    var description = $('.BoardCardWithCustomProperties-name', elem.parentNode).textContent;
    var projectElement = $('.SidebarItemRow.is-selected', elem.parentNode);

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana-board',
        description: description,
        projectName: projectElement ? projectElement.textContent : '',
        buttonType: 'minimal'
    });

    container.appendChild(link);
});

// New UI Board task detail view v1
render('.SingleTaskTitleRow:not(.timechimp)', {observe: true}, function (elem) {
    if (!!$('.timechimp-button', elem)) {
        return;
    }
    var link;
    var container = $('.SingleTaskPaneToolbar', elem.parentNode);
    var description = $('.SingleTaskTitleRow textarea', elem.parentNode).textContent;
    var projectElement = $('.SingleTaskPane-projects .TaskProjectPill-projectName', elem.parentNode);

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana-board',
        description: description,
        projectName: projectElement ? projectElement.textContent : '',
        buttonType: 'minimal'
    });

    container.appendChild(link);
});

// New UI Board task detail view v2
render('.SingleTaskPane-titleRow:not(.timechimp)', {observe: true}, function (elem) {
    if (!!$('.timechimp-button', elem)) {
        return;
    }
    var link;
    var container = container = $('.SingleTaskPaneToolbar');
    var description = function() {
      return $('.SingleTaskPane-titleRow .simpleTextarea', elem.parentNode).textContent;
    };
    var projectElement = $('.SingleTaskPane-projects .TaskProjectPill-projectName', elem.parentNode);

    link = createTimerLink({
        appName: 'Asana',
        className: 'asana-board',
        description: description,
        projectName: projectElement ? projectElement.textContent : '',
        buttonType: 'minimal'
    });

    container.appendChild(link);
});

// New UI Board task detail view v1
render(
    '.SingleTaskTitleRow:not(.timechimp)',
    { observe: true },
    function(elem) {
        if (!!$('.timechimp-button', elem)) {
            return;
        }
        var link,
            container = $('.SingleTaskPaneToolbar', elem.parentNode),
            description = $('.SingleTaskTitleRow textarea', elem.parentNode)
                .textContent,
            projectElement = $(
                '.SingleTaskPane-projects .TaskProjectPill-projectName',
                elem.parentNode
            );

        link = createTimerLink({
            className: 'asana-board',
            description: description,
            projectName: projectElement ? projectElement.textContent : '',
            buttonType: 'minimal'
        });

        container.appendChild(link);
    }
);

// New UI Board task detail view v2
render(
    '.SingleTaskPane-titleRow:not(.timechimp)',
    { observe: true },
    function(elem) {
        if (!!$('.timechimp-button', elem)) {
            return;
        }
        var link,
            container = $('.SingleTaskPaneToolbar'),
            description = function() {
                return $(
                    '.SingleTaskPane-titleRow .simpleTextarea',
                    elem.parentNode
                ).textContent;
            },
            projectElement = $(
                '.SingleTaskPane-projects .TaskProjectPill-projectName',
                elem.parentNode
            );

        link = createTimerLink({
            className: 'asana-board',
            description: description,
            projectName: projectElement ? projectElement.textContent : '',
            buttonType: 'minimal'
        });

        link.style.marginRight = '5px';

        if (container) {
            var closeButton = container.lastElementChild;
            container.insertBefore(link, closeButton);
        }
    }
);
