'use strict';

var appMap = angular.module('travelMapApp');

appMap.controller('MapCtrl', function($scope, $state,$http) {

 $scope.markers = [];

 $scope.london = {
    lat: 19.594725484073255,
    lng: -155.41534423828125,
    zoom: 9
};

    //    $scope.markers = {
    //     m1: {
    //         lat: 19.670814500000002,
    //         lng: -156.02723691666668,
    //         focus: false,
    //         draggable: false,
    //         message: "Hi there!", // <div ng-click="goDetail(flower._id)"><img style="float: left;" src="img/flower8.png" width="20px"/> <p>{{flower.properties.espece.NOMC}} <p style="font-style:italic; line-height: 24px;" ng-hide="flower.properties.espece.NOMC"> Indéfinie </p>  </p><img align="center" ng-src="{{urlImgID+flower.properties.image}}" style="margin-top: -12px;" width="90px"/><a style="display:block; text-align:center;" id="popuplf class="button icon-right ion-android-arrow-dropright">Details</a></div>
    //         icon: {}
    //     }
    // }

    $http({
        method: 'GET',
        url: "http://localhost:9000/api/posts",
        headers: {
            'login_token': 'login YmVlcDpi'
        }
    })
    .success(function(data) {

        $scope.rawMarkers = data;
        console.log("rawmaker:" + data);
        angular.forEach(data, function(value, key) {
            $scope.markers.push({
                lng: Number(-+value.geometry.coordinates[1]), 
                lat: Number(value.geometry.coordinates[0]),
                message: value._id});   
            console.log($scope.markers);
        });
    })
    .error(function(data) {
        error(data);
    });



    // *** get markers *** //

    // flowersService.getflowers(function(err, flowers) {
    //     if (err) {

    //         $ionicLoading.hide();
    //         $scope.showAlert("Publication indisponible");
    //         $scope.error = err;

    //     } else {

    //         angular.forEach(flowers, function(flower) {


    //             $scope.urlImgID = apiUrl + "/images/";

    //             $scope.markers.push({
    //                 lng: parseFloat(flower.geometry.coordinates[0]),
    //                 lat: parseFloat(flower.geometry.coordinates[1]),
    //                 id: flower._id,
    //                 icon: flowerIcon,
    //                 group: 'yverdon',
    //                 message: '<div ng-click="goDetail(flower._id)"><img style="float: left;" src="img/flower8.png" width="20px"/> <p>{{flower.properties.espece.NOMC}} <p style="font-style:italic; line-height: 24px;" ng-hide="flower.properties.espece.NOMC"> Indéfinie </p>  </p><img align="center" ng-src="{{urlImgID+flower.properties.image}}" style="margin-top: -12px;" width="90px"/><a style="display:block; text-align:center;" id="popuplf class="button icon-right ion-android-arrow-dropright">Details</a></div>',

    //                 getMessageScope: function() {
    //                     var scope = $scope.$new();
    //                     scope.flower = flower;
    //                     return scope;
    //                 }

    //             });

    //         })
    //     }

    // });


})



// (function(){

// class MapComponent {
//   constructor() {
//     this.message = 'Hello';
//   }
// }

// angular.module('travelMapApp')
//   .component('map', {
//     templateUrl: 'app/map/map.html',
//     controller: MapComponent,
//     controllerAs: 'mapCtrl'
//   });

// })();