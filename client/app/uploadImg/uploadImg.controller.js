'use strict';

var appUploadImg = angular.module('travelMapApp');

appUploadImg.controller('uploadImgCtrl', function($scope,Upload,$http,$timeout,apiUrl){

  $scope.uplPost = {};
  $scope.uplPost.title = "Big Island";
  $scope.uplPost.subTitle = "subbbtille";
  $scope.uplPost.message = "messs2";

  var toDecimal = function (number) {
    return number[0].numerator + number[1].numerator /
    (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
  };

  $scope.change = function(file) { 
   $scope.lat = 0;
   $scope.lng = 0;
   if (!file) return;

   EXIF.getData(file, function(){ 


     if (EXIF.getTag(this, "GPSLatitude") && EXIF.getTag(this, "GPSLongitude")) {
      $scope.lat = toDecimal(EXIF.getTag(this, "GPSLatitude"));
      $scope.lng = toDecimal(EXIF.getTag(this, "GPSLongitude"));
      $scope.uplPost.dateTaken = EXIF.getTag(this, "DateTimeOriginal"); 
    }



    //  if (!lati || !longi) {
    //   $scope.lat = $scope.latIn;
    //   $scope.lng = $scope.lngIn;

    // } else {

    //   $scope.lat = toDecimal(EXIF.getTag(this, "GPSLatitude"));
    //   $scope.lng = toDecimal(EXIF.getTag(this, "GPSLongitude"));
    // }

    // $scope.uplPost.dateTaken = EXIF.getTag(this, "DateTimeOriginal"); 
  }); 



 };


 $scope.uploadPic = function(file) {


    console.log($scope.lng);

    console.log(file);

    file.upload = Upload.upload({
      url: apiUrl+"/posts",
      data: {title: $scope.uplPost.title , subTitle: $scope.uplPost.subTitle, dateTaken : $scope.uplPost.dateTaken
        ,message : $scope.uplPost.message, lat : $scope.lat, lng: $scope.lng , file: file },
      });

    file.upload.then(function (response) {
      $timeout(function () {
        //file.result = response.data;
        console.log(response.data)
        $scope.imgThumbId = response.data.properties.image[0];
        console.log($scope.imgThumbId);
      })
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });

    }

    $scope.uploadThumb = function(file) { 

          file.upload = Upload.upload({
      url: apiUrl+"/images/thumb",
      data: {imgThumbId:$scope.imgThumbId , file: file },
      });

    file.upload.then(function (response) {
      $timeout(function () {
        //file.result = response.data;
        console.log(response.data)
      })
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
  })


