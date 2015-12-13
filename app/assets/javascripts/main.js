// Создаем AngularJs приложение с указанным в разметке именем
var app = angular.module('App', ['ngRoute']);

// Настройка приложения (Роутинг и т.д.)
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

// Задействуем директивы
app.directive('ngBxslider', ['$compile', NgBxslider]);
app.directive('ngThumbnailSlider', ['$compile', NgThumbnailSlider]);
app.directive('ngNinjaSlider', ['$compile', NgNinjaSlider]);