angular.module('starter')

.controller('get-user-phone-info', function ($scope, $localStorage, UserService, ProviderService){

  var user_id = 2;
  // var user_id =  $localStorage.activeUserId;

  $scope.updateUserPhoneInfo = function (user_info){

    UserService.updateUserPhoneInfo(user_id, user_info)
      .success(function (res){
        console.log('updated user info', res);
      })
      .error(function (error){
        console.log('error with updating a user phone info', error);
      })
  }


  $scope.providers = [];
  ProviderService.getAllProviders()
  .success(function (res){
    console.log('providers', res)
    $scope.providers = res;
  })
  .error(function (err){
    console.log('err', err);
  })

})