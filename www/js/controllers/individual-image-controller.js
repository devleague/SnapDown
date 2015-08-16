angular.module('starter')

.controller('individual-image-controller', function ($scope, $state, $ionicGesture, $stateParams) {

  $scope.imageUrl = $stateParams.imageUrl;
  $scope.challengerName = $stateParams.challengerName;

  $scope.return = function (){
    $state.go($stateParams.previousView, {
      activeChallengeId : $stateParams.activeChallengeId,
      activeChallengeExpireTime: $stateParams.activeChallengeExpireTime
    })
  }
})
