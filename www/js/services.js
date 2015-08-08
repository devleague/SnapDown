'use strict';

angular.module('starter')
  .service('SmsService', [SmsService])



function SmsService(){
  this.sendSms = function (){
    return 'your data has been returned'
    // return $http.get('/api/sms/');
  }
}