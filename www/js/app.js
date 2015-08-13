FB_SNAPDOWN_ID = '394498294076827';
SERVER_IP = 'http://10.0.1.41:3000';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic',
  'starter.controllers',
  'ngCordova',
  'ngStorage'
])

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

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode({
  //   enabled:true,
  //   requiredBase:false
  // })
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.landing', {
    url: '/landing',
    views: {
      'menuContent': {
        templateUrl: 'templates/landing.html',
        controller: 'landing-controller'
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
    resolve: {
      factory: ensureAuthenticated
    },
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
    resolve: {
      factory: ensureAuthenticated
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
    resolve: {
      factory: ensureAuthenticated
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/challenge-in-progress.html',
        controller: 'challenge-in-progress-controller'
      }
    }
  })

  .state('app.challenge-complete', {
    url: '/challenge-complete',
    resolve: {
      factory: ensureAuthenticated
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/challenge-complete.html',
        controller: 'challenge-complete-controller'
      }
    }
  })

  .state('app.user-challenged', {
    url: '/user-challenged',
    resolve: {
      factory: ensureAuthenticated
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/user-challenged.html',
        // controller: 'user-challenged-controller'
      }
    }
  })

  .state('app.user-feed', {
    url: '/user-feed',
    resolve: {
      factory: ensureAuthenticated
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/user-feed.html',
        controller: 'user-feed-controller'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/app/oauth');
});

var ensureAuthenticated = function($q, $rootScope, $location, $localStorage, $http) {
  if ($localStorage.accessToken) {
    return true;
  } else {
    var deferred = $q.defer();
    deferred.reject();
    /**
     * $rootScope needs to call $apply in order to render page.
     */
    $location.path('/app/oauth');
    $rootScope.$apply();
    return deferred.promise;
  }
}