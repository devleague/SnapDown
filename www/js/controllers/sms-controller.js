'use strict'
// var sms = require('../plugins/com.cordova.plugins.sms/www/sms.js');

angular.module('starter')
  .controller('SmsController', function($ionicPlatform, $scope, $cordovaSms) {

    $ionicPlatform.ready(function (){

        $scope.phoneNumber = '911';

        var messageInfo = {
            phoneNumber: "5169650711",
            textMessage: "This is a test message"
        };

        sms.sendMessage(messageInfo, function(message) {
            console.log("success: " + message);
        }, function(error) {
            console.log("code: " + error.code + ", message: " + error.message);
        });

    })

  })