angular.module('starter')

.controller('OauthCtrl', function($scope, $cordovaOauth) {


$scope.facebookLogin = function() {
    $cordovaOauth.facebook("394498294076827", ["email"]).then(function(result) {
        alert(result);
        alert('success');
        console.log(result);
    });
  };

});