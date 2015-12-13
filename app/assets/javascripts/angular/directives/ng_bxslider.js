// Директива для bxslider
function NgBxslider($compile) {
	return {
		link: function($scope, element, attrs) {
			element.bxSlider({
				mode: 'fade',
				auto: true,
				autoControls: true,
				pause: 3000
			});
		}
	};
}