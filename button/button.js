var time;
var params;

//////

function render(selector, opts, renderer, mutationSelector) {
    if (opts.observe) {
        var observer = new MutationObserver(function (mutations) {
            var matches = mutations.filter(function (mutation) {
                return mutation.target.matches(mutationSelector);
            });
            if (!!mutationSelector && !matches.length) {
                return;
            }

            renderTo(selector, renderer);
        });
        observer.observe(document, {childList: true, subtree: true});
    }
    renderTo(selector, renderer);
};

function renderTo(selector, renderer) {
    var i, len, elems = document.querySelectorAll(selector);
    for (i = 0, len = elems.length; i < len; i += 1) {
        elems[i].classList.add('timechimp');
    }
    for (i = 0, len = elems.length; i < len; i += 1) {
        renderer(elems[i]);
    }
}

function $(s, elem) {
    elem = elem || document;
    return elem.querySelector(s);
}

function createTag(name, className, textContent) {
    var tag = document.createElement(name);
    tag.className = className;

    if (textContent) {
        tag.textContent = textContent;
    }

    return tag;
}

function createLink(className, tagName, linkHref, buttonType) {
    var link;

    tagName = tagName || 'a';
    linkHref = linkHref || '#';
    link = createTag(tagName, className);

    if (tagName === 'a') {
        link.href = linkHref;
    }
    if (buttonType !== 'minimal') {
        link.appendChild(document.createTextNode('Start timer'));
    }
    return link;
}

function createTimerLink(params) {
    var link = createLink('timechimp-button ' + params.className, null, null, params.buttonType);

    chrome.runtime.sendMessage({type: "timer"}, function (response) {

        if (!response.token) {
            link.parentNode.removeChild(link);
        }

        ajax('time/timer', response.token, {
            method: 'GET',
            payload: null,
            onLoad: function (xhr) {
                if (xhr && xhr.response) {
                    time = JSON.parse(xhr.response);
                    var appNotes = isFunction(params.description) ? params.description() : params.description;
                    if (time && time.notes == appNotes) {
                        link.classList.add('active');

                        if (params.buttonType !== 'minimal') {
                            link.text = 'Stop timer';
                        }
                    }
                }
                createClickEvent(link, params);
            },
            onError: function (xhr) {
                // error
            }
        });
    });

    return link;
}

function createClickEvent(link, params) {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.type == 'stopbuttontimer') {
                link.classList.remove('active');

                if (params.buttonType !== 'minimal') {
                    link.text = 'Start timer';
                }
            }
        });


    link.addEventListener('click', function (e) {
        var opts;
        e.preventDefault();
        e.stopPropagation();
        link = e.target;

        if (link.classList.contains('active')) {
            // stop
            link.classList.remove('active');

            if (params.buttonType !== 'minimal') {
                link.text = 'Start timer';
            }

            chrome.runtime.sendMessage({type: "stoptimer"}, function (response) {
                // Stop timer
                ajax('time/stoptimer/' + time.id, response.token, {
                    method: 'POST',
                    payload: null,
                    onLoad: function (xhr) {
                        // success
                    },
                    onError: function (xhr) {
                        // error
                    }
                });
            });
        } else {
            // start
            link.classList.add('active');

            if (params.buttonType !== 'minimal') {
                link.text = 'Stop timer';
            }

            chrome.runtime.sendMessage({type: "starttimer"}, function (response) {
                // create time

                ajax('time', response.token, {
                    method: 'POST',
                    payload: {
                        date: new Date(),
                        userId: null,
                        notes: isFunction(params.description) ? params.description() : params.description,
                        externalUrl: window.location.href,
                        externalName: params.appName
                    },
                    onLoad: function (xhr) {
                        time = JSON.parse(xhr.response);

                        // Start timer
                        ajax('time/starttimer/' + time.id, response.token, {
                            method: 'POST',
                            payload: null,
                            onLoad: function (xhr) {
                                // success
                            },
                            onError: function (xhr) {
                                // error
                            }
                        });
                    },
                    onError: function (xhr) {
                        // error
                    }
                });
            });

            //openPopup();
            // link.addEventListener("click", function() {
            //     open('app/index.html');
            // }, true);
        }

        return false;
    });
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function ajax(url, token, opts) {
    var xhr = new XMLHttpRequest(),
        method = opts.method || 'GET',
        baseUrl = opts.baseUrl || 'https://app.timechimp.com/api/',
        resolvedUrl = baseUrl + url,
        token = token;

    xhr.open(method, resolvedUrl, true);

    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.setRequestHeader('Content-Type', 'application/json');

    if (opts.onError) {
        xhr.addEventListener('error', function () {
            opts.onError(xhr);
        });
    }
    if (opts.onLoad) {
        xhr.addEventListener('load', function () {
            opts.onLoad(xhr);
        });
    }
    if (opts.mime) {
        xhr.overrideMimeType("application/json");
    }
    xhr.send(JSON.stringify(opts.payload));
};
