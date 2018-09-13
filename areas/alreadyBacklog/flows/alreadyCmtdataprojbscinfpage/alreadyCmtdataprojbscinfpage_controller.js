/**
 * 项目审批
 */
angular.module('alreadyCmtdataprojbscinfpage.controller', [])
    .controller('AlreadyCmtdataprojbscinfpageCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory,$ionicPopup,$rootScope,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

        $scope.activityId = approveItem.activityId;

        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;
        $scope.processName = approveItem.processName;
        sessionStorage.setItem("historyType","20");
        var params = null;


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

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };


        show($ionicLoading);


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
                bizOptTpCd: $scope.baseData.bizOptNm
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
        $scope.getProjBscInfSuccess = function (msg) {
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











        //act_2  时的提交方法
        $scope.cfmProjBscInf = function (condition) {

            var aprvOpns = $('#aprvOpns').val();
            var rmrk1 = '';
            var requestData = {
                bsnEtyType: 30,
                bsnEtyId: PROJID,
                actLinkId: actLinkId,
                aprvInsId: pmInstId,
                aprvDeptId: pmDeptId,
                aprvEmpId: pmEmpId,
                aprvRoleId: roleId,
                aprvOpns: aprvOpns,
                taskId: TASKID,
                aprvStCd: '1',
                aplyEmpId: pmEmpId,
                aplyInsId: pmInstId,
                aplyDeptId: pmDeptId,
                oprEmpId: person.userNum,
                oprPrdCd: '23',
                prcSort: 21,
                oprInsId: person.currentGroup.blngOrgCode,
              //  oprDeptId: person.currentGroup.blngDeptCode,
                oprRoleId: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                processInstanceId: processInstanceId,
                rmrk1: rmrk1
            };


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
                template: '确认提交审批请点击确认！如有项目资料需进行提交，请到点击取消，并到pc端上传附件及审批！'
            });
            confirmPopup.then(function (res) {
                show($ionicLoading);
                if (res) {

                    var sysUserVO = {
                        userNum: person.userNum,
                        currentGroup: {
                            blngDeptCode:person.currentGroup.blngDeptCode,
                        }
                    }

                    AjaxJsonp(SysServiceData('CPC', 'commitProjBscInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                        hide($ionicLoading);
                        if (responseVO.status == 200) {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '提交成功！'
                            });
                            alertPopup.then(function (res) {
                                $state.go("backlogList", {}, {
                                    reload: true
                                });
                            });
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '后台异常！请稍后再试'
                            });
                            alertPopup.then(function (res) {
                                $state.go("backlogList", {}, {
                                    reload: true
                                });
                            });
                        }
                    });
                }
            });
        }



        $scope.commitToGrpInvest = function(param){
            //投资管理部编号 010104
            var aprv = {
                orgCode: '010104',
                roleCode: 'J000000007',
            }
            var aprvStr = angular.toJson(aprv);
            sessionStorage.setItem("selectUser", aprvStr);
            //跳转到选人页面
            $state.go("synergyselect", {}, {
                reload: true
            });

            sessionStorage.setItem("submitMethod", 'setReturnGrpInvestUser');
            if ($rootScope.setReturnGrpInvestUserFlag) {
                return;
            }
            $rootScope.$on('setReturnGrpInvestUser', function (d, data) {
                console.log(data);         //子级能得到值
                if(data){
                    aprvEmpId = data.userNum;
                    aprvInsId= data.orgCode;
                    aprvRoleId= data.postCode;
                    aprvDeptId = data.deptCode;
                    $scope.cfmProjBscInfToGroup("SENDGRP");
                }

            });

            $rootScope.setReturnGrpInvestUserFlag = true;


        }


        //act_2  上报集团
        $scope.cfmProjBscInfToGroup = function (param) {
           // saveProjBscInf();不知道干嘛的
            var aprvOpns = $('#aprvOpns').val();
            var rmrk1 = "";
            var condition="0";
            var msg = "提交成功！";

            //退回修改后提交的环节还是项目审批
            var prcSort = '';
            if(!param){
                prcSort = 22;
            }
            if(param=="SENDGRP"){
                condition="0";
                prcSort = 22;
                msg = "提交成功！该项目已成功提交至集团投资管理部进行审核！"
            }
            /*if(param=="OAAPRV"){
             condition="1";
             }*/
            if(param=="CANCLE"){
                if(actLinkId=="ACT_8"){
                    msg = "提交成功！";
                }
                else{

                    msg = "提交成功！";
                }
                condition="1";
            }
            /*if(param=="CTCINF"){
             condition="1";
             }*/
            var oprPrdCd="";
            if(actLinkId=="ACT_3"){
                oprPrdCd = "23";
            }
            var requestData={
                bsnEtyType: '30',
                bsnEtyId : PROJID,
                actLinkId:actLinkId,
                aprvInsId:aprvInsId ,
                aprvDeptId:aprvDeptId,
                aprvEmpId:aprvEmpId,
                aprvRoleId:aprvRoleId,
                aplyEmpId : person.userNum,
                aplyInsId : person.currentGroup.blngDeptCode,
                aprvOpns:aprvOpns,
                aprvStCd:'1',
                prcSort:prcSort,
                oprPrdCd:oprPrdCd,
                oprEmpId:person.userNum,
                oprInsId:person.currentGroup.blngDeptCode,
                oprRoleId:person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                condition:condition,
                taskId:TASKID,
                rmrk1:rmrk1,
                processInstanceId:processInstanceId
            };

            var sysUserVO = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode:person.currentGroup.blngDeptCode,
                }
            };
            console.log(requestData);
           // return;

            AjaxJsonp(SysServiceData('CPC', 'commitProjBscInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function(responseVO) {
                if(responseVO.status==200){
                    $ionicPopup.alert({
                        title: '提示',
                        template:msg
                    }).then(function (res) {
                        $state.go("backlogList", {}, {
                            reload: true
                        });
                    });
                } else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: '后台异常！请稍后再试！'
                    }).then(function (res) {
                        $state.go("backlogList", {}, {
                            reload: true
                        });
                    });
                }
            });
        }

        //抄送
        $scope.carbonCopy = function(){

            $scope.cstNum ="";
            var prjBizNm = $scope.baseData.bizOptTitle;
            var bsnEtyId = $scope.baseData.bizOptID;


            var role="";
            var statusCd="01";
            var org = "0101";
            if(person.currentGroup.blngOrgCode == '0101'){
                //statusCd="01";
                role="J000000006";
            }else{
                //statusCd="02";
                role="J000000007";
            }
            //  commonChooseUser("", role, "",chooseCarbonReturn);


            //选人
            var aprv = {
                orgCode: '',
                roleCode: role,
                isCheckbox:true,
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

                        AjaxJsonp(SysServiceData('CPC', 'carbonCopyStart', [jsonToXml(requestData), jsonToXml(person)]), url.cpc, function (responseVO) {
                            if (responseVO.status == "200") {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '抄送成功'
                                });
                                alertPopup.then(function (res) {
                                    $state.go("cfmtbizoptinfhome", {}, {
                                        reload: true
                                    });
                                });
                            }
                            else {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '抄送失败'
                                });
                                alertPopup.then(function (res) {
                                    $state.go("cfmtbizoptinfhome", {}, {
                                        reload: true
                                    });
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



        $scope.functionalDepartmentReview = function(){
            $scope.aprvOpns = $('#aprvOpns').val();


            //选人
            var aprv = {
                orgCode: '0101',
                roleCode: 'J000000007',
                isCheckbox:true,
                getUserObj:true,
            }
            var aprvStr = angular.toJson(aprv);
            sessionStorage.setItem("selectUser", aprvStr);
            //跳转到选人页面
            $state.go("synergyselect", {}, {
                reload: true
            });

            sessionStorage.setItem("submitMethod", 'setReturnPrjgrpDptUser');
            if ($rootScope.setReturnPrjgrpDptUserFlag) {
                return;
            }

            $rootScope.$on('setReturnPrjgrpDptUser', function (d, data) {


                $scope.cstNum = "";
                console.log(data);         //子级能得到值
                if (data) {
                    $scope.getcolaprvuserList = data;
                    for (var i = 0; i < $scope.getcolaprvuserList.length; i++) {
                        var empId = $scope.getcolaprvuserList[i].userNum;
                        var deptId = $scope.getcolaprvuserList[i].deptCode;
                        var orgCode = $scope.getcolaprvuserList[i].orgCode;
                        var roleId = '';//$scope.getcolaprvuserList[i].postCode;
                        addAprvUser(empId, deptId,orgCode,roleId);
                    }
                    $scope.cfmProjBscInfo_investmt('SEND');
                }
            });

            $rootScope.setReturnPrjgrpDptUserFlag = true;
        }


        $scope.cfmProjBscInfo_investmt = function(param) {

            var aprvOpns = $scope.aprvOpns;
            var condition;
            var aprvResult="";
            var msg = "提交成功！";
            if(param=="SEND"){
                condition ="1";
                msg = "提交成功！项目已发送至各职能部门审核！"
            }
            if(param=="BACK"){
                condition ="0";
                aprvResult="4";
                msg = "退回成功！项目已退回至项目经理重新补充资料！"
            }
            if(param=="CMT"){
                condition ="1";
                msg = "提交成功！项目已提交至项目经理！"
            }
            var aprvStCd = "1";
            var requestData={
                bsnEtyType: '30',
                bsnEtyId : PROJID,
                actLinkId:actLinkId,
                aprvInsId: pmInstId,
                aprvDeptId:pmDeptId,
                aprvEmpId:pmEmpId,
                aprvRoleId:pmRoleId,
                aplyEmpId : pmEmpId,
                aplyInsId : pmInstId,
                aplyDeptId:pmDeptId,
                aprvOpns:aprvOpns,
                aprvResult:aprvResult,
                prcSort:22,
                oprEmpId:person.userNum,
                oprInsId:person.currentGroup.blngOrgCode,
                //oprDeptId:person.currentGroup.blngDeptCode,
                oprRoleId:person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                aprvStCd:'1',
                condition:condition,
                taskId:TASKID,
                processInstanceId:processInstanceId,
                "aprvUserList":[]
            };

            if(actLinkId=="ACT_4"){
                var tblData =  $scope.getcolaprvuserList;

                if(!tblData || (tblData.length==0)){
                    $.alert('提示', '请选择集团职能部门进行审批！', 'warning');
                    return;
                }

                for(var i=0;i<tblData.length;i++){
                    var aprvUser = {
                        empid: tblData[i].userNum,
                        insid: tblData[i].orgCode,
                        deptid: tblData[i].deptCode,
                        roleId: "",
                    }
                    requestData.aprvUserList.push(aprvUser);

                   /* var empid="aprvUserList["+i+"].empid";//员工编号
                    var insid="aprvUserList["+i+"].insid";//机会编号
                    var deptid ="aprvUserList["+i+"].deptid";//机会编号
                    var roleId ="aprvUserList["+i+"].roleId";
                    userListArray[empid]=tblData[i].userNum;
                    userListArray[insid]=tblData[i].orgCode;//
                    userListArray[deptid]=tblData[i].deptCode;//
                    userListArray[roleId]="";//tblData[i].aprvRoleId;
                    requestData=$.extend(requestData,userListArray,true);*/
                }

            }

            console.log(SysServiceData('CPC', 'commitProjBscInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]));


            AjaxJsonp(SysServiceData('CPC', 'commitProjBscInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function(responseVO) {
                if(responseVO.status==200){
                    $ionicPopup.alert({
                        title: '提示',
                        template: msg
                    }).then(function (res) {
                        $state.go("backlogList", {}, {
                            reload: true
                        });
                    });
                }
                else{
                    $ionicPopup.alert({
                        title: '提示',
                        template:  '操作异常！请稍后再试！'
                    }).then(function (res) {
                        $state.go("backlogList", {}, {
                            reload: true
                        });
                    });
                }
            });
        }

        //保存审核人员信息
        function addAprvUser(empId, deptId,orgCode,roleId){

            var requestData={
                bsnEtyType:'30',
                bsnEtyId:PROJID,
                aprvInsId:orgCode,
                aprvDeptId:deptId,
                aprvEmpId:empId,
                aprvRoleId:roleId,
                rmrk2:"0"
            };

            AjaxJsonp(SysServiceData('CPC', 'doSaveAprvInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function(responseVO) {

            });
        }


        $scope.cfmProjBscInf_ACT_5 = function(condition) {
            var requesturl = "../projbscinf/commitprojbscinf";
            var aprvOpns = $('#aprvOpns').val();
            var aprvResult = $('input:radio[name=aprvResult]:checked').val();
            var aprvStCd = "2";
            var requestData={
                bsnEtyType: '30',
                bsnEtyId : PROJID,
                actLinkId:actLinkId,
                aplyEmpId : pmEmpId,
                aplyInsId : pmInstId,
                aplyDeptId:pmDeptId,
                aprvStCd:'1',
                aprvResult:aprvResult,
                aprvInsId:'' ,
                aprvEmpId:'',
                aprvOpns:aprvOpns,
                oprPrdCd:'24',
                prcSort:22,
                oprEmpId:person.userNum,
                oprInsId:person.currentGroup.blngOrgCode,
             //   oprDeptId:loginOrgId,
                oprRoleId: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                taskId:TASKID,
                processInstanceId:processInstanceId
            };
            AjaxJsonp(SysServiceData('CPC', 'commitProjBscInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc,function(responseVO) {
                if (responseVO.status == 200) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '审批成功！'
                    });
                    alertPopup.then(function (res) {
                        $state.go("backlogList", {}, {
                            reload: true
                        });
                    });
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '后台异常！请稍后再试'
                    });
                    alertPopup.then(function (res) {
                        $state.go("backlogList", {}, {
                            reload: true
                        });
                    });
                }
            });
        }

        $scope.contractFiling = function(){
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: '请到pc端进行操作！'
            });
            alertPopup.then(function (res) {
                $state.go("backlogList", {}, {
                    reload: true
                });
            });
        }

    })