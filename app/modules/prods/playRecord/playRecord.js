/**
 * Created by Joe on 15/11/24.
 */

'use strict';
angular
    .module('texas.poker.prods.playRecord', [])
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('prods.playRecord', {
                url: '/playRecord?playId',
                templateUrl: 'modules/prods/playRecord/playRecord.html',
                resolve: {
                    meta: function (httpWrapper) {
                        // 这个是测试JSON,就放在这个目录下面
                        return httpWrapper.get('modules/prods/playRecord/playRecord.json')
                            .then(function (meta) {
                                return meta.data;
                            });

                        /**
                         在浏览器输入 http://xx.xx.xx/#/playRecord?palyId=123
                         这个会像服务器请求这个index.html静态文件的相对路径xxxAPI?id=123 接口的数据
                         **/
                        // return httpWrapper
                        //     .get('xxxAPI', {
                        //         id: $stateParams.recordId
                        //     })
                        //     .then(function (ret) {
                        //         // 这个ret就是返回的JSON, 这里可以做处理, 比如只要data属性,不要success=true
                        //         return ret.data;
                        //     });

                        /**
                         * controller的代码不用改
                         */
                    }
                },
                controller: function ($scope, meta) {
                    $scope.meta = meta;
                }
            });
        }
    ]);