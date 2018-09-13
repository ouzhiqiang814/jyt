/**
 * 线索审批
 */
angular.module('alreadyApproveclue.controller', [])
    .controller('AlreadyApproveclueCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory,$ionicPopup,$rootScope,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        $scope.activityId = approveItem.activityId;
        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime =approveItem.beginTime;
        $scope.activityName = approveItem.activityName;
        $scope.processName = approveItem.processName;

        var params = null;

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $scope.reson = false;
        $scope.approveResult = function (result) {
            if (result == 0) {
                $scope.reson = true;
            } else {
                $scope.reson = false;
            }
        }

        show($ionicLoading);



        //基本信息查询
        $scope.baseDataFlag1 = true;
        $scope.getCluebscInfSuccess = function (msg) {
            hide($ionicLoading);
            var historyData = {
                clueId: approveItem.businessKey,
                clueType: 10
            };
            sessionStorage.setItem("historyData", angular.toJson(historyData));
            $scope.baseData = msg.clueVO;
            if (!$scope.baseData) {
                $scope.baseDataFlag1 = false;
            }

            $scope.$apply();
        }

        var getCluebscInfVo = {
            clueId: approveItem.businessKey
        }

        AjaxJsonp(SysServiceData('CPC', 'getCluebscInf', [jsonToXml(getCluebscInfVo)]), url.cpc, $scope.getCluebscInfSuccess);




        //协同方信息查询
        $scope.baseDataFlag2 = true;
        $scope.xiangmu2 = [];
        $scope.page2 = 0;
        $scope.size2 = 10;
        $scope.finite_state2 = false;
        $scope.doGetProjCooTeamListSuccess = function (msg) {
            //   msg = {"content":[{"bsnEtyID":10969,"bsnEtyType":"10","colCntDsc":"dfsdfsdfa","cooPtnID":10150,"cooPtnNm":"呜呜呜","crtEmpID":"00000713","crtEmpNm":"戴耿韬","crtTm":"2017-09-04","deptID":"012501","deptNm":"金融贸易部","grpSN":11276,"instId":"0125","instNm":"产业发展-金融贸易部"}],"endRow":1,"first":true,"firstPage":true,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":true,"last":true,"lastPage":true,"list":[{"bsnEtyID":10969,"bsnEtyType":"10","colCntDsc":"dfsdfsdfa","cooPtnID":10150,"cooPtnNm":"呜呜呜","crtEmpID":"00000713","crtEmpNm":"戴耿韬","crtTm":"2017-09-04","deptID":"012501","deptNm":"金融贸易部","grpSN":11276,"instId":"0125","instNm":"产业发展-金融贸易部"}],"navigatePages":8,"navigatepageNums":[1],"nextPage":0,"number":0,"numberOfElements":1,"pageNum":1,"pageSize":10,"pages":1,"prePage":0,"size":1,"startRow":1,"total":1,"totalElements":1,"totalPages":1};
            /*$scope.doGetProjCooTeamListData = msg.content;*/
            $scope.baseData2 = msg.content;
            if ($scope.baseData2.length == 0) {
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

            $ionicLoading.hide();
        }

        $scope.doGetProjCooTeamList = function (obj) {
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var doGetProjCooTeamListVo = {
                bsnEtyType: 10,//默认
                bsnEtyID: approveItem.businessKey,
            };
            AjaxJsonp(SysServiceData('CPC', 'doGetProjCooTeamList', [$scope.page2, $scope.size2, jsonToXml(doGetProjCooTeamListVo)]), url.cpc, $scope.doGetProjCooTeamListSuccess);
        }

        $scope.doGetProjCooTeamList();

        //下拉刷新
        //$scope.doGetProjCooTeamListData_refresh = function () {
        $scope.func_refresh2 = function () {
            $scope.page2 = 0;
            $scope.doGetProjCooTeamList(true);
        }

        //上拉加载
        //$scope.doGetProjCooTeamListData_loadMore = function () {
        $scope.loadMore2 = function () {
            $scope.page2 = $scope.page2 + 1;
            $scope.finite_state2 = false;
            $scope.doGetProjCooTeamList();
        }




        //附件信息查询
        $scope.baseDataFlag3 = true;
        $scope.xiangmu3 = [];
        $scope.page3 = 0;
        $scope.size3 = 10;
        $scope.finite_state3 = false;
        $scope.getAttchListSuccess = function (msg) {
            $scope.getAttchListData = msg.content;
            if ($scope.getAttchListData.length == 0) {
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

        $scope.indexdata3 = function (obj) {
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var getAttchListVo = {
                bsnEtyType: 10,
                bsnEtyId: approveItem.businessKey,
            }

            AjaxJsonp(SysServiceData('CPC', 'getAttchList', [$scope.page3, $scope.size3, jsonToXml(getAttchListVo)]), url.cpc, $scope.getAttchListSuccess);
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





        //已完成工作查询
        $scope.baseDataFlag4 = true;
        $scope.xiangmu4 = [];
        $scope.page4 = 0;
        $scope.size4 = 10;
        $scope.finite_state4 = false;
        $scope.doGetActyListSuccess = function (msg) {
            //   msg = {"content":[{"actyDsc":"asdfsadfsadfsdafsda","actySn":10297,"actyTitle":"asdfasdfasdfasd","actyTpcd":"10","bsnEtyId":10969,"bsnEtyType":"10","crtTm":"2017-09-04","exeDeptId":"015602","exeDt":"2017-09-04","exeEmpeId":"00000707","exeEmpeNm":"丁亮","exeInsId":"0156","exeInsNm":"城市开发-投资管理部","udtEmpId":"00000707","udtEmpNm":"丁亮"}],"endRow":1,"first":true,"firstPage":true,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":true,"last":true,"lastPage":true,"list":[{"actyDsc":"asdfsadfsadfsdafsda","actySn":10297,"actyTitle":"asdfasdfasdfasd","actyTpcd":"10","bsnEtyId":10969,"bsnEtyType":"10","crtTm":"2017-09-04","exeDeptId":"015602","exeDt":"2017-09-04","exeEmpeId":"00000707","exeEmpeNm":"丁亮","exeInsId":"0156","exeInsNm":"城市开发-投资管理部","udtEmpId":"00000707","udtEmpNm":"丁亮"}],"navigatePages":8,"navigatepageNums":[1],"nextPage":0,"number":0,"numberOfElements":1,"pageNum":1,"pageSize":10,"pages":1,"prePage":0,"size":1,"startRow":1,"total":1,"totalElements":1,"totalPages":1};
            $scope.doGetActyListData = msg.content;
            if ($scope.doGetActyListData.length == 0) {
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
            var doGetActyListVo = {
                bsnEtyType: 10,
                bsnEtyId: approveItem.businessKey,
            }

            AjaxJsonp(SysServiceData('CPC', 'doGetActyList', [$scope.page4, $scope.size4, jsonToXml(doGetActyListVo)]), url.cpc, $scope.doGetActyListSuccess);
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










        //审批事件

        $scope.aprvResult = '';
        var aplyEmpId ='';
        var aplyInsId = '';
        var aplyEmpNm ='';
        var aplyDeptId = '';


        var aprvEmpId = '';//$("#crtEmpId").val();//clueVO.crtEmpId;
        var aprvInsId = '';//$("#crtInsId").val();//clueVO.crtInsId;
        var aprvDeptId = '';//$("#crtDeptId").val();


        $scope.commit = function () {

            $scope.aprvResult = $('input:radio[name=approve]:checked').val();
            $scope.aprvOpns =  $('#aprvOpns').val();
            aplyEmpId = $scope.baseData.crtEmpId;// $("#crtEmpId").val();
            aplyInsId = $scope.baseData.crtInsId;// $("#crtInsId").val();
            aplyEmpNm = $scope.baseData.crtEmpNm;// $("#crtEmpNm").val();
            aplyDeptId = $scope.baseData.crtDeptId;// $("#crtDeptId").val();


            if (approveItem.activityId == "CLM_APPLY_2") {
                aprvEmpId = person.userNum;
                aplyEmpNm =  person.realname;
                aprvInsId = person.currentGroup.blngDeptCode;
                aprvDeptId = person.currentGroup.blngOrgCode;
                aprvRoleId = person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode;
            }

            if ($scope.aprvResult == 1 || $scope.aprvResult == '1') {
                var confirmInfo = "当前默认机会责任人为" + aplyEmpNm + "，是否更换机会责任人？如需更改请点击【确定】按钮";
                var confirmPopup = $ionicPopup.confirm({
                    title: '提示',
                    buttons: [
                        { text: '取消' },
                        {
                            text: '确认',
                            onTap: function(e) {
                                return true;
                            },
                            type: 'button-positive',
                        },
                    ],
                    template: confirmInfo
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        //commonChooseUser(loginManagerOrgId, "","0",setReturnAprvClueUser10);
                        var aprv = {
                            orgCode: person.currentGroup.manageOrgCode,
                            roleCode: '',
                        }
                        var aprvStr = angular.toJson(aprv);
                        sessionStorage.setItem("selectUser", aprvStr);
                        //跳转到选人页面
                        $state.go("synergyselect", {}, {
                            reload: true
                        });

                        sessionStorage.setItem("submitMethod", 'setReturnAprvClueUser');
                        if ($rootScope.setReturnAprvClueUserFlag) {
                            return;
                        }
                        $rootScope.$on('setReturnAprvClueUser', function (d, data) {
                            console.log(data);         //子级能得到值
                            if(data){
                                aprvEmpId = data.userNum;
                                aprvInsId= data.orgCode;
                                aprvRoleId= data.postCode;
                                aprvDeptId = data.deptCode;
                                commitClueInf("CMT");
                            }

                        });
                        $rootScope.setReturnAprvClueUserFlag = true;
                    } else {
                        if (approveItem.activityId == "CLM_APPLY_2") {
                            //如果是转发给跨部门协同接口人审核，则默认机会责任人为线索审批人
                            aprvEmpId = person.userNum;
                            aprvInsId = person.currentGroup.blngDeptCode;
                            aprvDeptId = person.currentGroup.blngOrgCode;
                            aprvRoleId = person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode;
                        }
                        else {

                            //如果是直属领导审核，则默认机会责任人为线索创建人
                            aprvEmpId = $scope.baseData.crtEmpId;//$("#crtEmpId").val();//clueVO.crtEmpId;
                            aprvInsId = $scope.baseData.crtInsId;//$("#crtInsId").val();//clueVO.crtInsId;
                            aprvDeptId = $scope.baseData.crtDeptId;//$("#crtDeptId").val();
//						aprvRoleId = clueVO.mgmtRoleId;
                        }

                        commitClueInf("CMT");
                    }
                });
            }
            else {
                commitClueInf("CMT");
            }

        }


        /**
         * 审批线索流程
         *
         */
        function commitClueInf(param) {
            $scope.param = param;

           /* aprvEmpId = $scope.baseData.crtEmpId;//$("#crtEmpId").val();//clueVO.crtEmpId;
            aprvInsId = $scope.baseData.crtInsId;//$("#crtInsId").val();//clueVO.crtInsId;
            aprvDeptId = $scope.baseData.crtDeptId;//$("#crtDeptId").val();



            aprvResult = $('input:radio[name=approve]:checked').val();
            aplyEmpId = $scope.baseData.crtEmpId;// $("#crtEmpId").val();
            aplyInsId = $scope.baseData.crtInsId;// $("#crtInsId").val();
            aplyEmpNm = $scope.baseData.crtEmpNm;// $("#crtEmpNm").val();
            aplyDeptId = $scope.baseData.crtDeptId;// $("#crtDeptId").val();*/


            var msg = "审批成功!";
            if(param != "CMT"){
                $scope.aprvResult = $('input:radio[name=approve]:checked').val();
                $scope.aprvOpns =  $('#aprvOpns').val();
            }
            var condition;
            var aprvStCd ="1";
            var oprPrdCd="";
            //提交按钮
            if(param=="CMT"){
                if(!$scope.aprvResult){
                    $ionicPopup.alert({
                        title: '提示',
                        template: '请选择审批结果！'
                    });
                    return;
                }

                //直属领导审批
                if(approveItem.activityId=="CLM_APPLY_1"){
                    condition = "1";
                    //审批通过
                    if($scope.aprvResult=="1"){
                        msg ="审批成功！审批结果为通过！"
                    }
                    //认定不通过
                    else{
                        msg ="审批成功！审批结果为不通过！"
                    }
                }
                aprvStCd="1";
                oprPrdCd="11";
            }

            //退回按钮
            if(param=="SENDBACK"){
                $scope.aprvResult="4";
                condition = "3";
                msg = "退回成功！";
                aprvEmpId = $scope.baseData.crtEmpId;//$("#crtEmpId").val();//clueVO.crtEmpId;
                aprvInsId = $scope.baseData.crtInsId;//$("#crtInsId").val();//clueVO.crtInsId;
                aprvDeptId = $scope.baseData.crtDeptId;//$("#crtDeptId").val();
            }
            //转发按钮
            if(param=="TRANSFER"){
                $scope.aprvResult="3";
                condition = "2";
                msg = "转发成功！";
                oprPrdCd="11";
            }
            var requestData={
                bsnEtyType: 10,
                bsnEtyId : approveItem.businessKey,
                actLinkId:approveItem.activityId,
                aprvResult:$scope.aprvResult,
                aprvOpns:$scope.aprvOpns,
                aprvStCd:aprvStCd,
                aprvInsId : aprvInsId,
                aprvDeptId:aprvDeptId,
                aprvEmpId : aprvEmpId,
                aprvRoleId: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                aplyEmpId: $scope.baseData.crtEmpId,// $scope.baseData.crtEmpId
                aplyInsId: $scope.baseData.crtInsId, //$scope.baseData.crtInsId
                aplyDeptId: $scope.baseData.crtDeptId,//$scope.baseData.crtDeptId
                oprEmpId: person.userNum, //person.userNum
                oprInsId: person.currentGroup.blngDeptCode,//person.currentGroup.blngDeptCode
                oprRoleId: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,//person.currentGroup.role 的最后一个  估计这个字段没用
                oprPrdCd: 11,//默认11
                prcSort:2,
                rmrk1:"2",
                processInstanceId: approveItem.processInstanceId, //processInstanceId
                taskId: approveItem.taskId,//TASKID
                condition:condition,
                falrsCd : typeof($("#falrsCd").val()) == "undefined" ? "" : $("#falrsCd").val() //不通过原因  ${fnt:getDictOptionsByCdTp('0169','','','')}
            };
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {blngDeptCode: person.currentGroup.blngDeptCode}
            }
            AjaxJsonp(SysServiceData('CPC', 'commitBizOptInfColClue', [jsonToXml(requestData), jsonToXml(sysUserVo)]), url.cpc, function (ret) {
                if (ret) {
                    if (ret.status == 200) {

                        //审批通过
                        if($scope.param=="CMT") {
                            if ($scope.aprvResult == 1 || $scope.aprvResult == '1') {
                                startBizOptProcess(aprvEmpId, aprvInsId, aprvDeptId, person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode);
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: '提示',
                                    template: '提交成功！审批结果为不通过！该线索已结束！'
                                });
                                alertPopup.then(function (res) {
                                    $state.go("backlogList", {}, {
                                        reload: true
                                    });
                                });
                            }
                        }else{
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template:msg
                            });
                            alertPopup.then(function (res) {
                                $state.go("backlogList", {}, {
                                    reload: true
                                });
                            });
                        }

                    } else {
                        $ionicPopup.alert({
                            title: '提示',
                            template: '审批异常'
                        });
                    }
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: '审批异常'
                    });
                }
            });
        }


        $scope.commitBizOptInfColClueSuccess = function (ret) {
            if (ret) {
                if (ret.status == 200) {

                    //审批通过
                    if($scope.param=="CMT") {
                        if ($scope.aprvResult == 1 || $scope.aprvResult == '1') {
                            startBizOptProcess(aprvEmpId, aprvInsId, aprvDeptId, person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode);
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '提交成功！审批结果为不通过！该线索已结束！'
                            });
                            alertPopup.then(function (res) {
                                $state.go("backlogList", {}, {
                                    reload: true
                                });
                            });
                        }
                    }else{
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template:msg
                        });
                        alertPopup.then(function (res) {
                            $state.go("backlogList", {}, {
                                reload: true
                            });
                        });
                    }

                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '审批异常'
                    });
                }
            }else{
                $ionicPopup.alert({
                    title: '提示',
                    template: '审批异常'
                });
            }
        }


        function startBizOptProcess(mgmtEmpId, mgmtInstId, mgmtDeptId, mgmtRoleId, exind) {
            var requestData = {
                bsnEtyType: 10,
                bsnEtyId: approveItem.businessKey,
                actLinkId: "ACT_0",
                aprvInsId: mgmtInstId,
                aprvEmpId: mgmtEmpId,
                aprvDeptId: mgmtDeptId,
                aprvRoleId: mgmtRoleId,
                oprEmpId: person.userNum,
                oprInsId: person.currentGroup.blngDeptCode,
                oprRoleId: person.currentGroup.roles[person.currentGroup.roles.length - 1].roleCode,
                bsnNm: $scope.baseData.clueTitle,
                condition: "1",
                prcSort: 11

            };
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {blngDeptCode: person.currentGroup.blngDeptCode}
            }
           // console.log(url.cpc);
            //console.log(SysServiceData('CPC', 'startBizOptProcess', [jsonToXml(requestData), jsonToXml(person)]));
            AjaxJsonp(SysServiceData('CPC', 'startBizOptProcess', [jsonToXml(requestData), jsonToXml(sysUserVo)]), url.cpc, function (msgjsonobj) {
                console.log(msgjsonobj);
                if (msgjsonobj.status == "200") {
                    if (exind == 1) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            buttons: [
                                {
                                    text: '确认',
                                    type: 'button-positive',
                                },
                            ],
                            template: '线索已提交给新的机会负责人'
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
                            template: '线索已提交给机会负责人！'
                        });
                        alertPopup.then(function (res) {
                            $state.go("backlogList", {}, {
                                reload: true
                            });
                        });
                    }

                }
                else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '操作异常！请稍后再试！'
                    });
                }
            });
        }



        $scope.transferClue = function(){
            var aprv = {
                orgCode: '01',
                roleCode: '',
            }
            var aprvStr = angular.toJson(aprv);
            sessionStorage.setItem("selectUser", aprvStr);
            //跳转到选人页面
            $state.go("synergyselect", {}, {
                reload: true
            });

            sessionStorage.setItem("submitMethod", 'transferClueSubmit');
            if ($rootScope.transferClueSubmitFlag) {
                return;
            }
            $rootScope.$on('transferClueSubmit', function (d, data) {
                console.log(data);         //子级能得到值
                if(data){
                    aprvInsId = data.orgCode;
                    aprvDeptId = data.deptCode;
                    aprvEmpId =data.userNum;
                    aprvRoleId = data.postCode;
                    commitClueInf("TRANSFER");
                }

            });
            $rootScope.transferClueSubmitFlag = true;

        }
    })