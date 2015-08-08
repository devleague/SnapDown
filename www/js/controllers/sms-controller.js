'use strict'

angular.module('starter')
  .controller('SmsController', ['$cordovaSms', 'SmsService',
    function($cordovaSms, SmsService){
       document.addEventListener("deviceready", function () {
          $cordovaSms
            .send('5169650711', 'SMS content', options)
            .then(function() {
              // Success! SMS was sent
            }, function(error) {
              // An error occurred
            });
        });
    }]);