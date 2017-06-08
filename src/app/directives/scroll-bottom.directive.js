scrollBottomDirective.$inject = ['$timeout'];

function scrollBottomDirective($timeout) {
    return {
        scope: {
          scrollBottom: "="
        },
        link: function ($scope, $element) {
          $scope.$watchCollection('scrollBottom', function (newValue) {
            if (newValue) {
              $timeout(function(){
                $element[0].scrollTop = $element[0].scrollHeight; //scrollIntoView(false);
              }, 0);
            }
          });
        }
    }
}

export default scrollBottomDirective;
