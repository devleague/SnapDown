angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, $state, $ionicModal, $localStorage, DataSharingService) {

  $scope.init = function() {
    //user id is hard coded!!!!! need to grab from the $localStorage
    // var user_id = $localStorage.activeUserId;


    var user_id = 2;

    ChallengeService.getMyChallenges(user_id)
      .success(function(res) {
        var filteredChallenges = ChallengeService.filterChallenges(res);
        $scope.challenges = filteredChallenges;
      })
      .error(function(err) {
        console.log('err w/ showing challeges', err);
      })
  }

  $scope.renderAllChallenges = function(challenge) {
    console.log('logging challenge',challenge)
    if(challenge.state === 'active'){
      $state.go('app.challenge-in-progress',{
        activeChallengeId : challenge.id,
        activeChallengeExpireTime : challenge.expire_at
      });
    }else{
      $state.go('app.challenge-complete',{
        activeChallengeId : challenge.id
      });
    }
  }


  $scope.onSwipeLeft = function() {
    $state.go('app.landing');
  }
});