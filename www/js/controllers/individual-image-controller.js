angular.module('starter')

.controller('individual-image-controller', function ($scope, $state, $ionicGesture, $stateParams) {

  $scope.imageUrl = $stateParams.imageUrl;
  $scope.challengerName = $stateParams.challengerName;


})
