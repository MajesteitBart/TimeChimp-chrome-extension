(function () {
  "use strict";

  angular.module("app.time").controller("Time", Time);

  Time.$inject = [
    "datacontext",
    "common",
    "$timeout",
    "$q",
    "$translate",
    "authService",
    "$state",
    "currentUser",
  ];

  function Time(
    datacontext,
    common,
    $timeout,
    $q,
    $translate,
    authService,
    $state,
    currentUser
  ) {
    var vm = this;

    vm.loading = false;
    vm.time = {};
    vm.allProjects = [];
    vm.projects = [];
    vm.project = {};
    vm.customers = [];
    vm.customer = {};
    vm.tasks = [];
    vm.projectTasks = [];
    vm.allProjectTasks = [];
    vm.tags = [];
    vm.currentUser = {};
    vm.projectRequired = false;
    vm.taskRequired = false;
    vm.hasProjectsApp = true;
    vm.errorMessage = "";

    vm.hasApp = hasApp;
    vm.calculateTime = calculateTime;
    vm.stopTimer = stopTimer;
    vm.addTime = addTime;
    vm.taskIsBillable = taskIsBillable;
    vm.selectProject = selectProject;
    vm.selectCustomer = selectCustomer;
    vm.selectProjectTask = selectProjectTask;
    vm.selectTask = selectTask;
    vm.addTag = addTag;
    vm.deleteTag = deleteTag;
    vm.selectTag = selectTag;
    vm.getTagName = getTagName;
    vm.logout = logout;
    vm.hasValidProjectDates = hasValidProjectDates;

    init();

    ////////////////

    function init() {
      vm.time.date = moment().toDate();

      datacontext.task.getUISelect().then(function (data) {
        vm.tasks = data;
      });

      setCurrentUser();
      setTags();
    }

    function setCurrentUser() {
      vm.loading = true;

      var defer = $q.defer();
      var login = currentUser.getLogin();

      datacontext.projectTask
        .getUISelectByUser(login.username)
        .then(function (data) {
          vm.allProjectTasks = data;
        });

      var q1 = datacontext.project
        .getUISelectByUser(login.username)
        .then(function (data) {
          vm.allProjects = data;
          vm.projects = data;
        });

      var q2 = datacontext.customer
        .getUISelect(login.username)
        .then(function (data) {
          vm.customers = data;
        });

      var q3 = datacontext.user.getCurrentUser().then(function (data) {
        vm.currentUser = data;
      });

      var q4 = datacontext.timer.getTimer().then(function(data) {
        vm.timer = data;
      });

      $q.all([q1, q2, q3, q4]).then(function () {
        if (vm.currentUser.projectRequired) {
          vm.customers = _.filter(vm.customers, function (customer) {
            return _.findWhere(vm.allProjects, { customerId: customer.id });
          });
        }

        if (vm.timer) {
          chrome.browserAction.setIcon({ path: "img/logo.png" });
        } else {
          chrome.browserAction.setIcon({ path: "img/logo-grey.png" });
        }

        vm.loading = false;
      });
    }

    function setTags() {
      datacontext.tag.getByType(1).then(function (data) {
        vm.allTags = data;
        vm.tags = _.filter(data, function (t) {
          return t.active;
        });
      });
    }

    function addTime(isValid, timer) {
      vm.submitted = true;

      if (isValid && hasValidProjectDates()) {
        vm.submitted = false;
        vm.loading = true;
        vm.hideButtons = true;

        if (!timer) {
          setStartEnd();
        } else {
          vm.time.startEnd = null;
        }

        vm.time.date = common.toUtcMoment(moment(vm.time.date)).toDate();
        vm.time.userId = vm.currentUser.id;

        datacontext.time.create(vm.time).then(function (data) {
          if (timer) {
            datacontext.timer.start(data.id).then(function(startTime) {
              vm.loading = false;
              vm.saved = true;

              $timeout(function () {
                chrome.browserAction.setIcon({ path: "img/logo.png" });
                window.close();
              }, 500);
            });
          } else {
            vm.loading = false;
            vm.saved = true;

            $timeout(function () {
              window.close();
            }, 500);
          }
        });
      }
    }

    function stopTimer() {
      vm.loading = true;
      vm.hideButtons = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "stopbuttontimer" },
          function (response) {
            chrome.browserAction.setIcon({ path: "img/logo-grey.png" });
          }
        );
      });

      datacontext.timer.stop(vm.timer.id).then(function() {
        vm.loading = false;
        vm.saved = true;

        $timeout(function () {
          window.close();
        }, 500);
      });
    }

    function setStartEnd() {
      if (vm.time.startTime && vm.time.endTime) {
        calculateTime();

        var startTimeMoment = moment(vm.time.startTime, "HH:mm");
        var startTime = startTimeMoment.isValid()
          ? startTimeMoment.format("HH:mm")
          : null;

        var endTimeMoment = moment(vm.time.endTime, "HH:mm");
        var endTime = endTimeMoment.isValid()
          ? endTimeMoment.format("HH:mm")
          : null;

        if (startTime && endTime) {
          vm.time.startEnd = startTime + "-" + endTime;
        }
      } else if (vm.time.startTime) {
        var startTimeMoment = moment(vm.time.startTime, "HH:mm");
        var startTime = startTimeMoment.isValid()
          ? startTimeMoment.format("HH:mm")
          : null;

        if (startTime) {
          vm.time.startEnd = startTime + "-";
        }
      } else if (vm.time.endTime) {
        var endTimeMoment = moment(vm.time.endTime, "HH:mm");
        var endTime = endTimeMoment.isValid()
          ? endTimeMoment.format("HH:mm")
          : null;

        if (endTime) {
          vm.time.startEnd = "-" + endTime;
        }
      } else {
        vm.time.startEnd = null;
      }
    }

    function taskIsBillable(item) {
      if (item.billable == -1) {
        return "";
      } else if (item.billable) {
        return $translate.instant("REGISTRATION.BILLABLE");
      } else {
        return $translate.instant("REGISTRATION.NOT_BILLABLE");
      }
    }

    function addTag() {
      if (!vm.searchTag) {
        vm.searchTagError = true;
        return;
      } else {
        vm.searchTagError = false;
      }

      var timeTagAlreadyExists = _.some(vm.allTags, function (t) {
        return t.active && t.name == vm.searchTag;
      });

      if (timeTagAlreadyExists) {
        logger.info("Label bestaat al");
        return;
      }

      if (!vm.time.tagIds) {
        vm.time.tagIds = [];
      }

      var tag = {
        active: true,
        type: 1,
        name: vm.searchTag,
      };

      datacontext.tag.create(tag).then(function (data) {
        vm.time.tagIds.push(data.id);
        vm.allTags.push(data);
      });

      vm.searchTag = "";
    }

    function deleteTag(tagId) {
      vm.time.tagIds = _.without(vm.time.tagIds, tagId);
      var tag = _.findWhere(vm.allTags, { id: tagId });
      vm.tags.push(tag);
    }

    function selectTag(tag) {
      if (!vm.time.tagIds) {
        vm.time.tagIds = [];
      }

      var timeTagAlreadyExists = _.contains(vm.time.tagIds, tag.id);
      if (!timeTagAlreadyExists) {
        vm.time.tagIds.push(tag.id);
      }

      vm.tags = _.without(vm.tags, tag);
    }

    function getTagName(tagId) {
      var tag = _.findWhere(vm.allTags, { id: tagId });
      if (tag) {
        return tag.name;
      }
      return "";
    }

    function selectProject(project) {
      if (project) {
        vm.time.customerId = project.customerId;

        vm.project = project;

        vm.projectTasks = _.filter(vm.allProjectTasks, function (pt) {
          return pt.projectId == vm.project.id;
        });

        vm.time.projectTaskId = null;

        vm.projects = _.filter(vm.allProjects, function (p) {
          return p.customerId == vm.time.customerId;
        });
      } else {
        vm.time.taskId = null;
        vm.time.projectTaskId = null;
        vm.time.projectId = null;
        vm.project = null;

        vm.projects = _.filter(vm.allProjects, function (p) {
          return p.customerId == vm.time.customerId;
        });
      }
    }

    function selectCustomer(customer) {
      if (customer) {
        vm.customer = customer;
        vm.time.customerId = customer.id;
        vm.time.projectId = null;
        vm.time.projectTaskId = null;
        vm.time.taskId = null;

        vm.projects = _.filter(vm.allProjects, function (p) {
          return p.id == -1 || p.customerId == customer.id;
        });
      } else {
        vm.customer = null;
        vm.time.projectId = null;
        vm.time.projectTaskId = null;
        vm.time.taskId = null;

        vm.projects = vm.allProjects;
      }
    }

    function selectTask(task) {
      if (task && task.id == -1) {
        vm.time.taskId = null;
      }
    }

    function selectProjectTask(projectTask) {
      if (projectTask && projectTask.id == -1) {
        vm.time.projectTaskId = null;
      }
    }

    function calculateTime() {
      var startTime = moment(vm.time.startTime, "HH:mm");
      var endTime = moment(vm.time.endTime, "HH:mm");

      if (startTime.isValid()) {
        vm.time.startTime = startTime.format("HH:mm");
      }

      if (endTime.isValid()) {
        vm.time.endTime = endTime.format("HH:mm");
      }

      if (startTime.isValid() && endTime.isValid()) {
        var diff = endTime.diff(startTime, "minutes");

        if (diff < 0) {
          diff = 24 * 60 + diff;
        }

        var hours = parseFloat(diff / 60);

        if (vm.time.pause) {
          var pauseTime = common.formatToTime(vm.time.pause);
          var pauseFloat = common.formatTimeToFloat(pauseTime);
          var pause = Math.abs(pauseFloat);

          vm.time.pause = pause;
          vm.time.hours = hours - pause;
        } else {
          vm.time.hours = hours;
        }
      }
    }

    function hasValidProjectDates() {
      vm.errorMessage = null;
      console.log(vm.errorMessage);

      var project = _.findWhere(vm.projects, { id: vm.time.projectId });
      if (project) {
        if (project.startDate) {
          if (moment(project.startDate).isAfter(moment(vm.time.date), "days")) {
            vm.errorMessage =
              "De begindatum van dit project is nog niet begonnen, je kan nog geen uren registreren.";
            console.log(vm.errorMessage);
            return false;
          }
        }

        if (project.endDate) {
          if (moment(project.endDate).isBefore(moment(vm.time.date), "days")) {
            vm.errorMessage =
              "De eindatum van dit project is verstreken, je kan geen uren meer registreren.";
            console.log(vm.errorMessage);
            return false;
          }
        }
      }

      return true;
    }

    function hasApp(code) {
      if (vm.currentUser) {
        return _.contains(vm.currentUser.companyApps, code);
      }
      return false;
    }

    function logout() {
      authService.logout();
      $state.go("login");
    }
  }
})();
