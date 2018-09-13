angular.module('alreadySprvinfhomepage.controller', [])
    .controller('AlreadySprvinfhomepageCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicSideMenuDelegate, $ionicPopup) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

     /*   document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载
        function onDeviceReady() {
            MXWebui.showWebViewTitle();
            MXWebui.showOptionMenu();
            //如果需要页面加载完成后，就调用平台的API，必须加在此处。加在onload里面不行。
        }*/
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            if(sessionStorage.getItem("SprvinfhomepageCtrl.viewRightPage") == ''||sessionStorage.getItem("SprvinfhomepageCtrl.viewRightPage") == null){
                if(getQueryString("activityId")!=null&&getQueryString("activityId")!=''){
                    goBackByNum(1);
                }else{
                    javascript:history.go(-1);
                }
            }else{
                javascript:history.go(-1);
            }

        };
        var data = '';
        var approveItem = '';
        if (sessionStorage.getItem("SprvinfhomepageCtrl.viewRightPage") == ''||sessionStorage.getItem("SprvinfhomepageCtrl.viewRightPage") == null) {
            approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
            $("title").html("督办会议流程审批");
            $("#title").html("督办会议流程审批");
            if (approveItem == null) {
                approveItem = {
                    businessKey: getQueryString("businessKey"),
                    activityId: getQueryString("activityId"),
                    taskId: getQueryString("taskId"),
                    processInstanceId: getQueryString("processInstanceId"),
                }
                // sessionStorage.setItem("approveItem", angular.toJson(approveItem));
                $scope.showHeader = false;
            } else {
                $scope.showHeader = true;
            }

            $scope.actLinkId = approveItem.activityId;
            $scope.flag = true;
        } else {
            $("#title").html("督办详情");
            $scope.showHeader = true;
            data = angular.fromJson(sessionStorage.getItem("SprvinfhomepageCtrl.viewRightPage"));
            $scope.flag = false;
        }
        show($ionicLoading);
        function init(initRet) {
            show($ionicLoading);
            $scope.activityId = approveItem.activityId;
            if (person == null && initRet != null) {
                person = initRet;
            }

            /*基本信息*/
            var processInstanceId;
            $scope.success = function (msg) {

                processInstanceId = msg.processInstanceId;
                console.log(msg);
                $scope.basic = msg.vo;
                hide($ionicLoading);
                $scope.shenpi = msg.aprvvo;
                console.log($scope.basic)
            }

            $scope.indexdata = function () {
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

                //sprvID:20   role:1
                if ($scope.flag) {
                    var viewRightPageVo = {
                        actLinkId: approveItem.activityId,
                        bizOptId: approveItem.businessKey,
                        TASKID: approveItem.taskId,
                        processInstanceId: approveItem.processInstanceId,
                    }

                    AjaxJsonp(SysServiceData('CPC', 'viewRightPage', [jsonToXml(viewRightPageVo), '', '', '', '']), url.cpc, $scope.success);

                } else {
                    AjaxJsonp(SysServiceData('CPC', 'viewRightPage', ['', data.sprvID, data.role, '0', jsonToXml(sysUserVO)]), url.cpc, $scope.success);
                }
            }

            $scope.indexdata();


            /*督办事项列表*/
            $scope.dataFlag = true;

            $scope.items = [];
            $scope.page = 0;
            $scope.size = 10;
            $scope.finite_state = false;

            $scope.success2 = function (msg) {
                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.items = [];
                }
                $scope.items.push.apply($scope.items, msg.list);

                setTimeout(function () {
                    $scope.finite_state = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                if ($scope.items.length == 0) {
                    $scope.dataFlag = false;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

            }

            $scope.indexdata2 = function (obj) {
                if (obj) {
                    $scope.itemsFlag = true;
                } else {
                    $scope.itemsFlag = false;
                }
                if ($scope.flag) {
                    var doGetsprviteminfListVo = {
                        sprvID: approveItem.businessKey,
                        fdbkPsnID: ''
                    }
                } else {
                    var doGetsprviteminfListVo = {
                        sprvID: data.sprvID,
                        fdbkPsnID: ''
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'doGetsprviteminfList', [$scope.page, $scope.size, jsonToXml(doGetsprviteminfListVo)]), url.cpc, $scope.success2);
            }

            $scope.indexdata2();

            //下拉刷新
            $scope.func_refresh = function () {
                $scope.page = 0;
                $scope.indexdata2(true);
            }
            //上拉加载更多
            $scope.loadMore = function () {
                $scope.page = $scope.page + 1;
                $scope.finite_state = msg.hasNextPage;
                $scope.indexdata2();
            }


            /*审核信息列表*/

            $scope.checkData = [];
            $scope.page3 = 0;
            $scope.size3 = 10;
            $scope.finite_state3 = false;

            $scope.success3 = function (msg) {
                if ($scope.itemsFlag3) {
                    $scope.checkData = [];
                }
                $scope.checkData.push.apply($scope.checkData, msg.list);

                setTimeout(function () {
                    $scope.finite_state3 = msg.hasNextPage;
                }, 500);
                $scope.$apply();


                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }

            $scope.indexdata3 = function (obj) {
                if (obj) {
                    $scope.itemsFlag3 = true;
                } else {
                    $scope.itemsFlag3 = false;
                }
                var doGetColAprvInfPageVo   = {
                    bsnEtyType:'SPRV',
                    bsnEtyId:approveItem.businessKey,
                    actLinkId:'ACT4',
                    processInstanceId:approveItem.processInstanceId,
                }

                AjaxJsonp(SysServiceData('CPC', 'doGetColAprvInfPage', [$scope.page3, $scope.size3, jsonToXml(doGetColAprvInfPageVo)]), url.cpc, $scope.success3);
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
                $scope.finite_state = false;
                $scope.indexdata3();
            }




            /*点击项 弹出选框*/
            $scope.tanchu = function (e) {
                $(e.target).parents("ion-item").find(".xuanze").fadeIn(200);
                $(e.target).parents("ion-item").siblings("ion-item").find(".xuanze").hide();
            }

            $scope.huandong = function () {
                $(".xuanze").hide();
            }

            $scope.close = function () {
                $(".xuanze").hide();
            }


            /* 跳到详情页 */
            $scope.look = function (info) {
                console.log(info);
                var data = angular.toJson(info);
                sessionStorage.setItem("QuerysprviteminfpageCtrl.querysprviteminfpage", data);
                /* 以上的两句代码，是传递给详情页的参数 */

                $state.go("querysprviteminfpage", {}, {
                    reload: true
                });
            }

            $scope.excelColsprvitminf = function(info){
                var mgtNm =  $scope.basic.mtgNm;
                var urls = url.cpcDownload + '/excelColSprvinf?sprvID='+$scope.basic.sprvID+"&mtgNm="+encodeURI(mgtNm);
                MXCommon.download(urls);
            }


            $scope.chooseAprvCooteamEmpe = function () {
                showCommon($ionicLoading);
                var mtgNm = $scope.basic.mtgNm;
                if (!mtgNm) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请填写反馈说明！'
                    });
                    return;
                }
                var mtgItmDsc = $scope.basic.mtgItmDsc;
                if (!mtgItmDsc) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请填写反馈说明！'
                    });
                    return;
                }

              //  saveSprvInfform(1);

                if (!processInstanceId) {
                    //  commonChooseUser(loginManagerOrgId, "J000000012", "0", setReturnBizOptUser11);
                }
                else {
                    cfmSprvInf()

                }
            }

            var SPRVID;

            function saveSprvInfform(ind) {


                var doGetsprviteminfListVo = $scope.basic;

                var sysUserVO = {
                    userNum: person.userNum,
                    postCode: person.postCode,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                        blngOrgCode: person.currentGroup.blngOrgCode,
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'doSaveColSprvinf', [jsonToXml(doGetsprviteminfListVo), jsonToXml(sysUserVO)]), url.cpc, function (msgjsonobj) {
                    if (msgjsonobj.status == 200) {
                        SPRVID = msgjsonobj.data;

                        if (!ind) {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '保存成功！'
                            });

                        }

                    } else {
                        if (!ind) {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '保存失败！'
                            });
                        }

                    }
                });
            }

            function updateSprvItemComlStCd(){
                var sprvID= $scope.basic.sprvID;//$('#sprvID').getValue();
                var requestData = {
                    complSttnCd : "2",//未完成
                    sprvID:sprvID,
                    itemResult:"1"//事项结果，1表示已经重新提交
                };

                var sysUserVO = {
                    userNum: person.userNum,
                    currentGroup: {
                        blngOrgCode: person.currentGroup.blngOrgCode,
                    }
                }
                AjaxJsonp(SysServiceData('CPC', 'doUpdateUmCmplSprvItmStCd', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (msg) {
                    console.log(msg);
                });

            }


            var condition = '';

            function cfmSprvInf(empId, empNm, deptCode, orgCode, postCode) {
                var mtgNm = $scope.basic.mtgNm;
                var actLinkId = approveItem.activityId


                if (!mtgNm) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请填写反馈说明！'
                    });
                    return;
                }
                var mtgItmDsc = $scope.basic.mtgItmDsc;
                if (!mtgItmDsc) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请填写反馈说明！'
                    });
                    return;
                }

                saveSprvInfform(1);

                var aprvOpns = $('#aprvOpns').val();
                var aprvResult = $('input:radio[name=aprvResult]:checked').val();
                var msg = "流程提交成功";
                if (actLinkId == "ACT3") {
                    msg = "提交成功,流程结束！";
                }

                if (actLinkId == "ACT4") {
                    if (!aprvResult) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '请选择审核结果！'
                        });
                        return;
                    }
                    if (aprvResult == "0") {
                        msg = "提交成功，审核结果为不同意，流程结束！";
                    }
                    condition = aprvResult;
                }

                if (!processInstanceId) {
                    actLinkId = "ACT1";
                }

                var requestData = {
                    aprvSn: $scope.shenpi ? $scope.shenpi.aprvSn : '',//$('#aprvSn').getValue(),
                    bsnEtyType: "SPRV",
                    bsnEtyId: $scope.basic.sprvID,
                    actLinkId: actLinkId,
                    aprvInsId: "",
                    aprvDeptId: "",
                    aprvEmpId: "",
                    aprvOpns: aprvOpns,
                    aprvResult: aprvResult,
                    taskId: approveItem.taskId,
                    aprvStCd: '1',
                    aplyEmpId: $scope.basic.sprvRsplPsnID,//$('#sprvRsplPsnID').getValue(),
                    aplyInsId: $scope.basic.sprvRsplPsnInst,// $('#sprvRsplPsnInst').getValue(),
                    aplyDeptId: $scope.basic.sprvRsplPsnDept,//$('#sprvRsplPsnDept').getValue(),
                    oprEmpId: person.userNum,
                    processInstanceId: approveItem.processInstanceId,// processInstanceId,
                    bsnNm: $scope.basic.mtgNm,//$('#mtgNm').getValue()
                    condition: condition
                };

                var sysUserVO = {
                    userNum: person.userNum,
                    postCode: person.postCode,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                        blngOrgCode: person.currentGroup.blngOrgCode,
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'commitColSprvInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                    hideCommon($ionicLoading);
                    if (responseVO.status == 200) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: msg
                        });
                        alertPopup.then(function (res) {
                            var tpCd = $scope.basic.sprvTpCd;//$("#sprvTpCd").getValue();
                            if(tpCd==2){
                                updateSprvItemComlStCd();
                            }
                            goBackByNum(1);
                        });

                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '后台异常！请稍后再试'
                        });
                        alertPopup.then(function (res) {
                            goBackByNum(1);
                        });
                    }
                })
            }
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }

    })
