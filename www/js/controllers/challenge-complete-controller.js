angular.module('starter')

.controller('challenge-complete-controller', function($scope, $state, ChallengeService, ChallengerService, Camera, PictureService, $stateParams, $ionicModal, $ionicPlatform, DataSharingService, $localStorage, UserStatsService) {


  $scope.getChallengeContext = function () {

    var challengeId = $stateParams.activeChallengeId;

    ChallengeService.getChallengeContext(challengeId)
      .success(function(res) {
        $scope.allChallengers = res.challenge.Challengers;
        $scope.challengeName = res.challenge.name;
        $scope.date = res.challenge.expire_at;
      })
      .error(function (err) {

      })
  }

  $scope.showImage = function (challenger) {
    $state.go('app.individual-image', {
      imageUrl: challenger.Image.s3_reference,
      challengerName: challenger.User.first_name,
      previousView: 'app.challenge-complete',
      activeChallengeId: $stateParams.activeChallengeId,
      activeChallengeExpireTime: $stateParams.activeChallengeExpireTime
    });
  }


  $scope.createNewChallenge = function() {
    ChallengeService.createNewChallenge()
      .success(function (res) {

        DataSharingService.startedChallenge.id = res.id;
        DataSharingService.startedChallenge.name = res.name;

        ChallengerService.createChallenger($localStorage.activeUserId, res.id, true)
          .success(function (res) {
            DataSharingService.activeUser.challengerId = res.id;
            challengerId = res.id;

            // UserStatsService.updateStartedStat($localStorage.activeUserId)
            //     .success(function (res){
            //       //
            //       //
            //       //STARTS THE CAMERA
            //       //
            //       //
                  $scope.getPhoto();
            //     })
            //     .error(function (err){
            //
            //     })
          })
          .error(function (error) {
          })

      })
      .error(function (err) {
      })
  };
  $scope.getPhoto = function() {
    Camera.getPicture({
        quality: 50,
        targetWidth: 1024,
        targetHeight: 1024,
        destinationType: 0,
        encodingType: 0,
        saveToPhotoAlbum: false,
        correctOrientation: true
      })
      .then(function(imageData) {

        if (imageData) {
          PictureService.sendImageToServer(imageData, challengerId)
            .success(function(res) {
              DataSharingService.errorLog.sendImageToServer = 'no error';
              $state.go('app.select-challenger');
            })
            .error(function(error) {
              DataSharingService.errorLog.sendImageToServer = 'error';
              $state.go('app.select-challenger');
            })

        } else {
          DataSharingService.errorLog.sendImageToServer = 'no image data';
          $state.go('app.select-challenger');
        }
      });
  };


  $ionicPlatform.ready(function() {
    $scope.getChallengeContext();
  });

});