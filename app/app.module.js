(function() {
  "use strict";

  angular.module("app", [
    /*
     * Main modules
     */
    "app.core",
    "app.data",
    /*
     * Feature modules t
     */
    "app.auth",
    "app.time",
    "app.widgets"
  ]);
})();
