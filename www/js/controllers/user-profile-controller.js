'use strict'
angular.module('starter')

.controller('user-profile-controller', function($scope,$localStorage,RegisterService,$http) {
	console.log('$localStorage.activeUserId',$localStorage.activeUserId);
	var userInfo = RegisterService.getUserFacebook($localStorage.activeUserId);
	// console.log('$localStorage.activeUserId',$localStorage.activeUserId);
	// console.log(userInfo);

});