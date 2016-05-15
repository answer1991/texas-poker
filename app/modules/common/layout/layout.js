/**
 * Created by Joe on 15/10/15.
 */

'use strict';

angular.module('texas.poker.common.layout', [
        'texas.poker.common.layout.default'
    ])
    .config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('layout', {
                abstract: true,
                templateUrl: 'modules/common/layout/layout.html'
            });
        }
    ]);