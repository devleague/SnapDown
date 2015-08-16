'use strict'
angular.module('starter')

.controller('user-profile-controller', function($scope, ProviderService, $localStorage, FacebookService, $state, $http, UserStatsService) {

	FacebookService.getUserFacebook().then(function(res) {
		$scope.fb_user = res.data;
	});


	UserStatsService.getUserStats($localStorage.activeUserId)
		.success(function(res) {
			console.log('user stats', res);
		})
		.error(function(err) {
			console.log('err', err);
		});


	$scope.onSwipeRight = function() {
		$state.go('app.landing');
	}

	$scope.logout = function() {
		FacebookService.logout();
		$state.go('app.oauth')
	}

	$scope.update = function(email, password, phone, carrier) {
		console.log('email', email);
		console.log('password', password);
		console.log('phone', phone);
		console.log('carrier', carrier);
	}

	$scope.providers = [];
	ProviderService.getAllProviders()
		.success(function(res) {
			console.log('providers', res)
			$scope.providers = res;
		})
		.error(function(err) {
			console.log('err', err);
		})


});