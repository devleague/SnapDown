angular.module('starter')

.controller('select-challenger-controller', function ($scope, UserService) {
  $scope.getAllUsers = function()
    .success(function (res){
      $scope.users = res;
    })
    .error(function (err){
      console.log('Error with receiving users', err);
    })

});

//CONST
  $scope.imageURI = $stateParams.imageURI;
