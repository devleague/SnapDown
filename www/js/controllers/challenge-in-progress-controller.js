angular.module('starter')

.controller('challenge-in-progress-controller', function($scope, ChallengeService, $state, $ionicGesture, $ionicModal,$ionicPlatform, DataSharingService) {

  var challenge = DataSharingService.activeChallenge;
  console.log(challenge);

  //Can be used to validate if the user sent in a picture.
  //if so, display greyed out version
  $scope.getChallengeContext = function (challenge_id){
    ChallengeService.getChallengeContext()
      .success(function (res){
        console.log('challenge context', res);
      })
      .error(function (err){
        console.log('err w/challenge context', err);
      })
  }

  $ionicPlatform.ready(function() {
    $scope.getChallengeContext();
  });

  // $scope.getTimeRemaining = function (){
  //   ChallengeService.getTimeRemaining()
  //     .success(function (res){
  //       console.log('time remaining', res);
  //     })
  //     .error(function (err){
  //       console.log('err w/ time remaining', err);
  //     })
  // }

  $ionicModal.fromTemplateUrl('edit-profile-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };


  $scope.onSwipeRight = function() {
      $state.go('app.landing');
  }



});