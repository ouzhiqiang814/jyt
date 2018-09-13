/**
 * 合作伙伴移交审批流程
 */
angular.module('power_mana_approve.controller', [])
    .controller('Power_mana_approveCtrl', function ($scope, $state, $ionicViewSwitcher, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope, $ionicPopup, $ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        show($ionicLoading);
        $("title").html("客户数据查看权限审批");
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

        show($ionicLoading);

        console.log($ionicHistory.viewHistory());


        function init(initRet) {
            if (person == null && initRet != null) {
                person = initRet;
            }


            /* 数据权限申请基本信息 */
            $scope.items1 = [];
            $scope.num = 0;
            $scope.size = 10;
            $scope.num = 0;
            $scope.size = 10;

            $scope.success1 = function (msg) {
                console.log(msg);
                var aprv = {
                    orgCode: msg.vo.aprvInsID,
                    roleCode: msg.vo.aprvRoleID,
                    enterFromOa: $scope.showHeader,
                }
                var aprvStr = angular.toJson(aprv);
                sessionStorage.setItem("selectUser", aprvStr);

                $scope.vo = angular.toJson(msg.vo);
                sessionStorage.setItem("SynergyCluesCtrl.vo", $scope.vo);

                $scope.info = msg.vo;
                $scope.indexdata2($scope.info ,"");
                hide($ionicLoading);
            }

            $scope.indexdata1 = function () {
                AjaxJsonp(SysServiceData('CRM', 'power_mana_approve', [approveItem.businessKey, approveItem.activityId, approveItem.taskId, person.userNum]), url.crm, $scope.success1);
            }

            $timeout(function () {
                $scope.indexdata1();
            }, 300);




            /* 数据权限申请清单 */
            $scope.items2 = [];
            $scope.page2 = 0;
            $scope.size2 = 10;
            $scope.finite_state2 = false;
            $scope.success2 = function (msg) {
                console.log(msg);
                if($scope.itemsFlag2){
                    $scope.items2 = [];
                }

                for (i = 0; i < msg.content.length; i++) {
                    var dat = {
                        dataEnt: msg.content[i].dataEnt,
                        dataAttr: msg.content[i].dataAttr,
                        authInd: msg.content[i].authInd
                    };
                    $scope.$apply(function () {
                        $scope.items2.push(dat);
                    })
                }
                setTimeout(function(){
                    $scope.finite_state2 = msg.hasNextPage;
                },500);
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

            }

            $scope.indexdata2 = function (vo,obj) {
                if(obj){
                    $scope.itemsFlag2 = true;
                }else{
                    $scope.itemsFlag2 = false;
                }
                var cstDataAppInfoVO = {
                    appID: vo.appID,
                    cstID: vo.cstID,
                    cstNm: vo.cstNm,
                    blngLglPsnID: vo.blngLglPsnID,
                    useDsc: vo.useDsc,
                    empeID: vo.empeID,
                    applyDt: vo.applyDt,
                    deptID: vo.deptID,
                    authEndDt: vo.authEndDt,
                    deptNm: vo.deptNm,
                    empeNm: vo.empeNm,
                    ipId: vo.ipId,
                    appIds: vo.appIds
                }

                var xotree = new XML.ObjTree();

                var xml = xotree.writeXML(cstDataAppInfoVO);
                var xmlText = formatXml(xml);

                AjaxJsonp(SysServiceData('CRM', 'getApproveInfo', [$scope.page2, $scope.size2, xmlText, person.userNum]), url.crm, $scope.success2);
            }

            //下拉刷新
            $scope.func_refresh2 = function () {
                $scope.page2 = 0;
                $scope.indexdata2($scope.info,true);
            }
            //上拉加载更多
            $scope.loadMore2 = function () {
                $scope.page2 = $scope.page2 + 1;
                $scope.finite_state2 = false;
                $scope.indexdata2($scope.info,"");
            }




            //查询审批历史
            $scope.query_aprv_his_listItem = [];
            $scope.query_aprv_his_listNum = 0;
            $scope.query_aprv_his_listSize = 10;
            $scope.finite_state3 = false;

            $scope.query_aprv_his_listSuccess = function (ret) {
                console.log(ret)
                if($scope.itemsFlag3){
                    $scope.query_aprv_his_listItem = [];
                }

                $scope.query_aprv_his_listItem.push.apply($scope.query_aprv_his_listItem, ret.content);
                setTimeout(function(){
                    $scope.finite_state3 = ret.hasNextPage;
                },500);
                $scope.$apply();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

            }

            $scope.query_aprv_his_list = function (obj) {
                if(obj){
                    $scope.itemsFlag3 = true;
                }else{
                    $scope.itemsFlag3 = false;
                }
                var query_aprv_his_listVo = {
                    appId: approveItem.businessKey,
                    bsnEtyType: 'CST_DATA'
                }
                AjaxJsonp(SysServiceData('CRM', 'query_aprv_his_list', [$scope.query_aprv_his_listNum, $scope.query_aprv_his_listSize, jsonToXml(query_aprv_his_listVo)]), url.crm, $scope.query_aprv_his_listSuccess);
            }

            $scope.query_aprv_his_list();

            //下拉刷新
            $scope.func_refresh3 = function () {
                $scope.query_aprv_his_listNum = 0;
                $scope.query_aprv_his_list(true);
            }
            //上拉加载更多
            $scope.loadMore3 = function () {
                $scope.query_aprv_his_listNum = $scope.query_aprv_his_listNum + 1;
                $scope.finite_state3 = false;
                $scope.query_aprv_his_list();
            }








            //点击进入审批详情
            $scope.approve = function () {
                if (angular.fromJson($scope.vo).isEnd == 1) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请在电脑上进行审批'
                    });
                    alertPopup.then(function (res) {
                        goBackByNum(1);
                    });
                    return;
                }
                $scope.aprvOpns = aprvOpns.value
                sessionStorage.setItem("SynergyCluesCtrl.aprvOpns", aprvOpns.value);
                $state.go("synergyselect", {}, {
                    reload: true
                });

            };
            $scope.submitSuccess = function (msg) {
                hideCommon($ionicLoading);
                if ('提交成功！' == msg) {
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: msg
                    });
                    alertPopup.then(function (res) {
                        goBackByNum(2)
                    });
                }
            }

            sessionStorage.setItem("submitMethod", 'synergyCluesCtrlSubmit');
            if ($rootScope.updateCstDataAppInfoPassFlag) {
                return;
            }
            $rootScope.$on('synergyCluesCtrlSubmit', function (d, data) {
                showCommon($ionicLoading);
                var vo = $scope.vo;
                var objVo = angular.fromJson(vo);
                var aprvOpns = $scope.aprvOpns;
                AjaxJsonp(SysServiceData('CRM', 'updateCstDataAppInfoPass', [vo, objVo.appID, 1, aprvOpns, data.userNum, data.realname, data.orgCode, person.userNum, person.realname, person.currentGroup.organization.orgCode]), url.crm, $scope.submitSuccess);
            });
            $rootScope.updateCstDataAppInfoPassFlag = true;

            //驳回

        }

        $scope.quit = function () {
            var aprvOpns = $("#aprvOpns").val();
            if (aprvOpns == null || aprvOpns == "") {
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '审批意见必填！'
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
                template: '确定要驳回申请单吗?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    showCommon($ionicLoading);
                    var vo = $scope.vo;
                    var objVo = angular.fromJson(vo);
                    AjaxJsonp(SysServiceData('CRM', 'updateCstDataAppInfoPass', [vo, objVo.appID, 0, aprvOpns, '', '', '', person.userNum, person.realname, person.currentGroup.organization.orgCode]), url.crm, function (msgjsonobj) {
                        hideCommon($ionicLoading);
                        if (msgjsonobj.status == 200) {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: msgjsonobj
                            }).then(function (res) {
                                goBackByNum(1);
                            });

                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: msgjsonobj
                            }).then(function (res) {
                                goBackByNum(1);
                            });
                        }
                    });

                }
            });
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }


    })