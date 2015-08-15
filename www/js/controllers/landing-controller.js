angular.module('starter')

.controller('landing-controller', function($scope, $state, RegisterService, LoginService, $ionicGesture, $ionicModal, Camera, ChallengeService, ChallengerService, DataSharingService, PictureService, DataSharingService) {

  ionic.Platform.ready(function() {

      var user_id = 2;

      $scope.openChallenges = [];
      ChallengerService.getChallengerContext(user_id)
        .success(function (res) {

          var challengeContextArr = res;
          console.log(res);
          console.log('before length', challengeContextArr.length);

          challengeContextArr.forEach(function (curr, index) {
              // console.log('current image', curr);
            if(curr.Image === null){
              $scope.openChallenges.push(curr)
            }
          })

            console.log('my challenges', $scope.openChallenges.length);
        })
        .error(function(err) {
          console.log('err w/ showing challeges', err);
        })

    $scope.createNewChallenge = function() {
      ChallengeService.createNewChallenge()
        .success(function(res) {
          console.log('challenge created', res)

          //forward to the in progress page
          DataSharingService.activeChallenge.id = res.id;
          DataSharingService.activeChallenge.name = res.name;
          // var userId = DataSharingService.activeUser.id;
          //add in userId to function

          ChallengerService.createChallenger(user_id, res.id, true)
            .success(function(res) {
              console.log('challenger created', res);
              DataSharingService.activeUser.challengerId = res.id;
            })
            .error(function(error) {
              console.log(error);
            })


        })
        .error(function(err) {
          console.log('Error with creating a challenge', err);
        })
    };

    $scope.renderActiveChallenges = function(challenge) {
      DataSharingService.activeChallenge.id = challenge.id;
      $state.go('app.challenge-in-progress')
    }



    $scope.getPhoto = function() {
      Camera.getPicture({
          quality: 50,
          targetWidth: 512,
          targetHeight: 512,
          destinationType: 0,
          encodingType: 0,
          saveToPhotoAlbum: false
        }
      )
      .then(function(imageData) {
        if(imageData){

          var challenger_id = 1; //TODO FIX MEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

           PictureService.sendImageToServer(imageData, challenger_id)

            .success(function(res){
              DataSharingService.errorLog.sendImageToServer = 'no error';
              $state.go('app.select-challenger');
            })

            .error(function(error){
              DataSharingService.errorLog.sendImageToServer = 'error';
              $state.go('app.select-challenger');
            })

        } else {

          DataSharingService.errorLog.sendImageToServer = 'no image data';
          $state.go('app.select-challenger');
        }
      });
    };

    $scope.onSwipeLeft = function() {
      $state.go('app.challenge-in-progress');
    }

    $scope.onSwipeRight = function() {
      $state.go('app.user-feed');
    }




  })


  // $scope.createUser = function (){

  //   //make sure the model on the form on the login page
  //   //matches the user_info
  //   RegisterService.createUser($scope.user_info)
  //     .success(function (res){
  //       console.log('Register sucess', res);
  //     })
  //     .error(function (err){
  //       console.log('Register err', err);
  //     })
  // }

  // $scope.loginUser = function (){


  //   LoginService.loginUser($scope.user_info)
  //     .success(function (res){
  //       console.log('Login sucess', res);
  //     })
  //     .error(function (err){
  //       console.log('Login err', err);
  //     })
  // }



});