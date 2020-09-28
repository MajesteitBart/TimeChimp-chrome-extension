'use strict';

// Whole note
render('.IZ65Hb-TBnied:not(.timechimp)', {observe: true}, function (elem) {
    var link,
        toolbar = $('.IZ65Hb-INgbqf', elem),
        description = $('.IZ65Hb-YPqjbf:not(.LwH6nd)', elem).textContent,
        tagFunc;

    tagFunc = function () {
        var index,
            tags = [],
            tagItems = $('.IZ65Hb-x00ATb', elem).children;

        for (index in tagItems) {
            if (tagItems.hasOwnProperty(index)) {
                tags.push(tagItems[index].textContent);
            }
        }
        return tags;
    };

    link = createTimerLink({
        appName: 'Google-Keep',
        className: 'keep',
        buttonType: 'minimal',
        description: description,
        tags: tagFunc
    });
    toolbar.appendChild(link);
});

// Checklist inside a note
render('.IZ65Hb-TBnied .gkA7Yd-sKfxWe .CmABtb.RNfche:not(.timechimp)', {observe: true}, function (elem) {
    var link,
        position = $('.IZ65Hb-MPu53c-haAclf', elem),
        description = elem.textContent;

    link = createTimerLink({
        className: 'keep',
        buttonType: 'minimal',
        description: description
    });
    position.appendChild(link);
});
