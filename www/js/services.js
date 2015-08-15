'use strict';

var DEFAULT_CHALLENGE_LENGTH = 100000;


angular.module('starter')
  .service('FacebookService', ['$http','$localStorage', '$location', FacebookService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('MessageServices', MessageServices)
  .service('ChallengeService', ['$http', ChallengeService])
  .service('UserService', ['$http', UserService])
  .service('ChallengerService', ['$http', ChallengerService])
  .service('DataSharingService', DataSharingService)
  .service('ProviderService', ProviderService)


//oauth registration
function FacebookService($http,$localStorage, $location, DataSharingService) {
  
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
        alert('in login');
      $http.get('https://graph.facebook.com/v2.2/me', {
        params: {
          access_token: $localStorage.accessToken,
          fields: 'id,first_name,last_name,picture,email',
          format: 'json'
        }
      }).then(function(result) {
        alert('in promise');
        var user = {
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          id: result.data.id,
          email: result.data.email,
          picture: result.data.picture.data.url
        };

        $http.post(SERVER_IP + '/api/register/facebook_register_user', user).then(function(res) {
          $localStorage.activeUserId = res.data.id;
          alert($localStorage.activeUserId);
        });

      }, function(error) {
        console.log(error);
      });
    } else {
      alert('Not signed in');
    }
  }

  this.getUserFacebook = function(id) {
    var userId = {id:$localStorage.activeUserId};
    return $http.post(SERVER_IP + '/api/register/facebook_register_user/info',userId);


  }

  this.logout = function() {
    alert('user logged out');
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
  this.sendImageToServer = function(image, challenger_id) {

    var imageData = {
      base64Image: image,
      challenger_id: challenger_id
    };
    return $http.post(SERVER_IP + '/api/upload/', imageData);
  }
}

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
    console.log('updating challenge time');
    var updateData = {
      start_at: Date.now(),
      expire_at: Date.now() + DEFAULT_CHALLENGE_LENGTH
    }
    return $http.put(SERVER_IP + '/api/challenges/' + challengeId, updateData);
  }
  this.getChallengeContext = function(challenge_id) {
    return $http.get(SERVER_IP + '/api/challenges/' + challenge_id + '/context');
  }
}

function UserService($http) {
  // gets a list of all users in the system to populate the select user to challenge page
  this.getAllUsers = function() {
    return $http.get(SERVER_IP + '/api/users/');
  }

  this.updateUserPhoneInfo = function(user_id, user_info) {
    console.log('phoneincoming', user_info);

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
    var user_id = userId;
    return $http.delete(SERVER_IP + '/api/users/' + user_id)
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
    return $http.post(SERVER_IP + '/api/challengers/', challenger);
  }


  this.getChallengerContext = function(user_id) {
    return $http.get(SERVER_IP + '/api/challengers/' + user_id + '/context');
  }



};

function DataSharingService() {

  this.startedChallenge = {};
  this.activeUser = {};
  this.errorLog = {};
};

function ProviderService($http) {
  this.getAllProviders = function() {
    return $http.get(SERVER_IP + '/api/providers');
  }
}
