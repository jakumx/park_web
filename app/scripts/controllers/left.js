'use strict';

angular.module('parkWebApp')
  .controller('LeftCtrl', ['$scope', '$timeout', 'twitterService', function ($scope, $timeout, twitterService) {
    twitterService.initialize();
    $scope.connectTwitter = false;
    $scope.profileName = "";
    $scope.profileImage = "";

    $scope.connectButton = function() {
        twitterService.connectTwitter()
          .then(function() {
            if (twitterService.isReady()) {
                $scope.connectedTwitter = true;
                twitterService.getAccountInfo().then(
                  function (response) {
                    $scope.profileName = response.name;
                    $scope.profileImage = response.profile_image_url;
                  },
                  function (fail) {
                    console.error(fail);
                  });
            } else {
                console.error('isReady');
            }
        }, function (fail) {
          console.error(fail);
        });
    };
    $scope.signOut = function() {
      twitterService.clearCache();
      $scope.connectedTwitter = false;
    };
  }]);
