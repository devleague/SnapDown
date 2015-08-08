angular.module('starter')

.controller('camera-controller', function($scope, Camera) {



  $scope.pictureURL = 'http://placehold.it/300x300';

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };
});