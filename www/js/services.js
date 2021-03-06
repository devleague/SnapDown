'use strict';

var DEFAULT_CHALLENGE_LENGTH = 300000;


angular.module('starter')
  .service('FacebookService', ['$http', '$localStorage', '$location','$state', FacebookService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('MessageServices', MessageServices)
  .service('ChallengeService', ['$http', ChallengeService])
  .service('UserService', ['$http', UserService])
  .service('ChallengerService', ['$http', ChallengerService])
  .service('DataSharingService', DataSharingService)
  .service('ProviderService', ProviderService)
  .service('UserStatsService', UserStatsService)


function UserStatsService($http){

  this.getUserStats = function (user_id){
    return $http.get(SERVER_IP + '/api/user_statistics/' + user_id)
  }

  this.updateAcceptStat = function (user_id){
    var userAccept = {
      challenges_accepted : 'true'
    }
    return $http.put(SERVER_IP + '/api/user_statistics/' + user_id, userAccept)
  }

  this.updateDeclineStat = function (user_id){
    var userDecline = {
      challenges_declined : 'true'
    }
    return $http.put(SERVER_IP + '/api/user_statistics/' + user_id, userDecline)
  }

  this.updateStartedStat = function (user_id){

    var userStarted = {
      challenges_started : 'true'
    }

    return $http.put(SERVER_IP + '/api/user_statistics/' + user_id, userStarted)
  }

}


//oauth registration
function FacebookService($http, $localStorage, $location, DataSharingService, $state) {
  /**
   * Login flow is as follows:
   *
   * If user entered correct credentials
   *   Assigned credential token
   *   Sends get request to facebook with fields
   *     Fields define the data to be queried from FB
   * Else
   *   Redirect to app.oauth
   *
   * On promise, generates User Info object to send to server via POST
   *   Sets activeUserId to $localStorage
   * @return {[type]} [description]
   */
  this.login = function() {
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

        $http.post(SERVER_IP + '/api/register/facebook_register_user', user).then(function(res) {
          //########## HARD CODE ID HERE #################//
          //###############################################
          /**/$localStorage.activeUserId = res.data.id;
              $localStorage.activeFirstName = res.data.first_name;
          /**/

          //###############################################
          //Displays true of false if user's first time logging in.
          $localStorage.registered = res.data.registered;
          if($localStorage.registered){
            $localStorage.$state.go('app.get-user-phone-info');
          }else{
            $localStorage.$state.go('app.landing')
          }

        });

      }, function (error) {
      });
    } else {
      // alert('Not signed in');
    }
  }

  this.getUserFacebook = function(id) {
    var userId = {
      id: $localStorage.activeUserId
    };
    return $http.post(SERVER_IP + '/api/register/facebook_register_user/info', userId);
  }

  this.logout = function() {
    delete($localStorage.activeUserId);
    delete($localStorage.accessToken);
    delete($localStorage.registered);
    delete($localStorage.activeFirstName);
  }
}


function LoginService($http) {

}

function LogOutService($http) {

}

function PictureService($http) {
  this.sendImageToServer = function(image, challenger_id) {
    var imageData = {
      base64Image: image,
      challenger_id: challenger_id
    };
    return $http.post(SERVER_IP + '/api/upload/', imageData);
  }
};

function MessageServices($http) {
  this.sendChallengeInvites = function(invitationObj) {
    // return $http.post('http://grannygram.softcoreos.devleague.com:8030/api/message/', invitationObj);
    return $http.post(SERVER_IP + '/api/message/', invitationObj);
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

          if(element.Challenge){

            if (!element.Challenge.start_at || !element.Challenge.expire_at) {
              return false;
            } else {
              var date = parseInt(element.Challenge.expire_at.toString());
              var utc = new Date(date);
              element.Challenge.time_elapsed = utc.toUTCString();
              if (Date.now() < date) {
                element.Challenge.state = 'active';
              } else {
                element.Challenge.state = 'inactive';
              }
              return true;
            };
          }else{
            return false;
          }


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
    return $http.get(SERVER_IP + '/api/challengers/' + user_id + '/challenges');
  }

  this.createNewChallenge = function(challenge) {
    var challengeCats = ['Good Morning', 'Good Afternoon', 'Good Night', 'Hello There', 'Watcha Doing?', 'Check this out!', 'SMILE', 'Aloha'];
    var randomIndex = Math.floor((Math.random() * challengeCats.length) + 0);
    var challengeNameGenerator = challengeCats.slice(randomIndex, randomIndex + 1).toString();
    var new_challenge = {
      name: challengeNameGenerator,
      privacy_status: 'public'
    }
    return $http.post(SERVER_IP + '/api/challenges', new_challenge);
  }

  this.updateChallengeTimes = function(challengeId) {
    var updateData = {
      start_at: Date.now(),
      expire_at: Date.now() + DEFAULT_CHALLENGE_LENGTH
    }
    return $http.put(SERVER_IP + '/api/challenges/' + challengeId, updateData);
  }

  this.getChallengeContext = function(challenge_id) {
    return $http.get(SERVER_IP + '/api/challenges/' + challenge_id + '/context');
  }
};

function UserService($http) {
  // gets a list of all users in the system to populate the select user to challenge page
  this.getAllUsers = function() {
    return $http.get(SERVER_IP + '/api/users/');
  }

  this.updateUserPhoneInfo = function(user_id, user_info) {
    var user_phone_info = {
      phone: user_info.phone,
      service_provider: user_info.service_provider.id
    }

    return $http.put(SERVER_IP + '/api/users/' + user_id, user_phone_info)
  }

  // //not in any controller or funcitonality as now
  // this.getIndividualUser = function(userId) {
  //   var user_id = userId
  //   return $http.get('/api/users/' + user_id);
  // }

  //not in any controller - need to grab userid somehow
  // this.updateUserInfo = function(user) {

  //   // var user_id = userId;
  //   var user_profile = {
  //     user_name: user.user_name,
  //     first_name: user.first_name,
  //     last_name: user.last_name,
  //     email: user.email,
  //     phone: user.phone,
  //     service_provider: user.service_provider
  //   };

  // return $http.put('/api/users/' + user_id, user_profile)

  //not in any controller - need to grab userid somehow
  this.deleteUser = function(userId) {
    return $http.delete(SERVER_IP + '/api/users/' + userId)
  }
};

function ChallengerService($http) {

  this.removeChallenger = function (challenger_id){
    return $http.delete(SERVER_IP + '/api/challengers/' + challenger_id)
  }

  this.createChallenger = function(userId, challengeId, initiator) {
    var challenger = {
      initiator_flag: initiator,
      challenge_id: challengeId,
      user_id: userId
    };
    return $http.post(SERVER_IP + '/api/challengers/', challenger);
  }


  this.getChallengerContext = function(user_id) {
    return $http.get(SERVER_IP + '/api/challengers/' + user_id + '/context');
  }

  this.getChallengesWithImages = function(user_id) {
    return $http.get(SERVER_IP + '/api/users/' + user_id + '/challenges/images');
  };
};

function DataSharingService() {

  this.startedChallenge = {};
  this.activeUser = {};
  this.errorLog = {};
  this.challenger = {};
};

function ProviderService($http) {
  this.getAllProviders = function() {
    return $http.get(SERVER_IP + '/api/providers');
  }
};