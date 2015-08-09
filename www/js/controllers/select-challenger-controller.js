angular.module('starter')

.controller('select-challenger-controller', function($scope,$stateParams) {
  $scope.imageURI = $stateParams.imageURI;
});