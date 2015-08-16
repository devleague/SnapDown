angular.module('starter')

.controller('OauthCtrl', function($scope, $state, $cordovaOauth, $localStorage, $location, FacebookService) {


    $scope.login = function() {
        $cordovaOauth.facebook(FB_SNAPDOWN_ID, ['email']).then(function(result) {
            $localStorage.accessToken = result.access_token;
            FacebookService.login();
            if ($localStorage.registered) {
                $state.go('app.get-user-phone-info');
            } else {
                $state.go('app.app.landing');
            }
        }, function(error) {
            alert('There was a problem signing in!  See the console for logs');
            alert(error);
            console.log(error);
        });
    };

    $scope.logout = function(){
        FacebookService.logout();
        $state.go('app.oauth');
    };

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