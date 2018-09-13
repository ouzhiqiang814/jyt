/**
 * Created by wjf on 2017/5/25.
 */
angular.module('productList.controller', [])
    .controller('ProductListCtrl', function ($scope, $state, $http, $timeout, $ionicLoading, $ionicSideMenuDelegate, $stateParams, $ionicHistory, $ionicPopup) {
        var findProductListVo = angular.fromJson( sessionStorage.getItem("ProductListCtrl.findProductList"));
        var bspdEcd = getQueryString("bspdEcd");
        var level = getQueryString("level");
        if (!findProductListVo) {
            findProductListVo = {
                bspdEcd: bspdEcd,
                level: level,
                aspdId: document.getElementById("aspdId").value,
                aspdNm: document.getElementById("aspdNm").value,
            }
        }
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        }

        show($ionicLoading);


        /* 侧滑开关 */
        $scope.qiehuan = function(){
            $(".ion-ios-search").toggleClass("kai");
            if($(".ion-ios-search").hasClass("kai")){
                huago();
            }else{
                guanbi();
            }
        };
        $scope.guan = function(){
            guanbi();
            $(".ion-ios-search").removeClass("kai");
        }


        $scope.xiangmu = [];
        $scope.page = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.success = function (msg) {
            console.log(msg);
            if($scope.itemsFlag){
                $scope.xiangmu = [];
            }
            $scope.xiangmu.push.apply($scope.xiangmu, msg.list);

            setTimeout(function () {
                $scope.finite_state = msg.hasNextPage
            }, 500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            hide($ionicLoading);
        }

        $scope.indexdata = function (obj){
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }

            AjaxJsonp(SysServiceData('CRM', 'findProductList', [$scope.page, $scope.size, jsonToXml(findProductListVo)]), url.crm, $scope.success);
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



        $scope.func_reset = function () {
            document.getElementById("aspdId").value = "";
            document.getElementById("aspdNm").value = "";
        };

        $scope.func_ok = function () {
            findProductListVo.aspdId = document.getElementById("aspdId").value;
            findProductListVo.aspdNm = document.getElementById("aspdNm").value;
            $scope.xiangmu = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };



        /* 跳到详情页 */
        $scope.show_info = function (item) {
            var data = angular.toJson(item);
            sessionStorage.setItem("Product_edit_addaspdCtrl.detailViewPanel", data);

            $state.go("product_edit_addaspd", {}, {
                reload: true
            });
        }
    })







    