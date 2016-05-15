/**
 * Created by Joe on 16/5/7.
 */

'use strict';

angular.module('texas.poker.common.player')
    .factory('playerService', [
        'cardService',
        '$log',
        function (cardService, $log) {
            // var StatusMap = {};

            var Player = function (playerInfo) {
                var that = this;

                that.playerInfo = playerInfo;
                that.init();
            };

            Player.prototype = _.assign({
                /**
                 * Playing : 入局中
                 * AllIn: All in,
                 * GiveUp: 弃牌
                 */
                status: 'Playing',
                init: function () {
                    var that = this;

                    that.privateCards = [];
                    _.forEach(that.playerInfo.privateCards, function (cardInfo) {
                        that.privateCards.push(
                            cardService.newCard(cardInfo.cardType, cardInfo.cardNum)
                        );
                    });

                    that.nickname = that.playerInfo.nickname;
                    that.avatar = that.playerInfo.avatar;
                    that.bonus = that.playerInfo.bonus;
                },
                /**
                 *
                 * @param operation 0，弃牌，1 看牌 2.跟牌，3，加注，4，allin
                 * @param amount
                 */
                action: function (operation, amount) {
                    var that = this;

                    if (0 === operation) {
                        $log.debug('Player', that.nickname + ' 弃牌');
                        that.sayContent = '弃牌';
                        that.status = 'GiveUp';
                    }
                    else if (1 === operation) {
                        $log.debug('Player', that.nickname + ' 看牌');
                        that.sayContent = '看牌';
                    }
                    else if (2 === operation) {
                        $log.debug('Player', that.nickname + ' 跟牌');
                        that.sayContent = '跟牌';
                        that.bonus -= amount;
                    }
                    else if (3 === operation) {
                        $log.debug('Player', that.nickname + ' 加注');
                        that.sayContent = '加注';
                        that.bonus -= amount;
                    }
                    else if (4 === operation) {
                        $log.debug('Player', that.nickname + 'All In');
                        that.sayContent = 'All in';
                        that.status = 'AllIn';
                        that.bonus = 0;
                    }
                },
                say: function () {
                    var that = this;
                    return that.sayContent;
                }
            }, Player.prototype);

            var service = {
                newPlayer: function (playerInfo) {
                    return new Player(playerInfo);
                }
            };

            return service;
        }
    ]);