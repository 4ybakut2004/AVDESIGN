// Создаем AngularJs приложение с указанным в разметке именем
var app = angular.module('App', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$routeProvider.when('/',{
		templateUrl: 'static_pages/home',
		controller: 'HomeController',
		reloadOnSearch: false
	}).otherwise({
		redirectTo: '/'
	});
}]);

// Задействуем контроллер, управляющий приложением
app.controller(
	'HomeController',
	['$rootScope', '$scope', '$location', '$route', '$routeParams', HomeController]
);