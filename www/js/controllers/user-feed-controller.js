angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, $state, $ionicModal, $localStorage, DataSharingService) {

  $scope.init = function() {
    //user id is hard coded!!!!! need to grab from the $localStorage
    // var user_id = $localStorage.activeUserId;
    var user_id = 2;

    ChallengeService.getMyChallenges(user_id)
      .success(function(res) {
        console.log('my challengesfasd', res);
        var filteredChallenges = ChallengeService.filterChallenges(res);
        $scope.challenges = filteredChallenges;
      })
      .error(function(err) {
        console.log('err w/ showing challeges', err);
      })
  }
  $scope.init();

  $scope.renderChallenge = function(challenge) {
    DataSharingService.activeChallenge.id = challenge.id;
    if(challenge.expire_at > Date.now()){
      console.log('active');
      $state.go('app.challenge-in-progress')
    }else{
      console.log('inactive');
      $state.go('app.challenge-complete')
    }
  }

  $ionicModal.fromTemplateUrl('edit-profile-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };


  $scope.onSwipeLeft = function() {
    console.log('going left');
    $state.go('app.landing');
  }
});