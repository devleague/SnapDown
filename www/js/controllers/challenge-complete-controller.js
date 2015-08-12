angular.module('starter')

.controller('challenge-complete-controller', function($scope, ChallengeService, PictureService, $ionicModal) {

  $scope.getChallengeUsers = function (){
    ChallengeService.getChallengeUsers()
      .success(function (res){
        console.log('challenge users', res);
      })
      .error(function (err){
        console.log('err w/ challenge users', err);
      })
  }

  $scope.getChallengePics = function (){
    PictureService.getChallengePics()
      .success(function (res){
        console.log('challenge pictures', res);
      })
      .error(function (err){
        console.log('err w/challenge pics', err);
      })
  }


  $scope.getIndividualPic = function (){
    PictureService.getIndividualPic()
      .success(function (res){
        console.log('individual pictures', res);
      })
      .error(function (err){
        console.log('err w/ individual pics', err);
      })
  }

  $ionicModal.fromTemplateUrl('my-modal.html', {
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


});