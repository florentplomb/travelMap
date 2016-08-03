'use strict';

var appUploadImg = angular.module('travelMapApp');

appUploadImg.controller('uploadImgCtrl', function($scope,Upload,$http,$timeout){


 $scope.uploadPic = function(file) {

  EXIF.getData(file, function(){

    $scope.lat = toDecimal(EXIF.getTag(this, "GPSLatitude"));
    $scope.lng = toDecimal(EXIF.getTag(this, "GPSLongitude"));
   
    file.upload = Upload.upload({
      url: 'http://localhost:9000/api/posts',
      data: {imgMessage: $scope.imgMessage, lat : $scope.lat, lng: $scope.lng , file: file},
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

  });  

  var toDecimal = function (number) {
    return number[0].numerator + number[1].numerator /
    (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
  };


}

})


