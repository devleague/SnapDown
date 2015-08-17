'use strict';

angular.module('starter')

  .service('validationService', ['ChallengeService',function(){

    this.phoneNumberVal = function(value){
      if(!value.match(/\d/g)){
        return false;
      }
      return value.match(/\d/g).length===10;
    }

    this.parseNumber = function(value){
      return  value.match(/\d/g).join('');
    };

    this.userHasSubmitted = function(challenge,userId){
      return challenge.Challenge.Challengers.filter(function(challenge){
        return challenge.user_id == userId;
      })[0].Image;
    };

    this.removeUserFromDeclined = function(allUsersChallenges,userId){
      declinedChallenges = allUsersChallenges.filter(function(challenge){
        return challenge.Challenge.Challengers.filter(function(challenge){
          return challenge.user_id == userId;
        })[0].Image === null;
      });

      declinedChallenges.forEach(function(challenge){
        //delete challenger
        var challengerId = challenge.challenge_id;
        ChallengeService.removeChallenger(challengerId)
          .success(function(res){
            console.log('challenger removed from declined challenge', res)
          })
          .error(function(error){
            console.log('error removing declined challenger',error)
          })
      })
    };


  }]);