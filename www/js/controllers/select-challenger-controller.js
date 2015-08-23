angular.module('starter')

.controller('select-challenger-controller', function ($localStorage, $scope, UserService, ChallengeService, $state, $stateParams, DataSharingService, MessageServices, ChallengerService, $q) {

  $scope.challengeName = DataSharingService.startedChallenge.name;
  $scope.UserService = UserService;
  $scope.users = [];



    UserService.getAllUsers()
    .success(function (res){

      var filteredUser = res.filter(function(element,index,array){
        if(element.id === $localStorage.activeUserId){
          return false;
        }else{
          return true;
        }

      });
      $scope.users = filteredUser;
    })
    .error(function (err){

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

      var promiseArray = [$scope.updateChallengeTimes()];
      var promise3 = selectedUsers.forEach(function (user){
        promiseArray.push(ChallengerService.createChallenger(user.id, challengeId, false))
      })

      $q.all(promiseArray)
        .then(function(resArr){

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
        challengerName: $localStorage.activeFirstName,
        startTime: Date.now()
      };

      MessageServices.sendChallengeInvites(invitationObj);

    };

    // $scope.changeView = function(){

    //   $state.go('app.challenge-in-progress');
    // };




  // $scope.addUserToChallenge = function (){
  //   ChallengeService.addUserToChallenge()
  //   .success(function (res){

  //   })
  //   .error(function (err){

  //   })
  // };

  // $scope.removeUserFromChallenge = function (){
  //   ChallengeService.removeUserFromChallenge()
  //   .success(function (res){

  //   })
  //   .error(function (err){

  //   })
  // };


});
