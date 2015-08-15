angular.module('starter')

.controller('landing-controller', function($scope, $state, RegisterService, LoginService, $ionicGesture, $ionicModal, Camera, ChallengeService, ChallengerService, DataSharingService, PictureService, DataSharingService) {
  ionic.Platform.ready(function() {
    console.log('outsiide init');
    $scope.init = function() {
      console.log('inside init')
      var user_id = 2;
      var challengerId;

      $scope.openChallenges = [];
      ChallengerService.getChallengerContext(user_id)
        .success(function(res) {
          var challengeContextArr = res;
          console.log(res);
          console.log('before length', challengeContextArr.length);

          challengeContextArr.forEach(function(curr, index) {
            // console.log('current image', curr);

            if (curr.Challenge && !curr.initiator_flag) {
              if (curr.Image === null && curr.Challenge.expire_at !== null) {
                $scope.openChallenges.push(curr)
              }
            }
          })
          console.log('my challenges', $scope.openChallenges);

        })
        .error(function(err) {
          console.log('err w/ showing challeges', err);
        })
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

          ChallengerService.createChallenger(2, res.id, true)
            .success(function(res) {
              console.log('challenger created', res);
              DataSharingService.activeUser.challengerId = res.id;
              challengerId = res.id;
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
      $state.go('app.user-challenged',{
        activeChallengeId : challenge.id,
        activeChallengeExpireTime: challenge.expire_at
      })
    }



    $scope.getPhoto = function() {
      Camera.getPicture({
          quality: 50,
          targetWidth: 512,
          targetHeight: 512,
          destinationType: 0,
          encodingType: 0,
          saveToPhotoAlbum: false
        })
        .then(function(imageData) {
          if (imageData) {
            var imageSrc = "data:image/jpeg;base64," + imageData;
            PictureService.sendImageToServer(imageSrc)
              .success(function(res) {
                DataSharingService.errorLog.sendImageToServer = 'no error';
                $state.go('app.select-challenger');
                console.log(res)
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
      // , function(err) {
      //     DataSharingService.errorLog.sendImageToServer = err;
      //     $state.go('app.select-challenger');
      //   })
    };

    $scope.onSwipeLeft = function() {
      $state.go('app.challenge-in-progress');
    }

    $scope.onSwipeRight = function() {
      $state.go('app.user-feed');
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