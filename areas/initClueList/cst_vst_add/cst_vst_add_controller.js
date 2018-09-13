/**
 * Created by wjf on 2017/5/25.
 */
angular.module('cst_vst_add.controller', [])
    .controller('Cst_vst_addCtrl', function ($scope, $http, $state, $timeout, $ionicLoading, $stateParams, $ionicSideMenuDelegate, $location) {
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                /*$state.go("foot.index");*/
                javascript:history.go(-1);
            }, 300);
        }

        show($ionicLoading);


        var data = angular.fromJson(sessionStorage.getItem("Cst_vst_addCtrl.cst_vst_show"));
        console.log(data);

        $scope.indexdata = function () {
            AjaxJsonp(SysServiceData('CRM', 'cst_vst_show', [data.cstVstId]), url.crm, $scope.success);
        }

        $scope.success = function (msg) {
            console.log(msg);
            $scope.basic = msg.vo;

            $scope.vstObjList = angular.fromJson(msg.vstObjList);
            $scope.vstPsnList = angular.fromJson(msg.vstPsnList);
            $scope.list_down_tsk = angular.fromJson(msg.list_down_tsk);
            console.log($scope.list_down_tsk);

            $scope.getApproveInfo(msg);  /* 附件信息 */
            $scope.shuju = msg;
        }

        $scope.indexdata();


        /* 附件信息 */
        $scope.xiangmu = [];
        $scope.page = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.getApproveInfo = function (msg) {
            var findAtchMgtInfListVo = {
                bsnEntId: data.cstVstId,
                bsnEntTp: msg.bsnEntTp,
            }

            AjaxJsonp(SysServiceData('CRM', 'findAtchMgtInfList', [$scope.page, $scope.size, jsonToXml(findAtchMgtInfListVo)]), url.crm, $scope.getApproveInfoSuccess);
        }

        $scope.getApproveInfoSuccess = function (msg) {
            console.log(msg);
            $scope.xiangmu.push.apply($scope.xiangmu, msg.list);

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
            $scope.xiangmu = [];
            $scope.getApproveInfo($scope.shuju);
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.page = $scope.page + 1;
            $scope.finite_state = false;
            $scope.getApproveInfo($scope.shuju);
        }

    })



