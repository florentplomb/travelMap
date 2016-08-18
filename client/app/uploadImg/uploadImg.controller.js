'use strict';

var appUploadImg = angular.module('travelMapApp');

appUploadImg.controller('uploadImgCtrl', function($scope,Upload,$http,$timeout,apiUrl){

$scope.uplPost = {};
$scope.uplPost.title = "titleloo";
$scope.uplPost.subTitle = "subbbtille";
$scope.uplPost.message = "messs2";


$scope.$watch($scope.picFile, function(){
    console.log($scope.picFile);
});



 $scope.uploadPic = function(file) {

 
  EXIF.getData(file, function(){

    var lati = EXIF.getTag(this, "GPSLatitude");
    var longi = EXIF.getTag(this, "GPSLongitude");

    if (!lati || !longi) {
      $scope.lat = $scope.latIn;
      $scope.lng = $scope.lngIn;

    } else {

    $scope.lat = toDecimal(EXIF.getTag(this, "GPSLatitude"));
    $scope.lng = toDecimal(EXIF.getTag(this, "GPSLongitude"));
    }

 

    $scope.uplPost.dateTaken = EXIF.getTag(this, "DateTimeOriginal");
 
   
   console.log($scope.lng);
   
  
    file.upload = Upload.upload({
      url: apiUrl+"/posts",
      data: {title: $scope.uplPost.title , subTitle: $scope.uplPost.subTitle, dateTaken : $scope.uplPost.dateTaken
      ,message : $scope.uplPost.message, lat : $scope.lat, lng: $scope.lng , file: file},
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


