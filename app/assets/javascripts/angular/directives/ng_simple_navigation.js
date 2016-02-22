// Клик по ссылке ведет к прокрутке
function NgSimpleNavigation($compile) {
	return {
		link: function($scope, element, attrs) {
			var menuItemSelector = attrs.menuItemSelector || 'ul li a';

			element.find(menuItemSelector).on('click', function() {
				$('html, body').animate({scrollTop: $(this.hash).offset().top - 100}, 1000, function() {
				});
				return false;
			});
		}
	};
}