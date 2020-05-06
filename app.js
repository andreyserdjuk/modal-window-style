import angular from 'angular';
import '@uirouter/angularjs';
import 'ng-file-upload';
import 'angular-recaptcha';

// Import your app stylesheets
import './style.scss';


// Import your app functionality
import './home'

// Create and bootstrap application
const requires = [
  'ui.router',
  'home',
  'ngFileUpload',
  'vcRecaptcha',
];

window.app = angular.module('app', requires);
window.app.constant('isMobile', false);
window.app.constant('addPhotoText', 'GET 10% OFF YOUR NEXT PURCHASE!');
window.app.constant('headerColor', '#005171');

window.Routing = {generate: () => {}};

angular.bootstrap(document.getElementById('app'), ['app']);