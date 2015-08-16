angular.module('starter')

.controller('OauthCtrl', function($scope,$state,$cordovaOauth, $localStorage, $location, FacebookService) {


    $scope.login = function() {
        $cordovaOauth.facebook(FB_SNAPDOWN_ID, ['email']).then(function(result) {
            $localStorage.accessToken = result.access_token;
            FacebookService.login();
            $state.go('app.get-user-phone-info');
        }, function(error) {
            alert('There was a problem signing in!  See the console for logs');
            alert(error);
            console.log(error);
        });
    };

    $scope.logout = FacebookService.logout;
});



// $scope.createUser = function (){

//   //make sure the model on the form on the login page
//   //matches the user_info
//   FacebookService.createUser($scope.user_info)
//     .success(function (res){
//       console.log('Register sucess', res);
//     })
//     .error(function (err){
//       console.log('Register err', err);
//     })
// }