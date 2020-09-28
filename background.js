// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
"use strict";

function show() {
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    min = min > 9 ? min : '0' + min;
    new Notification(hour + ":" + min, {
        icon: 'img/logo.png',
        body: 'Vergeet niet je uren te registeren'
    });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 60;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
    // While activated, show notifications at the display frequency.
    if (JSON.parse(localStorage.isActivated)) { show(); }
    var interval = 0; // The display interval, in minutes.
    setInterval(function() {
        interval++;
        if (
            JSON.parse(localStorage.isActivated) &&
            localStorage.frequency <= interval
        ) {
            show();
            interval = 0;
        }
    }, 60000);
}

function stopTimer() {
    chrome.browserAction.setIcon({path: "img/logo-grey.png"});

    var link = document.querySelector('.timechimp-button');
    link.classList.remove('active');
    link.text = 'Start timer';
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == 'starttimer') {
            chrome.browserAction.setIcon({path: "img/logo.png"});
        }

        if (request.type == 'stoptimer') {
            chrome.browserAction.setIcon({path: "img/logo-grey.png"});
        }

        var token = null;

        var tokenStorage = localStorage.getItem('angular-cache.caches.userTimeChimp.data.login');
        if (tokenStorage) {
            var jsonToken = JSON.parse(tokenStorage);
            token = jsonToken.value.token;
        }

        sendResponse({token: token});
    });




