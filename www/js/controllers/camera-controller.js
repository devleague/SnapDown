angular.module('starter')

.controller('camera-controller', function($scope, Camera, $state, PictureService) {



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
          targetWidth: 100,
          targetHeight: 100,
          destinationType: 0,
          encodingType: 0,
          saveToPhotoAlbum: false
        }
      )
      .then(function(imageData) {
        if(imageData){
          var imageSrc = "data:image/jpeg;base64," + imageData;
          PictureService.sendImageToServer(imageSrc)
            .then(function(res){
              console.log(res)
            })
          $state.go('app.select-challenger');
        }
        else{
          $state.go('app.select-challenger');
        }
      }, function(err) {
        var imageSrc  = err;
          $state.go('app.select-challenger',{imageURI: Camera.DestinationType});
        })
    };

  })









});