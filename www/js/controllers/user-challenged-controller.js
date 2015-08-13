angular.module('starter')

.controller('user-challenged-controller', function($location,$scope, $ionicPlatform, ChallengeService, DataSharingService,$rootScope) {
	$scope.allChallengers = [];

	$scope.getChallengeContext = function() {
		var challengeId = DataSharingService.activeChallenge.id;
		ChallengeService.getChallengeContext(challengeId)
			.success(function(res) {
				console.log('challenge context', res);
				$scope.allChallengers = res.challenge.Challengers;
				console.log('all challengers', $scope.allChallengers)
			})
			.error(function(err) {
				console.log('err w/challenge context', err);
			})
	}

	$scope.expireTime = function() {
		if (Date.now() < DataSharingService.activeChallenge.expireAt) {
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