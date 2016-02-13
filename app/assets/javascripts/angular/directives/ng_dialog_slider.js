// Директива для NinjaSlider
function NgDialogSlider($compile) {
    return {
        link: function($scope, element, attrs) {
            $(element).lightSlider({
              addClass: "dialog_slider",
              gallery:true,
              item:1,
              loop:true,
              thumbItem:12,
              slideMargin:0,
              enableDrag: false,
              currentPagerPosition:'left'
            });
        }
    };
}