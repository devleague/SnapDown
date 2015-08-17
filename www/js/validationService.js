'use strict';

angular.module('starter')

  .service('validationService', function(){

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


  });