angular.module('careDels.controller',[])
    .controller('careDelsCtrl', function($scope, $ionicLoading, $timeout,$stateParams,$ionicActionSheet, $state){
        console.log(1)
        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        }; 
        var dels = angular.fromJson(sessionStorage.getItem('eventJson'))
        // var dels = angular.fromJson($stateParams.data);
        console.log(dels)
        $scope.item = {
            title:dels.title,
            person:dels.person,
            createTime:dels.createTime,
            pushTime:dels.pushTime,
            time:dels.time,
            ifPush:dels.ifPush,
            pushState:dels.pushState,
            info:dels.info,
            pushStateBtn:dels.pushStateBtn
        }

        $scope.fnActionSheets = function(){
            $ionicActionSheet.show({
                buttons: [
                  { text: '重新推送' }
                ],
                // destructiveText: '收回',
                titleText: '员工关怀操作',
                cancelText: '取消',
                buttonClicked: function(index) {
                    return true;
                },
                destructiveButtonClicked:function(){
                    return true;
                }
              });
        }

        $scope.fnGetPersonsList = function(){
            $state.go("careList", {
                // data:event
            }, {
                reload: true
            });
        }
    })
    .controller('careListCtrl', function($scope,$ionicLoading,$timeout){
        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        }; 
        var list = angular.fromJson(sessionStorage.getItem('eventJson'))
    })