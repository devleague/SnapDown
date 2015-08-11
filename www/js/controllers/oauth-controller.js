angular.module('starter')

.controller('OauthCtrl', function($scope, $cordovaOauth) {

  // $scope.instagramLogin = function() {
  //   $cordovaOauth.instagram("611117305657317", ["basic", "likes"]).then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.digitalOceanLogin = function() {
  //   $cordovaOauth.digitalOcean("611117305657317", "CLIENT_SECRET_HERE").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.dropboxLogin = function() {
  //   $cordovaOauth.dropbox("APP_ID_HERE").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.googleLogin = function() {
  //   $cordovaOauth.google("611117305657317", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.githubLogin = function() {
  //   $cordovaOauth.github("611117305657317", "CLIENT_SECRET_HERE", ["user"]).then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

$scope.facebookLogin = function() {
    $cordovaOauth.facebook("394498294076827", ["email"]).then(function(result) {
        alert(result);
        alert('success');
        console.log(result);
    }, function(error) {
        console.log(error);
    });
}


  // $scope.linkedinLogin = function() {
  //   $cordovaOauth.linkedin("611117305657317", "CLIENT_SECRET_HERE", ["r_emailaddress"], "RANDOM_STATE_STRING_HERE").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.boxLogin = function() {
  //   $cordovaOauth.box("611117305657317", "CLIENT_SECRET_HERE", "RANDOM_STATE_STRING_HERE").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.redditLogin = function() {
  //   $cordovaOauth.reddit("611117305657317", "CLIENT_SECRET_HERE", ["edit"]).then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.twitterLogin = function() {
  //   $cordovaOauth.twitter("CONSUMER_ID_HERE", "CONSUMER_SECRET_HERE").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.meetupLogin = function() {
  //   $cordovaOauth.meetup("CONSUMER_ID_HERE").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.foursquareLogin = function() {
  //   $cordovaOauth.foursquare("611117305657317").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.salesforceLogin = function() {
  //   $cordovaOauth.salesforce("LOGIN_URL_HERE", "611117305657317").then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };

  // $scope.stravaLogin = function() {
  //   $cordovaOauth.strava("611117305657317", "CLIENT_SECRET_HERE", ["SCOPE1", "SCOPE2"]).then(function(result) {
  //     $scope.oauthResult = result;
  //   }, function(error) {
  //     $scope.oauthResult = "OAUTH ERROR (see console)";
  //     console.log(error);
  //   });
  // };


});