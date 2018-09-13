/**
 * 管护机构调整审批流程
 */
angular.module('aprvCstApp.controller', [])
    .controller('AprvCstAppCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope, $ionicLoading, $ionicPopup) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        show($ionicLoading);
        $("title").html("管护机构调整流程审批");
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
            goBackByNum(1);
        };

        function init(initRet) {
            $scope.activityId = approveItem.activityId;
            if(person == null && initRet!=null){
                person = initRet;
            }

            $scope.queryAprvCstAppData = [];


            $scope.queryAprvCstAppSuccess = function (msg) {
                $scope.baseData = angular.fromJson(msg.vo);
                $scope.$apply();
                hide($ionicLoading);
                $scope.NextStepParams = {
                    flag: '1',
                    taskId: msg.taskId,
                    curInsId: $scope.baseData.outHostDeptID,
                    blngInsId: $scope.baseData.inHostDeptID
                }



                console.log(msg);
                console.log($scope.baseData);
            }

            $scope.queryAprvCstApp = function () {
                AjaxJsonp(SysServiceData('CRM', 'aprv_cst_app', [approveItem.actLinkId, approveItem.processInstanceId, approveItem.businessKey, approveItem.taskId, '']), url.crm, $scope.queryAprvCstAppSuccess);
            }
            $scope.queryAprvCstApp();

            $scope.queryNextStepInfo = function (msg) {
                var selectUser = {
                    orgCode: msg.orgCode,// msg.orgCode,
                    roleCode: msg.roleCode
                }
                $scope.roleCode = msg.roleCode;
                goSelectUser(selectUser);
            }

            //
            $scope.approve = function () {
                $scope.aprvOpns = aprvOpns.value;
                console.log(jsonToXml($scope.NextStepParams));
                /* AjaxJsonp(SysServiceData('CRM', 'queryNextTask', [jsonToXml($scope.NextStepParams)]), url.crm, $scope.queryNextStepInfo);
                 */
                $scope.queryNextStepInfo({"orgCode":$scope.baseData.inHostDeptID, "roleCode": "J000000012"});
            };

            $scope.approveEnd = function(){
                $scope.aprvOpns = aprvOpns.value;
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
                    template: "确定审批通过?"
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        showCommon($ionicLoading);
                        if( $scope.activityId == 'ACT_3'|| $scope.activityId == 'ACT_4'){
                            var aprvUser = {userNum:$scope.baseData.inHostEmpID ,orgCode:'J000000008'};
                            aprv('1',aprvUser,'J000000008');
                        }
                    }
                });
            }

            function aprv(status, aprvUser, roleCode) {
                var aprvEmpID = '';
                var aprvInsID = '';
                if(aprvUser != null && aprvUser != undefined){
                    aprvEmpID=aprvUser.userNum;
                    aprvInsID= $scope.baseData.inHostInsID;//aprvUser.orgCode;
                }
                var params = {
                    actLinkId: approveItem.activityId,
                    taskId: approveItem.taskId,
                    processInstanceId: approveItem.processInstanceId,
                    status: status,
                    appId: $scope.baseData.appId,
                    aprvOpns: $scope.aprvOpns,
                    aprvInsID: aprvInsID,
                    aprvEmpID: aprvEmpID,
                    aprvRoleID: roleCode
                };

                var sysUserVO = {
                    userNum: person.userNum,
                    orgCode: person.currentGroup.organization.orgCode,
                    roleCode: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                        blngOrgCode: person.currentGroup.blngOrgCode,

                    }
                }

                AjaxJsonp(SysServiceData('CRM', 'process_aprv_cst_inst_app', [jsonToXml(params), jsonToXml(sysUserVO)]), url.crm, $scope.submitSuccess1);


            }

            $scope.quit = function () {

                var aprvOpns = $("#aprvOpns").val();
                if (aprvOpns == null || aprvOpns == "") {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '审批意见不能为空'
                    });
                    return;
                }
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
                    template: "确定要驳回申请单吗?"
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        showCommon($ionicLoading);
                        aprv('0', null, '');
                    }
                });
            }

            $scope.submitSuccess = function (msg) {
                hideCommon($ionicLoading);
                if ('200' == msg.status) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '审批成功'
                    });
                    alertPopup.then(function (res) {
                        goBackByNum(2);
                    });
                }
            }

            $scope.submitSuccess1 = function (msg) {
                hideCommon($ionicLoading);
                if(msg == '')
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


            sessionStorage.setItem("submitMethod", 'process_aprv_cst_inst_app');
            if ($rootScope.process_aprv_cst_inst_appFlag) {
                return;
            }
            $rootScope.$on('process_aprv_cst_inst_app', function (d, data) {
                showCommon($ionicLoading);
                var params = {
                    actLinkId: approveItem.activityId,
                    taskId: approveItem.taskId,
                    processInstanceId: approveItem.processInstanceId,
                    status: 1,
                    appId: $scope.baseData.appId,
                    aprvOpns: $scope.aprvOpns,
                    aprvInsID: $scope.baseData.inHostInsID,
                    aprvEmpID: data.userNum,
                    aprvRoleID: $scope.roleCode
                };

                var sysUserVO = {
                    userNum: person.userNum,
                    orgCode: person.currentGroup.organization.orgCode,
                    roleCode: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                        blngOrgCode: person.currentGroup.blngOrgCode,

                    }
                }

                AjaxJsonp(SysServiceData('CRM', 'process_aprv_cst_inst_app', [jsonToXml(params), jsonToXml(sysUserVO)]), url.crm, $scope.submitSuccess);

            });
            $rootScope.process_aprv_cst_inst_appFlag = true;
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }

    })