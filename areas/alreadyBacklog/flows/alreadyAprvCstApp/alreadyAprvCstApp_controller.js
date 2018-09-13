
angular.module('alreadyAprvCstApp.controller', [])
    .controller('AlreadyAprvCstAppCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope,$ionicLoading) {

        show($ionicLoading);
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));


        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;

        var params = null;

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            javascript:history.go(-1);
        };

        $scope.queryAprvCstAppData = [];


        $scope.queryAprvCstAppSuccess = function (msg) {
            $scope.baseData = angular.fromJson(msg.vo);
            $scope.$apply();

            $scope.NextStepParams = {
                flag: '1',
                taskId: msg.taskId,
                curInsId: $scope.baseData.outHostDeptID,
                blngInsId: $scope.baseData.inHostDeptID
            }
            hide($ionicLoading);
        }

        $scope.queryAprvCstApp = function () {
            AjaxJsonp(SysServiceData('CRM', 'aprv_cst_app', [approveItem.actLinkId, approveItem.processInstanceId, approveItem.businessKey, approveItem.taskId, '']), url.crm, $scope.queryAprvCstAppSuccess);
        }
        $scope.queryAprvCstApp();


        $scope.query_aprv_his_listItem = [];
        $scope.query_aprv_his_listSuccess = function (ret) {
            console.log(ret)
            $scope.query_aprv_his_listItem.push.apply($scope.query_aprv_his_listItem, ret.content);
            $scope.$apply();
        }

        $scope.query_aprv_his_listNum = 0;
        $scope.query_aprv_his_listSize = 10;
        $scope.query_aprv_his_list = function () {
            var query_aprv_his_listVo = {
                appId:approveItem.businessKey,
                taskId:approveItem.taskId,
                actLinkId:approveItem.myActivityId,
                processInstanceId:approveItem.processInstanceId,
                bsnEtyType:'CHIUA',
            }
            AjaxJsonp(SysServiceData('CRM', 'query_aprv_his_list', [$scope.query_aprv_his_listNum, $scope.query_aprv_his_listSize, jsonToXml(query_aprv_his_listVo)]), url.crm, $scope.query_aprv_his_listSuccess);
        }
        $scope.query_aprv_his_list();




    })