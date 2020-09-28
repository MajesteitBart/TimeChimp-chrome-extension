
'use strict';

// Basecamp Next
render('section.todos li.todo:not(.timechimp)', {observe: true}, function (elem) {
    var link, behavior = 'hover_content',
        container = $('.wrapper', elem), spanTag,
        projectFunc;

    if (container === null) {
        return;
    }

    projectFunc = function () {
        var p = $(".project > title") || $(".project > header > h1 > a");
        return p ? p.textContent : "";
    };

    link = createTimerLink({
        appName: 'Basecamp',
        className: 'basecamp',
        description: $('.content_for_perma', elem).textContent,
        projectName: projectFunc
    });

    link.setAttribute('data-behavior', behavior);
    link.addEventListener('click', function (e) {
        if (link.getAttribute('data-behavior') === '') {
            link.setAttribute('data-behavior', behavior);
        } else {
            link.setAttribute('data-behavior', '');
        }
    });

    spanTag = document.createElement("span");
    container.appendChild(spanTag.appendChild(link));
});


// Basecamp Classic
render('.items_wrapper .item > .content:not(.timechimp)', {observe: true}, function (elem) {
    var link, behavior = 'selectable_target', spanTag;

    link = createTimerLink({
        appName: 'Basecamp',
        className: 'basecamphq',
        description: elem.querySelector('span.content > span').textContent.trim(),
        projectName: (!!$(".project")) ? ($(".project > title") || $(".project > header > h1 > a")).textContent : ""
    });

    link.setAttribute('data-behavior', '');
    link.addEventListener('click', function (e) {
        if (link.getAttribute('data-behavior') === '') {
            link.setAttribute('data-behavior', behavior);
        } else {
            link.setAttribute('data-behavior', '');
        }
    });

    spanTag = document.createElement("span");
    $(".content", elem).appendChild(spanTag.appendChild(link));
});


// Basecamp 3
render('.todos li.todo:not(.timechimp):not(.completed)', {observe: true}, function (elem) {
    var link, project,
        description,
        parent = $('.checkbox__content', elem);


    description = parent.childNodes[1].textContent.trim();
    project = $('#a-breadcrumb-menu-button');
    project = project ? project.textContent : "";

    link = createTimerLink({
        appName: 'Basecamp',
        className: 'basecamp3',
        description: description,
        projectName: project
    });

    parent.appendChild(link);
});