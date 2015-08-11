angular.module('starter')

.controller('select-challenger-controller', function ($scope, UserService, ChallengeService) {

  $scope.UserService = UserService;
  $scope.users = [];

  $scope.getAllUsers = function()
    .success(function (res){
      $scope.users = res;
    })
    .error(function (err){
      console.log('Error with receiving users', err);
    })

  $scope.addUserToChallenge = function (){
    ChallengeService.addUserToChallenge()
    .success(function (res){
      console.log('user added to challenge', res)
    })
    .error(function (err){
      console.log('Error with adding user', err);
    })
  }

  $scope.removeUserFromChallenge = function (){
    ChallengeService.removeUserFromChallenge()
    .success(function (res){
      console.log(res)
    })
    .error(function (err){
      console.log('Error with removing user', err);
    })
  }

  $scope.createNewChallenge = function (){
    ChallengeService.createNewChallenge()
    .success(function (res){
      console.log('challenge created', res)
      //forward to the in progress page
    })
    .error(function (err){
      console.log('Error with creating a challenge', err);
    })
  }

});

//CONST take care of this
  $scope.imageURI = $stateParams.imageURI;
