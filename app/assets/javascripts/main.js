// Создаем AngularJs приложение с указанным в разметке именем
var app = angular.module('App', ['ngRoute', 'ngResource', 'ngDialog']);

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

// Серисы
app.factory('FinishedObject', ['$resource', FinishedObjectService]);
app.factory('Video', ['$resource', VideoService]);

// Задействуем контроллер, управляющий приложением
app.controller(
	'HomeController', [
		'$rootScope', '$scope', '$location',
		'$route', '$routeParams', 'FinishedObject',
		'ngDialog', '$anchorScroll', '$timeout', '$sce',
		'Video', HomeController
	]
);

// Задействуем директивы
app.directive('ngBxslider', ['$compile', NgBxslider]);
app.directive('ngSimpleSlider', ['$compile', NgSimpleSlider]);
app.directive('ngGallerySlider', ['$compile', NgGallerySlider]);
app.directive('ngNavigation', ['$compile', NgNavigation]);
app.directive('ngDialogSlider', ['$compile', NgDialogSlider]);