/**
 * Created by Joe on 15/12/10.
 */

'use strict';


angular
    .module('texas.poker')
    .config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
            $urlRouterProvider.when('', '/');
            $urlRouterProvider.when('/', '/');
        }
    ]);