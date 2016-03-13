// Контроллер, управляющий домашней страницей
function HomeController($rootScope, $scope, $location, $route, $routeParams, FinishedObject, ngDialog, $anchorScroll, $timeout, $sce, Video) {
	// Номер текущей страницы фотогалереи
	$scope.page = $routeParams.page || 1;
	$scope.videoPage = $routeParams.video_page || 1;

	$scope.audioLoading = true;
	$scope.videoLoading = true;
	$scope.needsScrollAfterLoading = false;

	// Кеш страниц фотогалереи
	$scope.audioPages = {};
	$scope.videoPages = {};

	// Отображаемые данные фотогалереи (текущая страница)
	$scope.finishedObjects = [];
	$scope.videos = [];

	// Id отображаемого в модальном окне объекта
	$scope.detailId = $routeParams.detail_id;

	$scope.ngDialogData = {};

	// Реагирование на изменение параметров в ссылке
	$scope.$on('$routeUpdate', function(event, current) { 
		var page = current.params.page || 1;
		var videoPage = current.params.video_page || 1;

		if($scope.page != page) {
			$scope.page = page;
			loadPage();
		}

		if($scope.videoPage != videoPage) {
			$scope.videoPage = videoPage;
			loadVideoPage();
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

	$scope.changeVideoPage = function(page) {
		if(!$scope.videoLoading) {
			$location.search('video_page', page);
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
					$scope.scrollIfNeedsAndNotLoading();
				}
			}, function(data) {
				console.log(data);
			});
		} else {
			// Сразу отображаем, если есть в кеше
			$scope.finishedObjects = existed;
			$scope.audioLoading = false;
			$scope.scrollIfNeedsAndNotLoading();
		}
	}

	function loadVideoPage() {
		$scope.videLoading = true;                   // Запоминаем, что идет загрузка
		var existed = $scope.videoPages[$scope.videoPage]; // Ищем данные в кеше
		if(existed === undefined) {
			// Если в кеше нет, нужно загрузить с сервера
			Video.installation_videos($scope.videoPage, function(data) {
				if(data.success) {
					angular.forEach(data.data, function(video) {
						video.src = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.link);
					});
					$scope.videoPages[$scope.videoPage] = data.data; // Кешируем
					$scope.videos = data.data;         // Отображаем
					$scope.videoLoading = false;
					$scope.scrollIfNeedsAndNotLoading();
				}
			}, function(data) {
				console.log(data);
			});
		} else {
			// Сразу отображаем, если есть в кеше
			$scope.videos = existed;
			$scope.videoLoading = false;
			$scope.scrollIfNeedsAndNotLoading();
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
					currentPagerPosition:'left',
					onSliderLoad: function(el) {
						el.lightGallery({
							selector: '#dialog-slider .lslide'
						});
					} 
				});
			});
		});
	});

	function initSponsors() {
		$(".carouselTicker").carouselTicker({
			// animation speed
			speed: 1,
			// animation delay
			delay: 30,
			// RTL or LTR
			reverse: false
		});
	}

	$scope.trust = function(text) {
		return text;
	}

	$anchorScroll.yOffset = 100;

	$scope.anchorScroll = function() {
		if($scope.videoLoading || $scope.audioLoading) {
			$scope.needsScrollAfterLoading = true;
		} else {
			$anchorScroll();
		}
	};

	$scope.scrollIfNeedsAndNotLoading = function() {
		if(!$scope.videoLoading && !$scope.audioLoading && $scope.needsScrollAfterLoading) {
			$anchorScroll();
			$scope.needsScrollAfterLoading = false;
		}
	}

	$scope.setHash = function(section) {
		$location.hash(section);
	};

	// Первоначальная загрузка
	loadPage();
	loadVideoPage();

	// Открыть диалог, если он указан
	loadObjectInfoAndOpenDialog();

	initSponsors();
}