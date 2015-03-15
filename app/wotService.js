'use strict';

application.service('wotService', ['$http', '$q', function($http, $q){

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var tanks = {};

	function getTanks(){
		var result = $q.defer();
		if (!tanks.data){
			$http({
				method: 'GET',
				url: 'https://api.worldoftanks.ru/wot/encyclopedia/tanks/?application_id=c48ad6258dc3f09b5a2269a6afd184b2&fields=image,name_i18n'
			}).
			success(function(data){
				tanks.data = _.values(data.data);
				tanks.count = data.count;
				result.resolve(tanks);
			});
		}
		else{
			result.resolve(tanks);
		}
		return result.promise;
	};

	var getRandomTank = function(){
		//ToDo: fix не использовать до первого вызова getTanks
		var tank = tanks.data[getRandomInt(0, tanks.count - 1)];
		return tank;
	};

	this.getRandomInt = getRandomInt;
	this.getTanks = getTanks;
	this.getRandomTank = getRandomTank;
	
}]);