'use strict';

angular.module('parkWebApp')
  .controller('HeaderCtrl', ['$scope', 'globalService', function ($scope, globalService) {
    $scope.parkName = globalService.getParkName();
    console.log($scope.parkName);
  }]);
