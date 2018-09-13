// 引导页功能数据请求模块
angular.module('integralquery.service', [])
    .service('IntegralQueryService', function () {
       var data;
        return {
            getData: function () {
                return data;
            },
            setData: function (setData) {
                 data=setData;
            }
        }
    });
