import angular from 'angular';
import '@uirouter/angularjs';
import 'ng-file-upload';

// Import your app stylesheets
import './style.scss';


// Import your app functionality
import './home'

// Create and bootstrap application
const requires = [
  'ui.router',
  'home',
  'ngFileUpload'
];

window.app = angular.module('app', requires);

angular.bootstrap(document.getElementById('app'), ['app']);