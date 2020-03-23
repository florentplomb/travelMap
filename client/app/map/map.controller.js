'use strict';

var appMap = angular.module('travelMapApp');

appMap.config(function ($logProvider) {
    $logProvider.debugEnabled(false);
});


appMap.controller('MapCtrl', function ($scope, $state, $http, $filter, apiUrl, $uibModal) {


    $scope.markers = [];
    $scope.sideCard = {};

    $scope.loadingImg = true;


    $scope.london = {
        lat: 19.594725484073255,
        lng: -155.41534423828125,
        zoom: 8
    };

    $scope.layers = {
        baselayers: {
            sat: {
                name: 'Satellite',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                type: 'xyz'
            },
            osm: {
                name: 'OpenStreetMap',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
            }
        }
    }


    $http({
        method: 'GET',
        url: apiUrl + "/posts",
        headers: {
            'login_token': 'login YmVlcDpi'
        }
    })
        .success(function (posts) {
            $scope.rawPosts = posts;
            var postFocus;
            angular.forEach(posts, function (post, key) {
                $scope.markers.push({
                    lng: Number(-+post.geometry.coordinates[1]),
                    lat: Number(post.geometry.coordinates[0]),
                    focus: true,
                    icon: {
                        type: 'awesomeMarker',
                        icon: 'star',
                        markerColor: 'orange'
                    },
                    message: '<div class="clickable" ng-click="getPostSide(post._id)"> <img ng-src="{{apiUrl}}/images/{{post.properties.image[0].thumb}}" width="70px;"/> </div> ',
                    imageId: post.properties.imageId,
                    getMessageScope: function () {
                        var scope = $scope.$new();
                        scope.apiUrl = apiUrl;
                        scope.post = post;
                        return scope;
                    }
                });
                postFocus = post._id;
            });
            if (posts.length > 0) {
                
                $scope.getPostSide(postFocus);
            }

        })
        .error(function (data) {
            alert("No data provided");
        });


    $scope.getPostSide = function (postId) {
      
        var postFound = $filter('getById')($scope.rawPosts, postId);
        $scope.sideCard.image = apiUrl + "/images/" + postFound.properties.image[0]._id;
        $scope.sideCard.title = "Big Island";
        $scope.sideCard.subTitle = postFound.properties.subTitle;
        $scope.sideCard.message = postFound.properties.message;
        $scope.sideCard.user = "Florent";
        $scope.sideCard.date = postFound.properties.dateTaken;
        $scope.loadingImg = false;

        // console.log(postId);
        // console.log($scope.rawPosts);

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };



    /// Open Modal ///

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'app-modal-window',
            resolve: {
                sideCard: function () {
                    return $scope.sideCard;
                }
            }
        });


    }

});

appMap.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, sideCard) {
    console.log(sideCard);
    $scope.sideCard = sideCard;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});



// Filter pour chercher dans mon array de posts un post avec un certain ID

appMap.filter('getById', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (input[i]._id == id) {
                return input[i];
            }
        }
        return null;
    }
    
});

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
                headers: {},
                url: attrs.httpSrc,
                responseType: 'arraybuffer',
                cache: 'true'
            };
    
            $http(requestConfig)
                .success(function (data) {
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