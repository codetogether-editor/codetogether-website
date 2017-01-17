require("angular");
require("angular-animate");
require("angular-aria");
require("angular-messages");
require("angular-material");
require("angular-material/angular-material.min.css");
require("angular-ui-ace/ui-ace.js");
require("angular-ui-router");
require("angular-resource");
require("satellizer");
require("ng-notify/dist/ng-notify.min.js");
require("ng-notify/dist/ng-notify.min.css");
require("logootSplit/logootsplit.js");

module.exports = angular.module('codeTogether', ['ngMaterial', 'ui.ace', 'ui.router', 'satellizer', 'ngNotify', 'ngResource']);
