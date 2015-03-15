'use strict'

var application = angular.module('application', ['ngRoute']);

application.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/yesno', {
			templateUrl: 'views/yesno.html',
			controller: 'yesNoCtrl'
		}).
		when('/1from4', {
			templateUrl: 'views/1from4.html',
			controller: '1From4Ctrl'
		}).
		otherwise({
			redirectTo: '/1from4'
		});
}]);

application.directive('includeReplace', function(){
	return {
		require: 'ngInclude',
		restrict: 'A', /* optional */
		link: function (scope, el, attrs) {
			var _scope = el.children().scope();
			_scope = scope.$parent;
			el.replaceWith(el.children());
		}
	};
});

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