angular.module('starter')

.controller('notification-controller', [
  '$scope',
  '$cordovaLocalNotification',
  function($scope, $cordovaLocalNotification) {

    $scope.notify = function() {
      console.log('$cordovaLocalNotification',$cordovaLocalNotification);
      $cordovaLocalNotification.add({
        id: 'welcome_notif',
        title: "This is a local notification",
        text: 'Notification text'
      })
      .then(function() {
        console.log('notification fired');
      });
    };
  }
]);