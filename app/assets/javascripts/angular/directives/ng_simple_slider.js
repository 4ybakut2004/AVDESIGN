// Директива для NinjaSlider
function NgSimpleSlider($compile) {
    return {
        link: function($scope, element, attrs) {
            $(element).find('img').css('width', $(element).width() + 1);
            $(element).removeClass('simple-slider');

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

            $(window).resize(function() {
              $(element).find('img').css('width', $(element).closest('.lSSlideWrapper').width());
            });
        }
    };
}