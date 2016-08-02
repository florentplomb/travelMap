'use strict';

var appUploadImg = angular.module('travelMapApp');

appUploadImg.controller('uploadImgCtrl', function($scope , $state,Upload, $timeout,$http){


  $http({
    method: 'POST',
    data : {'username': 'hello'},
    url: 'http://localhost:9000/api/posts'
  }).then(function successCallback(response) {
    console.log("ok");
  }, function errorCallback(response) {

    console.log("error");
  });
  // $scope.uploadPic = function(file) {
  //   file.upload = Upload.upload({
  //     url: 'http://localhost:9000/api/posts',
  //     headers : {
  //       'Content-Type': file.type
  //     },
  //    data: {'username' : $scope.username, 'file': file},
  //   });
  //   file.upload.then(function (response) {
  //     $timeout(function () {
  //       file.result = response.data;
  //     });
  //   }, function (response) {
  //     if (response.status > 0)
  //       $scope.errorMsg = response.status + ': ' + response.data;
  //   }, function (evt) {
  //     // Math.min is to fix IE which reports 200% sometimes
  //     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  //   });
  // }
})


