'use strict';

angular.module('starter')

  .service('validationService', ['ChallengerService', 'UserStatsService', validationService])

  function validationService(ChallengerService, UserStatsService){

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

      var expiredChallenges = allUsersChallenges.filter(function(challenge){
        return challenge.Challenge.expire_at < Date.now();
      });


      var declinedChallenges = expiredChallenges.filter(function(challenge){
        return challenge.Challenge.Challengers.filter(function(challenge){
          return challenge.user_id == userId;
        })[0].Image === null;
      });

      declinedChallenges.forEach(function(challenge){
        //delete challenger
        var challengerId = challenge.Challenge.Challengers.filter(function(challenger){
          return challenger.user_id == userId;
        })[0].id;

        ChallengerService.removeChallenger(challengerId)
          .success(function (res){

            // UserStatsService.updateDeclineStat(userId)
            //   .success(function (res){

            //   })
            //   .error(function (err){

            //   })
          })
          .error(function (error){

          })
      })
    };
  }


