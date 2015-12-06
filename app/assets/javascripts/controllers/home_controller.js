// Контроллер, управляющий домашней страницей
function HomeController($rootScope, $scope, $location, $route, $routeParams) {
	// Текущая страница
	$scope.page = $routeParams.page || 1;

	// Меняет страницу на переданную
	$scope.changePage = function(page) {
		$location.search({page: page});
		$scope.page = page;
		loadPage();
	}

	// Первоначальная загрузка
	loadPage();

	// Загружает страницу с данными
	function loadPage() {
		console.log($scope.page);
	}

	//$scope.$on('$routeUpdate', function (angularEvent, current) {});
}