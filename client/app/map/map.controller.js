'use strict';

var appDetails = angular.module('travelMapApp');

appDetails.controller('MapCtrl', function($scope,$state) {

	$scope.london = {
		lat: 51.505,
		lng: -0.09,
		zoom: 4
	};
	$scope.markers = {
		m1: {
			lat: 51.505,
			lng: -0.09,
			focus: true,
			draggable: false,
			message: "Hi there!",
			icon: {}
		}
	}



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
