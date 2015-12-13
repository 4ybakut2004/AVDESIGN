// Директива для ThumbnailSlider
function NgThumbnailSlider($compile) {
	return {
		link: function($scope, element, attrs) {
			var thumbnailSliderOptions = {
				sliderId: attrs.id,
				orientation: "vertical",
				thumbWidth: "308px",
				thumbHeight: "218px",
				showMode: 2,
				autoAdvance: true,
				selectable: true,
				slideInterval: 3000,
				transitionSpeed: 900,
				shuffle: false,
				startSlideIndex: 0, //0-based
				pauseOnHover: true,
				initSliderByCallingInitFunc: false,
				rightGap: 0,
				keyboardNav: false,
				mousewheelNav: true,
				before: function (currentIdx, nextIdx, manual) { if (typeof nslider != "undefined") nslider.displaySlide(nextIdx); },
				license: "mylicense"
			};

			var mcThumbnailSlider = new ThumbnailSlider(thumbnailSliderOptions);
		}
	};
}