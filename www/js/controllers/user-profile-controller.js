'use strict'
angular.module('starter')

.controller('user-profile-controller', function($scope,$localStorage,FacebookService,$state,$http, UserStatsService) {

	FacebookService.getUserFacebook().then(function(res){
		$scope.fb_user = res.data;
	});

  ////
  //
  //

  //need to set the user id and pass into the below function
  //
  //
  //
  // var user_id =

  UserStatsService.getUserStats(user_id)
    .success(function (res){
      console.log('user stats', res);
    })
    .error(function (err){
      console.log('err', err);
    })


  $scope.onSwipeRight = function() {
    $state.go('app.landing');
  }

	$scope.logout = function(){
		FacebookService.logout();
		$state.go('app.oauth')
	}
});