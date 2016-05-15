/**
 * Created by Joe on 16/5/7.
 */

'use strict';

angular.module('texas.poker.common.playRecord')
    .directive('playRecord', [
        'playRecordService',
        function (playRecordService) {
            return {
                restrict: 'E',
                templateUrl: 'modules/common/playRecord/playRecord.html',
                replace: true,
                transclude: false,
                scope: {
                    config: '='
                },
                controller: function ($scope) {
                    $scope.playRecord = playRecordService.newPlayRecord($scope.config);
                }
            };
        }
    ]);