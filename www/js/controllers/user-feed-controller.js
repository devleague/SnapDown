angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, $state) {

  $scope.getMyChallenges = function (){
    ChallengeService.getMyChallenges()
      .success(function (res){
        console.log('my challenges', res);
      })
      .error(function (err){
        console.log('err w/ showing challeges', err);
      })
  }

  $scope.onSwipeLeft = function() {
    $state.go('app.landing');
  }
});
