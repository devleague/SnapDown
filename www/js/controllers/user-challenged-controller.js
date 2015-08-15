angular.module('starter')

.controller('user-challenged-controller', function($location,$scope, $ionicPlatform, ChallengeService, $stateParams,$rootScope) {
	$scope.allChallengers = [];
	var challengeId = $stateParams.activeChallengeId;

  $scope.getChallengeContext = function() {
		ChallengeService.getChallengeContext(challengeId)
			.success(function(res) {
				$scope.challengeName = res.challenge.name;
				console.log('challengeName', challengeName);
				console.log('challenge context', res);
				$scope.allChallengers = res.challenge.Challengers;
				console.log('all challengers', $scope.allChallengers)
			})
			.error(function(err) {
				console.log('err w/challenge context', err);
			})
	}

	$scope.expireTime = function() {
		if (Date.now() < DataSharingService.startedChallenge.expireAt) {
			var timer = document.querySelector('.timer');
			console.log('timer',timer);
		}else{
			$scope.timerComplete = 'timer stopped';
			var currentPath = $location.path();
			$location.path(currentPath);
			return;
		}
	};

	$ionicPlatform.ready(function() {
		$scope.getChallengeContext();
	});
});