// Контроллер, управляющий домашней страницей
function HomeController($rootScope, $scope, $location, $route, $routeParams, FinishedObject) {
	// Текущая страница
	$scope.page = $routeParams.page || 1;

	// Завершенные объекты
	$scope.finishedObjects = [];

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
		FinishedObject.all($scope.page, function(data) {
			if(data.success) {
				$scope.finishedObjects = data.data;
			}
		}, function(data) {
			console.log(data);
		});
	}

	$scope.categories = {
		photo: 'photo',
		video: 'video'
	}

	$scope.activeCategory = $scope.categories.photo;

	$scope.changeCategory = function(category) {
		$scope.activeCategory = category;
	};

	//$scope.$on('$routeUpdate', function (angularEvent, current) {});
}