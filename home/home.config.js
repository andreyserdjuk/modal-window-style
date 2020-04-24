function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('home', {
    url: '',
    controller: 'HomeCtrl',
    controllerAs: 'vm',
    templateUrl: 'home/home.html'
  });

};

export default HomeConfig;