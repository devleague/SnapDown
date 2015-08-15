'use strict'
angular.module('starter')

.controller('user-profile-controller', function($scope,$localStorage,RegisterService,$http) {
	console.log('$localStorage.activeUserId',$localStorage.activeUserId);
	RegisterService.getUserFacebook().then(function(res){
		$scope.fb_user = res.data;
	});
});