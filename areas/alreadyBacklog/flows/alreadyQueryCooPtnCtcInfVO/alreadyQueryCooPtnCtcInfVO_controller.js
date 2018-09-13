/**
 * 合作事项移交审批流程
 */
angular.module('alreadyQueryCooPtnCtcInfVO.controller', [])
    .controller('AlreadyQueryCooPtnCtcInfVOCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

        show($ionicLoading);


        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;

        var params = null;

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $scope.queryCooPtnCtcInfVOSuccess = function (msg) {
            $scope.baseData = angular.fromJson(msg.applyvo);
            $scope.$apply();
            $("input[name='approve']").removeAttr("checked");
         //   $("input[name='approve'][value='0']").prop("checked","false");
            $scope.queryCooPtnCtcInfVOSuccessMsg = msg;
            console.log(msg);
            console.log($scope.baseData);

            var doGetColAprvInfVO = {
                bsnEtyId:msg.bizOptId,
                bsnEtyType:'40',
                actLinkId:"PCOA_TRANS_2",
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

            /* 附件信息 接口 */
            var sysUserVO = {
                bsnEtyType: 50,
                bsnEtyId: $scope.baseData.cooItemId
            }
            var num = 0;
            var size = 10;
            $scope.items = [];

            $scope.fujianSuccess = function (msg) {
                $scope.$apply();
                $scope.fujianSuccessMsg = msg;
                console.log(msg);

                $scope.fujianData = msg.content;

                $scope.$broadcast('scroll.refreshComplete');
            }

            AjaxJsonp(SysServiceData('CPC', 'getAttchList', [num, size, jsonToXml(sysUserVO)]), url.cpc, $scope.fujianSuccess);


            //下拉刷新
            $scope.func_refresh = function () {
                $scope.xiangmu = [];
                $scope.finite_state = true;
                pageNo = 1;
                AjaxJsonp(SysServiceData('CPC', 'getAttchList', [num, size, jsonToXml(sysUserVO)]), url.cpc, $scope.fujianSuccess);
            }
        }
        //console.log(url.cpc)
        //console.log(SysServiceData('CPC', 'queryCoPtnerViewAply', [approveItem.businessKey, approveItem.actLinkId, approveItem.TASKID, approveItem.processInstanceId, '','<userNum>'+person.userNum+'</userNum>']));

        AjaxJsonp(SysServiceData('CPC', 'queryCooPtnCtcInfVO', [approveItem.businessKey, approveItem.actLinkId, approveItem.TASKID, approveItem.processInstanceId, '']), url.cpc, $scope.queryCooPtnCtcInfVOSuccess);

      

    })