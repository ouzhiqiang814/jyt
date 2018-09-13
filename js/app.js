angular.module('starter', ['ionic', 'tabSlideBox', 'config', 'global', 'ionicLazyLoad', 'indexdb', 'commonJs', 'ngCordova', 'filter', 'directives', 'route'])

    .run(function ($ionicPlatform, $location, $ionicHistory, $cordovaToast, $rootScope, $cordovaStatusbar, $ionicPopup) {
        $ionicPlatform.ready(function () {
            //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            //for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if (ionic.Platform.isIOS()) {
                ionic.Platform.fullScreen();
            }
            // window.StatusBar.backgroundColorByHexString('#eeb81a');
            //$cordovaStatusbar.styleHex('#FF0000');


            //给android的物理返回按钮添加点击事件
            // 第一个参数是注册的事件，第二个参数是注册事件的优先级
            $ionicPlatform.registerBackButtonAction(function (e) {
                /* alert($location.path());
                 alert($location.path() == "/foot/index");*/
                if ($location.path() == "/foot/index") {

                    var confirmPopup = $ionicPopup.confirm({
                        title: '提示',
                        buttons: [
                            {text: '取消'},
                            {
                                text: '确认',
                                onTap: function (e) {
                                    return true;
                                },
                                type: 'button-positive',
                            },
                        ],
                        template: "是否确认退出系统！"
                    }).then(function (res) {
                        if (res) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
                else {
                   /* if ($location.path() == "power_mana_approve" || $location.path() == "aprv_cst_app" || $location.path() == "querycooptnbscinf"
                        || $location.path() == "querycoptnerviewaply" || $location.path() == "querycooptnctcinfvo") {
                        goBackByNum(1);
                    } else {
                        javascript:history.go(-1);
                    }*/
                }
                e.preventDefault();
                return false
            }, 110);


        });
    })