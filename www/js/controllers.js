 angular.module('starter.controllers', [])

 .controller('AppCtrl', function($scope, $ionicModal, $timeout,$localStorage) {

   // With the new view caching in Ionic, Controllers are only called
   // when they are recreated or on app start, instead of every page change.
   // To listen for when this page is active (for example, to refresh data),
   // listen for the $ionicView.enter event:
   //$scope.$on('$ionicView.enter', function(e) {
   //});

   // Form data for the login modal
   $scope.loginData = {};

   // Create the login modal that we will use later
   $ionicModal.fromTemplateUrl('templates/login.html', {
     scope: $scope
   }).then(function(modal) {
     $scope.modal = modal;
   });

   $ionicModal.fromTemplateUrl('templates/facebook-login.html', {
     scope: $scope
   }).then(function(modal) {
     $scope.fb_modal = modal;
   });


   //   $ionicModal.fromTemplateUrl('templates/facebook-login.html', {
   //   scope: $scope
   // }).then(function(modal) {
   //   $scope.fb_modal = modal;
   // });

   // Triggered in the login modal to close it
   $scope.closeNativeLogin = function() {
     $scope.modal.hide();
   };

   // Open the login modal
   $scope.nativeLogin = function() {
     $scope.modal.show();
   };

   // $scope.closeFacebookLogin = function() {
   //   $scope.fb_modal.hide();
   // }

   // Perform the login action when the user submits the login form
   $scope.doLogin = function() {
     // Simulate a login delay. Remove this and replace with your login
     // code if using a login system
     $timeout(function() {
       $scope.closeLogin();
     }, 1000);
   };
 })

 // .controller('PlaylistsCtrl', function($scope) {
 //   $scope.playlists = [{
 //     title: 'Reggae',
 //     id: 1
 //   }, {
 //     title: 'Chill',
 //     id: 2
 //   }, {
 //     title: 'Dubstep',
 //     id: 3
 //   }, {
 //     title: 'Indie',
 //     id: 4
 //   }, {
 //     title: 'Rap',
 //     id: 5
 //   }, {
 //     title: 'Cowbell',
 //     id: 6
 //   }];
 // })

 .controller('PlaylistCtrl', function($scope, $stateParams) {});