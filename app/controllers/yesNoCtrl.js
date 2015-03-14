'use strict';

application.controller('yesNoCtrl', ['$scope', '$http', 'wotService', function($scope, $http, wot){

	var QUESTIONS_IN_TEST = 15;

	$scope.tanksForTest = [];

	$scope.questions = [];

	$scope.question = {};

	$scope.gameOver = false;

	wot.getTanks().
		then(function(data){
			generateTest();
			$scope.question = $scope.questions[0];
		});

	var generateTest = function(){
		$scope.questions = [];
		for(var i = 0; i < QUESTIONS_IN_TEST; i++){
			var tank = wot.getRandomTank();
			var randomTankName = wot.getRandomTank().name_i18n;
			var luck = wot.getRandomInt(0, 1);
			var publicTankName = luck === 1 ? tank.name_i18n : randomTankName;
			var question = {
				no: i,
				tank: tank,
				publicTankName: publicTankName,
				rightAnswer: publicTankName === tank.name_i18n
			};
			$scope.questions.push(question);
		}
	};

	$scope.answerButtonClick = function(answer){
		var question = $scope.question;
		question.answer = answer;
		question.result = question.rightAnswer === question.answer;
		if (question.no < QUESTIONS_IN_TEST - 1){
			$scope.question = $scope.questions[question.no + 1];	
		}
		else gameOver();
	};

	var gameOver = function(){
		$scope.gameOver = true;
		$scope.questions.result = _.filter($scope.questions, function(question){
			return question.answer === question.rightAnswer;
		}).length;
	};

	$scope.newGame = function(){
		generateTest();
		$scope.question = $scope.questions[0];
		$scope.gameOver = false;
	};

}]);