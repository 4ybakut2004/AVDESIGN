// Контроллер для видеоматериалов
function VideosController($rootScope, $scope, $location, $route, $routeParams, Video) {
	$scope.tutorialPage = $routeParams.tutorialPage || 1;
	$scope.overviewPage = $routeParams.overviewPage || 1;

	// Кеш страниц
	$scope.tutorialPages = {};
	$scope.overviewPages = {};

	// Отображаемые данные
	$scope.tutorials = [];
	$scope.overviews = [];

	// Реагирование на изменение параметров в ссылке
	$scope.$on('$routeUpdate', function(event, current) { 
		var tutorialPage = current.params.tutorialPage || 1;
		var overviewPage = current.params.overviewPage || 1;

		if($scope.overviewPage != overviewPage) {
			$scope.overviewPage = overviewPage;
			loadOverviewPage();
		}

		if($scope.tutorialPage != tutorialPage) {
			$scope.tutorialPage = tutorialPage;
			loadTutorialPage();
		}
	});

	// Меняет страницу на переданную. Слушатель ссылки поймает это и загрузит новую страницу
	$scope.changeTutorialPage = function(page) {
		// Меняем страницу, если только не идет загрузка
		if(!$scope.tutorialLoading) {
			$location.search('tutorial_page', tutorialPage);
		}
	}

	$scope.changeOverviewPage = function(page) {
		if(!$scope.overviewLoading) {
			$location.search('overview_page', overviewPage);
		}
	}

	// Загружает страницу с данными
	function loadTutoialPage() {
		$scope.tutorialLoading = true;                // Запоминаем, что идет загрузка
		var existed = $scope.tutorialPages[$scope.tutorialPage]; // Ищем данные в кеше
		if(existed === undefined) {
			// Если в кеше нет, нужно загрузить с сервера
			Video.tutorial_videos($scope.page, function(data) {
				if(data.success) {
					angular.forEach(data.data, function(video) {
						video.src = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.link);
					});
					$scope.tutorialPages[$scope.tutorialPage] = data.data; // Кешируем
					$scope.tutorials = data.data;         // Отображаем
					$scope.tutorialLoading = false;
				}
			}, function(data) {
				console.log(data);
			});
		} else {
			// Сразу отображаем, если есть в кеше
			$scope.tutorials = existed;
			$scope.tutorialLoading = false;
		}
	}

	function loadOverviewPage() {
		$scope.overviewLoading = true;                // Запоминаем, что идет загрузка
		var existed = $scope.overviewPages[$scope.overviewPage]; // Ищем данные в кеше
		if(existed === undefined) {
			// Если в кеше нет, нужно загрузить с сервера
			Video.overview_videos($scope.page, function(data) {
				if(data.success) {
					angular.forEach(data.data, function(video) {
						video.src = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.link);
					});
					$scope.overviewPages[$scope.overviewPage] = data.data; // Кешируем
					$scope.overviews = data.data;         // Отображаем
					$scope.overviewLoading = false;
				}
			}, function(data) {
				console.log(data);
			});
		} else {
			// Сразу отображаем, если есть в кеше
			$scope.overview = existed;
			$scope.overviewLoading = false;
		}
	}

	// Категории (Фото и Видео)
	$scope.categories = {
		tutorials: 'tutorials',
		overviews: 'overviews'
	}

	$scope.activeCategory = $scope.categories.tutorials;

	$scope.changeCategory = function(category) {
		$scope.activeCategory = category;
	};

	$scope.trust = function(text) {
		return text;
	}

	// Первоначальная загрузка
	loadTutorialPage();
	loadOverviewPage();
}