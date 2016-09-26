'use strict';

/**
 * @ngdoc function
 * @name parkWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkWebApp
 */
angular.module('parkWebApp')
  .controller('MainCtrl', ['$scope', 'parkService', 'randomUserService', 'gameService',  function ($scope, parkService, randomUserService, gameService) {
    $scope.parkImages = [];
    $scope.randomUsers = [];
    $scope.rdmSrsFlag = false;
    $scope.gameFlag = false;

    parkService.getParks().get({id: 1})
      .$promise.then(
        function (response) {
          $scope.park = response.data;
        },
        function (fail) {
          console.error(fail);
        }
      );

    randomUserService.getRandomUsers().get()
      .$promise.then(
        function (response) {
          $scope.randomUsers = response.results;
          $scope.randomUsers.forEach(function (rUser) {
            rUser.comment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...";
          });
          $scope.rdmSrsFlag = true;
        },
        function (fail) {
          console.error(fail);
        }
      );

    gameService.getGames().get()
      .$promise.then(
        function (response) {
          $scope.games = response.data;
          
          $scope.gameFlag = true;
        },
        function (fail) {
          console.error(fail);
        }
      );

    $scope.openImgBrowser = function (id) {
      var gameFnd = $scope.games.find(function (game) {
        return game.id === id;
      });
      var browserImg = parkWebApp.photoBrowser({
          zoom: 400,
          type: 'popup',
          theme: 'dark',
          photos: gameFnd.images
      });
      browserImg.open();
    };


  }]);
