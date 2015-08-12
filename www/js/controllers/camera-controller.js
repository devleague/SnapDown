angular.module('starter')

.controller('camera-controller', function($scope, Camera, $state) {

  $scope.changeView = function(){
    $state.go('app.select-challenger',{imageURI: 'hello'});
  }

  $scope.pictureURL = 'http://placehold.it/300x300';
  $scope.takePicture = function(){

  };

  ionic.Platform.ready(function(){


    $scope.getPhoto = function() {
      Camera.getPicture({
        quality: 50,
        targetWidth: 320,
        targetHeight: 320,
        destinationType: 0,
        encodingType: 0,
        saveToPhotoAlbum: false
      }).then(function(imageData) {
        if(imageData){
          var imageSrc = "data:image/jpeg;base64," + imageData;
          $state.go('app.select-challenger',{imageURI: imageSrc});
        }
        else{
          $state.go('app.select-challenger',{imageURI: 'imageData undefined'});
        }
      }, function(err) {
        console.err(err);
      });
    };

  })


});