angular.module('starter')

.controller('challenge-complete-controller', function($scope, ChallengeService, PictureService,$stateParams, $ionicModal, $ionicPlatform,DataSharingService) {


  $scope.getChallengeContext = function (){
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
    console.log('stateparams',$stateParams)
    console.log('hello I am in complet aretn i????????')
    $scope.getChallengeContext();
  });




});