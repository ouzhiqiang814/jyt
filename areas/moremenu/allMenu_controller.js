/**
 * Created by wjf on 2017/6/2.
 */
angular.module('allmenu.controller', [])
    .controller('AllmenuCtrl', function ($scope, $http, $stateParams, $state, $rootScope, $timeout, $location, $ionicSideMenuDelegate, $ionicHistory,$ionicModal,$ionicPopup,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        // 返回方法
        $scope.func_goBack = function () {
            MXWebui.closeWindow();
        }

        show($ionicLoading);

        function init(msg) {
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            if(msg==null || msg==''){
                $scope.position = person;
            }else{
                $scope.position = msg;
                $scope.$apply();
            }



            $scope.data = {
                clientSide: $scope.position.currentGroup.groupCode
            };

            $scope.changeGroup = function(item){
                $scope.position.currentGroup =item;
                sessionStorage.setItem("sysUserVoJson", JSON.stringify($scope.position));
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '切换成功！'
                });
                alertPopup.then(function (res) {
                    $scope.modal.hide();
                });

            }

            $scope.showPage = function(url,menu){
                if($.inArray(menu, $scope.position.currentGroup.permissionCodes)>-1){
                    window.location.href=url;
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '无访问权限！'
                    });
                }

            }
            sessionStorage.setItem("sysUserVoJson", JSON.stringify($scope.position));
            hide($ionicLoading);
            document.getElementById("hideMask").style.display= "none";
        }



        document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载
        function onDeviceReady() {
            MXCommon.getCurrentUser(
                function (result) {
                    if(person == null){
                        getPerson1(result.login_name, init);
                    }else{
                        init();
                    }
                }
            );
        }
        // if(person == null){
        //     getPerson1("140181",init);
        // }else{
        //     init();
        // }


    })
