/**
 * 合作伙伴移交审批流程
 */
angular.module('alreadyQueryCooptnBscInf.controller', [])
    .controller('AlreadyQueryCooptnBscInfCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope,$ionicLoading) {
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

        show($ionicLoading);

        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            javascript:history.go(-1);
        };

        $scope.queryAprvCstAppData = [];


        $scope.queryCooptnBscInfSuccess = function (msg) {
            $scope.baseData = angular.fromJson(msg.applyvo);


            $scope.queryCooptnBscInfSuccessMsg = msg;
            console.log(msg);
            $scope.$apply();


            var doGetColAprvInfVO = {
                bsnEtyId:msg.bizOptId,
                bsnEtyType:'40',
                actLinkId:"PTOA_TRANS_2",
                processInstanceId:msg.processInstanceId,
            }


            AjaxJsonp(SysServiceData('CPC', 'doGetColAprvInf', [jsonToXml(doGetColAprvInfVO)]), url.cpc, function(ret){
                hide($ionicLoading);
                $scope.doGetColAprvInfRet = ret.data;
                console.log(ret.data);
                $scope.$apply();
                if(ret.data == null){
                    $("input[name='approve']").removeAttr("checked");
                }else{
                    $("input[name='approve'][value='"+ret.data.aprvResult+"']").prop("checked","checked");
                }
            });

        }


        AjaxJsonp(SysServiceData('CPC', 'queryCooptnBscInf', [approveItem.businessKey, approveItem.activityId, approveItem.taskId, approveItem.processInstanceId, '1']), url.cpc, $scope.queryCooptnBscInfSuccess);



    })