// Обертка для html вьюшек для выполнения кода после рендеринга
function NgAfterRender($compile, $timeout) {
    return {
        link: function($scope, element, attrs) {
            if(attrs.ngAfterRender !== undefined) {
                $timeout(function() {
                    $scope[attrs.ngAfterRender]();
                });
            }
        }
    };
}