angular.module('starter')

.controller('user-challenged-controller', function($location, $state, $localStorage, $scope, $ionicPlatform, ChallengeService, $stateParams, $rootScope, Camera, $timeout, UserStatsService, PictureService) {
  $scope.allChallengers = [];
  var challengeId = $stateParams.activeChallengeId;
  var expireTime = $stateParams.activeChallengeExpireTime;
  $scope.expireTime = expireTime;
  var challengerId = $stateParams.challengerId;



  $scope.getChallengeContext = function() {
    ChallengeService.getChallengeContext(challengeId)
      .success(function(res) {
        $scope.challengeName = res.challenge.name;
        console.log('challengeName', challengeName);
        console.log('challenge context', res);
        $scope.allChallengers = res.challenge.Challengers;
        console.log('all challengers', $scope.allChallengers)
      })
      .error(function(err) {
        console.log('err w/challenge context', err);
      })
  }

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
      // console.log('users accepted stat is updated', res);

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

          alert('imageData', imageData);
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
          console.log(imageData);
          console.log('challengerId');
          console.log(challengerId);
          console.log('challengerId typeof');
          console.log(typeof(challengerId));
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

          if (imageData) {
            PictureService.sendImageToServer(imageData, challengerId)
              .success(function(res) {
                $state.go('app.challenge-in-progress', {
                  activeChallengeId: challengeId,
                  activeChallengeExpireTime: expireTime
                });
              })
              .error(function(error) {
                console.log('ERROR');
                console.log(error);
              })
          }
        });
      // })
      // .error(function (err){
      //   console.log('error with updating the user accept stat', err);
      // })

    };


  });

});