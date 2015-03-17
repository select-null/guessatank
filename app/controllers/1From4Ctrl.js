'use strict';

application.controller('1From4Ctrl', ['$scope', '$timeout', 'wgService', function($scope, $timeout, wgService){

	var QUESTIONS_IN_TEST = 15;
	var ITEMS_IN_QUESTION = 4;

	$scope.test = {
		questions: [],
		result: 0
	};
	$scope.currentQuestionNo = 0;
	$scope.gameOver = false;

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function generateTest(machines){
		
		$scope.test.questions = [];
		$scope.test.result = 0;
		for(var i = 0; i < QUESTIONS_IN_TEST; i++){
			var question = {
				no: i,
				machines: []
			};
			for(var j = 0; j < ITEMS_IN_QUESTION; j++){
				var randomInt = getRandomInt(0, machines.length - 1);
				var randomMachine = machines[randomInt];
				//исключаем выбранный элемент
				machines.splice(randomInt, 1);
				question.machines.push(randomMachine);
			}
			question.rightAnswerIndex = wgService.getRandomInt(0, 3);
			$scope.test.questions.push(question);
		}
	};

	$scope.newGame = function(){
		wgService.getMachines()
			.then(function(data){
				ga('send', {
					'hitType': 'event',
					'eventCategory': 'button',
					'eventAction': 'click',
					'eventLabel': 'new game "1from4"'
					}
				);
				generateTest(data.data);
				$scope.gameOver = false;
				$scope.currentQuestionNo = 0;
			});
	};

	wgService.getMachines().
		then(function(data){
			generateTest(data.data);
		});

	$scope.setAnswer = function(index){
		var question = $scope.test.questions[$scope.currentQuestionNo];
		question.answer = index;
		question.isRightAnswer = question.answer === question.rightAnswerIndex;
		if (question.isRightAnswer){
			$scope.test.result++;
		}
		if($scope.currentQuestionNo < QUESTIONS_IN_TEST - 1){
			$timeout(function(){
				$scope.currentQuestionNo++;
			}, 200);
		}
		else {
			gameOver();
		}
	};

	function gameOver(){
		$scope.gameOver = true;
	};

}]);