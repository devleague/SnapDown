angular.module('starter')

.controller('camera-controller', function($scope, Camera,$state) {



  $scope.pictureURL = 'http://placehold.it/300x300';
  $scope.takePicture = function(){

  };

  $scope.changeView = function(){
    $state.go('app.select-challenger',{imageURI: 'hello'});
  }

  ionic.Platform.ready(function(){
    console.log($cordovaCamera)

    $scope.getPhoto = function() {
      console.log('taking pic',Camera)
      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: false
      })
      .then(function(imageData) {
        if(imageData){
          var imageSrc = "data:image/jpeg;base64," + imageData;
          $state.go('app.select-challenger',{imageURI: imageData});
        }
      }, function(err) {
        var imageSrc  = err;
          $state.go('app.select-challenger',{imageURI: Camera.DestinationType});
        })
    };

  })









});