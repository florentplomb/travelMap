'use strict';

var appMap = angular.module('travelMapApp');

appMap.controller('MapCtrl', function($scope, $state,$http) {

 $scope.markers = [];
 $scope.imgCompletUrl = "Flor";

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
            $scope.imgCompletUrl = "http://localhost:9000/api/images/"+value.imageId;
            $scope.markers.push({
                lng: Number(-+value.geometry.coordinates[1]), 
                lat: Number(value.geometry.coordinates[0]),
                message: '<div> <img style="float: left;" http-src="{{imgCompletUrl}}" width="20px"/> </div>',
                imageId: value.imageId});   
            console.log($scope.markers);
        });
    })
    .error(function(data) {
        alert(data);
    });



    })

appMap.directive('httpSrc', [
        '$http', function ($http) {
            var directive = {
                link: link,
                restrict: 'A'
            };
            return directive;

            function link(scope, element, attrs) {
                var requestConfig = {
                    method: 'Get',
                    headers: {kikou:"kikou" },
                    url: attrs.httpSrc,
                    responseType: 'arraybuffer',
                    cache: 'true'
                };

                $http(requestConfig)
                    .success(function(data) {
                        var arr = new Uint8Array(data);

                        var raw = '';
                        var i, j, subArray, chunk = 5000;
                        for (i = 0, j = arr.length; i < j; i += chunk) {
                            subArray = arr.subarray(i, i + chunk);
                            raw += String.fromCharCode.apply(null, subArray);
                        }

                        var b64 = btoa(raw);

                        attrs.$set('src', "data:image/jpeg;base64," + b64);
                    });
            }

        }
    ]);