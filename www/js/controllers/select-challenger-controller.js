angular.module('starter')

.controller('select-challenger-controller', function ($scope, UserService) {

  $scope.UserService = UserService;
  $scope.users = [];

  $scope.getAllUsers = function()
    .success(function (res){
      $scope.users = res;
    })
    .error(function (err){
      console.log('Error with receiving users', err);
    })

});

//CONST take care of this
  $scope.imageURI = $stateParams.imageURI;
