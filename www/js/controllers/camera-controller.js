angular.module('starter')

.controller('camera-controller', function($scope, Camera) {

    $scope.getPhoto = function() {
      Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
      }, function(err) {
        console.err(err);
      });
    };
});