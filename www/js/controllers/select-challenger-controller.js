angular.module('starter')

.controller('select-challenger-controller', function ($scope, UserService, ChallengeService, $stateParams) {

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

    $scope.usersSelected = [];
    $scope.isChecked = function (bool, user){
      console.log('bools and users', bool, user);
      if(bool){
        $scope.usersSelected.push(user);
      }else if($scope.usersSelected.indexOf(user) > -1){
        $scope.usersSelected.pop(user);
      }


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