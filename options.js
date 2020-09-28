function ghost(isDeactivated) {
    options.style.color = isDeactivated ? 'graytext' : 'black';
    // The label color.
    options.frequency.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function () {
    // Initialize the option controls.
    options.isActivated.checked = JSON.parse(localStorage.isActivated);
    // The display activation.
    options.frequency.value = localStorage.frequency;
    // The display frequency, in minutes.
    if (!options.isActivated.checked) {
        ghost(true);
    }
    // Set the display activation and frequency.
    options.isActivated.onchange = function () {
        localStorage.isActivated = options.isActivated.checked;
        ghost(!options.isActivated.checked);
    };
    options.frequency.onchange = function () {
        localStorage.frequency = options.frequency.value;
    };
});

var checkboxes = document.getElementsByClassName('permission-checkbox');
for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', function (event) {
        var site = this.getAttribute('data-site');
        var domain = "*://*." + site + "/*";
        var permission = {origins: [domain]};

        if (this.checked) {
            chrome.permissions.request(permission, function (result) {
                if (!result) {
                    this.checkboxes = false;
                    location.reload();
                }
            });
        }
        else {
            chrome.permissions.remove(permission, function (result) {});
        }
    });
}

chrome.permissions.getAll(function (results) {
    var checkboxes = document.getElementsByClassName('permission-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
        var site = checkboxes[i].getAttribute('data-site');
        var domain = "*://*." + site + "/*";
        if (results.origins.indexOf(domain) >= 0) {
            checkboxes[i].checked = true;
        }
    }
});