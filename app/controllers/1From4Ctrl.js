'use strict';

application.controller('1From4Ctrl', ['$scope', '$timeout', 'wotService', function($scope, $timeout, wot){

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
				var randomTank = wot.getRandomTank();
				question.tanks.push(randomTank);
			}
			question.rightTankIndex = wot.getRandomInt(0, 3);
			$scope.test.questions.push(question);
		}
	};

	$scope.newGame = function(){
		generateTest();
		$scope.gameOver = false;
		$scope.currentQuestionNo = 0;
	};

	wot.getTanks().
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