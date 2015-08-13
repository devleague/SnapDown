'use strict';

var DEFAULT_CHALLENGE_LENGTH = 300000;

angular.module('starter')
  .service('RegisterService', ['$http', '$localStorage', '$location', RegisterService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('ChallengeService', ['$http', ChallengeService])
  .service('UserService', ['$http', UserService])



function RegisterService($http, $localStorage, $location) {
  this.createUser = function() {
    if ($localStorage.hasOwnProperty('accessToken') === true) {
      $http.get('https://graph.facebook.com/v2.2/me', {
        params: {
          access_token: $localStorage.accessToken,
          fields: 'id,first_name,last_name,picture,email',
          format: 'json'
        }
      }).then(function(result) {
        var user = {
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          id: result.data.id,
          email: result.data.email,
          picture: result.data.picture.data.url
        };
        return $http.post(SERVER_IP+'/api/register/facebook_register_user', user);
      }, function(error) {
        console.log(error);
      });
    } else {
      alert('Not signed in');
      $location.path('/#/landing');
    }
  }

  this.logout = function(){
    return delete($localStorage.accessToken);
  }

}

function LoginService($http) {
  this.loginUser = function(login_user) {

    //Grab the necessary info from the register form and assign
    //to a user object

    // var user_login = {
    //   username : login_user.username,
    //   password : login_user.password
    // };
    // return $http.post('/api/users/login', user_login);
  }

}

function LogOutService($http) {
  this.logUserOut = function() {
    // return $http.get('/api/users/logout');
  }
}

function PictureService($http) {
  //not added to any controller yet
  this.savePictureToAws = function(s3_reference, privacy_status, challenger_id) {

    var new_image = {

      s3_reference: s3_reference,
      privacy_status: privacy_status,
      challenger_id: challenger_id
    };

    return $http.post('/api/images/', new_image);
  }

  // this.getIndividualPic = function (){

  // }
}

function ChallengeService($http) {
  //will get the current users challenges (for their feed)
  this.getMyChallenges = function(user_id) {

    return $http.get('/api/challengers/' + user_id + '/challenges');
  }

  //Can use the below for a global view at some point in the future
  // //will get all the open challenges in the system
  // this.getAllCurrentChallenges = function (){

  // }

  // //will get all the expired challenges in the systme
  // this.getAllExpiredChallenges = function (){

  // }

  // this.getChallengeUsers = function (){

  // }

  //will allow a User to add other users to the challenge
  //will also be called when a user 'accepts' a challenge request
  this.addUserToChallenge = function(challenger) {

    var new_challenger = {

      initiator: challenger.initiator_flag,
      user_id: challenger.user_id,
      challenge_id: challenger.challenge_id
    };

    return $http.post('/api/challengers', new_challenger);
  }

  //will remove a user from challenge
  //can be from the user who iniated the challenge
  //or when they don't respond to a challenge
  this.removeUserFromChallenge = function(challenger_id) {

    return $http.delete('/api/challenger/' + challenger_id);
  }


  this.createNewChallenge = function(challenge) {

    var new_challenge = {

      start_at: Date.now(),
      expire_at: Date.now() + DEFAULT_CHALLENGE_LENGTH,
      name: challenge.name
    };

    return $http.post('/api/challenges', new_challenge);
  }

  // this.getTimeRemaining = function (){

  // }

  this.getChallengeContext = function(challenge_id) {

    return $http.get('/api/challenges/' + challenge_id + '/context');
  }


}

function UserService($http) {
  // gets a list of all users in the system to populate the select user to challenge page
  this.getAllUsers = function() {
    return $http.get('/api/users/');
  }

  //not in any controller or funcitonality as now
  this.getIndividualUser = function(userId) {
    var user_id = userId
    return $http.get('/api/users/' + user_id);
  }

  //not in any controller - need to grab userid somehow
  this.updateUserInfo = function(user) {

    // var user_id = userId;
    var user_profile = {

      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      facebook_id: user.facebook_id,
      facebook_image_url: user.facebook_image_url,
      email: user.email,
      phone: user.phone
    };

    return $http.put('/api/users/' + user_id, user_profile)

  }

  //not in any controller - need to grab userid somehow
  this.deleteUser = function(userId) {
    var user_id = userId;
    return $http.delete('/api/users/' + user_id)
  }
}