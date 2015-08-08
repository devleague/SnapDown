angular.module('starter')

.controller('camera-controller', function($scope, Camera) {



  $scope.pictureURL = 'http://placehold.it/300x300';
  $scope.takePicture = function(){

  };

  $scope.getPhoto = function() {
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      if(imageURI){

        $scope.lastPhoto = imageURI;
      }
    }, function(err) {
      console.err(err);
    });
  };

});