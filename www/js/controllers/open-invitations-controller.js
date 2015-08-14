angular.module('starter')

.controller('open-invitations-controller', function($scope, ChallengeService, PictureService, $ionicModal, $ionicPlatform,DataSharingService) {

  $scope.getChallengeContext = function (){
    console.log('hi there')
  }

  $scope.renderAllChallenges = function(challenge) {
    DataSharingService.activeChallenge.id = challenge.id;
    if(challenge.state === 'active'){
      $state.go('app.challenge-in-progress')
    }else{
      $state.go('app.challenge-complete')
    }
  }

  $ionicPlatform.ready(function() {
    $scope.getChallengeContext();
  });

});