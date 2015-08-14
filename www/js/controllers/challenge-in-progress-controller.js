angular.module('starter')

.controller('challenge-in-progress-controller', function($scope, ChallengeService, $state, $ionicGesture, $ionicModal,$ionicPlatform, DataSharingService) {

  $scope.allChallengers = [];
  var timeRemaining = DataSharingService.activeChallenge.expireAt - Date.now();
  console.log('time remaining:',timeRemaining);


  setTimeout(function(){
    $scope.checkIfChallengeActive();
  },timeRemaining+50)

  $scope.checkIfChallengeActive = function(){
    if(DataSharingService.activeChallenge.expireAt > Date.now()){
      $scope.challengeActive = true;
      $scope.challengeExpired = false;
    }
    else{
        $scope.challengeActive = false;
      $scope.challengeExpired = true;
    }

  };

  $scope.expireTime = function(){
    return DataSharingService.activeChallenge.expireAt;
  };
  var challenge = DataSharingService.activeChallenge;
  var challengeId = DataSharingService.activeChallenge.id;



  //Can be used to validate if the user sent in a picture.
  //if so, display greyed out version
  $scope.getChallengeContext = function (){
    console.log('hi there')
    var challengeId = DataSharingService.activeChallenge.id;
    ChallengeService.getChallengeContext(challengeId)
      .success(function (res){
        console.log('challenge context', res);
        $scope.allChallengers = res.challenge.Challengers;
        console.log('all challengers',$scope.allChallengers)
      })
      .error(function (err){
        console.log('err w/challenge context', err);
      })
  }

  $ionicPlatform.ready(function() {
    console.log('challengeid',challengeId)
    console.log('getting challenge context')
    $scope.getChallengeContext();
  });



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