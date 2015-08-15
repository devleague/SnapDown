angular.module('starter')

.controller('OauthCtrl', function($scope,$state,$cordovaOauth, $localStorage, $location, RegisterService) {


    $scope.login = function() {
        $cordovaOauth.facebook(FB_SNAPDOWN_ID, ['email']).then(function(result) {
            alert('hello login');
            $localStorage.accessToken = result.access_token;
            RegisterService.createUser();
            $state.go('app.landing');
        }, function(error) {
            alert('There was a problem signing in!  See the console for logs');
            alert(error);
            console.log(error);
        });
    };
});



// $scope.createUser = function (){

//   //make sure the model on the form on the login page
//   //matches the user_info
//   RegisterService.createUser($scope.user_info)
//     .success(function (res){
//       console.log('Register sucess', res);
//     })
//     .error(function (err){
//       console.log('Register err', err);
//     })
// }