'use strict';

angular.module('travelMapApp', ['travelMapApp.auth', 'travelMapApp.admin', 'travelMapApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'validation.match','leaflet-directive'
    ,'ngFileUpload','ui.bootstrap'
  ])
  .config(function($urlRouterProvider, $locationProvider,$httpProvider) {

  	
    $httpProvider.defaults.headers.get = { 'Florent' : '27ans' }; // test ok pour le header!

    $urlRouterProvider.otherwise('/map');


    $locationProvider.html5Mode(true);
  });
