/**
 * Created by Joe on 15/11/24.
 */

'use strict';
angular
    .module('texas.poker.prods.index', [
    ])
    .config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('prods.index', {
                url: '/',
                templateUrl: 'modules/prods/index/index.html'
            });
        }
    ]);