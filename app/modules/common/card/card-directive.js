/**
 * Created by Joe on 16/5/7.
 */

'use strict';

angular.module('texas.poker.common.card')
    .directive('card', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'modules/common/card/card.html',
                replace: true,
                transclude: false,
                scope: {
                    card: '='
                },
                controller: function () {
                }
            };
        }
    ]);