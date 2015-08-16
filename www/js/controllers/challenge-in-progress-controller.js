angular.module('starter')

.controller('challenge-in-progress-controller', function($scope,$timeout, ChallengeService, $state, $ionicGesture, $stateParams, $ionicModal,$ionicPlatform,$interval) {

  $scope.allChallengers = [];
  var challengeId = $stateParams.activeChallengeId;
  var timeRemaining = $stateParams.activeChallengeExpireTime - Date.now();
  console.log('time remaining:',timeRemaining);
  console.log('stateParams',$stateParams)

//this function fires when the time expires
  $timeout(function(){
    console.log('timeout triggered')
    // $scope.checkIfChallengeActive();
    $state.go('app.challenge-complete',{activeChallengeId: challengeId});
  },timeRemaining+50)

  // $scope.checkIfChallengeActive = function(){
  //   if(DataSharingService.activeChallenge.expireAt > Date.now()){
  //     console.log('challenge active')
  //     $scope.challengeActive = true;
  //     $scope.challengeExpired = false;
  //   }
  //   else{
  //     console.log('challenge expired')

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
        console.log('challenge-in-progress challenge context', res);
        $scope.allChallengers = res.challenge.Challengers;
        $scope.challengeName = res.challenge.name;
        console.log('challenge-in-progress all challengers',$scope.allChallengers)
      })
      .error(function (err){
        console.log('err w/challenge context', err);
      })
  }

  $ionicPlatform.ready(function() {
    $scope.getChallengeContext();
  });


  $scope.showImage = function(challenger){
    $state.go('app.individual-image', {
      imageUrl : challenger.Image.s3_reference,
      challengerName : challenger.User.first_name
    });
  }



  $scope.onSwipeRight = function() {
      $state.go('app.landing');
  }



});