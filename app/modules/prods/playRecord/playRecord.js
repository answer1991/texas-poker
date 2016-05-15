/**
 * Created by Joe on 15/11/24.
 */

'use strict';
angular
    .module('texas.poker.prods.playRecord', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('prods.playRecord', {
                url: '/playRecord',
                templateUrl: 'modules/prods/playRecord/playRecord.html',
                resolve: {
                    meta: function (httpWrapper) {
                        return httpWrapper.get('modules/prods/playRecord/playRecord.json')
                            .then(function (meta) {
                                return meta.data;
                            });
                    }
                },
                controller: function ($scope, meta) {
                    $scope.meta = meta;
                }
            });
        }
    ]);