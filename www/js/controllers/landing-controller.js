angular.module('starter')

.controller('landing-controller', function($scope, RegisterService, LoginService) {

  $scope.createUser = function (){

    //make sure the model on the form on the login page
    //matches the user_info
    RegisterService.createUser($scope.user_info)
      .success(function (res){
        console.log('Register sucess', res);
      })
      .error(function (err){
        console.log('Register err', err);
      })
  }

  $scope.loginUser = function (){


    LoginService.loginUser($scope.user_info)
      .success(function (res){
        console.log('Login sucess', res);
      })
      .error(function (err){
        console.log('Login err', err);
      })
  }




});