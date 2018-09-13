/**
 * Created by wjf on 2017/5/25.
 */
angular.module('product_edit_addaspd.controller', [])
    .controller('Product_edit_addaspdCtrl', function ($scope, $state, $http, $timeout, $ionicLoading, $ionicSideMenuDelegate, $stateParams, $ionicHistory, $ionicPopup) {
        /* 基本信息 */
        var data = angular.fromJson(sessionStorage.getItem("Product_edit_addaspdCtrl.detailViewPanel"));

        $scope.basicdata = data;
        console.log($scope.basicdata);

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            javascript:history.go(-1);
        };

        /* 产品信息 */
        $scope.xiangmu = [];
        $scope.page = 0;
        $scope.size = 10;
        $scope.finite_state = false;
        $scope.success = function (msg) {
            console.log(msg);
            if ($scope.itemsFlag) {
                $scope.xiangmu = [];
            }
            $scope.xiangmu.push.apply($scope.xiangmu, msg.list);
            setTimeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

        $scope.indexdata = function (obj) {
            if (obj) {
                $scope.itemsFlag = true;
            } else {
                $scope.itemsFlag = false;
            }
            var findAspdProAttrValVo = {
                bspdEcd: 'ID1101',
                aspdId: 'ID110101',
                editInd: 'dtl',
            }

            AjaxJsonp(SysServiceData('CRM', 'findAspdProAttrVal', [$scope.page, $scope.size, jsonToXml(findAspdProAttrValVo)]), url.crm, $scope.success);
        }

        $scope.indexdata();

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.page = 0;
            $scope.indexdata(true);
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.page = $scope.page + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }


        /* 附件信息 */
        $scope.xiangmu2 = [];
        $scope.page2 = 0;
        $scope.size2 = 10;
        $scope.finite_state2 = false;

        $scope.success2 = function (msg) {
            console.log(msg);
            if ($scope.itemsFlag) {
                $scope.xiangmu2 = [];
            }

            $scope.xiangmu2.push.apply($scope.xiangmu2, msg.list);
            setTimeout(function () {
                $scope.finite_state2 = msg.hasNextPage;
            }, 500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

        $scope.indexdata2 = function (obj) {
            if (obj) {
                $scope.itemsFlag = true;
            } else {
                $scope.itemsFlag = false;
            }
            var findAtchMgtInfListVo = {
                bsnEntId: 'ID110101',
                bsnEntTp: 'cpgl',
                attachTpCd: '',
                attachDelTpCd: '',
            }

            AjaxJsonp(SysServiceData('CRM', 'findAtchMgtInfList', [$scope.page2, $scope.size2, jsonToXml(findAtchMgtInfListVo)]), url.crm, $scope.success2);
        }

        $scope.indexdata2();

        //下拉刷新
        $scope.func_refresh2 = function () {
            $scope.page2 = 0;
            $scope.indexdata2(true);
        }
        //上拉加载更多
        $scope.loadMore2 = function () {
            $scope.page2 = $scope.page2 + 1;
            $scope.finite_state2 = false;
            $scope.indexdata2();
        }


    })







    