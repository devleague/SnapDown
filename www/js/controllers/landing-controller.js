angular.module('starter')

.controller('landing-controller', function($scope, $localStorage, $state, LoginService, $ionicGesture, $ionicModal, Camera, ChallengeService, ChallengerService, DataSharingService, PictureService, $timeout, validationService, UserStatsService) {

  var challengerId;

  //########## HARD CODE ID  HERE #################//
  //########## DEVELOPMENT ONLY ##################//
  $localStorage.activeUserId === true ? $localStorage.activeUserId : 2;
  //##############################################//
  // $localStorage.activeUserId = 8;
  //##############################################//

  var filteredChallenges = [];

  ChallengerService.getChallengesWithImages($localStorage.activeUserId)
    .success(function(res) {
      console.log('res', res)
      filteredChallenges = ChallengeService.filterChallenges(res);

      var activeChallenges = filteredChallenges.filter(function(challenge) {
        return challenge.Challenge.expire_at > Date.now();
      });

      $scope.activeChallenges = activeChallenges;
      console.log('new array with images:', res)
      console.log('filtered challenges', filteredChallenges)
      validationService.removeUserFromDeclined(filteredChallenges, $localStorage.activeUserId)

    })
    .error(function(err) {
      console.log('err w/ showing challeges', err);
    })


  ionic.Platform.ready(function() {


    // $scope.openChallenges = [];
    // ChallengerService.getChallengerContext($localStorage.activeUserId)
    //   .success(function(res) {
    //     var challengeContextArr = res;
    //     console.log('before length', challengeContextArr.length);
    //     challengeContextArr.forEach(function(curr, index) {
    //       if (curr.Challenge && !curr.initiator_flag){

    //         if (curr.Image === null && curr.Challenge.expire_at > Date.now()) {
    //           $scope.openChallenges.push(curr)
    //         }
    //       }
    //     })

    //   })
    //   .error(function(err) {
    //     console.log('err w/ showing challeges', err);
    //   })
    $scope.isActive = function(challenge) {
      return challenge.Challenge.expire_at > Date.now();
    };

    $scope.isOpen = function(challenge) {
      var challengerArr = challenge.Challenge.Challengers;
      var isAccepted = challengerArr.filter(function(element) {
        return element.user_id == $localStorage.activeUserId;
      })[0].Image;
      var classNames = "";

      if (challenge.Challenge.expire_at > Date.now()) {
        if (isAccepted) {
          return false;
        } else {
          return true;
        }
        return false;
      }
    }

    $scope.isActiveClass = function(challenge) {
      var challengerArr = challenge.Challenge.Challengers;
      var isAccepted = challengerArr.filter(function(element) {
        return element.user_id == $localStorage.activeUserId;
      })[0].Image;
      var classNames = "";

      if (challenge.Challenge.expire_at > Date.now()) {
        if (isAccepted) {
          classNames += "accepted ";
        } else {
          classNames += "unaccepted ";
        }
        classNames += "activeChallenge";
      } else {
        classNames += "inactiveChallenge";
      }
      console.log('classNames', classNames);
      return classNames;
    };

    $scope.returnEndTime = function(challenge) {
      return parseInt(challenge.Challenge.expire_at);
    };

    $scope.getExpireTime = function(challenge) {
      return parseInt(challenge.Challenge.expire_at);
    };


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

              // UserStatsService.updateStartedStat($localStorage.activeUserId)
              //   .success(function (res){
              //     console.log('Updated the user started at stat', res)

              //     //Add the go to camera logic here!!



              //   })
              //   .error(function (err){
              //     console.log('err with updating challenged at stat', err);
              //   })


            })
            .error(function(error) {
              console.log(error);
            })


        })
        .error(function(err) {
          console.log('Error with creating a challenge', err);
        })
    };



    $scope.renderChallenge = function(challenge) {
      console.log('challenge selected', challenge)

      var acceptingChallengerId = challenge.Challenge.Challengers.filter(function(challenger) {
        return challenger.user_id == $localStorage.activeUserId;
      })[0].id;
      console.log('acceptingChallengerId', acceptingChallengerId);

      if (validationService.userHasSubmitted(challenge, $localStorage.activeUserId)) {
        $state.go('app.challenge-in-progress', {
          activeChallengeId: challenge.Challenge.id,
          activeChallengeExpireTime: challenge.Challenge.expire_at
        });
      } else {
        $state.go('app.user-challenged', {
          activeChallengeId: challenge.Challenge.id,
          activeChallengeExpireTime: challenge.Challenge.expire_at,
          challengerId: acceptingChallengerId

        });
      }
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

    $scope.onSwipeLeft = function() {
      $state.go('app.user-profile');
    }

    $scope.onSwipeRight = function() {
      $state.go('app.user-feed');
    }
  });
});