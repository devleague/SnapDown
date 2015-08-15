'use strict';

var DEFAULT_CHALLENGE_LENGTH = 500000;


angular.module('starter')
  .service('RegisterService', ['$http', RegisterService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('MessageServices', MessageServices)
  .service('ChallengeService', ['$http', ChallengeService])
  .service('UserService', ['$http', UserService])
  .service('ChallengerService', ['$http', ChallengerService])
  .service('DataSharingService', DataSharingService)



function RegisterService($http) {
  this.createUser = function(new_user) {

    //Grab the necessary info from the register form and assign
    //to a user object

    //get info from Facebook
    var facebook_id = facebookid;
    var facebook_image_url = facebookimage;

    var new_register = {
      first_name: new_user.first_name,
      last_name: new_user.last_name,
      facebook_id: facebook_id,
      facebook_image_url: facebook_image_url,
      email: new_user.email,
      phone: new_user.phone
    };

    return $http.post('/api/users/', new_register);
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
  this.sendImageToServer = function (image, challenger_id){

    var imageData = {
      base64Image : image,
      challenger_id : challenger_id
    };
    // return $http.post('http://localhost:3000/api/upload/', imageURI);
    return $http.post('http://grannygram.softcoreos.devleague.com:8030/api/upload/', imageData);
  }
}

function MessageServices($http) {
  this.sendChallengeInvites = function(invitationObj) {
    // return $http.post('http://localhost:3000/api/message/', invitationObj);
    return $http.post('http://localhost:3000/api/message/', invitationObj);
  }
};

function ChallengeService($http) {
  //will get the current users challenges (for their feed)
  /**
   * Filters challenges to show only those who have been started & completed;
   * @param  {[Array]} challengeArr [Array of Challenges]
   * @return {[Array]}              [Array of filtered Challenges]
   */
  this.filterChallenges = function(challengeArr) {

      var filteredChallenges = challengeArr.filter(function(element, index, array) {
        if (!element.start_at || !element.expire_at) {
          return false;
        } else {
          var date = parseInt(element.expire_at.toString());
          var utc = new Date(date);
          element.time_elapsed = utc.toUTCString();
          if (Date.now() < date) {
            element.state = 'active';
          } else {
            element.state = 'inactive';
          }
          return true;
        };
      })
      /**
       * Sorts array by most recently added.
       */
      filteredChallenges = filteredChallenges.sort(function(a, b) {
        return b.expire_at - a.expire_at
      });
      return filteredChallenges;
    }
    /**
     * [Returns an array of all active challenges]
     * @param  {[Array]} challengeArr [Array of Challenges]
     * @return {[Array]}              [Array of Active Challenges]
     */
  this.getActiveChallenges = function(challengeArr) {
    console.log(challengeArr);
    var activeChallenges = challengeArr.filter(function(element, index, array) {
      if (element.state === 'active') {
        return true;
      } else {
        return false;
      }
    })
      return activeChallenges;
  }


  this.getMyChallenges = function(user_id) {
    return $http.get('http://localhost:3000/api/challengers/' + user_id + '/challenges');
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
  // this.addUserToChallenge = function (challenger) {

  //   var new_challenger = {

  //     initiator: challenger.initiator_flag,
  //     user_id: challenger.user_id,
  //     challenge_id: challenger.challenge_id
  //   };

  //   return $http.post('/api/challengers', new_challenger);
  // }

  // //will remove a user from challenge
  // //can be from the user who iniated the challenge
  // //or when they don't respond to a challenge
  // this.removeUserFromChallenge = function (challenger_id){

  //   return $http.delete('/api/challenger/' + challenger_id);
  // }


  this.createNewChallenge = function(challenge) {

    var challengeCats = ['Good Morning', 'Good Afternoon', 'Good Night', 'Hello There', 'Watcha Doing?', 'Check this out!', 'SMILE', 'Aloha'];
    var randomIndex = Math.floor((Math.random() * challengeCats.length) + 0);

    var challengeNameGenerator = challengeCats.slice(randomIndex, randomIndex + 1).toString();

    var new_challenge = {
      name: challengeNameGenerator,
      privacy_status: 'public'
    };

    return $http.post('http://localhost:3000/api/challenges', new_challenge);
  }

  this.updateChallengeTimes = function(challengeId) {
    console.log('updating challenge time');
    var updateData = {
      start_at: Date.now(),
      expire_at: Date.now() + DEFAULT_CHALLENGE_LENGTH
    }

    return $http.put('http://localhost:3000/api/challenges/' + challengeId, updateData);
  }



  this.getChallengeContext = function(challenge_id) {

    return $http.get('http://localhost:3000/api/challenges/' + challenge_id + '/context');
  }


}

function UserService($http) {
  // gets a list of all users in the system to populate the select user to challenge page
  this.getAllUsers = function() {
    return $http.get('http://localhost:3000/api/users/');
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
      email: user.email,
      phone: user.phone,
      service_provider: user.service_provider
    };

    return $http.put('/api/users/' + user_id, user_profile)
  }

  //not in any controller - need to grab userid somehow
  this.deleteUser = function(userId) {
    var user_id = userId;
    return $http.delete('/api/users/' + user_id)
  }
}

function ChallengerService($http) {

  this.createChallenger = function(userId, challengeId, initiator) {
    console.log('creating challenger', userId, challengeId, initiator)
    var challenger = {
      initiator_flag: initiator,
      challenge_id: challengeId,
      user_id: userId
    };
    return $http.post('http://localhost:3000/api/challengers/', challenger);
  }


  this.getChallengerContext = function (user_id){
    console.log('get me the challenge context');
    return $http.get('http://localhost:3000/api/challengers/' + user_id + '/context');
  }



};

function DataSharingService() {

  this.startedChallenge = {};
  this.activeUser = {};
  this.errorLog = {};
};