.controller('active-challenges-controller', function($scope, PictureService, $ionicModal, $ionicPlatform, DataSharingService, ChallengeService, ChallengerService,$state, $timeout, Camera) {

  $ionicPlatform.ready(function() {
    ChallengeService.getMyChallenges($localStorage.activeUserId)
      .success(function(res) {
        var filteredChallenges = ChallengeService.filterChallenges(res);
        var activeChallenges = ChallengeService.getActiveChallenges(filteredChallenges);
        $scope.activeChallenges = activeChallenges;
      })
      .error(function (err) {
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
        .success(function (res) {

          DataSharingService.startedChallenge.id = res.id;
          DataSharingService.startedChallenge.name = res.name;

          ChallengerService.createChallenger($localStorage.activeUserId, res.id, true)
            .success(function (res) {
              DataSharingService.activeUser.challengerId = res.id;
              challengerId = res.id;
            })
            .error(function (error) {

            })


        })
        .error(function (err) {

        })
    };


});