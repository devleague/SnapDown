// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// ezfb = easy facebook authentication
// hljs = highlightjs
angular.module('starter', ['ionic', 'starter.controllers', 'ngStorage', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.landing',{
    url: '/landing',
    views: {
      'menuContent': {
        templateUrl: 'templates/landing.html',
        // controller: 'landing-controller'
      }
    }
  })

  .state('app.oauth', {
    url: '/oauth',
    views: {
      'menuContent': {
        templateUrl: 'templates/oauth.html',
        controller: 'OauthCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'profile-controller'
      }
    }
  })

  .state('app.select-challenger', {
    url: '/select-challenger',
    params: {
      imageURI: null

    },
    views: {
      'menuContent': {
        templateUrl: 'templates/select-challenger.html',
        controller: 'select-challenger-controller as SelectChallengeController'
      }
    }
  })

  .state('app.challenge-in-progress', {
    url: '/challenge-in-progress',
    views: {
      'menuContent': {
        templateUrl: 'templates/challenge-in-progress.html',
        // controller: 'challenge-in-progress-controller'
      }
    }
  })

  .state('app.challenge-complete', {
    url: '/challenge-complete',
    views: {
      'menuContent': {
        templateUrl: 'templates/challenge-complete.html',
        // controller: 'challenge-complete-controller'
      }
    }
  })

  .state('app.detail-view', {
    url: '/detail-view',
    views: {
      'menuContent': {
        templateUrl: 'templates/detail-view.html',
        // controller: 'detail-view-controller'
      }
    }
  })

  .state('app.user-challenged', {
    url: '/user-challenged',
    views: {
      'menuContent': {
        templateUrl: 'templates/user-challenged.html',
        // controller: 'user-challenged-controller'
      }
    }
  })

  .state('app.user-feed', {
    url: '/user-feed',
    views: {
      'menuContent': {
        templateUrl: 'templates/user-feed.html',
        controller: 'user-feed-controller'
      }
    }
  })

  .state('app.notification',{
    url: '/notification',
    views: {
      'menuContent' :{
        templateUrl: 'templates/notification.html',
        controller: 'notification-controller'
      }
    }
  })

  .state('app.camera', {
    url: '/camera',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'camera-controller'
      }
    }
  })

  .state('app.push-notifications',{
    url: '/push-notifications',
    views: {
      'menuContent' :{
        templateUrl: 'templates/push-notifications.html',
        controller: 'push-notifications-controller'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/app/landing');
});