'use strict';

application.controller('1From4Ctrl', ['$scope', '$timeout', 'wgService', 'helperService', function($scope, $timeout, wgService, hs){

	var QUESTIONS_IN_TEST = 15;
	var ITEMS_IN_QUESTION = 4;

	$scope.test = {
		questions: [],
		result: 0
	};
	$scope.currentQuestionNo = 0;
	$scope.gameOver = false;

	function generateNewTest(machines){

		function createNewQuestion(machines){
			var question = {
				no: 0,
				machines: []
			};
			for(var j = 0; j < ITEMS_IN_QUESTION; j++){
				var randomInt = hs.getRandomInt(0, machines.length - 1);
				var randomMachine = machines[randomInt];
				//исключаем выбранный элемент
				machines.splice(randomInt, 1);
				question.machines.push(randomMachine);
			}
			question.rightAnswerIndex = hs.getRandomInt(0, 3);
			return question;
		}

		var test = {
			questions: [],
			result: 0
		};
		machines = _.groupBy(machines, function(machine){
				return machine.nation;
			});
		machines = _.toArray(machines);
		for(var i = 0; i < QUESTIONS_IN_TEST; i++){
			var nationIndex = hs.getRandomInt(0, _.size(machines) - 1);
			var question = createNewQuestion(machines[nationIndex]);
			question.no = i;
			test.questions.push(question);
			console.log(machines[nationIndex].length);
			if (machines[nationIndex].length < 4){
				machines.splice(nationIndex, 1);
			}
		}
		return test;
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
				$scope.test = generateNewTest(data.data);
				$scope.gameOver = false;
				$scope.currentQuestionNo = 0;
			});
	};

	wgService.getMachines().
		then(function(data){
			$scope.test = generateNewTest(data.data);
		});

	function nextQuestion(){
		if($scope.currentQuestionNo < QUESTIONS_IN_TEST - 1){
			$timeout(function(){
				$scope.currentQuestionNo++;
			}, 200);
		}
		else {
			gameOver();
		};
	};

	$scope.setAnswer = function(index){
		var question = $scope.test.questions[$scope.currentQuestionNo];
		question.answerIndex = index;
		question.isRightAnswer = question.answerIndex === question.rightAnswerIndex;
		if (question.isRightAnswer){
			$scope.test.result++;
		}
		nextQuestion();
	};

	function gameOver(){
		$scope.gameOver = true;
	};

}]);