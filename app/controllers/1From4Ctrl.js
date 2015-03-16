'use strict';

application.controller('1From4Ctrl', ['$scope', '$timeout', 'wgService', function($scope, $timeout, wgService){

	var QUESTIONS_IN_TEST = 15;
	var TANKS_IN_QUESTION = 4;

	var tanks;
	var tanksAmount = 0;

	$scope.test = {
		questions: [],
		result: 0
	};
	$scope.currentQuestionNo = 0;
	$scope.gameOver = false;

	function generateTest(){
		$scope.test.questions = [];
		$scope.test.result = 0;
		for(var i = 0; i < QUESTIONS_IN_TEST; i++){
			var question = {
				no: i,
				tanks: []
			};
			for(var j = 0; j < TANKS_IN_QUESTION; j++){
				var randomTank = wgService.getRandomMachine();
				question.tanks.push(randomTank);
			}
			question.rightTankIndex = wgService.getRandomInt(0, 3);
			$scope.test.questions.push(question);
		}
	};

	$scope.newGame = function(){
		ga('send', {
			'hitType': 'event',
			'eventCategory': 'button',
			'eventAction': 'click',
			'eventLabel': 'new game "1from4"'
			}
		);
		generateTest();
		$scope.gameOver = false;
		$scope.currentQuestionNo = 0;
	};

	wgService.getMachines().
		then(function(data){
			generateTest();
		});

	$scope.setAnswer = function(index){
		var question = $scope.test.questions[$scope.currentQuestionNo];
		question.answer = index;
		question.isRightAnswer = question.answer === question.rightTankIndex;
		if (question.isRightAnswer){
			$scope.test.result++;
		}
		if($scope.currentQuestionNo < QUESTIONS_IN_TEST - 1){
			$timeout(function(){
				$scope.currentQuestionNo++;
			}, 300);
		}
		else {
			gameOver();
		}
	};

	function gameOver(){
		$scope.gameOver = true;
	};

}]);