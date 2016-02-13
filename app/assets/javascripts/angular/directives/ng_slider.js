// Директива для NinjaSlider
function NgGallerySlider($compile) {
    return {
        link: function($scope, element, attrs) {
            $(element).lightSlider({
              addClass: 'slider_with_vertical_preview',
              gallery:true,
              item:1,
              vertical:true,
              verticalHeight:660,
              vThumbWidth:308,
              thumbItem:3,
              thumbMargin:4,
              slideMargin:0
            });
        }
    };
}