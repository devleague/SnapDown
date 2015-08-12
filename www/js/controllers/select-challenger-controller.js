angular.module('starter')

.controller('select-challenger-controller', function($scope,$stateParams) {

  $scope.imageURI = $stateParams.imageURI;
  console.log('state params',$stateParams)

});