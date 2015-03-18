/*
Тебя здесь быть не должно, товарищ.
Но, раз ты здесь, можешь написать все, что ты об этом думаешь на selectnull@mail.ru
*/

'use strict'

var application = angular.module('application', ['ngRoute']);

application.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/wot/yesno', {
			templateUrl: 'app/yesno/yesno.html',
			controller: 'yesNoCtrl',
			resolve: {wgService: 'wgWotService'}
		}).
		when('/wot/1from4', {
			templateUrl: 'app/1from4/1from4.html',
			controller: '1From4Ctrl',
			resolve: {wgService: 'wgWotService'}
		}).
		when('/wow/1from4', {
			templateUrl: 'app/1from4/1from4.html',
			controller: '1From4Ctrl',
			resolve: {wgService: 'wgWowService'}
		}).
		when('/wow/yesno', {
			templateUrl: 'app/yesno/yesno.html',
			controller: 'yesNoCtrl',
			resolve: {wgService: 'wgWowService'}
		}).
		otherwise({
			redirectTo: '/wot/1from4'
		});
}]);

application.directive('analytics', ['$rootScope', '$location', function ($rootScope, $location) {
	return {
		link: function (scope, elem, attrs, ctrl) {
			$rootScope.$on('$routeChangeSuccess', function(event, currRoute, prevRoute) {
				if (currRoute.redirectTo) return;
				ga('set', 'page', $location.path());
				ga('send', 'pageview');
			});
		}
	}
}]);