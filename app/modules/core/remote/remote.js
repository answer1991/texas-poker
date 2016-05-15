/**
 * Created by Joe on 16/5/7.
 */

'use strict';

angular.module('texas.poker.core.remote', [])
    .provider('httpWrapper',
        function () {
            var baseUrl = '';

            this.setUrl = function (url) {
                baseUrl = url;
            };

            this.$get = [
                '$http',
                '$q',
                function ($http, $q) {
                    return {
                        getBaseUrl: function () {
                            return baseUrl;
                        },
                        get: function (url, params) {
                            return $http({
                                method: 'GET',
                                url: baseUrl + url,
                                params: params
                            }).then(function (data) {
                                return data.data;
                            }, function (data) {

                                if (data.data) {
                                    return $q.reject(data.data);
                                }
                                return $q.reject('query error, url: ' + url + ', status code : ' + data.status);
                            });
                        },
                        post: function (url, params, data) {
                            return $http({
                                method: 'POST',
                                url: baseUrl + url,
                                data: data,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                params: params
                            }).then(function (data) {
                                return data.data;
                            }, function (data) {
                                if (data.data) {
                                    return $q.reject(data.data);
                                }

                                return $q.reject('post error, url: ' + url + ', status code : ' + data.status);
                            });
                        }
                    };
                }
            ];
        }
    );