/**
 * Created by Joe on 16/5/7.
 */


/**
 * Created by Joe on 16/5/7.
 */

'use strict';

angular.module('texas.poker.common.player')
    .directive('player', [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'modules/common/player/player.html',
                replace: true,
                transclude: false,
                scope: {
                    player: '='
                },
                controller: function ($scope, $element) {

                    var instance = null;

                    $scope.$watch(function () {
                        return $scope.player.say();
                    }, function (newV, oldV) {
                        if (newV === oldV) {
                            return;
                        }

                        console.log(newV);

                        if (newV) {
                            if (instance) {
                                instance.remove();
                            }
                            instance = new Tooltip({
                                target: $element.find('div.container-fluid').get(0),
                                content: 'My awesome <b>content</b>.',
                                classes: 'tooltip-theme-arrows',
                                position: 'right middle'
                            });

                            instance.open();
                        }
                        else {
                            if (instance) {
                                instance.remove();
                            }
                            instance = null;
                        }
                    });
                }
            };
        }
    ]);