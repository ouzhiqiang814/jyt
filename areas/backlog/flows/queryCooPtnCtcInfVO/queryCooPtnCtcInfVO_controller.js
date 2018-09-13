/**
 * 合作事项移交审批流程
 */
angular.module('queryCooPtnCtcInfVO.controller', [])
    .controller('QueryCooPtnCtcInfVOCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope, $ionicPopup, $ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        show($ionicLoading);

        $("title").html("合作事项移交流程审批");
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


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            goBackByNum(1);
        };

        function init(initRet) {
            $scope.activityId = approveItem.activityId;
            if (person == null && initRet != null) {
                person = initRet;
            }
            var params = null;


            $scope.queryCooPtnCtcInfVOSuccess = function (msg) {
                $scope.baseData = angular.fromJson(msg.applyvo);
                $scope.$apply();

                $scope.queryCooPtnCtcInfVOSuccessMsg = msg;
                console.log(msg);
                console.log($scope.baseData);
                /*            console.log(person);*/

                /* 附件信息 接口 */
                var sysUserVO = {
                    bsnEtyType: 50,
                    bsnEtyId: $scope.baseData.cooItemId
                }
                var num = 0;
                var size = 10;
                $scope.items = [];

                $scope.fujianSuccess = function (msg) {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.fujianSuccessMsg = msg;
                    $scope.fujianData = msg.content;
                    $scope.$apply();
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

            AjaxJsonp(SysServiceData('CPC', 'queryCooPtnCtcInfVO', [approveItem.businessKey, approveItem.actLinkId, approveItem.TASKID, approveItem.processInstanceId, '']), url.cpc, $scope.queryCooPtnCtcInfVOSuccess);

            /**
             * 审批方法
             */
            $scope.commitTransAprv = function () {
                show($ionicLoading);
                //获取选中的审批结果值
                var aprvResult = $("input[name='approve']:checked").val();
                var bizOptId = $scope.queryCooPtnCtcInfVOSuccessMsg.bizOptId;
                if (!bizOptId) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: "合作伙伴编号不能为空!"
                    });
                    return;
                }
                if (null == aprvResult || "" == aprvResult || aprvResult == undefined) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: "请先选择是否通过选项!"
                    });
                } else {
                    var requesturl = "../aprvcoptnerviewaply/commitcoptnerviewaply";
                    var aprvCoPtnerViewAplyVo = {
                        'msgReqTpcd': '06', // 01：申请审批  02：合作事项流程移交     03：合作事项流程移交    04：查看申请权限审批完成  05：合作事项移交审批   06合作事项移交审批
                        //移交合作伙伴权限信息表报文------------------start------------
                        "cooItemId": bizOptId,	//合作伙伴编号
                        "cooPtnId": bizOptId,//合作伙伴编号
                        //员工信息 add by wangxiaohui 20170203
                        "empeId": $scope.baseData.blngEmpeId,//申请员工编号
                        "deptId": $scope.baseData.blngDeptId,//申请员工所属机构编号
                        "aprvEmpeId": person.userNum,//审批人编号
                        "aprvDeptId": person.currentGroup.blngDeptCode,//审批人所属机构编号
                        "udtEmpId": person.userNum,//#更新员工编号
                        "udtInsId": person.currentGroup.blngDeptCode,//#更新机构编号
                        "blngLglPsnId": "",//所属法人编号
                        "cooItemAndEmpReTpCd": '10',//10 管护权   11 业务权
                        //移交伙伴权限信息表报文------------------start------------

                        transEmpId: $scope.baseData.transEmpId,
                        transDeptId: $scope.baseData.transDeptId,
                        transInstId: $scope.baseData.transInstId,

                        //协同审批信息表报文---------------------start------------
                        "bsnEtyType": '40',//业务实体类型
                        "bsnEtyId": bizOptId,//业务实体编号
                        "aplyEmpId": $scope.baseData.blngEmpeId,//申请员工编号
                        "aplyInsId": $scope.baseData.blngDeptId,//申请机构编号
                        "aprvInsId": person.currentGroup.blngDeptCode,//审批机构编号
                        "aprvEmpId": person.userNum,//审批员工编号
                        "aprvRoleId": person.currentGroup.blngPostCode,// 审批员工岗位ID
                        "aprvStCd": '0',// 审批状态代码	0:已审批；1：未审批
                        "actLinkId": 'PCOA_TRANS_2',// 审批环节代码		(移交提交申请：PTOA_TRANS_1   移交提交 结束审批：PTOA_TRANS_2)
                        "aprvOpns": $("#aprvRmrk").val(), //审批意见
                        "aprvResult": aprvResult, //	审批结果
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
                    };

                    AjaxJsonp(SysServiceData('CPC', 'commitCoPtnerViewAply', [jsonToXml(aprvCoPtnerViewAplyVo), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                        hide($ionicLoading);
                        if (responseVO.status != '200') {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: "提交失败!请稍后再试"
                            });
                        } else {
                            if (aprvResult == 1) {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '审批成功！该合作事项已成功移交至【' + $scope.baseData.transEmpNm + '】！'
                                });
                                alertPopup.then(function (res) {
                                    goBackByNum(1);
                                });
                            }
                            else {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '提交成功！您拒绝了该移交申请！'
                                });
                                alertPopup.then(function (res) {
                                    goBackByNum(1);
                                });
                            }
                        }
                    });
                }
            }
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }

    })