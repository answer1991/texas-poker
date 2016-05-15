/**
 * Created by Joe on 16/1/15.
 */


'use strict';

angular
    .module('texas.poker.config')
    .config([
        'httpWrapperProvider',
        function (httpWrapperProvider) {
            var href = window.location.href;

            if (_.startsWith(href, 'http://127.0.0.1') || _.startsWith(href, 'http://localhost')) {
                httpWrapperProvider.setUrl('');
            }
        }
    ])
    .run([
        '$http',
        function ($http) {
            var href = window.location.href;

            if (_.startsWith(href, 'http://127.0.0.1') || _.startsWith(href, 'http://localhost')) {
                $http.defaults.headers.common.isTest = 'true';
            }
        }
    ]);