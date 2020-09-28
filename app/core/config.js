(function() {
  "use strict";

  var core = angular.module("app.core");
  var browserLanguage = navigator.language;
  browserLanguage = browserLanguage.substring(browserLanguage.indexOf("-") + 1);

  var config = {
    version: "1.0.0",
    appErrorPrefix: "[TimeChimp Error] ",
    appTitle: "TimeChimp",
    appLanguage: browserLanguage,
    appApiUrl: "https://app.timechimp.com/api/",
    appTokenUrl: "https://app.timechimp.com/token"
  };

  console.log(config);
  core.value("config", config);

  core.config(configure);

  configure.$inject = [
    "$httpProvider",
    "$translateProvider",
    "uiSelectConfig",
    "RestangularProvider"
  ];

  function configure(
    $httpProvider,
    $translateProvider,
    uiSelectConfig,
    RestangularProvider
  ) {
    configureAuth();
    configureRestangular();
    configureLocales();
    configureUISelect();

    function configureAuth() {
      $httpProvider.interceptors.push("authInterceptor");
    }

    function configureRestangular() {
      RestangularProvider.setBaseUrl(config.appApiUrl);
      RestangularProvider.setErrorInterceptor(function(resp) {
        var $log = angular.injector(["ng"]).get("$log");
        $log.debug(resp);
      });
    }

    function configureLocales() {
      var userLanguage = document.documentElement.getAttribute("user-language");
      if (userLanguage) {
        config.appLanguage = userLanguage;
      }

      moment.locale(config.appLanguage, {
        week: {
          dow: 1,
          doy: 4
        }
      });

      $translateProvider
        .useStaticFilesLoader({
          prefix: "i18n/locale-",
          suffix: ".json?v=44"
        })
        .preferredLanguage(config.appLanguage)
        .fallbackLanguage("en");
    }

    function configureUISelect() {
      uiSelectConfig.theme = "bootstrap";
    }
  }
})();
