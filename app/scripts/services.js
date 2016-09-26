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
        .factory('twitterService', ['$q', function($q) {
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
                })
              });
              return promise;
            }
          };

        }])
;
