// Директива для шапки
function NgNavigation($compile) {
	return {
		link: function($scope, element, attrs) {
			var menuItemSelector = attrs.menuItemSelector || 'ul li a';
			var activeTargetSelector = attrs.activeTargetSelector;
			var menuSelector = attrs.menuSelector;

			element.find(menuItemSelector).on('click', function() {  
				$('html, body').animate({scrollTop: $(this.hash).offset().top - 100}, 1000);
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
				var winTop      =   $(window).scrollTop();
				var rangeTop    =   120;
				var rangeBottom =   500;
				element.find(menuItemSelector).each(function(){
					contentTop.push( $( $(this).attr('href') ).offset().top);
					contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
				})

				$.each(contentTop, function(i){
					if ( winTop > contentTop[i] - rangeTop ){
						element.find(activeTargetSelector)
						.removeClass('active')
						.eq(i).addClass('active');
					}
				})

				if(menuSelector) {
					if(contentTop[0] > winTop + rangeTop) {
						$(menuSelector).css('display', 'none');
					} else {
						$(menuSelector).css('display', 'block');
					}
				}
			};

			/*
			// Navigation Scroll
			$(window).scroll(function(event) {
				Scroll();
			});

			element.find('ul li a').on('click', function() {  
				$('html, body').animate({scrollTop: $(this.hash).offset().top - 100}, 1000);
				return false;
			});

			// User define function
			function Scroll() {
				var contentTop      =   [];
				var contentBottom   =   [];
				var winTop      =   $(window).scrollTop();
				var rangeTop    =   200;
				var rangeBottom =   500;
				element.find('.scroll a').each(function(){
					contentTop.push( $( $(this).attr('href') ).offset().top);
					contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
				})
				$.each( contentTop, function(i){
					if ( winTop > contentTop[i] - rangeTop ){
						element.find('li.scroll')
						.removeClass('active')
						.eq(i).addClass('active');
					}
				})
			};*/
		}
	};
}