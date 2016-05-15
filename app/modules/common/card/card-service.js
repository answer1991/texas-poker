/**
 * Created by Joe on 16/5/7.
 */


'use strict';

angular.module('texas.poker.common.card')
    .factory('cardService', [
        function () {
            var Card = function (color, number) {
                var that = this;

                that.color = color;
                that.number = number;
            };

            Card.prototype = _.assign({
                /**
                 * Folding: 背面朝上
                 * Open: 正面朝上
                 */
                status: 'Folding',
                fold: function () {
                    var that = this;
                    that.status = 'Folding';
                },
                open: function () {
                    var that = this;
                    that.status = 'Open';
                },
                getStatus: function () {
                    var that = this;
                    return that.status;
                },
                getColor: function () {
                    var that = this;
                    return that.color;
                },
                getNumber: function () {
                    var that = this;
                    return that.number;
                }
            }, Card.prototype);

            var service = {
                newCard: function (color, number) {
                    return new Card(color, number);
                }
            };

            return service;
        }
    ]);