angular.module('starter')

.controller('select-challenger-controller', function ($localStorage, $scope, UserService, ChallengeService, $state, $stateParams, DataSharingService, MessageServices, ChallengerService, $q) {

  console.log('challenge name', DataSharingService.startedChallenge.name)
  $scope.challengeName = DataSharingService.startedChallenge.name;
  $scope.UserService = UserService;
  $scope.users = [];
  var user_id = 2;
  // var user_id =  $localStorage.activeUserId;



    UserService.getAllUsers()
    .success(function (res){
      console.log('get all users',res);
      var filteredUser = res.filter(function(element,index,array){
        if(element.id === user_id){
          return false;
        }else{
          return true;
        }
        console.log('filteredUser',filteredUser);
      });
      $scope.users = filteredUser;
    })
    .error(function (err){
      console.log('Error with receiving users', err);
    })


    //generates an array of all the checked users
    $scope.usersChecked = [];
    $scope.isChecked = function (bool, user){
      if(bool){
        $scope.usersChecked.push(user);
      }else if($scope.usersChecked.indexOf(user) > -1){
        $scope.usersChecked.splice($scope.usersChecked.indexOf(user),1);
      }
    }

    $scope.combinedUpdate = function(){
      var challengeId = DataSharingService.startedChallenge.id;
      var selectedUsers = $scope.usersChecked;
      // var promise1 = $scope.createChallenger();

      var promiseArray = [$scope.updateChallengeTimes()];
      var promise3 = selectedUsers.forEach(function (user){
        promiseArray.push(ChallengerService.createChallenger(user.id, challengeId, false))
      })

      $q.all(promiseArray)
        .then(function(resArr){
          console.log('resArr', resArr);
          $state.go('app.challenge-in-progress',{
            activeChallengeId: resArr[0].data.id,
            activeChallengeExpireTime: resArr[0].data.expire_at
          });
        }).then(function (){

        })
    };


    $scope.updateChallengeTimes = function(){
      var challengeId = DataSharingService.startedChallenge.id;
      return ChallengeService.updateChallengeTimes(challengeId);
    }


    $scope.sendInvites = function(){

      var invitationObj = {
        users: $scope.usersChecked,
        challengeId: DataSharingService.startedChallenge.id,
        challengerName: 'testName',
        startTime: Date.now()
      };

      MessageServices.sendChallengeInvites(invitationObj);

    };

    // $scope.changeView = function(){
    //   console.log('changing view')
    //   $state.go('app.challenge-in-progress');
    // };




  // $scope.addUserToChallenge = function (){
  //   ChallengeService.addUserToChallenge()
  //   .success(function (res){
  //     console.log('user added to challenge', res)
  //   })
  //   .error(function (err){
  //     console.log('Error with adding user', err);
  //   })
  // };

  // $scope.removeUserFromChallenge = function (){
  //   ChallengeService.removeUserFromChallenge()
  //   .success(function (res){
  //     console.log(res)
  //   })
  //   .error(function (err){
  //     console.log('Error with removing user', err);
  //   })
  // };


});
