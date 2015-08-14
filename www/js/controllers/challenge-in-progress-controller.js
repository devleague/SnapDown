angular.module('starter')

.controller('challenge-in-progress-controller', function($scope, ChallengeService, $state, $ionicGesture, $ionicModal,$ionicPlatform, DataSharingService, Countdown) {

  $scope.allChallengers = [];
  var challenge = DataSharingService.activeChallenge;
  var challengeId = DataSharingService.activeChallenge.id;
  console.log('challengeId', challengeId);
  console.log('countdown',Countdown)

  //Can be used to validate if the user sent in a picture.
  //if so, display greyed out version
  $scope.getChallengeContext = function (){
    console.log('hi there')
    var challengeId = DataSharingService.activeChallenge.id;
    ChallengeService.getChallengeContext(challengeId)
      .success(function (res){
        DataSharingService.activeChallenge.expireAt = res.challenge.expire_at;
        console.log('challenge context', res);
        $scope.allChallengers = res.challenge.Challengers;
        console.log('all challengers',$scope.allChallengers)
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