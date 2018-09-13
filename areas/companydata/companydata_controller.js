angular.module('companydata.controller', ['companydata.service'])
    .controller('CompanydataCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory,$ionicSideMenuDelegate) {

        //用于判断是否展示暂无数据
        $scope.dataFlag = true;

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function() {
                javascript:history.go(-1);
            }, 300);
        };

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



        /*点击项 弹出选框*/
        $scope.tanchu = function(e){
            $(e.target).parents("ion-item").find(".xuanze").fadeIn(200);
            $(e.target).parents("ion-item").siblings("ion-item").find(".xuanze").hide();
        }

        $scope.huandong = function(){
            $(".xuanze").hide();
        }

        $scope.close = function(){
            $(".xuanze").hide();
        }









        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        $scope.items = [];
        $scope.num = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.success = function (msg) {
            console.log(msg);
            if($scope.itemsFlag){
                $scope.items = [];
            }
            for (var i = 0; i < msg.content.length; i++) {
                var dat = {
                    appID: msg.content[i].appID,
                    cstNm: msg.content[i].cstNm,
                    cstId: msg.content[i].cstId,
                    auditInd: msg.content[i].auditInd,
                    blng: msg.content[i].blngNm,
                    ipid: msg.content[i].ipId,
                    no: msg.content[i].cstId,
                    insId:'',
                    blngNm:msg.content[i].blngNm,
                };
                $scope.$apply(function () {
                    $scope.items.push(dat);
                })
            }
            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage; // 控制是否转圈圈，当它为false时，是没有下一页，即不转圈圈。当它为true 时，即有下一页时，则执行loadmore() 。
            },500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

        $scope.indexdata = function (obj){
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var iptpCd = '01';
            AjaxJsonp(SysServiceData('CRM', 'findData', [$scope.num, $scope.size, iptpCd, person.userNum, appID.value, cstId.value, cstNm.value, blng.value, auditInd.value]), url.crm, $scope.success);
        }

        $scope.indexdata();

        //下拉刷新
        $scope.func_refresh = function(){
            $scope.num = 0;
            $scope.indexdata(true);
        }

        //加载更多
        $scope.loadMore = function(){
            $scope.num =  $scope.num +1;
            $scope.finite_state = false;
            $scope.indexdata();
        }


        //条件搜索
        $scope.func_ok = function(){
            $scope.items = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        }

        //重置
        $scope.func_reset = function () {
            document.getElementById("appID").value = "";
            document.getElementById("cstId").value = "";
            document.getElementById("cstNm").value = "";
            document.getElementById("blng").value = "";
            document.getElementById("auditInd").value = "";
        };





        //------------初始化数据归属方下拉列表----------------------
        function success(msg){
            $scope.blngData = msg;
        }

        TypeValueList('0091',success);

        //查看客户信息
        $scope.cusItemClick = function (item) {
            var cus = angular.toJson(item);
            $state.go("companyCustomerInfo", {
                data: cus
            }, {
                reload: true
            });
        };
        //查看审批信息
        $scope.approveInfoClick = function (item) {

            var data = angular.toJson(item);
            sessionStorage.setItem("FinishedApplyInfolViewCtrl.findCstDataParamEnt", data);
            $state.go("finishedApplyInfolView", {}, {
                reload: true
            });
        };


    })
