angular.module('starter')

.controller('user-challenged-controller', function($location, $localStorage, $scope, $ionicPlatform, ChallengeService, $stateParams,$rootScope, Camera, $timeout, UserStatsService) {
	$scope.allChallengers = [];
	var challengeId = $stateParams.activeChallengeId;
  var expireTime = $stateParams.activeChallengeExpireTime;
  $scope.expireTime = expireTime;
  var challengerId; //needs to be defined somehow

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

  $scope.challengeActive = function(){
    if (Date.now() < expireTime){
      return true;
    }else{
      return false;
    }
  };


  $scope.acceptChallenge = function(){

   Camera.getPicture({
      quality: 75,
      targetWidth: 1024,
      targetHeight: 1024,
      destinationType: 0,
      encodingType: 0,
      saveToPhotoAlbum: false
    })
    .then(function(imageData) {

      if (imageData) {
        PictureService.sendImageToServer(imageData, challengerId)
          .success(function(res) {
            DataSharingService.errorLog.sendImageToServer = 'no error';
            $state.go('app.challenge-in-progress',{
              activeChallengeId: challengeId,
              activeChallengeExpireTime: expireTime
            });
          })
          .error(function(error) {
            DataSharingService.errorLog.sendImageToServer = 'error';
          })

      } else {
        DataSharingService.errorLog.sendImageToServer = 'no image data';
      }
    });

  };

	$ionicPlatform.ready(function() {
		$scope.getChallengeContext();
	});
});