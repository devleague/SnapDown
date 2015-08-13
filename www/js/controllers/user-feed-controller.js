angular.module('starter')

.controller('user-feed-controller', function($scope, ChallengeService, $state, $ionicModal) {

  $scope.getMyChallenges = function (){
    ChallengeService.getMyChallenges()
      .success(function (res){
        console.log('my challenges', res);
      })
      .error(function (err){
        console.log('err w/ showing challeges', err);
      })
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
    $state.go('app.landing');
  }
});
