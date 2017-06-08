import focusIfDirective from './focus-if.directive';
import scrollBottomDirective from './scroll-bottom.directive';

const DirectivesModule = angular.module('DirectivesModule', [])
    .directive('focusIf', focusIfDirective)
    .directive('scrollBottom', scrollBottomDirective)
    ;

export default DirectivesModule;
