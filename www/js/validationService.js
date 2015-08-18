'use strict';

angular.module('starter')

  .service('validationService', ['ChallengerService', 'UserStatsService', validationService])

  function validationService(ChallengerService, UserStatsService){

  console.log('in here');


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
      console.log('user has submitted',challenge.Challenge.Challengers.filter(function(challenge){
        return challenge.user_id == userId;
      })[0].Image);
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

      console.log('declined challenges from validationService',declinedChallenges)

      declinedChallenges.forEach(function(challenge){
        //delete challenger
        var challengerId = challenge.Challenge.Challengers.filter(function(challenger){
          return challenger.user_id == userId;
        })[0].id;

        console.log('challenger id from validationService',challengerId);



        ChallengerService.removeChallenger(challengerId)
          .success(function(res){
            console.log('challenger removed from declined challenge', res)
            // UserStatsService.updateDeclineStat(userId)
            //   .success(function (res){
            //     console.log('success with decline count', res)
            //   })
            //   .error(function (err){
            //     console.log('err with decline count', err);
            //   })
          })
          .error(function(error){
            console.log('error removing declined challenger',error)
          })
      })
    };
  }


