angular.module("finishedApplyInfolView.controller", [])
    .controller("FinishedApplyInfolViewCtrl", function ($scope, $timeout, $ionicLoading, $state, $stateParams, $rootScope) {

        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("FinishedApplyInfolViewCtrl.findCstDataParamEnt"));

        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $timeout(function () {
            $scope.findCstDataParamEnt();
        }, 300);

        $scope.num = 0;
        $scope.size = 10;

        show($ionicLoading);

        /* 数据权限申请基本信息 */
        $scope.items1 = [];

        $scope.findCstDataParamEnt = function () {
            AjaxJsonp(SysServiceData('CRM', 'power_mana_approve', [approveItem.appID, "", "", person.userNum]), url.crm, $scope.findCstDataParamEntSuccess);
        }
        $scope.findCstDataParamEntSuccess = function (msg) {

            var aprv = {
                orgCode: msg.vo.aprvInsID,
                roleCode: msg.vo.aprvRoleID,
            }

            $scope.vo = msg.vo;

            $scope.getApproveInfo(msg.vo);
        }


        /* 数据权限申请清单 */
        $scope.items2 = [];
        $scope.finite_state = false;
        $scope.search_state2 = true;

        $scope.getApproveInfo = function (vo) {
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

            AjaxJsonp(SysServiceData('CRM', 'getApproveInfo', [$scope.num, $scope.size, xmlText, person.userNum]), url.crm, $scope.getApproveInfoSuccess);
        }

        $scope.getApproveInfoSuccess = function (msg) {
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
                $scope.finite_state = msg.hasNextPage;
            },500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            hide($ionicLoading);
        }

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.items2 = [];
            $scope.getApproveInfo($scope.vo);
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;
            $scope.getApproveInfo($scope.vo);
        }




        //查询审批历史
        $scope.query_aprv_his_listItem = [];
        $scope.his_finite_state = false;

        $scope.query_aprv_his_listSuccess = function (ret) {
            $scope.query_aprv_his_listItem.push.apply($scope.query_aprv_his_listItem, ret.content);

            setTimeout(function(){
                $scope.his_finite_state = ret.hasNextPage;
            },500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.query_aprv_his_listNum = 0;
        $scope.query_aprv_his_listSize = 10;
        $scope.query_aprv_his_list = function () {
            var query_aprv_his_listVo = {
                appId: approveItem.appID,
                bsnEtyType: 'CST_DATA'
            }
            AjaxJsonp(SysServiceData('CRM', 'query_aprv_his_list', [$scope.query_aprv_his_listNum, $scope.query_aprv_his_listSize, jsonToXml(query_aprv_his_listVo)]), url.crm, $scope.query_aprv_his_listSuccess);
        }
        $scope.query_aprv_his_list();

        //下拉刷新
        $scope.his_refresh = function () {
            $scope.query_aprv_his_listItem = [];
            $scope.query_aprv_his_list();
        }
        //上拉加载更多
        $scope.his_loadMore = function () {
            $scope.query_aprv_his_listNum = $scope.query_aprv_his_listNum + 1;
            $scope.his_finite_state = false;
            $scope.query_aprv_his_list();
        }

    })