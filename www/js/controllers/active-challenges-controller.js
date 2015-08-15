angular.module('starter')

.controller('active-challenges-controller', function($scope, ChallengeService, PictureService, $ionicModal, $ionicPlatform, DataSharingService,$state) {

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


});