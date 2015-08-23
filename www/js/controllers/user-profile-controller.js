'use strict'
angular.module('starter')

.controller('user-profile-controller', function($scope, ProviderService, $localStorage, FacebookService, $state, $http, UserStatsService) {

	FacebookService.getUserFacebook().then(function (res) {
		$scope.fb_user = res.data;
	});

	$scope.logout = function() {
		FacebookService.logout();
		$state.go('app.oauth')
	}

	$scope.onSwipeRight = function() {
		$state.go('app.landing');
	}

	// UserStatsService.getUserStats($localStorage.activeUserId)
	// 	.success(function(res) {

	// 	})
	// 	.error(function(err) {

	// 	});


	// $scope.update = function(phone, carrier) {
	// 	var updatedFields = {};
	// 	if(phone || carrier){

	// 	}
	// }

	// $scope.providers = [];
	// ProviderService.getAllProviders()
	// 	.success(function(res) {

	// 		$scope.providers = res;
	// 	})
	// 	.error(function(err) {

	// 	})
});