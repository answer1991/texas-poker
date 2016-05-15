/**
 * Created by Joe on 15/12/11.
 */

'use strict';

angular
    .module('texas.poker.config')
    .config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push(function ($q, $rootScope) {
                return {
                    request: function (config) {
                        return config;
                    },

                    response: function (response) {
                        //$rootScope.$broadcast('401');

                        return response;
                    },
                    responseError: function (response) {
                        if (401 === response.status) {
                            $rootScope.$broadcast('401');
                        }
                        else if (403 === response.status) {
                            $rootScope.$broadcast('403');
                        }
                        return $q.reject(response);
                    }
                };
            });
        }
    ])
    .run([
        '$rootScope',
        function ($rootScope) {
            $rootScope.$on('401', function () {
                console.error(401);
            });
        }
    ])
    .run([
        '$rootScope',
        function ($rootScope) {
            $rootScope.$on('403', function () {
                console.error(403);
            });
        }
    ]);