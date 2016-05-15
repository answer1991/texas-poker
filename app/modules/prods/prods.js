/**
 * Created by Joe on 15/10/15.
 */

'use strict';

angular
    .module('texas.poker.prods', [
        'texas.poker.prods.index',
        'texas.poker.prods.playRecord'
    ])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('prods', {
                parent: 'layout.default',
                template: '<div ui-view></div>'
            });
        }
    ]);