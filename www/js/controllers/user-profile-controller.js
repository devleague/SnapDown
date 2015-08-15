'use strict'
angular.module('starter')

.controller('user-profile-controller', function($scope,$localStorage,FacebookService,$http) {
	console.log('$localStorage.activeUserId',$localStorage.activeUserId);
	FacebookService.getUserFacebook().then(function(res){
		$scope.fb_user = res.data;
	});
	$scope.logout = FacebookService.logout;
});