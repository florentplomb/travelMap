'use strict';

var appUploadImg = angular.module('travelMapApp');

appUploadImg.controller('uploadImgCtrl', function($scope,Upload,$http,$timeout){


 $scope.uploadPic = function(file) {
  

var pic = $scope.picFile; 

console.log(pic);

EXIF.getData(file, function(){
      alert(EXIF.pretty(this));
    });  


  file.upload = Upload.upload({
    url: 'http://localhost:9000/api/posts',
    data: {username: $scope.username, file: file},
  });

  file.upload.then(function (response) {
    $timeout(function () {
      file.result = response.data;
    });
  }, function (response) {
    if (response.status > 0)
      $scope.errorMsg = response.status + ': ' + response.data;
  }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
}

    //  $scope.uploadVideo = function () {
    // var photo = document.getElementById("photo");
    // var file = photo.files[0];
    // var fd = new FormData();  //Create FormData object
    // fd.append('file', file);

    // $http.post('http://localhost:9000/api/posts', fd, {
    //     transformRequest: angular.identity,
    //     headers: {'Content-Type': undefined}
    //     }).success(function (data) {
    //         // Do your work
    //     });
 // };

  // $http({
  //   method: 'POST',
  //   data : {'username': 'hello'},
  //   url: 'http://localhost:9000/api/posts'
  // }).then(function successCallback(response) {
  //   console.log("ok");
  // }, function errorCallback(response) {

  //   console.log("error");
  // });

// $scope.uploadPic = function(file) {
//     file.upload = Upload.upload({
//       url: 'http://localhost:9000/api/posts',
//       file: file,
//       data: {username: $scope.username, file: file},
//     });

//     file.upload.then(function (response) {
//       $timeout(function () {
//         file.result = response.data;
//       });
//     }, function (response) {
//       if (response.status > 0)
//         $scope.errorMsg = response.status + ': ' + response.data;
//     }, function (evt) {
//       // Math.min is to fix IE which reports 200% sometimes
//       file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
//     });
//     }
})


