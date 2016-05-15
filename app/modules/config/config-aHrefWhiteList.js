/**
 * Created by Joe on 16/4/20.
 */


'use strict';


angular
    .module('texas.poker.config')
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|aliim):/);
    }]);