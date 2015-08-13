angular.module('starter')

.controller('select-challenger-controller', function ($scope, UserService, ChallengeService, $stateParams, DataSharingService, MessageServices, ChallengerService) {

  $scope.imageURI = $stateParams.imageURI;

  $scope.UserService = UserService;
  $scope.users = [];



    UserService.getAllUsers()
    .success(function (res){
      console.log(res);
      $scope.users = res;
    })
    .error(function (err){
      console.log('Error with receiving users', err);
    })


    //generates an array of all the checked users
    $scope.usersChecked = [];
    $scope.isChecked = function (bool, user){
      if(bool){
        $scope.usersChecked.push(user);
      }else if($scope.usersChecked.indexOf(user) > -1){
        $scope.usersChecked.splice($scope.usersChecked.indexOf(user),1);
      }
    }

    //for each user selected, they are added as a player into the challenge
    $scope.createChallenger = function (){
      var userId = 2;
      var challengeId = DataSharingService.activeChallenge.id;
      var selectedUsers = $scope.usersChecked;
      selectedUsers.forEach(function (user){
        ChallengerService.createChallenger(user.id, challengeId, false)
          .success(function (res){
            console.log('challenger created', res);
          })
          .error(function (error){
            console.log('error', error);
          })
      })
    }

    //updates the start/end time for the challenge on the db
    $scope.updateChallengeTimes = function (){
      var challengeId = DataSharingService.activeChallenge.id;
      ChallengeService.updateChallengeTimes(challengeId)
        .success(function (res){
          console.log('res', res)
        })
        .error(function (error){
          console.log('error', error)
        })
    }


    $scope.sendInvites = function(){
      console.log('invite button clicked')
      var invitationObj = {
        users: $scope.usersChecked,
        challengerName: 'testName',
        startTime: Date.now()
      };

      MessageServices.sendChallengeInvites(invitationObj);

    };




  // $scope.addUserToChallenge = function (){
  //   ChallengeService.addUserToChallenge()
  //   .success(function (res){
  //     console.log('user added to challenge', res)
  //   })
  //   .error(function (err){
  //     console.log('Error with adding user', err);
  //   })
  // };

  // $scope.removeUserFromChallenge = function (){
  //   ChallengeService.removeUserFromChallenge()
  //   .success(function (res){
  //     console.log(res)
  //   })
  //   .error(function (err){
  //     console.log('Error with removing user', err);
  //   })
  // };


});
