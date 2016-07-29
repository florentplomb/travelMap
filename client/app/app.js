'use strict';

angular.module('travelMapApp', ['travelMapApp.auth', 'travelMapApp.admin', 'travelMapApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match','leaflet-directive'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
