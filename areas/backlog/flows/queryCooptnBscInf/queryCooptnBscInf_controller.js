/**
 * 合作伙伴移交审批流程
 */
angular.module('queryCooptnBscInf.controller', [])
    .controller('QueryCooptnBscInfCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope,$ionicPopup,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

        show($ionicLoading);
        $("title").html("合作伙伴移交审批");
        if (approveItem == null) {
            approveItem = {
                businessKey: getQueryString("businessKey"),
                activityId: getQueryString("activityId"),
                taskId: getQueryString("taskId"),
                processInstanceId: getQueryString("processInstanceId"),
            }
            $scope.showHeader = false;
        } else {
            $scope.showHeader = true;
        }



        console.log(approveItem);

     /*   $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;*/

        var params = null;

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            goBackByNum(1);
        };

        function init(initRet){
            if(person == null && initRet!=null){
                person = initRet;
            }

            $scope.queryAprvCstAppData = [];


            $scope.queryCooptnBscInfSuccess = function (msg) {
                $scope.baseData = angular.fromJson(msg.applyvo);
                $scope.$apply();

                /*   $scope.NextStepParams = {
                 flag: '1',
                 taskId: msg.taskId,
                 curInsId: $scope.baseData.outHostDeptID,
                 blngInsId: $scope.baseData.inHostDeptID
                 }
                 */
                $scope.queryCooptnBscInfSuccessMsg = msg;
                console.log(msg);
                console.log($scope.baseData);
                console.log(person);
            }


            AjaxJsonp(SysServiceData('CPC', 'queryCooptnBscInf', [approveItem.businessKey, approveItem.activityId, approveItem.taskId, approveItem.processInstanceId, '']), url.cpc, $scope.queryCooptnBscInfSuccess);


            $scope.approve = function () {
                showCommon($ionicLoading);
                var aprvCoPtnerViewAplyVo = {
                    'msgReqTpcd': '05', // 01：申请审批  02：合作事项流程移交     03：合作事项流程移交    04：查看申请权限审批完成  05：合作事项移交审批
                    //移交合作伙伴权限信息表报文------------------start------------
                    "cooItemId": $scope.queryCooptnBscInfSuccessMsg.bizOptId,	//合作伙伴编号
                    "cooPtnId": $scope.queryCooptnBscInfSuccessMsg.bizOptId,//合作伙伴编号
                    //员工信息 add by wangxiaohui 20170203
                    "empeId": $scope.baseData.blngEmpeId,//申请员工编号
                    "deptId": $scope.baseData.blngDeptId,//申请员工所属机构编号
                    "aprvEmpeId": person.userNum,//审批人编号
                    "aprvDeptId": person.currentGroup.blngDeptCode,//审批人所属机构编号
                    "udtEmpId": person.userNum,//#更新员工编号
                    "udtInsId": person.currentGroup.blngDeptCode,//#更新机构编号
                    //移交伙伴权限信息表报文------------------start------------

                    transEmpId: $scope.baseData.transEmpId,
                    transDeptId: $scope.baseData.transDeptId,
                    transInstId: $scope.baseData.transInstId,

                    //协同审批信息表报文---------------------start------------
                    "bsnEtyType": '40',//业务实体类型
                    "bsnEtyId": $scope.queryCooptnBscInfSuccessMsg.bizOptId,//业务实体编号
                    "aplyEmpId": $scope.baseData.blngEmpeId,//申请员工编号
                    "aplyInsId": $scope.baseData.blngDeptId,//申请机构编号
                    "aprvInsId": person.currentGroup.blngDeptCode,//审批机构编号
                    "aprvEmpId": person.userNum,//审批员工编号
                    "aprvRoleId": person.currentGroup.blngPostCode,// 审批员工岗位ID
                    "aprvStCd": '0',// 审批状态代码	0:已审批；1：未审批
                    "actLinkId": 'PTOA_TRANS_2',// 审批环节代码		(移交提交申请：PTOA_TRANS_1   移交提交 结束审批：PTOA_TRANS_2)
                    "aprvOpns": aprvOpns.value, //审批意见
                    "aprvResult": $("input[name='approve']:checked").val(), //	审批结果
                    "processInstanceId": approveItem.processInstanceId, //#任务实例ID
                    "taskId": approveItem.taskId, //#任务实例ID
                    "blngLglPsnID": "",//所属法人编号
                    "oprEmpId": person.userNum,//当前操作员编号
                    "oprInsId": person.currentGroup.blngDeptCode,//当前操作员所属机构编号
                    "oprRoleId": person.currentGroup.blngPostCode//当前操作员角色编号
                    //协同审批信息表报文---------------------end------------
                };

                var sysUserVO = {
                    userNum: person.userNum,
                    currentGroup: {blngDeptCode: person.currentGroup.blngDeptCode},
                }


                AjaxJsonp(SysServiceData('CPC', 'commitCoPtnerViewAply', [jsonToXml(aprvCoPtnerViewAplyVo), jsonToXml(sysUserVO)]), url.cpc, $scope.submitSuccess);
            };

            $scope.submitSuccess = function (msg) {
                hideCommon($ionicLoading);
                if ('200' == msg.status) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '审批成功'
                    });
                    alertPopup.then(function (res) {
                        goBackByNum(1);
                    });
                }
            }
        }

        if (person != null) {
            init();
        }else{
            getPerson1(getQueryString("loginName"),init);//160590（管护机构调整测试）150218
        }




    })