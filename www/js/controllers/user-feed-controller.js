angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, ChallengerService, $state, $ionicModal, $localStorage, $timeout, validationService) {

  var filteredChallenges = [];

  ChallengerService.getChallengesWithImages($localStorage.activeUserId)
    .success(function(res){
      filteredChallenges = ChallengeService.filterChallenges(res);

      var userFeedChallenges = filteredChallenges.filter(function(challenge){
        if($scope.isActive(challenge)){
          return true;
        }
        else{
          return validationService.userHasSubmitted(challenge,$localStorage.activeUserId);
        }
      })
      $scope.challenges = userFeedChallenges;
        console.log('new array with images:',res)
    })
    .error(function(err) {
        console.log('err w/ showing challeges', err);
    })



  $scope.renderChallenge = function(challenge) {
    console.log('logging challenge',challenge)
    if(challenge.Challenge.state === 'active'){
      if(validationService.userHasSubmitted(challenge,$localStorage.activeUserId)){
        $state.go('app.challenge-in-progress',{
          activeChallengeId : challenge.Challenge.id,
          activeChallengeExpireTime : challenge.Challenge.expire_at
        });
      }
      else{
        $state.go('app.user-challenged',{
          activeChallengeId : challenge.id,
          activeChallengeExpireTime: challenge.expire_at
        });
      }
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

  validationService.removeUserFromDeclined(filteredChallenges, $localStorage.activeUserId)




});