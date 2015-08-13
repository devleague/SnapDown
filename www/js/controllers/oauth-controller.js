angular.module('starter')

.controller('OauthCtrl', function($scope, $cordovaOauth, $localStorage, $location) {

    $scope.login = function() {
        $cordovaOauth.facebook("394498294076827", ["email"]).then(function(result) {
            alert(result.access_token);
            $localStorage.accessToken = result.access_token;
            alert('token set');
            $location.path("/#/app/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            alert(error);
            console.log(error);
        });
    };

});