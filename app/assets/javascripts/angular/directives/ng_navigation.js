// Директива для шапки
function NgNavigation($compile) {
	return {
		link: function($scope, element, attrs) {
			var menuItemSelector = attrs.menuItemSelector || 'ul li a';
			var activeTargetSelector = attrs.activeTargetSelector;
			var menuSelector = attrs.menuSelector;
			var currentSection = undefined;

			element.find(menuItemSelector).on('click', function() {
				var hash = this.hash;
				$('html, body').animate({scrollTop: $(this.hash).offset().top - 100}, 1000, function() {
					$scope.$apply(function() {
						$scope.setHash(hash.substr(1, hash.length));
					})
				});
				return false;
			});

			if(activeTargetSelector !== undefined) {
				$(window).scroll(function(event) {
					Scroll();
				});

				Scroll();
			}

			function Scroll() {
				var contentTop      =   [];
				var contentBottom   =   [];
				var links           =   [];
				var winTop      =   $(window).scrollTop();
				var rangeTop    =   120;
				var rangeBottom =   500;
				element.find(menuItemSelector).each(function(){
					contentTop.push( $( $(this).attr('href') ).offset().top);
					contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
					links.push(this.hash);
				})

				var found = undefined;

				$.each(contentTop, function(i) {
					if (winTop > contentTop[i] - rangeTop){
						element.find(activeTargetSelector)
						.removeClass('active')
						.eq(i).addClass('active');
						found = links[i];
					}
				})

				if(found !== undefined) {
					if(currentSection !== found) {
						currentSection = found;
					}
				} else {
					if(currentSection !== undefined) {
						currentSection = undefined;
					}
				}

				if(menuSelector) {
					if(contentTop[0] > winTop + rangeTop) {
						$(menuSelector).css('display', 'none');
					} else {
						$(menuSelector).css('display', 'block');
					}
				}
			};
		}
	};
}