angular.module('starter')

.controller('get-user-phone-info', function ($scope, $state, $localStorage, UserService, ProviderService, validationService){

  $scope.showErrorMessage = false;
  // var user_id = 2;
  // var user_id =  $localStorage.activeUserId;

  $scope.updateUserPhoneInfo = function (user_info){

    //validate phone number
    if(validationService.phoneNumberVal(user_info.phone)){

      user_info.phone = validationService.parseNumber(user_info.phone);
      console.log('parsed phone number being sent', user_info.phone)

      UserService.updateUserPhoneInfo($localStorage.activeUserId, user_info)
        .success(function (res){
          console.log('updated user info', res);
          $state.go('app.landing');
        })
        .error(function (error){
          alert(error);
          console.log('error with updating a user phone info', error);
        })

    }
    //if phone number invalid display error message
    else{
      $scope.showErrorMessage = true;
      user_info.phone = '';


    }


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