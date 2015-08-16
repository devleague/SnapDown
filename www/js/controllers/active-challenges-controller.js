angular.module('starter')

.controller('active-challenges-controller', function($scope, PictureService, $ionicModal, $ionicPlatform, DataSharingService, ChallengeService, ChallengerService,$state, $timeout, Camera) {

  $ionicPlatform.ready(function() {
    var user_id = 2;
    ChallengeService.getMyChallenges(user_id)
      .success(function(res) {
        var filteredChallenges = ChallengeService.filterChallenges(res);
        var activeChallenges = ChallengeService.getActiveChallenges(filteredChallenges);
        $scope.activeChallenges = activeChallenges;
      })
      .error(function(err) {
        console.log('err w/ showing challeges', err);
      })
  });

  $scope.getActiveChallengeContext = function(challenge) {
    // DataSharingService.activeChallenge.id = challenge.id;
      $state.go('app.challenge-in-progress',{activeChallengeId:challenge.id,activeChallengeExpireTime:challenge.expire_at});
  }

  $scope.getExpireTime = function(challenge){
    return parseInt(challenge.expire_at);
  };

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


});