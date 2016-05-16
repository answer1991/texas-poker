/**
 * Created by Joe on 15/10/15.
 */

'use strict';

angular
    .module('texas.poker.test', [
        'texas.poker.test.card',
        // 'texas.poker.test.player'
    ])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('test', {
                parent: 'layout.default',
                url: '/test',
                template: '<div ui-view></div>'
            });
        }
    ]);