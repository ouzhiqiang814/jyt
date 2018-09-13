/**
 * 线索审批
 */
angular.module('noSupportMobile.controller', [])
    .controller('NoSupportMobileCtrl', function ($scope,  $ionicPopup) {
        $("title").html("暂不支持手机端");
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '暂不支持手机端'
        });
        alertPopup.then(function (res) {
            javascript:history.go(-1);
        });
    })