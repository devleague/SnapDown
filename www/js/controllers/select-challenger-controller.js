angular.module('starter')

.controller('select-challenger-controller', function ($scope, UserService, ChallengeService, $stateParams, DataSharingService) {

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
      console.log('bools and users', bool, user);
      if(bool){
        $scope.usersChecked.push(user);
      }else if($scope.usersChecked.indexOf(user) > -1){
        $scope.usersChecked.splice($scope.usersChecked.indexOf(user),1);
      }
    }

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

    $scope.consoleSelected = function (){
      console.log('users checked', $scope.usersChecked);
        console.log('DataSharingService',DataSharingService.activeUser,DataSharingService.activeChallenge.id);
        updateChallengeTimes();
    }





  $scope.addUserToChallenge = function (){
    ChallengeService.addUserToChallenge()
    .success(function (res){
      console.log('user added to challenge', res)
    })
    .error(function (err){
      console.log('Error with adding user', err);
    })
  };

  $scope.removeUserFromChallenge = function (){
    ChallengeService.removeUserFromChallenge()
    .success(function (res){
      console.log(res)
    })
    .error(function (err){
      console.log('Error with removing user', err);
    })
  };

});