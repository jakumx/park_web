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
  .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
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

  }]);

'use strict';

angular.module('parkWebApp')
        .constant("baseURL","http://localhost:4000/api")
        .constant("randomUserURL", "https://randomuser.me/api/")
        .service('gameService', ['$resource', 'baseURL', function ($resource, baseURL) {

          this.getGames = function () {
            return $resource(baseURL+"/games/:id", null, {});
          };

        }])
        .service('parkService', ['$resource', 'baseURL', function ($resource, baseURL) {

          this.getParks = function () {
            return $resource(baseURL+"/parks/:id", null, {});
          };

        }])
        .service('randomUserService', ['$resource', 'randomUserURL', function ($resource, randomUserURL) {

          this.getRandomUsers = function () {
            return $resource(randomUserURL + '?results=3' , null, {});
          };

        }])
        .service('globalService', [function () {
          var parkName = null;

          this.setParkName = function (name) {
            parkName = name;
          };

          this.getParkName = function () {
            return parkName;
          };

        }])
        .factory('twitterService', [function() {
          var authorizationResult = false;

          return {
            initialize: function () {
              OAuth.initialize('o1MnHJXhMgJNvA5x_ZmUs1-ux0c', {
                cache:true
              });
              authorizationResult = OAuth.create("twitter");
            },
            isReady: function () {
              return (authorizationResult);
            },
            connectTwitter: function () {
              var promise = new Promise(function (resolve, reject) {
                OAuth.popup('twitter', {
                  cache:true
                }, function (error, result) {
                  if (!error) {
                    authorizationResult = result;
                    console.log(result);
                    resolve();
                  } else {
                    reject();
                  }
                });
              });
              return promise;
            },
            clearCache: function() {
              OAuth.clearCache('twitter');
              authorizationResult = false;
            },
            getAccountInfo: function () {
              var promise = new Promise(function (resolve, reject) {
                authorizationResult.get('/1.1/account/verify_credentials.json').done(function (data) {
                  resolve(data);
                }).fail(function (fail) {
                  reject(fail);
                });
              });
              return promise;
            }
          };

        }])
;

'use strict';

/**
 * @ngdoc function
 * @name parkWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkWebApp
 */
angular.module('parkWebApp')
  .controller('MainCtrl', ['$scope', 'parkService', 'randomUserService', 'globalService', 'gameService',  function ($scope, parkService, randomUserService, globalService, gameService) {
    $scope.parkImages = [];
    $scope.randomUsers = [];
    $scope.rdmSrsFlag = false;
    $scope.gameFlag = false;

    parkService.getParks().get({id: 1})
      .$promise.then(
        function (response) {
          $scope.park = response.data;
          console.log($scope.park.name);
          globalService.setParkName($scope.park.name);
        },
        function (fail) {
          console.log(fail);
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
          console.log(fail);
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

'use strict';

/**
 * @ngdoc function
 * @name parkWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the parkWebApp
 */
angular.module('parkWebApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

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

'use strict';

angular.module('parkWebApp')
  .controller('HeaderCtrl', ['$scope', 'globalService', function ($scope, globalService) {
    $scope.parkName = globalService.getParkName();
    console.log($scope.parkName);
  }]);

angular.module('parkWebApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/header.html',
    "<div class=\"navbar\"> <div class=\"navbar-inner\"> <div class=\"left\"> <a href=\"#\" class=\"link icon-only open-panel\"><i class=\"icon icon-form-name\"></i></a> </div> <div class=\"center\"> {{ parkName }} </div> </div> </div>"
  );


  $templateCache.put('views/left_panel.html',
    "<div class=\"page-content\"> <div class=\"row\"> <div ng-if=\"!connectedTwitter\" class=\"col-100\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h1>Usuario</h1> </div> <button ng-click=\"connectButton()\" type=\"button\" class=\"btn btn-primary\">Connect Twitter</button> </div> </div> <div ng-if=\"connectedTwitter\" class=\"col-100\"> <div class=\"content-block-title\"> <img ng-src=\"{{ profileImage }}\" alt=\"\"> {{ profileName }} </div> <button ng-click=\"signOut()\" type=\"button\" class=\"btn btn-primary\">Sign Out</button> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div ng-if=\"!park\"> <div class=\"row\"> <div class=\"col-100\"> <span class=\"progressbar-infinite\"></span> </div> </div> </div> <div ng-if=\"park\"> <div class=\"row\"> <div class=\"col-100\"> <h1>{{ park.name }}</h1> <h2>{{ park.description }}</h2> </div> </div> <div class=\"row no-gutter\"> <div class=\"col-100\"> <ul rn-carousel rn-carousel-auto-slide=\"8\" rn-carousel-transition=\"fadeAndSlide\" rn-carousel-duration=\"2000\"> <li ng-repeat=\"image in park.images\"> <div class=\"layer\"> <img class=\"image\" ng-src=\"{{ image }}\" width=\"100%\"> </div> </li> </ul> </div> </div> <div class=\"content-block\"> <div class=\"row\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h2> Estas son algunas de nuestras atracciones <div class=\"list-block media-list\"> <ul> <li ng-repeat=\"game in games\"> <a href=\"#\" ng-click=\"openImgBrowser(game.id)\" class=\"item-link item-content\"> <div class=\"item-inner\"> <div class=\"item-title-row\"> <div class=\"item-title\"> {{ game.name }} </div> <div class=\"item-after\"> Ver imagenes </div> </div> <div class=\"item-text\"> {{ game.description }} </div> </div> </a> </li> </ul> </div> </h2> </div> </div> </div> <div class=\"row\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h2>Nuestros Usuarios dicen:</h2> </div> <div ng-if=\"rdmSrsFlag\" class=\"list-block media-list\"> <ul> <li ng-repeat=\"user in randomUsers\"> <div class=\"item-content\"> <div class=\"item-media\"> <img ng-src=\"{{ user.picture.medium }}\" alt=\"\"> </div> <div class=\"item-inner\"> <div class=\"item-inner-row\"> <div class=\"item-title\" style=\"text-transform: uppercase\"> {{ user.name.first }} {{ user.name.last }} </div> </div> <div class=\"item-text\"> {{ user.comment }} </div> </div> </div> </li> </ul> </div> <div ng-if=\"!rdmSrsFlag\"> <span class=\"progressbar-infinite\"></span> </div> </div> </div> <div class=\"row no-gutter\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h2>Nos encontramos en:</h2> </div> </div> <div class=\"col-100\"> <div map-lazy-load=\"https://maps.google.com/maps/api/js\"> <ng-map center=\"{{ park.lat }}, {{ park.lng }}\" zoom=\"5\"> <marker title=\"{{ park.name }}\" position=\"{{ park.lat }}, {{ park.lng }}\"></marker> </ng-map> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/right_panel.html',
    "<div class=\"page-content\"> <div class=\"content-block-title\"> Navegación </div> <div class=\"list-block\"> <ul> <li> <a ui-sref=\"app.locat\">asdfasd</a> <a ui-sref=\"app.locat\" class=\"item-link item-content\"> <span class=\"item-title\"> Ubicaciones </span> </a> </li> <li> <a href=\"\" class=\"item-link item-content\"> <span class=\"item-title\"> Atracciones </span> </a> </li> <li> <a href=\"\" class=\"item-link item-content\"> <span class=\"item-title\"> Contacto </span> </a> </li> </ul> </div> </div>"
  );

}]);
