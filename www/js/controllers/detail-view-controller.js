angular.module('starter')

.controller('detail-view-controller', function($scope, PictureService) {

  $scope.getIndividualPic = function (){
    PictureService.getIndividualPic()
      .success(function (res){
        console.log('individual pictures', res);
      })
      .error(function (err){
        console.log('err w/ individual pics', err);
      })
  }


});