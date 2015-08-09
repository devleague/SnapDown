var APP_ID = '611117305657317';
var app = angular.module('starter.fb-auth', ['ezfb', 'hljs'])
  /**
   * APP_ID refers to Facebook App ID.  Used only for develop, must change before deploy
   * @type {Number}
   */
.config(function(ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: APP_ID
  });
})

.controller('FbAuthCtrl', function($scope, ezfb, $window, $location, $q, $http, $ionicModal) {
  
  // $ionicModal.fromTemplateUrl('templates/facebook-login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.fb_modal = modal;
  // });

  updateLoginStatus()
    .then(updateApiCall);
  updateMe();

  $scope.login = function() {
    $scope.fb_modal.show();
  };

  /**
   * Subscribe to 'auth.statusChange' event to respond to login/logout
   *
   */
  ezfb.Event.subscribe('auth.statusChange', function(statusRes) {
    $scope.loginStatus = statusRes;

    updateApiCall();
    updateMe();

  });

  $scope.login = function() {
    /**
     * See the following for all available permissions:
     * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
     */
    ezfb.login(null, {
      scope: 'email,user_friends'
    })
  };

  $scope.logout = function() {
    ezfb.logout();
  };

  $scope.share = function() {
    var no = 1,
      callback = function(res) {
        console.log('FB.ui callback execution', no++);
        console.log('response:', res);
      };

    ezfb.ui({
          method: 'feed',
          name: 'Gone in Five!',
          picture: 'http://www.independent.co.uk/incoming/article8465213.ece/alternates/w620/v2-cute-cat-picture.jpg',
          link: 'http://www,google.com',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure facere adipisci sint, facilis impedit officiis asperiores inventore quo, cumque alias a eum rerum odio aperiam, ducimus deserunt voluptas. Hic, quisquam.'
        },
        callback
      )
      .then(callback);
  };

  $scope.postToWall = function(){
    ezfb.api('/{post-id}',function(res){
      if(res.error) throw error

        console.log('res',res);
    })
  }

  /**
   * For generating better looking JSON results
   */
  var autoToJSON = ['loginStatus', 'apiRes'];
  angular.forEach(autoToJSON, function(varName) {
    $scope.$watch(varName, function(val) {
      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
    }, true);
  });

  /**
   * Sets the result of '/me' to the global scope
   */
  function updateMe() {
    ezfb.getLoginStatus()
      .then(function(res) {
        // res: FB.getLoginStatus response
        // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
        $scope.me = me;
        return ezfb.api('/me');
      })
  }

  function updateLoginStatus() {
    return ezfb.getLoginStatus()
      .then(function(res) {
        // res: FB.getLoginStatus response
        // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
        $scope.loginStatus = res;
      });
  }

  function updateApiCall() {
    return $q.all([
        ezfb.api('/me', {
          fields: 'email'
        }, function(res) {
          $http.post('/api/db/add-to-user', {
            data: res
          });
        }),
        ezfb.api('/me/taggable_friends')
      ])
      .then(function(resList) {
        // Runs after both api calls are done
        // resList[0]: FB.api('/me') response
        // resList[1]: FB.api('/me/taggable_friends') response
        $scope.apiRes = resList;
      });
  }
  
});