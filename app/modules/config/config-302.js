/**
 * Created by Joe on 16/5/6.
 */
'use strict';

/**
 * 302 是代表一个模型在修改之后提交发现这个模型已经被别人给修改了
 */
angular
    .module('texas.poker.config')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $rootScope) {
            return {
                request: function (config) {
                    return config;
                },

                response: function (response) {
                    return response;
                },
                responseError: function (response) {
                    if (302 === response.status) {
                        $rootScope.$broadcast('302');
                    }
                    return $q.reject(response);
                }
            };
        });
    }])
    .run([
        '$rootScope',
        function ($rootScope) {
            $rootScope.$on('302', function () {
                console.error('302');
            });
        }
    ]);