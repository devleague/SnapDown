angular.module('starter')

.controller('challenge-complete-controller', function($scope, $state, ChallengeService, ChallengerService, Camera, PictureService, $stateParams, $ionicModal, $ionicPlatform, DataSharingService) {


  $scope.getChallengeContext = function() {

    var challengeId = $stateParams.activeChallengeId;

    ChallengeService.getChallengeContext(challengeId)
      .success(function(res) {
        console.log('challenge context', res);
        $scope.allChallengers = res.challenge.Challengers;
        $scope.challengeName = res.challenge.name;
        $scope.date = res.challenge.expire_at;
        console.log('all challengers', $scope.allChallengers)
      })
      .error(function(err) {
        console.log('err w/challenge context', err);
      })
  }

  $scope.showImage = function(challenger) {
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
      .success(function(res) {
        console.log('challenge created', res)

        //forward to the in progress page
        DataSharingService.startedChallenge.id = res.id;
        DataSharingService.startedChallenge.name = res.name;
        // var userId = DataSharingService.activeUser.id;
        //add in userId to function

        ChallengerService.createChallenger($localStorage.activeUserId, res.id, true)
          .success(function(res) {
            console.log('challenger created', res);
            DataSharingService.activeUser.challengerId = res.id;
            challengerId = res.id;
            //
            //
            //STARTS THE CAMERA
            //
            //
            $scope.getPhoto();
          })
          .error(function(error) {
            console.log(error);
          })

      })
      .error(function(err) {
        console.log('Error with creating a challenge', err);
      })
  };
  $scope.getPhoto = function() {
    Camera.getPicture({
        quality: 75,
        targetWidth: 1024,
        targetHeight: 1024,
        destinationType: 0,
        encodingType: 0,
        allowEdit : true,
        saveToPhotoAlbum: false
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
    console.log('stateparams', $stateParams)
    $scope.getChallengeContext();
  });



});