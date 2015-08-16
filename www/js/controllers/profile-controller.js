angular.module('starter')

.controller('profile-controller', function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if ($localStorage.hasOwnProperty('accessToken') === true) {
            $http.get('https://graph.facebook.com/v2.2/me', {
                params: {
                    access_token: $localStorage.accessToken,
                    fields: 'id,first_name,last_name,picture,email',
                    format: 'json'
                }
            }).then(function(result) {
                $scope.profileData = result.data;
                console.log(result.data);
            }, function(error) {
                alert('There was a problem getting your profile.  Check the logs for details.');
                console.log(error);
            });
        } else {
            alert('Not signed in');
            $location.path('/#/login');
        }
    };

});