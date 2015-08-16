angular.module('starter')

.controller('challenge-complete-controller', function($scope, ChallengeService, ChallengerService, Camera, PictureService,$stateParams, $ionicModal, $ionicPlatform,DataSharingService) {


  $scope.getChallengeContext = function (){

    var challengeId = $stateParams.activeChallengeId;

    ChallengeService.getChallengeContext(challengeId)
      .success(function (res){
        console.log('challenge context', res);
        $scope.allChallengers = res.challenge.Challengers;
        $scope.challengeName = res.challenge.name;
        $scope.date = res.challenge.expire_at;
        console.log('all challengers',$scope.allChallengers)
      })
      .error(function (err){
        console.log('err w/challenge context', err);
      })
  }

  $scope.createNewChallenge = function() {
      ChallengeService.createNewChallenge()
        .success(function(res) {
          console.log('challenge created', res)

          //forward to the in progress page
          DataSharingService.startedChallenge.id = res.id;
          DataSharingService.startedChallenge.name = res.name;
          // var userId = DataSharingService.activeUser.id;
          //add in userId to function

          ChallengerService.createChallenger(2, res.id, true)
            .success(function(res) {
              console.log('challenger created', res);
              DataSharingService.activeUser.challengerId = res.id;
              challengerId = res.id;
            })
            .error(function(error) {
              console.log(error);
            })


        })
        .error(function(err) {
          console.log('Error with creating a challenge', err);
        })
  };

  $ionicPlatform.ready(function() {
    console.log('stateparams',$stateParams)
    $scope.getChallengeContext();
  });




});