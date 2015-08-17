angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, ChallengerService, $state, $ionicModal, $localStorage, $timeout, validationService) {

  console.log('current user id user feeed', $localStorage.activeUserId);

  var filteredChallenges = [];

  ChallengerService.getChallengesWithImages($localStorage.activeUserId)
    .success(function(res) {
      filteredChallenges = ChallengeService.filterChallenges(res);

      var userFeedChallenges = filteredChallenges.filter(function(challenge) {
        if ($scope.isActive(challenge)) {
          return true;
        } else {
          return validationService.userHasSubmitted(challenge, $localStorage.activeUserId);
        }
      })
      $scope.challenges = userFeedChallenges;
      console.log('new array with images:', res)

      validationService.removeUserFromDeclined(filteredChallenges, $localStorage.activeUserId)

    })
    .error(function(err) {
      console.log('err w/ showing challeges', err);
    })



  $scope.renderChallenge = function(challenge) {
    console.log('challnge', challenge)
    var acceptingChallengerId = challenge.Challenge.Challengers.filter(function(challenger) {
      return challenger.user_id == $localStorage.activeUserId;
    })[0].id;

    console.log('logging challenge', challenge)
    if (challenge.Challenge.state === 'active') {
      if (validationService.userHasSubmitted(challenge, $localStorage.activeUserId)) {
        $state.go('app.challenge-in-progress', {
          activeChallengeId: challenge.Challenge.id,
          activeChallengeExpireTime: challenge.Challenge.expire_at
        });
      } else {
        $state.go('app.user-challenged', {
          activeChallengeId: challenge.id,
          activeChallengeExpireTime: challenge.expire_at,
          challengerId: acceptingChallengerId
        });
      }
    } else {
      $state.go('app.challenge-complete', {
        activeChallengeId: challenge.Challenge.id
      });
    }
  }


  $scope.onSwipeLeft = function() {
    $state.go('app.landing');
  };

  $scope.getExpireTime = function(challenge) {
    return parseInt(challenge.Challenge.expire_at);
  };


  $scope.isActiveClass = function(challenge) {
    var challengerArr = challenge.Challenge.Challengers;
    var isAccepted = challengerArr.filter(function(element) {
      return element.user_id == $localStorage.activeUserId;
    })[0].Image;
    var classNames = "";

    if (challenge.Challenge.expire_at > Date.now()) {
      if (isAccepted) {
        classNames += "accepted ";
      } else {
        classNames += "unaccepted ";
      }
      classNames += "activeChallenge";
    } else {
      classNames += "inactiveChallenge";
    }
    
    console.log('classNames',classNames);
    return classNames;
  };

  $scope.isActive = function(challenge) {
    if (challenge.Challenge.expire_at > Date.now()) {
      return true;
    } else {
      return false;
    }
  };



});