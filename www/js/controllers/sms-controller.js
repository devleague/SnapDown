'use strict'

angular.module('starter')
  .controller('SmsController', ['$ionicPlatform', '$scope', '$cordovaSms',
    function($ionicPlatform, $scope, $cordovaSms) {
      console.log('inside');



      $ionicPlatform.ready(function (){

      $scope.sendSms = function (){
        // $scope.phone = "tapped teapp";
        console.log('success on tap');


        var number = '5169650711';
        var message = 'Merry Christmas';

        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
              intent: 'INTENT'  // send SMS with the native android SMS messaging
              //intent: '' // send SMS without open any other app
          }
        };

        $cordovaSms
          .send(number, message, options)
          .then(function() {
            // Success! SMS was sent
            alert('success');
            $scope.success = 'Success'
          })
          .catch(function(error) {
            // An error occurred
            alert(error);
            $scope.fail = 'fail ' + error
          });

        // try{

        // var success = function () { alert('Message sent successfully'); };
        // var error = function (e) { alert('Message Failed:' + e); };

        // $cordovaSms.send(number, message, options, success, error);

    // }catch(error){
    //   $scope.fail = 'fail ' + error
    // }

    }
      })

  }])