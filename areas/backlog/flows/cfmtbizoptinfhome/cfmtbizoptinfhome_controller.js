/**
 * 机会认定
 */
angular.module('cfmtbizoptinfhome.controller', [])
    .controller('CfmtbizoptinfhomeCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicPopup, $rootScope) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        show($ionicLoading);
        $("title").html("协同机会管理流程审批");
        if (approveItem == null) {
            approveItem = {
                businessKey: getQueryString("businessKey"),
                activityId: getQueryString("activityId"),
                taskId: getQueryString("taskId"),
                processInstanceId: getQueryString("processInstanceId"),
            }
            sessionStorage.setItem("approveItem", angular.toJson(approveItem));
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
            $scope.reson = false;
            $scope.approveResult = function (result) {
                if (result == 0) {
                    $scope.reson = true;
                } else {
                    $scope.reson = false;
                }
            }

            show($ionicLoading);




            //查询名单信息返回数据
            $scope.baseDataFlag2 = true;
            $scope.xiangmu2 = [];
            $scope.page2 = 0;
            $scope.size2 = 10;
            $scope.finite_state2 = false;
            $scope.findCstLstTablistSuccess = function (msg) {
                $scope.findCstLstTablistData = msg.content;
                if($scope.findCstLstTablistData.length == 0) {
                    $scope.baseDataFlag2 = false;
                }
                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.xiangmu2 = [];
                }

                $scope.xiangmu2.push.apply($scope.xiangmu2, msg.content);

                setTimeout(function () {
                    $scope.finite_state2 = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                hide($ionicLoading);
            }

            $scope.queryCstAhnInfoSuccess = function (msg) {
                //名单信息查询  接口参数  msg.cstlistsysId
                if (!msg) {
                    $scope.baseDataFlag2 = false;
                } else {
                    var findCstLstTablistVo = {
                        lstID: msg.cstlistsysId,
                        aplObjCd: '',
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'findCstLstTablist', [$scope.page2, $scope.size2, jsonToXml(findCstLstTablistVo)]), url.cpc, $scope.findCstLstTablistSuccess);
            }

            function queryCstAhnInfo(obj) { /* 名单的 indexdata() */
                //查询名单信息
                if (obj) {
                    $scope.itemsFlag = true;
                } else {
                    $scope.itemsFlag = false;
                }

                var queryCstAhnInfoVo = {
                    bizOptID: $scope.baseData.bizOptID,
                    bizOptTpCd: $scope.baseData.bizOptTpCd
                }

                //接口参数  bizOptID:$scope.baseData.bizOptID   bizOptTpCd:$scope.baseData.bizOptTpCd
                //console.log(SysServiceData('CPC', 'queryCstAhnInfo', [jsonToXml(queryCstAhnInfoVo)]));
                AjaxJsonp(SysServiceData('CPC', 'queryCstAhnInfo', [jsonToXml(queryCstAhnInfoVo)]), url.cpc, $scope.queryCstAhnInfoSuccess);
            }

            //下拉刷新
            $scope.func_refresh2 = function () {
                $scope.page2 = 0;
                queryCstAhnInfo(true)
            }
            //上拉加载更多
            $scope.loadMore2 = function () {
                $scope.page2 = $scope.page2 + 1;
                $scope.finite_state2 = false;
                queryCstAhnInfo()
            }


            //基本信息查询
            $scope.baseDataFlag1 = true;
            $scope.getcolbizoptbscinfSuccess = function (msg) {
                $scope.baseData = msg.data;
                if (!$scope.baseData) {
                    $scope.baseDataFlag1 = false;
                    $scope.baseDataFlag2 = false;
                }
                $scope.baseData = msg.data;
                console.log(msg.data);
                if (!$scope.baseData) {
                    $scope.baseDataFlag1 = false;
                    $scope.baseDataFlag2 = false;
                }
                $scope.$apply();

                var historyData = {
                    bizOptId: $scope.baseData.bizOptID,
                    bizOptType: '20',
                    prjTpCd: $scope.baseData.bizOptTpCd,
                    //   processInstanceId:approveItem.processInstanceId
                };
                sessionStorage.setItem("historyData", angular.toJson(historyData));
                if ($scope.baseData.bizOptTpCd == 11) {
                    queryCstAhnInfo();
                }else{
                    hide($ionicLoading);
                }
            }

            $scope.indexdata1 = function () {
                AjaxJsonp(SysServiceData('CPC', 'doGetColBizOptBscInf', [approveItem.businessKey]), url.cpc, $scope.getcolbizoptbscinfSuccess);
            }

            $scope.indexdata1();



            //协同方信息查询
            $scope.baseDataFlag3 = true;
            $scope.xiangmu3 = [];
            $scope.page3 = 0;
            $scope.size3 = 10;
            $scope.finite_state3 = false;
            $scope.doGetProjCooTeamListSuccess = function (msg) {
                $scope.doGetProjCooTeamListData = msg.content;
                if ($scope.doGetProjCooTeamListData.length == 0) {
                    $scope.baseDataFlag3 = false;
                }
                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.xiangmu3 = [];
                }

                $scope.xiangmu3.push.apply($scope.xiangmu3, msg.content);

                setTimeout(function () {
                    $scope.finite_state3 = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }

            $scope.indexdata3 = function (obj) {
                if (obj) {
                    $scope.itemsFlag = true;
                } else {
                    $scope.itemsFlag = false;
                }
                var doGetProjCooTeamListVo = {
                    bsnEtyType: 20,//默认
                    bsnEtyID: approveItem.businessKey,
                };
                AjaxJsonp(SysServiceData('CPC', 'doGetProjCooTeamList', [$scope.page3, $scope.size3, jsonToXml(doGetProjCooTeamListVo)]), url.cpc, $scope.doGetProjCooTeamListSuccess);
            }

            $scope.indexdata3();

            //下拉刷新
            $scope.func_refresh3 = function () {
                $scope.page3 = 0;
                $scope.indexdata3(true);
            }
            //上拉加载更多
            $scope.loadMore3 = function () {
                $scope.page3 = $scope.page3 + 1;
                $scope.finite_state3 = false;
                $scope.indexdata3();
            }


            //附件信息查询
            $scope.baseDataFlag4 = true;
            $scope.xiangmu4 = [];
            $scope.page4 = 0;
            $scope.size4 = 10;
            $scope.finite_state4 = false;
            $scope.getAttchListSuccess = function (msg) {
                $scope.getAttchListData = msg.content;
                if ($scope.getAttchListData == 0) {
                    $scope.baseDataFlag4 = false;
                }
                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.xiangmu4 = [];
                }

                $scope.xiangmu4.push.apply($scope.xiangmu4, msg.content);

                setTimeout(function () {
                    $scope.finite_state4 = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }

            $scope.indexdata4 = function (obj) {
                if (obj) {
                    $scope.itemsFlag = true;
                } else {
                    $scope.itemsFlag = false;
                }
                var getAttchListVo = {
                    bsnEtyType: 20,
                    bsnEtyId: approveItem.businessKey,
                }

                AjaxJsonp(SysServiceData('CPC', 'getAttchList', [$scope.page4, $scope.size4, jsonToXml(getAttchListVo)]), url.cpc, $scope.getAttchListSuccess);
            }

            $scope.indexdata4();

            //下拉刷新
            $scope.func_refresh4 = function () {
                $scope.page4 = 0;
                $scope.indexdata4(true);
            }
            //上拉加载更多
            $scope.loadMore4 = function () {
                $scope.page4 = $scope.page4 + 1;
                $scope.finite_state4 = false;
                $scope.indexdata4();
            }




            //已完成工作查询
            $scope.baseDataFlag5 = true;
            $scope.xiangmu5 = [];
            $scope.page5 = 0;
            $scope.size5 = 10;
            $scope.finite_state5 = false;
            $scope.doGetActyListSuccess = function (msg) {
                $scope.doGetActyListData = msg.content;
                if ($scope.doGetActyListData.length == 0) {
                    $scope.baseDataFlag5 = false;
                }
                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.xiangmu5 = [];
                }

                $scope.xiangmu5.push.apply($scope.xiangmu5, msg.content);

                setTimeout(function () {
                    $scope.finite_state5 = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }

            $scope.indexdata5 = function (obj) {
                if (obj) {
                    $scope.itemsFlag = true;
                } else {
                    $scope.itemsFlag = false;
                }
                var doGetActyListVo = {
                    bsnEtyType: 20,
                    bsnEtyId: approveItem.businessKey,
                }

                AjaxJsonp(SysServiceData('CPC', 'doGetActyList', [$scope.page5, $scope.size5, jsonToXml(doGetActyListVo)]), url.cpc, $scope.doGetActyListSuccess);
                //actLinkId=ACT_4 时展示 审核意见  审批按钮变成立项
            }

            $scope.indexdata5();

            //下拉刷新
            $scope.func_refresh5 = function () {
                $scope.page5 = 0;
                $scope.indexdata5(true);
            }
            //上拉加载更多
            $scope.loadMore5 = function () {
                $scope.page5 = $scope.page5 + 1;
                $scope.finite_state5 = false;
                $scope.indexdata5();
            }


            //审核意见查询
            $scope.baseDataFlag6 = true;
            $scope.xiangmu6 = [];
            $scope.page6 = 0;
            $scope.size6 = 10;
            $scope.finite_state6 = false;
            $scope.doGetLeftPrdAprvInfRecordSuccess = function (msg) {
                $scope.doGetLeftPrdAprvInfRecordData = msg.data.content;
                if ($scope.doGetLeftPrdAprvInfRecordData.length == 0) {
                    $scope.baseDataFlag6 = false;
                }
                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.xiangmu6 = [];
                }

                $scope.xiangmu6.push.apply($scope.xiangmu6, msg.data.content);

                setTimeout(function () {
                    $scope.finite_state6 = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }
            if (approveItem.activityId == "ACT_4") {
                $scope.indexdata6 = function (obj) {
                    if (obj) {
                        $scope.itemsFlag = true;
                    } else {
                        $scope.itemsFlag = false;
                    }

                    $scope.showDoGetLeftPrdAprvInfRecord = true;
                    var doGetLeftPrdAprvInfRecordVo = {
                        type: 20,//默认
                        id: approveItem.businessKey,
                        processInstanceId: approveItem.processInstanceId,
                        prcSort: 12,
                    }

                    AjaxJsonp(SysServiceData('CPC', 'doGetLeftPrdAprvInfRecord', [$scope.page6, $scope.size6, jsonToXml(doGetLeftPrdAprvInfRecordVo)]), url.cpc, $scope.doGetLeftPrdAprvInfRecordSuccess);
                }

                $scope.indexdata6();

                //下拉刷新
                $scope.func_refresh6 = function () {
                    $scope.page6 = 0;
                    $scope.indexdata6(true);
                }
                //上拉加载更多
                $scope.loadMore6 = function () {
                    $scope.page6 = $scope.page6 + 1;
                    $scope.finite_state6 = false;
                    $scope.indexdata6();
                }

            } else {
                $scope.showDoGetLeftPrdAprvInfRecord = false;
            }











            //


            /**
             *  认证提交方法
             */
                //审批方法  "CMT" 提交按钮    SENDBACK 退回按钮  TRANSFER  转发按钮   STOP  废除按钮
                //actLinkId=ACT_4  时  参数变成  1  立项  0  作废   初始化时改变按钮及参数
            $scope.cfmBizOptInf = function (param) {
                show($ionicLoading);
                var msg = "认定成功!";
                var aprvResult = $('input:radio[name=approve]:checked').val();
                var aprvOpns = $scope.aprvOpn;
                var condition;
                var aprvStCd = "1";
                var oprPrdCd = "";

                var tblData = $scope.doGetProjCooTeamListData;

                if (tblData && tblData.length != 0) {
                    for (var i = 0; i < tblData.length; i++) {
                        var crtEmpNm = tblData[i].crtEmpNm;
                        if (!crtEmpNm) {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '请添加协同接口人！'
                            });
                            return;
                        }
                    }
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请添加协同接口人！'
                    });
                    return;
                }


                //提交按钮
                if (param == "CMT") {
                    aprvOpns = aprvOpn.value;
                    oprPrdCd = "22";
                    if (!aprvResult) {
                        $.alert('提示', '请选择认定结果！', 'warning');
                        return;
                    }

                    //认定通过
                    if (approveItem.activityId == "ACT_2") {
                        if (aprvResult == "1") {
                            condition = "1";
                            msg = "提交成功！认定结果为通过！"
                        }
                        //认定不通过
                        else {
                            condition = "0";
                            msg = "提交成功！认定结果为不通过！"
                        }
                    } else {
                        condition = "1";
                    }
                    aprvStCd = "1";
                }

                //退回按钮
                if (param == "SENDBACK") {
                    aprvResult = "4";
                    condition = "2";
                    msg = "退回成功！";

                }
                //转发按钮
                if (param == "TRANSFER") {
                    oprPrdCd = "22";
                    aprvResult = "3";
                    condition = "0";
                    msg = "转发成功！";
                }
                //废除按钮
                if (param == "STOP") {
                    aprvResult = "5";
                    condition = "0";
                    msg = "废除成功！该机会已终止！";
                }

                //../prjbizopt/commitbizoptinf
                var requestData = {
                    bsnEtyType: 20, //默认20
                    bsnEtyId: approveItem.businessKey,//bizOptId
                    actLinkId: approveItem.activityId, //actLinkId
                    aprvResult: aprvResult,// 认定结果
                    aprvOpns: aprvOpns,//审批意见
                    aprvStCd: aprvStCd, //默认1
                    aprvInsId: $scope.baseData.mgmtInsID, // $scope.baseData.mgmtInsID
                    aprvDeptId: $scope.baseData.mgmtDeptID, // $scope.baseData. mgmtDeptID
                    aprvEmpId: $scope.baseData.mgmtEmpID,// $scope.baseData. mgmtEmpID
                    aprvRoleId: "",//currentUser.currentGroup.role 的最后一个  估计这个字段没用
                    aplyEmpId: $scope.baseData.mgmtEmpID,// $scope.baseData. mgmtEmpID
                    aplyInsId: $scope.baseData.mgmtInsID,// $scope.baseData.mgmtInsID
                    oprEmpId: person.userNum, //person.userNum
                    oprInsId: person.currentGroup.blngDeptCode,//person.currentGroup.blngDeptCode
                    oprRoleId: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,//person.currentGroup.role 的最后一个  估计这个字段没用
                    oprPrdCd: oprPrdCd,//默认22
                    prcSort: 12,
                    processInstanceId: approveItem.processInstanceId,//processInstanceId
                    taskId: approveItem.taskId,//TASKID
                    condition: condition //认定结果为通过  1   认定结果为不通过  0  退回成功 2   转发成功 0   废除成功  0

                };

                if (param == "TRANSFER") {
                    requestData.aprvInsId = $scope.aprvInsId;
                    requestData.aprvDeptId = $scope.aprvDeptId;
                    requestData.aprvEmpId = $scope.aprvEmpId;
                    requestData.aprvRoleId = $scope.aprvRoleId;
                }
                var sysUserVO = {
                    userNum: person.userNum,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'commitbizoptinf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                    hide($ionicLoading);
                    if (responseVO.status == 200) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: msg
                        });
                        alertPopup.then(function (res) {
                            if (param == "TRANSFER") {
                                goBackByNum(2);
                            } else {
                                goBackByNum(1);
                            }

                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '提交失败！请稍后重新再试！'
                        });
                    }
                });
            }

            /**
             *  立项提交方法
             */
            $scope.cfmBizOptInfProJect = function (condition) {
                show($ionicLoading);
                var msg = "提交成功！"
                if (condition == 0) {
                    msg = "提交成功！该机会已废除！流程已结束！"
                }
                else {

                    var tblData = $scope.doGetProjCooTeamListData;

                    if (tblData && tblData.length != 0) {
                        for (var i = 0; i < tblData.length; i++) {
                            var crtEmpNm = tblData[i].crtEmpNm;
                            if (!crtEmpNm) {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '请添加协同接口人！'
                                });
                                return;
                            }
                        }
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '请添加协同接口人！'
                        });
                        return;
                    }

                    msg = "提交成功！该机会已认定成功，请到机会查询列表选择该机会并转化为项目！"
                }


                // var requesturl = "../prjbizopt/commitbizoptinf";

                var requestData = {
                    bsnEtyType: 20, //默认20
                    bsnEtyId: approveItem.businessKey,//bizOptId
                    actLinkId: approveItem.activityId,//actLinkId
                    aprvInsId: $scope.baseData.mgmtInsID,// $scope.baseData.mgmtInsID
                    aprvDeptId: person.currentGroup.blngDeptCode,//person.currentGroup.blngDeptCode
                    aprvEmpId: person.userNum,//person.userNum
                    aprvResult: condition,//1  立项  0  作废
                    aprvStCd: "1",
                    oprEmpId: person.userNum,//person.userNum
                    //  oprDeptId:person.currentGroup.blngDeptCode,//person.currentGroup.blngDeptCode
                    oprInsId: person.currentGroup.blngOrgCode,// person.currentGroup.blngOrgCode
                    oprRoleId: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,//person.currentGroup.role 的最后一个  估计这个字段没用
                    taskId: approveItem.taskId,//TASKID
                    processInstanceId: approveItem.processInstanceId,//processInstanceId
                    prjTpCd: $scope.baseData.bizOptTpCd,
                    falrsCd: typeof($scope.falrsCd) == "undefined" ? "" : $scope.falrsCd
                };

                var sysUserVO = {
                    userNum: person.userNum,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                    }
                }

                // console.log(SysServiceData('CPC', 'commitbizoptinf', [jsonToXml(requestData), jsonToXml(sysUserVO)]));

                AjaxJsonp(SysServiceData('CPC', 'commitbizoptinf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                    hide($ionicLoading);
                    if (responseVO.status == "200") {
                        if (responseVO.data == "21" || responseVO.data == 21) {
                            window.location = "../projbscinf/mntprojbscinfhomepage?bizOptId=" + PRJBIZOPTID;
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: msg
                            });
                            alertPopup.then(function (res) {
                                goBackByNum(1);
                            });
                        }
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '提交失败！'
                        });
                        /*  alertPopup.then(function (res) {
                         $state.go("backlogList", {}, {
                         reload: true
                         });
                         });*/
                    }
                });
            }

            //抄送
            $scope.carbonCopy = function () {

                $scope.cstNum = "";
                var prjBizNm = $scope.baseData.bizOptTitle;
                var bsnEtyId = $scope.baseData.bizOptID;


                var role = "";
                var statusCd = "01";
                var org = "0101";
                if (person.currentGroup.blngOrgCode == '0101') {
                    //statusCd="01";
                    role = "J000000006";
                } else {
                    //statusCd="02";
                    role = "J000000007";
                }
                //  commonChooseUser("", role, "",chooseCarbonReturn);


                //选人
                var aprv = {
                    orgCode: '',
                    roleCode: role,
                    isCheckbox: true,
                }
                var aprvStr = angular.toJson(aprv);
                sessionStorage.setItem("selectUser", aprvStr);
                //跳转到选人页面
                $state.go("synergyselect", {}, {
                    reload: true
                });

                sessionStorage.setItem("submitMethod", 'chooseCarbonReturn');
                if ($rootScope.chooseCarbonReturnFlag) {
                    return;
                }

                $rootScope.$on('chooseCarbonReturn', function (d, data) {
                    $scope.cstNum = "";
                    console.log(data);         //子级能得到值
                    if (data) {
                        /*if($scope.cstNum == null || $scope.cstNum == '' || $scope.cstNum == undefined){
                         $scope.cstNum = data.userNum;
                         }else{
                         $scope.cstNum = $scope.cstNum + "," + data.userNum;
                         }*/
                        $scope.cstNum = data;

                        if ($scope.cstNum != null && $scope.cstNum != "") {
                            var requestData = {
                                userNum: $scope.cstNum,
                                prjBizNm: prjBizNm,
                                bsnEtyId: bsnEtyId,
                                bsnEtyType: "20",
                                goalProcessInstance: approveItem.processInstanceId,//processInstanceId,
                                goalTaskId: approveItem.taskId,//TASKID,
                                goalActLinkId: approveItem.activityId,//actLinkId,
                                actLinkId: "ACT_1",
                            };
                            var sysUserVO = {
                                userNum: person.userNum,
                                currentGroup: {
                                    blngDeptCode: person.currentGroup.blngDeptCode,
                                }
                            }

                            AjaxJsonp(SysServiceData('CPC', 'carbonCopyStart', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                                if (responseVO.status == "200") {
                                    var alertPopup = $ionicPopup.alert({
                                        title: '提示',
                                        template: '抄送成功'
                                    });
                                    alertPopup.then(function (res) {
                                        javascript:history.go(-1);
                                    });
                                }
                                else {
                                    var alertPopup = $ionicPopup.alert({
                                        title: '提示',
                                        template: '抄送失败'
                                    });
                                    alertPopup.then(function (res) {
                                        javascript:history.go(-1);
                                    });
                                }
                            });

                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '抄送失败,请选择抄送人员'
                            });
                            return;
                        }
                    }

                });
                $rootScope.chooseCarbonReturnFlag = true;
            }

            //转发
            $scope.transferClue = function () {
                $scope.aprvOpn = aprvOpn.value;
                var aprv = {
                    orgCode: person.currentGroup.blngOrgCode,
                    roleCode: '',
                }
                var aprvStr = angular.toJson(aprv);
                sessionStorage.setItem("selectUser", aprvStr);
                //跳转到选人页面
                $state.go("synergyselect", {}, {
                    reload: true
                });

                sessionStorage.setItem("submitMethod", 'transferBizSubmit');
                if ($rootScope.transferBizSubmitFlag) {
                    return;
                }
                $rootScope.$on('transferBizSubmit', function (d, data) {
                    console.log(data);         //子级能得到值
                    if (data) {
                        $scope.aprvInsId = data.orgCode;
                        $scope.aprvDeptId = data.deptCode;
                        $scope.aprvEmpId = data.userNum;
                        $scope.aprvRoleId = data.postCode;
                        $scope.cfmBizOptInf("TRANSFER");
                    }

                });
                $rootScope.transferBizSubmitFlag = true;
            }

            $scope.endBizOptProc = function () {
                var myPopup = $ionicPopup.show({
                    template: '  <select id="falrsCd" name="falrsCd" style="width: 100%"><option value="01">无价值</option><option value="02">无法开展具体活动</option> <option value="03">无法联系客户</option></select>',
                    title: '确认废除该流程？',
                    subTitle: '不通过原因',
                    scope: $scope,
                    buttons: [
                        {text: '取消'},
                        {
                            text: '<b>确认</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                return falrsCd.value;
                            }
                        },
                    ]
                });
                myPopup.then(function (res) {
                    console.log('Tapped!', res);
                    if (res) {
                        $scope.falrsCd = res;
                        $scope.cfmBizOptInfProJect(0);
                    }
                });

            }

            $scope.dowload = function (obj) {
                var downloadUrl = url.cpcDownload +'/download?attachSN=' + obj.attachSN;
                MXCommon.download(downloadUrl);
            }
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }
    })