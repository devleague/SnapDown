'use strict'
angular.module('starter')

.controller('user-profile-controller', function ($scope, LogOutService){

  $scope.logUserOut = function (){


    LogOutService.logUserOut($scope.user_info)
      .success(function (res){
        console.log('logout sucess', res);
      })
      .error(function (err){
        console.log('logout err', err);
      })
  }

})