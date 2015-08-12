angular.module('starter')

.controller('challenge-in-progress-controller', function($scope, ChallengeService, $state, $ionicGesture) {

  $scope.getChallengeUsers = function (){
    ChallengeService.getChallengeUsers()
      .success(function (res){
        console.log('challenge users', res);
      })
      .error(function (err){
        console.log('err w/ challenge users', err);
      })
  }

  //Can be used to validate if the user sent in a picture.
  //if so, display greyed out version
  $scope.getChallengePics = function (){
    PictureService.getChallengePics()
      .success(function (res){
        console.log('challenge pictures', res);
      })
      .error(function (err){
        console.log('err w/challenge pics', err);
      })
  }

  $scope.getTimeRemaining = function (){
    ChallengeService.getTimeRemaining()
      .success(function (res){
        console.log('time remaining', res);
      })
      .error(function (err){
        console.log('err w/ time remaining', err);
      })
  }

  $scope.onSwipeRight = function() {
      $state.go('app.landing');
  }



});