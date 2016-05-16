/**
 * Created by Joe on 16/5/16.
 */

'use strict';
angular
    .module('texas.poker.test.card', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('test.card', {
                url: '/card',
                templateUrl: 'modules/test/card/card.html',
                resolve: {
                    card: function (httpWrapper, cardService) {
                        return httpWrapper.get('modules/test/card/card.json')
                            .then(function (conf) {
                                return cardService.newCard(conf.cardNum, conf.cardType);
                            });
                    }
                },
                controller: function ($scope, card) {
                    $scope.card = card;
                }
            });
        }
    ]);