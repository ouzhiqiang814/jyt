angular.module('persondata.controller', ['persondata.service'])
    .controller('PersondataCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicSideMenuDelegate) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        //用于判断是否展示暂无数据
        $scope.dataFlag = true;

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            $timeout(function () {
                javascript:history.go(-1);
            }, 300);
        };

        show($ionicLoading);


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



        $scope.items = [];
        $scope.num = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.success = function (msg) {
            console.log(msg);
            if($scope.itemsFlag){
                $scope.items = [];
            }
            // msg = {"content":[{"appID":10775,"applyDt":"2017-05-26","auditInd":"0","authEndDt":"2017-05-29","authEndInd":"0","blng":"17","blngNm":"集团本部","cstId":"800000783274","cstNm":"55555","deptNm":"信息技术部","empeNm":"李唯","ipId":"10000000000012686380","useDsc":"测试"}],"endRow":1,"first":true,"firstPage":true,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":true,"last":true,"lastPage":true,"list":[{"$ref":"$.content[0]"}],"navigatePages":8,"navigatepageNums":[1],"nextPage":0,"number":0,"numberOfElements":1,"pageNum":1,"pageSize":10,"pages":1,"prePage":0,"size":1,"startRow":1,"total":1,"totalElements":1,"totalPages":1}
            for (var i = 0; i < msg.content.length; i++) {
                var dat = {
                    appID: msg.content[i].appID,
                    cstNm: msg.content[i].cstNm,
                    cstId: msg.content[i].cstId,
                    auditInd: msg.content[i].auditInd,
                    blng: msg.content[i].blngNm,
                    ipid: msg.content[i].ipId,
                    insId: '',
                    no: msg.content[i].cstId
                };
                $scope.items.push(dat);
            }

            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage;
            },500);

            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            hide($ionicLoading);
        }

        $scope.indexdata = function (obj) {
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }

            var iptpCd = '02';
            //  console.log(SysServiceData('CRM', 'findData', [$scope.num, $scope.size, iptpCd, person.userNum, appID.value, cstId.value, cstNm.value, blng.value]));
            //   console.log(url.crm);

            AjaxJsonp(SysServiceData('CRM', 'findData', [$scope.num, $scope.size, iptpCd, person.userNum, appID.value, cstId.value, cstNm.value, blng.value]), url.crm, $scope.success);
        }

        $scope.indexdata();

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.num = 0;
            $scope.indexdata(true);
        }

        //上拉加载更多
        $scope.loadMore = function () {
            $scope.page = $scope.page + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }


        //条件搜索
        $scope.func_ok = function () {
            $scope.items = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        }


        //------------初始化数据归属方下拉列表----------------------
        function success(msg) {

            $scope.blngData = msg;
        }

        TypeValueList('0091', success);


        //查看客户信息
        $scope.cusItemClick = function (item) {
            var cus = angular.toJson(item);
            $state.go("personCustomerInfo", {
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
