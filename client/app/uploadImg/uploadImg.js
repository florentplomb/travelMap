'use strict';

angular.module('travelMapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('uploadImg', {
        url: '/uploadImg',
        templateUrl: 'app/uploadImg//uploadImg.html'
      });
  });
