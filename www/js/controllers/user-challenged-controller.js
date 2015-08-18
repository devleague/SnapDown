angular.module('starter')

.controller('user-challenged-controller', function($location, $state, $localStorage, $scope, $ionicPlatform, ChallengeService, $stateParams, $rootScope, Camera, $timeout, UserStatsService, PictureService) {
  $scope.allChallengers = [];
  var challengeId = $stateParams.activeChallengeId;
  var expireTime = $stateParams.activeChallengeExpireTime;
  $scope.expireTime = expireTime;
  var challengerId = $stateParams.challengerId;



  $scope.getChallengeContext = function() {

    ChallengeService.getChallengeContext(challengeId)
      .success(function (res) {
        $scope.challengeName = res.challenge.name;

        $scope.allChallengers = res.challenge.Challengers;

      })
      .error(function (err) {

      })
  };

  $scope.getChallengeContext();

  $scope.challengeActive = function() {
    if (Date.now() < expireTime) {
      return true;
    } else {
      return false;
    }
  };

  ionic.Platform.ready(function() {

    $scope.acceptChallenge = function() {

      // alert('')
      // UserStatsService.updateAcceptStat($localStorage.activeUserId)
      //   .success(function (res){

      Camera.getPicture({
          quality: 25,
          targetWidth: 500,
          targetHeight: 500,
          destinationType: 0,
          encodingType: 0,
          saveToPhotoAlbum: false,
          correctOrientation: true
        })
        .then(function(imageData) {
          if (imageData) {
            PictureService.sendImageToServer(imageData, challengerId)
              .success(function(res) {
                $state.go('app.challenge-in-progress', {
                  activeChallengeId: challengeId,
                  activeChallengeExpireTime: expireTime
                });
              })
              .error(function(error) {

              })
          }
        });
      // })
      // .error(function (err){

      // })

    };

    $scope.getExpireTime = function(){
      return parseInt(expireTime);
    };

    $scope.getStatusClass = function(challenger){
      if(challenger.Image){
        return "imageSubmitted";
      }
      else{
        return "notSubmitted";
      }
    };

  });
});