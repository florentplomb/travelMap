'use strict';

angular.module('travelMapApp.auth', ['travelMapApp.constants', 'travelMapApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
