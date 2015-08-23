angular.module('starter')

.controller('OauthCtrl', function($scope, $state, $cordovaOauth, $localStorage, $location, FacebookService) {

    /**
     * Hacky way to allow $state in services.js
     * Leave for now
     */
    $localStorage.$state = $state;


    $scope.login = function() {
        $cordovaOauth.facebook(FB_SNAPDOWN_ID, ['email']).then(function(result) {
            $localStorage.accessToken = result.access_token;
            FacebookService.login();
        },function (error) {

        });
    };

    $scope.logout = function(){
        FacebookService.logout();
        $state.go('app.oauth');
    };

});
