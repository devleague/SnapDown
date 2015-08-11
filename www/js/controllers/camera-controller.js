angular.module('starter')

.controller('camera-controller', function($scope, Camera, $state) {



  $scope.pictureURL = 'http://placehold.it/300x300';
  $scope.takePicture = function(){

  };

  $scope.changeView = function(){
    $state.go('app.select-challenger',{imageURI: 'hello'});
  }

  ionic.Platform.ready(function(){
    // console.log($cordovaCamera)

    $scope.getPhoto = function() {
      // console.log('taking pic',Camera)
      Camera.getPicture(
        {
          quality: 50,
          targetWidth: 512,
          targetHeight: 512,
          destinationType: 0,
          encodingType: 0,
          saveToPhotoAlbum: false
        }
      )
      .then(function(imageData) {
        if(imageData){
          var imageSrc = "data:image/jpeg;base64," + imageData;
          $state.go('app.select-challenger',{imageURI: imageData});
        }
        else{
          $state.go('app.select-challenger',{imageURI: 'imageData undefined'});
        }
      }, function(err) {
        var imageSrc  = err;
          $state.go('app.select-challenger',{imageURI: Camera.DestinationType});
        })
    };

  })









});