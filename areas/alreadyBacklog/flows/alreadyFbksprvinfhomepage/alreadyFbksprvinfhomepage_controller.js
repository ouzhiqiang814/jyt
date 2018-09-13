/**
 * 线索审批
 */
angular.module('alreadyFbksprvinfhomepage.controller', [])
    .controller('AlreadyFbksprvinfhomepageCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        show($ionicLoading);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            goBackByNum(1);
        };

        $("title").html("督办会议流程审批");
        if (approveItem == null) {
            approveItem = {
                businessKey: getQueryString("businessKey"),
                activityId: getQueryString("activityId"),
                taskId: getQueryString("taskId"),
                processInstanceId: getQueryString("processInstanceId"),
            }
            //     sessionStorage.setItem("approveItem", angular.toJson(approveItem));
            $scope.showHeader = false;
        } else {
            $scope.showHeader = true;
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
            });

            /*基本信息*/
            $scope.success = function (msg) {
                console.log(msg);
                $scope.msg = msg;
                $scope.baseData = msg.vo;
                $scope.indexdata1();
                $scope.indexdata2();
            }

            $scope.indexdata = function (obj) {
                var fbksprvinfhomepageVo = {
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

                AjaxJsonp(SysServiceData('CPC', 'fbksprvinfhomepage', [jsonToXml(fbksprvinfhomepageVo), jsonToXml(sysUserVO)]), url.cpc, $scope.success);
            }

            $scope.indexdata();

            //附件资料列表
            /*资料附件*/
            $scope.xiangmu = [];
            $scope.page = 0;
            $scope.size = 10;
            $scope.finite_state = false;
            $scope.getAttchListSuccess = function (msg) {
                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.xiangmu = [];
                }

                $scope.xiangmu.push.apply($scope.xiangmu, msg.content);
                console.log($scope.xiangmu);

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
                hide($ionicLoading)
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


            /*知悉人列表*/
            $scope.xiangmu1 = [];
            $scope.page1 = 0;
            $scope.size1 = 10;
            $scope.finite_state1 = false;
            $scope.getRmdListSuccess = function (msg) {
                console.log(msg);
                if($scope.itemsFlag1){
                    $scope.xiangmu1 = [];
                }

                $scope.xiangmu1.push.apply($scope.xiangmu1, msg.content);


                setTimeout(function(){
                    $scope.finite_state1 = msg.hasNextPage;
                },500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

            }

            $scope.indexdata2 = function (obj) {
                //console.log(data);
                if(obj){
                    $scope.itemsFlag1 = true;
                }else{
                    $scope.itemsFlag1 = false;
                }
                var getRmdListVo = {
                    itmID: $scope.baseData.itmID,
                }

                AjaxJsonp(SysServiceData('CPC', 'getRmdList', [$scope.page1, $scope.size1, jsonToXml(getRmdListVo)]), url.cpc, $scope.getRmdListSuccess);
            }




            //下拉刷新
            $scope.func_refresh1 = function () {
                $scope.page1 = 0;
                $scope.indexdata1(true);
            }
            //上拉加载更多
            $scope.loadMore1 = function () {
                $scope.page1 = $scope.page1 + 1;
                $scope.finite_state1 = false;
                $scope.indexdata1();
            }


            $scope.cfmSprvInf = function () {
                showCommon($ionicLoading);
                var complCmnt = $("#complCmnt").val();

                if (!complCmnt) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请填写反馈说明！'
                    });
                    return;
                }


                var aprvOpns = $('#complCmnt').val();
                var aprvResult = $('input:radio[name=aprvResult]:checked').val();
                var msg="流程提交成功";

                if(aprvResult == undefined || aprvResult == null || aprvResult == ''){
                    aprvResult = '1';
                    if($("#complSttnCd").val() == '2'){
                        aprvResult = '0';
                    }
                }


                var requestData = {
                    //    aprvSn: $scope.shenpi.aprvSn,//$('#aprvSn').getValue(),
                    bsnEtyType: "SPRV",
                    bsnEtyId: $scope.msg.sprvID,
                    actLinkId: $scope.msg.actLinkId,
                    aprvInsId: $scope.baseData.sprvRsplPsnInst,//$('#sprvRsplPsnInst').getValue(),
                    aprvDeptId: $scope.baseData.sprvRsplPsnDept,//$('#sprvRsplPsnDept').getValue(),
                    aprvEmpId: $scope.baseData.sprvRsplPsnID,//$('#sprvRsplPsnID').getValue(),
                    aprvOpns: aprvOpns,
                    aprvResult: aprvResult,
                    taskId: $scope.msg.TASKID,
                    aprvStCd: '1',
                    aplyEmpId: $scope.baseData.sprvRsplPsnID,//$('#sprvRsplPsnID').getValue(),
                    aplyInsId: $scope.baseData.sprvRsplPsnInst,// $('#sprvRsplPsnInst').getValue(),
                    aplyDeptId: $scope.baseData.sprvRsplPsnDept,// $('#sprvRsplPsnDept').getValue(),
                    oprEmpId: person.userNum,
                    processInstanceId: $scope.msg.processInstanceId,
                    bsnNm: $scope.baseData.mtgNm,// $('#mtgNm').getValue()

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
                });
            }
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }

    })