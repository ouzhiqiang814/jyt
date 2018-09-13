/**
 * 线索审批
 */
angular.module('alreadyCarbonbizoptinfhome.controller', [])
    .controller('AlreadyCarbonbizoptinfhomeCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            goBackByNum(1);
        };
        show($ionicLoading);
        $("title").html("协同抄送流程");
        if (approveItem == null) {
            approveItem = {
                businessKey: getQueryString("businessKey"),
                activityId: getQueryString("activityId"),
                taskId: getQueryString("taskId"),
                processInstanceId: getQueryString("processInstanceId"),
            }
            //     sessionStorage.setItem("approveItem", angular.toJson(approveItem));

        }

        function init(initRet) {
            $scope.activityId = approveItem.activityId;
            if (person == null && initRet != null) {
                person = initRet;
            }

            show($ionicLoading);


            TypeValueList('0202', function (msg) {
                $scope.complSttnCd = msg;
                $scope.$apply();
                $scope.indexdata();
            });

            /*基本信息*/
            $scope.success = function (msg) {
                console.log(msg);
                $scope.msg = msg;
                $scope.goalBsnEtyType =  $scope.msg.goalBsnEtyType
                if( $scope.goalBsnEtyType == 'SPRV'){
                    $scope.baseData = msg.vo;
                    $("#complSttnCd option[value='" + $scope.baseData.complSttnCd + "']").attr("selected", "true");
                    $scope.indexdata1();
                }
                if( $scope.goalBsnEtyType == '20'){
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
                    $scope.submitCarbonCopyInfo1= function(){
                        showCommon($ionicLoading);

                        var requesturl = "../colcarboncopy/carboncopyend";
                        var requestData = {
                            bsnEtyType: '20',
                            bsnEtyId: $scope.baseData.bizOptID,
                            actLinkId: "ACT_2",
                            aprvInsId: person.currentGroup.blngOrgCode,
                            aprvDeptId: person.currentGroup.blngDeptCode,
                            aprvEmpId: person.userNum,
                            aprvRoleId: person.currentGroup.roleCodes,
                            oprEmpId: person.userNum,
                            oprInsId: person.currentGroup.blngOrgCode,
                            oprDeptId: person.currentGroup.blngDeptCode,
                            oprRoleId: person.currentGroup.roleCodes,
                            aprvStCd: '1',
                            taskId: approveItem.taskId,//TASKID
                            processInstanceId:  approveItem.processInstanceId,//processInstanceId,
                            aprvOpns: $('#carbon_aprvOpns').val(),
                            aprvTpCd: "2",
                            rmrk1:215
                        };

                        var sysUserVO = {
                            userNum: person.userNum,
                            currentGroup: {
                                blngDeptCode: person.currentGroup.blngDeptCode,
                            }
                        }

                        AjaxJsonp(SysServiceData('CPC', 'carbonCopyEnd', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                            hideCommon($ionicLoading);
                            if (responseVO.status == "200") {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '保存成功'
                                });
                                alertPopup.then(function (res) {
                                    goBackByNum(1);
                                });
                            }
                            else {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '提交失败'
                                });
                            }
                        });
                    }
                }

                if( $scope.goalBsnEtyType == '30'){
                    $scope.activityId = approveItem.activityId;
                    if (person == null && initRet != null) {
                        person = initRet;
                    }

                    var PROJID;
                    var actLinkId;
                    var TASKID;
                    var processInstanceId;
                    var pmEmpId;
                    var pmInstId;
                    var pmDeptId;
                    var roleId;

                    var projTpCd;
                    var PRJBIZOPTID;
                    var pmRoleId;

                    var aprvDeptId;
                    var aprvEmpId;
                    var aprvInsId;
                    var aprvRoleId;

                    var sysUserVO = {
                        userNum: person.userNum,
                        currentGroup: {
                            blngDeptCode:person.currentGroup.blngDeptCode,
                        }
                    };

                    $scope.projTpCdFlag = true;

                    $scope.doGetColProcInfSuccess = function (msg) {
                        $scope.doGetColProcInfData = msg.data;
                    }

                    $scope.doGetLeftPrdAprvInfRecordSuccess = function (msg) {
                        $scope.doGetLeftPrdAprvInfRecordData = msg.content;
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





                    //名单信息查询回调
                    $scope.baseDataFlag2 = true;
                    $scope.xiangmu2 = [];
                    $scope.page2 = 0;
                    $scope.size2 = 10;
                    $scope.finite_state2 = false;
                    $scope.findCstLstTablistSuccess = function (msg) {
                        $scope.findCstLstTablistData = msg.content;
                        if ($scope.findCstLstTablistData.length == 0) {
                            $scope.baseDataFlag2 = false;
                        }
                        console.log(msg);
                        if($scope.itemsFlag){
                            $scope.xiangmu2 = [];
                        }

                        $scope.xiangmu2.push.apply($scope.xiangmu2, msg.content);

                        setTimeout(function(){
                            $scope.finite_state2 = msg.hasNextPage;
                        },500);
                        $scope.$apply();

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');

                        hide($ionicLoading);
                    }

                    $scope.queryCstAhnInfoSuccess = function (msg) {
                        //  msg = {"ahnAplyId":"10918","ahnBsnTp":"11","ahnPrtyStffId":"00000707","ahnSt":"01","ahnTp":"01","cstlistsysId":"62","paramAttrIdList":["11","12","13","14","15","17","22"],"paramAttrIds":"11,12,13,14,15,17,22"};
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

                    function  queryCstAhnInfo(obj) { /* 名单的 indexdata() */
                        //接口参数  bizOptID:$scope.baseData.bizOptID   bizOptTpCd:$scope.baseData.bizOptTpCd
                        //查询名单信息
                        if(obj){
                            $scope.itemsFlag = true;
                        }else{
                            $scope.itemsFlag = false;
                        }

                        var queryCstAhnInfoVo = {
                            bizOptID: $scope.baseData.bizOptId,
                            bizOptTpCd: $scope.baseData.projTpCd
                        }
                        //接口参数  bizOptID:$scope.baseData.bizOptID   bizOptTpCd:$scope.baseData.bizOptTpCd
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
                    //接口参数  bizOptId
                    $scope.baseDataFlag1 = true;
                    $scope.getProjBscInfSuccess = function (msg) {
                      /*  $scope.msg = msg;
                        console.log(msg);*/
                        $scope.baseData = msg.data;
                        var historyData = {
                            bizOptId :  $scope.baseData.bizOptId,
                            bizOptType : '20',
                            projId: $scope.baseData.projId,
                            projType:'30',
                            prjTpCd:$scope.baseData.projTpCd,
                            processInstanceId:approveItem.processInstanceId
                        };
                        sessionStorage.setItem("historyData", angular.toJson(historyData));
                        console.log($scope.baseData);

                        PROJID = $scope.baseData.projId;
                        actLinkId = approveItem.activityId;
                        TASKID = approveItem.taskId;
                        processInstanceId = approveItem.processInstanceId;

                        pmEmpId = $scope.baseData.mgmtEmpId;
                        pmInstId = $scope.baseData.mgmtInsId;
                        pmDeptId = $scope.baseData.mgmtDeptId;
                        roleId = $scope.baseData.mgmtRoleId;
                        pmRoleId =$scope.baseData.mgmtRoleId

                        projTpCd = $scope.baseData.projTpCd;
                        PRJBIZOPTID = $scope.baseData.bizOptId;

                        aprvEmpId = $scope.baseData.mgmtEmpId;

                        $scope.$apply();

                        if ($scope.baseData.projTpCd == 11) {
                            queryCstAhnInfo();
                        }else{
                            hide($ionicLoading);
                        }
                    }

                    $scope.indexdata1 = function () {
                        AjaxJsonp(SysServiceData('CPC', 'getProjBscInf', [approveItem.businessKey]), url.cpc, $scope.getProjBscInfSuccess);
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
                        if($scope.itemsFlag){
                            $scope.xiangmu3 = [];
                        }

                        $scope.xiangmu3.push.apply($scope.xiangmu3, msg.content);

                        setTimeout(function(){
                            $scope.finite_state3 = msg.hasNextPage;
                        },500);
                        $scope.$apply();

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');
                    }

                    $scope.indexdata3 = function (obj){
                        if(obj){
                            $scope.itemsFlag = true;
                        }else{
                            $scope.itemsFlag = false;
                        }
                        var doGetProjCooTeamListVo = {
                            bsnEtyType: 30,//默认
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
                        if($scope.itemsFlag){
                            $scope.xiangmu4 = [];
                        }

                        $scope.xiangmu4.push.apply($scope.xiangmu4, msg.content);

                        setTimeout(function(){
                            $scope.finite_state4 = msg.hasNextPage;
                        },500);
                        $scope.$apply();

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');
                    }

                    $scope.indexdata4 = function (obj) {
                        if(obj){
                            $scope.itemsFlag = true;
                        }else{
                            $scope.itemsFlag = false;
                        }
                        var getAttchListVo = {
                            bsnEtyType: 30,
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
                        if($scope.itemsFlag){
                            $scope.xiangmu5 = [];
                        }

                        $scope.xiangmu5.push.apply($scope.xiangmu5, msg.content);

                        setTimeout(function(){
                            $scope.finite_state5 = msg.hasNextPage;
                        },500);
                        $scope.$apply();

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.$broadcast('scroll.refreshComplete');
                    }

                    $scope.indexdata5 = function (obj) {
                        if(obj){
                            $scope.itemsFlag = true;
                        }else{
                            $scope.itemsFlag = false;
                        }
                        var doGetActyListVo = {
                            bsnEtyType: 30,
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
                    //审批方法
                    $scope.submitCarbonCopyInfo2 = function(){
                        showCommon($ionicLoading);
                        var requestData = {
                            bsnEtyType : "30",
                            bsnEtyId : PROJID,
                            actLinkId : "ACT_2",
                            aprvInsId: person.currentGroup.blngOrgCode,
                            aprvDeptId: person.currentGroup.blngDeptCode,
                            aprvEmpId: person.userNum,
                            aprvRoleId: person.currentGroup.roleCodes,
                            oprEmpId: person.userNum,
                            oprInsId: person.currentGroup.blngOrgCode,
                            oprDeptId: person.currentGroup.blngDeptCode,
                            oprRoleId: person.currentGroup.roleCodes,
                            aprvStCd: '1',
                            taskId: approveItem.taskId,//TASKID
                            processInstanceId:  approveItem.processInstanceId,//processInstanceId,
                            aprvOpns: $('#carbon_aprvOpns').val(),
                            aprvTpCd: "2",
                            rmrk1:215
                        };
                        var sysUserVO = {
                            userNum: person.userNum,
                            currentGroup: {
                                blngDeptCode: person.currentGroup.blngDeptCode,
                            }
                        };

                        AjaxJsonp(SysServiceData('CPC', 'carbonCopyEnd', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                            hideCommon($ionicLoading);
                            if (responseVO.status == "200") {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '保存成功'
                                });
                                alertPopup.then(function (res) {
                                    goBackByNum(1);
                                });
                            }
                            else {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '提交失败'
                                });
                            }
                        });

                    }
                }

            }

            $scope.indexdata = function (obj) {
                var cfmtbizoptinfhomeVo = {
                    actLinkId: approveItem.activityId,
                    bizOptId: approveItem.businessKey,
                    TASKID: approveItem.taskId,
                    processInstanceId: approveItem.processInstanceId,
                }

                var sysUserVO = {
                    userNum: person.userNum,
                    realname: person.realname,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                        blngDeptName: person.currentGroup.blngDeptName,
                        blngOrgCode: person.currentGroup.blngOrgCode,
                        blngOrgName: person.currentGroup.blngOrgName,
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'cfmtbizoptinfhome', [jsonToXml(cfmtbizoptinfhomeVo), jsonToXml(sysUserVO)]), url.cpc, $scope.success);
            }


            //附件资料列表
            /*资料附件*/
            $scope.xiangmu = [];
            $scope.page = 0;
            $scope.size = 10;
            $scope.finite_state = false;
            $scope.getAttchListSuccess = function (msg) {
                if ($scope.itemsFlag) {
                    $scope.xiangmu = [];
                }

                $scope.xiangmu.push.apply($scope.xiangmu, msg.content);

                setTimeout(function () {
                    $scope.finite_state = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                hide($ionicLoading);
            }

            $scope.indexdata1 = function (obj) {
                //console.log(data);
                if (obj) {
                    $scope.itemsFlag = true;
                } else {
                    $scope.itemsFlag = false;
                }
                var getAttchListVo = {
                    bsnEtyType: 'SPRVITEM',
                    bsnEtyId: $scope.baseData.itmID,
                    blngEmpeId: '',
                    actLinkId: approveItem.activityId,
                }
                AjaxJsonp(SysServiceData('CPC', 'getAttchList', [$scope.page, $scope.size, jsonToXml(getAttchListVo)]), url.cpc, $scope.getAttchListSuccess);
            }


            //下拉刷新
            $scope.func_refresh = function () {
                $scope.page = 0;
                $scope.indexdata1(true);
            }
            //上拉加载更多
            $scope.loadMore = function () {
                $scope.page = $scope.page + 1;
                $scope.finite_state = false;
                $scope.indexdata1();
            }

            $scope.submitCarbonCopyInfo = function () {

                //var requesturl = "../colcarboncopy/carboncopyend";
           /*     var requesturl = "../colcarboncopy/subTaskById";
                var requestData = {
                    taskId: $scope.baseData.TASKID,
                };*/
                showCommon($ionicLoading);

                AjaxJsonp(SysServiceData('CPC', 'subTaskById', [approveItem.taskId]), url.cpc, function (responseVO) {
                    hideCommon($ionicLoading);
                    if (responseVO.status == 200) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '审批成功'
                        });
                        alertPopup.then(function (res) {
                            goBackByNum(1);
                        });

                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '提交失败！'
                        });
                        alertPopup.then(function (res) {
                            goBackByNum(1);
                        });
                    }
                });
            }
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }

    })