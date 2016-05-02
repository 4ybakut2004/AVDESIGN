// Директива для NinjaSlider
function NgSimpleSlider($compile) {
    return {
        link: function($scope, element, attrs) {
            $(element).lightSlider({
                autoWidth: true,
                item:1,
                slideMargin:0,
                loop:true,
                auto: true,
                pause: 5000,
                controls: false,
                addClass: 'simple-slider'
            });

            setImagesWidth();

            $(window).resize(function() {
              setImagesWidth();
            });

            function setImagesWidth() {
                $(element).find('img').css('width', $(element).closest('.lSSlideWrapper').width());
            }
        }
    };
}