angular.module('starter')

.controller('challenge-complete-controller', function($scope, ChallengeService, PictureService,$stateParams, $ionicModal, $ionicPlatform,DataSharingService) {


  $scope.getChallengeContext = function (){

    var challengeId = $stateParams.activeChallengeId;

    ChallengeService.getChallengeContext(challengeId)
      .success(function (res){
        console.log('challenge context', res);
        $scope.allChallengers = res.challenge.Challengers;
        $scope.challengeName = res.challenge.name;
        console.log('all challengers',$scope.allChallengers)
      })
      .error(function (err){
        console.log('err w/challenge context', err);
      })
  }

  $ionicPlatform.ready(function() {
    console.log('stateparams',$stateParams)
    $scope.getChallengeContext();
  });




});