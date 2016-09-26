'use strict';

/**
 * @ngdoc overview
 * @name parkWebApp
 * @description
 * # parkWebApp
 *
 * Main module of the application.
 */
var parkWebApp = {};
var mainView = {};

angular
  .module('parkWebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ui.router',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap',
    'angular-carousel'
  ])
  .run(function () {
    parkWebApp = new Framework7({
        modalTitle: 'Framework7',
        material: true,
        pushState: true, //set it true. It will enable the hash based navigation
        angular: true //set it to true to enable angular binding in Framework pages
    });
    mainView = parkWebApp.addView('.view-main', {});

  })
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $http) {


    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        };
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $stateProvider
      .state('app', {
        url: '/',
        views: {
          header: {
            templateUrl: 'views/header.html',
            controller: 'HeaderCtrl'
          },
          content: {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          },
          leftPanel: {
            templateUrl: 'views/left_panel.html',
            controller: 'LeftCtrl'
          }
        }
      });

      $urlRouterProvider.otherwise('/');

  });
