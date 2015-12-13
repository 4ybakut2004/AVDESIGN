// Директива для NinjaSlider
function NgNinjaSlider($compile) {
    return {
        link: function($scope, element, attrs) {
            var nsOptions = {
                sliderId: attrs.id,
                transitionType: "fade", //"fade", "slide", "zoom", "kenburns 1.2" or "none"
                autoAdvance: false,
                delay: "default",
                transitionSpeed: 700,
                aspectRatio: "2:1",
                initSliderByCallingInitFunc: false,
                shuffle: false,
                startSlideIndex: 0, //0-based
                navigateByTap: true,
                pauseOnHover: false,
                keyboardNav: true,
                before: function (currentIdx, nextIdx, manual) { if(manual && typeof mcThumbnailSlider!="undefined") mcThumbnailSlider.display(nextIdx);},
                license: "b2e981"
            };

            var nslider = new NinjaSlider(nsOptions);
        }
    };
}