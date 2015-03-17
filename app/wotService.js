'use strict';

application.service('helperService', [function(){

	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var deepCopy = function(data){
		return (JSON.parse(JSON.stringify(data)));
	};

	this.getRandomInt = getRandomInt;
	this.deepCopy = deepCopy;
	
}]);

application.service('wgWotService', ['$http', '$q', 'helperService', function($http, $q, hs){

	var tanks = {};

	function getTanks(){
		var result = $q.defer();
		if (!tanks.data){
			$http({
				method: 'GET',
				url: 'http://api.worldoftanks.ru/wot/encyclopedia/tanks/',
				params: {
					application_id: 'c48ad6258dc3f09b5a2269a6afd184b2',
					fields: 'image,name_i18n'
				}
			}).
			success(function(data){
				tanks.data = _.values(data.data);
				tanks.count = data.count;

				result.resolve(hs.deepCopy(tanks));
			});
		}
		else{
			result.resolve(hs.deepCopy(tanks));
		}
		return result.promise;
	};

	var getRandomTank = function(){
		//ToDo: fix не использовать до первого вызова getTanks
		var tank = tanks.data[hs.getRandomInt(0, tanks.count - 1)];
		return tank;
	};

	this.getMachines = getTanks;
	this.getRandomMachine = getRandomTank;
	
}]);

application.service('wgWowService', ['$http', '$q', 'helperService', function($http, $q, hs){

	var planes = {};

	function getPlanes(){
		var result = $q.defer();
		if (!planes.data){
			$http({
				method: 'GET',
				url: 'http://api.worldofwarplanes.ru/wowp/encyclopedia/planes/',
				params: {
					application_id: 'c48ad6258dc3f09b5a2269a6afd184b2',
					fields: 'images.large,name_i18n'
				}
			}).
			success(function(data){
				planes.data = _.values(data.data).map(function(obj){
					return {
						name_i18n: obj.name_i18n,
						image: obj.images.large
					};
				});
				planes.count = data.count;
				result.resolve(planes);
			});
		}
		else{
			result.resolve(planes);
		}
		return result.promise;
	};

	var getRandomPlane = function(){
		//ToDo: fix не использовать до первого вызова getPlanes
		var plane = planes.data[hs.getRandomInt(0, planes.count - 1)];
		return plane;
	};

	this.getMachines = getPlanes;
	this.getRandomMachine = getRandomPlane;
	
}]);