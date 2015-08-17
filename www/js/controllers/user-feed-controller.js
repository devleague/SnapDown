angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, ChallengerService, $state, $ionicModal, $localStorage, $timeout) {

  ChallengerService.getChallengesWithImages($localStorage.activeUserId)
    .success(function(res){
      var filteredChallenges = ChallengeService.filterChallenges(res);
      $scope.challenges = filteredChallenges;
        console.log('new array with images:',res)
    })
    .error(function(err) {
        console.log('err w/ showing challeges', err);
    })



  $scope.renderChallenge = function(challenge) {
    console.log('logging challenge',challenge)
    if(challenge.Challenge.state === 'active'){
      $state.go('app.challenge-in-progress',{
        activeChallengeId : challenge.Challenge.id,
        activeChallengeExpireTime : challenge.Challenge.expire_at
      });
    }else{
      $state.go('app.challenge-complete',{
        activeChallengeId : challenge.Challenge.id
      });
    }
  }


  $scope.onSwipeLeft = function() {
    $state.go('app.landing');
  };

  $scope.getExpireTime = function(challenge){
    return parseInt(challenge.Challenge.expire_at);
  };

  $scope.isActiveClass = function(challenge){
    if(challenge.Challenge.expire_at > Date.now()){
      return "activeChallenge";
    }
    else{
      return "inactiveChallenge";
    }

  };

  $scope.isActive = function(challenge){
    if(challenge.Challenge.expire_at > Date.now()){
      return true;
    }
    else{
      return false;
    }
  };
});