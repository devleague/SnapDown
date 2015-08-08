'use strict'

angular.module('starter')
  .controller('SmsController', function($ionicPlatform, $scope, $cordovaSms) {

    $ionicPlatform.ready(function (){

        $scope.phoneNumber = '911';

        var number = '5169650711';
        var body = 'Merry Christmas';

        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              intent: 'INTENT'  // send SMS with the native android SMS messaging
              //intent: '' // send SMS without open any other app
          }
        };



      $cordovaSms.send(number, body, options)
      .then(function() {
        // Success! SMS was sent
      }, function(error) {
        // An error occurred
      });

    })

  })