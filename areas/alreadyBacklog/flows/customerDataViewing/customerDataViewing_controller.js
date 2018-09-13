angular.module("customerDataViewing.controller", [])
    .controller("CustomerDataViewingCtrl", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory,$ionicLoading) {
        show($ionicLoading);

        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

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
            $scope.indexdata1();
        }, 300);

        $scope.num = 0;
        $scope.size = 10;

        /* 数据权限申请基本信息 */
        $scope.items1 = [];

        $scope.indexdata1 = function () {
              AjaxJsonp(SysServiceData('CRM', 'power_mana_approve', [approveItem.businessKey, approveItem.activityId, approveItem.taskId, person.userNum]), url.crm, $scope.success1);
        }
        $scope.success1 = function (msg) {

            $scope.customerDataViewingVo = msg.vo;
            $scope.$apply();


            $scope.indexdata2(msg.vo);
        }


        /* 数据权限申请清单 */
        $scope.items2 = [];
        $scope.search_state2 = true;
        $scope.indexdata2 = function (vo) {

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

            $scope.success2 = function (msg) {
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
                hide($ionicLoading);
            }
            var xotree = new XML.ObjTree();

            var xml = xotree.writeXML(cstDataAppInfoVO);
            var xmlText = formatXml(xml);

            AjaxJsonp(SysServiceData('CRM', 'getApproveInfo', [$scope.num, $scope.size, xmlText, person.userNum]), url.crm, $scope.success2);
        }
        //查询审批历史
        $scope.query_aprv_his_listItem = [];
        $scope.query_aprv_his_listSuccess = function (ret) {
            console.log(ret)
            $scope.query_aprv_his_listItem.push.apply($scope.query_aprv_his_listItem, ret.content);
            $scope.$apply();
        }

        $scope.query_aprv_his_listNum = 0;
        $scope.query_aprv_his_listSize = 10;
        $scope.query_aprv_his_list = function () {
            var query_aprv_his_listVo = {
                appId: approveItem.businessKey,
                bsnEtyType: 'CST_DATA'
            }
            AjaxJsonp(SysServiceData('CRM', 'query_aprv_his_list', [$scope.query_aprv_his_listNum, $scope.query_aprv_his_listSize, jsonToXml(query_aprv_his_listVo)]), url.crm, $scope.query_aprv_his_listSuccess);
        }
        $scope.query_aprv_his_list();
    })

