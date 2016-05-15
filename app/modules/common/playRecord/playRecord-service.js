/**
 * Created by Joe on 16/5/7.
 */


/**
 * Created by Joe on 16/5/7.
 */


'use strict';

angular.module('texas.poker.common.playRecord')
    .factory('playRecordService', [
        'playerService',
        '$interval',
        '$log',
        function (playerService, $interval, $log) {
            /**
             * 每一步间隔多少秒
             * @type {number}
             */
            var STEP_TIME = 1.5;

            var PlayRecord = function (playRecordInfo) {
                var that = this;

                that.playRecordInfo = playRecordInfo;
                that.init();
            };

            PlayRecord.prototype = _.assign({
                init: function () {
                    var that = this;

                    that.destroy();

                    /**
                     * key : userId
                     * value : Player
                     */
                    that.playerMap = {};
                    that.players = [];
                    _.forEach(that.playRecordInfo.aPlayerList, function (playerInfo) {
                        var player = playerService.newPlayer(playerInfo);
                        that.players.push(player);
                        that.playerMap[playerInfo.userId] = player;
                    });

                    that.status = 'Stopped';
                    that.currentStep = 0;
                    that.totalSteps = that.playRecordInfo.actionList.length;
                    that.progress = 0;
                },
                nextStep: function () {
                    var that = this;

                    var action = that.playRecordInfo.actionList[that.currentStep];
                    var player = that.playerMap[action.userId];
                    player.action(action.operation, action.amount);

                    $log.debug('PlayRecord', 'begin play action step : ' + that.currentStep);

                    that.currentStep++;
                    that.progress = (that.currentStep / that.totalSteps) * 100;
                    if (that.currentStep === that.totalSteps) {
                        $log.debug('PlayRecord', 'all action step finished, stop play');
                        that.stop();
                    }
                },
                getProgress: function () {
                    var that = this;
                    return that.progress;
                },
                replay: function () {
                    var that = this;

                    that.init();

                    that.play();
                },
                play: function () {
                    var that = this;

                    if (that.status === 'Playing') {
                        return;
                    }

                    that.status = 'Playing';
                    $log.debug('PlayRecord', 'Play');

                    that.playTimer = $interval(function () {
                        that.nextStep();
                    }, STEP_TIME * 1000);

                    var tickProcess = 100 / ((that.totalSteps) * STEP_TIME * 1000 / 100);
                    that.progressTimer = $interval(function () {
                        that.progress += tickProcess;
                    }, 100);
                    // that.nextStep();
                },
                stop: function () {
                    var that = this;

                    if (that.status === 'Stopped') {
                        return;
                    }

                    that.status = 'Stopped';
                    $log.debug('PlayRecord', 'Stop');

                    $interval.cancel(that.playTimer);
                    $interval.cancel(that.progressTimer);
                },
                destroy: function () {
                    var that = this;
                    that.stop();
                }
            }, PlayRecord.prototype);

            var service = {
                newPlayRecord: function (playRecordInfo) {
                    return new PlayRecord(playRecordInfo);
                }
            };

            return service;
        }
    ]);