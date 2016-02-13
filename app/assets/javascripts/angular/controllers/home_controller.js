// Контроллер, управляющий домашней страницей
function HomeController($rootScope, $scope, $location, $route, $routeParams, FinishedObject, ngDialog, $anchorScroll, $timeout, $sce) {
	// Номер текущей страницы фотогалереи
	$scope.page = $routeParams.page || 1;

	// Кеш страниц фотогалереи
	$scope.audioPages = {};

	// Отображаемые данные фотогалереи (текущая страница)
	$scope.finishedObjects = [];

	// Id отображаемого в модальном окне объекта
	$scope.detailId = $routeParams.detail_id;

	$scope.ngDialogData = {};

	// Реагирование на изменение параметров в ссылке
	$scope.$on('$routeUpdate', function(event, current) { 
		var page = current.params.page || 1;

		if($scope.page != page) {
			$scope.page = page;
			loadPage();
		}

		var detailId = current.params.detail_id;
		if($scope.detailId != detailId) {
			$scope.detailId = detailId;
			if($scope.detailId === undefined) {
				// Если диалог диалог открыт, а в адресной строке его нет, нужно его закрыть.
				closeDialog();
			} else {
				// Если в адресной строке есть диалог, нужно его открыть
				loadObjectInfoAndOpenDialog();
			}
		}
	});

	$scope.updateSectionParams = function(section) {
		$scope.$apply(function() {
			$location.search('section', section);
		});
	}

	// Меняет страницу на переданную. Слушатель ссылки поймает это и загрузит новую страницу
	$scope.changePage = function(page) {
		// Меняем страницу, если только не идет загрузка
		if(!$scope.audioLoading) {
			$location.search('page', page);
		}
	}

	// Загружает страницу с данными
	function loadPage() {
		$scope.audioLoading = true;                   // Запоминаем, что идет загрузка
		var existed = $scope.audioPages[$scope.page]; // Ищем данные в кеше
		if(existed === undefined) {
			// Если в кеше нет, нужно загрузить с сервера
			FinishedObject.all($scope.page, function(data) {
				if(data.success) {
					$scope.audioPages[$scope.page] = data.data; // Кешируем
					$scope.finishedObjects = data.data;         // Отображаем
					$scope.audioLoading = false;
				}
			}, function(data) {
				console.log(data);
			});
		} else {
			// Сразу отображаем, если есть в кеше
			$scope.finishedObjects = existed;
			$scope.audioLoading = false;
		}
	}

	// Категории (Фото и Видео)
	$scope.categories = {
		photo: 'photo',
		video: 'video'
	}

	$scope.activeCategory = $scope.categories.photo;

	$scope.changeCategory = function(category) {
		$scope.activeCategory = category;
	};

	// Диалоговое окно
	$scope.openDialog = function(object) {
		$location.search('detail_id', object.id);
	};

	// Закрывает диалог, если в адресной строке он не указан
	function closeDialog() {
		if($scope.detailId === undefined && ngDialog.isOpen($scope.ngDialogData.ngDialogId)) {
			ngDialog.closeAll();
		}
	}

	// Открывает диалог, если в адресной строке он указан
	function openDialog() {
		if($scope.detailId != undefined) {
			ngDialog.open({
				template: 'static_pages/home_dialog',
				className: 'ngdialog-theme-default',
				data: $scope.ngDialogData,
				scope: $scope
			});
		}
	}

	function loadObjectInfoAndOpenDialog() {
		if($scope.detailId != undefined) {
			FinishedObject.get($scope.detailId, function(data) {
				data.data.description = $sce.trustAsHtml(data.data.description);
				$scope.objectInfo = data.data;
				openDialog();
			}, function(data) {
				console.log(data);
			})
		}
	}

	// На закрытие даилога убираем id из адресной строки
	$rootScope.$on('ngDialog.closed', function (e, $dialog) {
		$scope.$apply(function() {
			$location.search('detail_id', undefined);
			$scope.objectInfo = undefined;
		});
	});

	$rootScope.$on('ngDialog.opened', function (e, $dialog) {
		$scope.$apply(function() {
			$timeout(function() {
				$('#dialog-slider').lightSlider({
					addClass: "dialog_slider",
					adaptiveHeight: true,
					gallery:true,
					item:1,
					loop:true,
					thumbItem:12,
					slideMargin:0,
					enableDrag: false,
					currentPagerPosition:'left'
				});
			});
		});
	});

	$scope.trust = function(text) {
		return text;
	}

	//$anchorScroll.yOffset = 100;
	//$anchorScroll();

	//$scope.gotoSection = function(section) {
	//	$location.hash(section);
	//	$anchorScroll();
	//};

	// Первоначальная загрузка
	loadPage();

	// Открыть диалог, если он указан
	loadObjectInfoAndOpenDialog();
}