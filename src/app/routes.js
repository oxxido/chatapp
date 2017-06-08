import HomeTemplate from './components/home/home.html';
// import TestTemplate from './components/home/test/test.html';

uiRouterConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

function uiRouterConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
            url: '/',
            controller: 'HomeController as homeCtrl',
            templateUrl: HomeTemplate,
        })
      /*.state('home/test', {
            url: '/test',
            controller: 'TestController as testCtrl',
            templateUrl: TestTemplate,
        })*/
}


export default uiRouterConfig;
