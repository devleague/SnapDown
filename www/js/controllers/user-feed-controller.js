angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, $state, $ionicModal) {

  $scope.init = function(){
    ChallengeService.getMyChallenges()
      .success(function (res){
        console.log('my challengers', res);
        $scope.challenges = res;
      })
      .error(function (err){
        console.log('err w/ showing challeges', err);
      })
  }
  $scope.init();

  $scope.test = function() {
    alert('hi');
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
