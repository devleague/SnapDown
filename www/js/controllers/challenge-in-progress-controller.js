angular.module('starter')

.controller('challenge-in-progress-controller', function($scope,$timeout, ChallengeService, $state, $ionicGesture, $stateParams, $ionicModal,$ionicPlatform,$interval) {

  $scope.allChallengers = [];
  var challengeId = $stateParams.activeChallengeId;
  var timeRemaining = $stateParams.activeChallengeExpireTime - Date.now();

//this function fires when the time expires
  $timeout(function(){
    // $scope.checkIfChallengeActive();
    $state.go('app.challenge-complete',{activeChallengeId: challengeId});
  },timeRemaining+50)

  // $scope.checkIfChallengeActive = function(){
  //   if(DataSharingService.activeChallenge.expireAt > Date.now()){

  //     $scope.challengeActive = true;
  //     $scope.challengeExpired = false;
  //   }
  //   else{


  //     $scope.challengeActive = false;
  //     $scope.challengeExpired = true;
  //   }

  // };

  $scope.expireTime = function(){
    return parseInt($stateParams.activeChallengeExpireTime);
  };

  $interval(function(){
    $scope.getChallengeContext();
  },8000);




  //Can be used to validate if the user sent in a picture.
  //if so, display greyed out version
  $scope.getChallengeContext = function (){
    ChallengeService.getChallengeContext(challengeId)
      .success(function (res){
        $scope.allChallengers = res.challenge.Challengers;
        $scope.challengeName = res.challenge.name;
      })
      .error(function (err){

      })
  };

  $scope.getChallengeContext();

  $scope.showImage = function(challenger){
    $state.go('app.individual-image', {
      imageUrl : challenger.Image.s3_reference,
      challengerName : challenger.User.first_name,
      previousView : 'app.challenge-in-progress',
      activeChallengeId : $stateParams.activeChallengeId,
      activeChallengeExpireTime: $stateParams.activeChallengeExpireTime
    });
  };

  $scope.getStatusClass = function(challenger){
    if(challenger.Image){
      return "imageSubmitted";
    }
    else{
      return "notSubmitted";
    }
  };

  $scope.onSwipeRight = function() {
      $state.go('app.landing');
  };



});