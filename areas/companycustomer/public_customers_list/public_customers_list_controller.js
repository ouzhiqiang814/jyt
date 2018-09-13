angular.module("public_customers_list.controller", [])
    .controller("Public_customers_listCtrl", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory,$ionicModal,$ionicPopup) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        $ionicModal.fromTemplateUrl('templates/queryCust.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });


        //初始化证件类型
        TypeValueList('0002', function (msg) {
            $scope.cardTypes = msg;
            $scope.$apply();
        });

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                javascript:history.go(-1);
            }, 300);
        };


        $scope.cusItemClick = function (item) {
            $scope.modal.hide();
            var cus = angular.toJson(item);
            $state.go("companyCustomerInfo", {
                data: cus
            }, {
                reload: true
            });
        };

        $scope.toggleRight = function () {
            $ionicSideMenuDelegate.toggleRight(false);
        };
      /*  $scope.func_reset = function () {
            document.getElementById("cusNO").value = "";
            document.getElementById("cusName").value = "";
            document.getElementById("cardType").value = "";
            document.getElementById("cardId").value = "";
        };*/

       /* $ionicLoading.show({
            template: '<img ng-src="img/common/loading.gif" alt=""/><span>加载中...</span>'
        });*/


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
                $scope.xiangmu = [];
            }

            for (var i = 0; i < msg.content.length; i++) {
                var dat = {
                    name: msg.content[i].ipNm,
                    statusrc: 'img/companycustomer/customer.png',
                    no: msg.content[i].cstId,
                    id: msg.content[i].ipidNo,
                    ipid: msg.content[i].ipId,
                    insId:'',
                    cardType: msg.content[i].ipidTpcdNm
                };
                $scope.$apply(function () {
                    $scope.items.push(dat);
                    $ionicLoading.hide();
                });
            }

            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage;
            },500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

        $scope.indexdata = function (obj,pageFlag) {
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            if(pageFlag){
                var findPublicCustInfoListVo = {
                    cstId: cstId1.value,
                    ipNm: ipNm1.value,
                    iptpCd: '01',
                    ipidTpcd: ipidTpcd1.value,
                    ipidNo: ipidNo1.value,
                }
            }else {
                var findPublicCustInfoListVo = {
                    cstId: cstId.value,
                    ipNm: ipNm.value,
                    iptpCd: '01',
                    ipidTpcd: ipidTpcd.value,
                    ipidNo: ipidNo.value,
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findPublicCustInfoList', [$scope.num, $scope.size,jsonToXml(findPublicCustInfoListVo)]), url.crm, $scope.success);
        }

        $scope.func_refresh = function(){
            /*$scope.num = 0;
            $scope.search_state = true;
            $scope.indexdata();
            $scope.sch_st = 2;
            $scope.items = [];*/
            $scope.num = 0;
            $scope.indexdata(true);

        }

        $scope.loadMore = function(){
            /*$scope.num =  $scope.num +1;
            $scope.indexdata();*/

            $scope.num =  $scope.num +1;
            $scope.finite_state = false;
            $scope.indexdata();
        }



        $scope.func_reset = function () {
            document.getElementById("cstId").value = "";
            document.getElementById("ipNm").value = "";
            document.getElementById("ipidTpcd").value = "";
            document.getElementById("ipidNo").value = "";
        };

        $scope.func_ok = function () {
            if (document.getElementById("cstId").value == "" && document.getElementById("ipNm").value == "" && document.getElementById("ipidTpcd").value == "" && document.getElementById("ipidNo").value == "") {
                $ionicPopup.alert({
                    title: '提示',
                    template: '客户编号、客户法定名称、证件号码至少输入一项!'
                });
                return;
            }
            /*$scope.func_refresh();*/
            $scope.modal.show();
            $scope.items = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };

        $scope.func_ok1 = function () {
            if (document.getElementById("cstId").value == "" && document.getElementById("ipNm").value == "" && document.getElementById("ipidTpcd").value == "" && document.getElementById("ipidNo").value == "") {
                $ionicPopup.alert({
                    title: '提示',
                    template: '客户编号、客户法定名称、证件号码至少输入一项!'
                });
                return;
            }
            /*$scope.func_refresh();*/
            $scope.modal.show();
            $scope.items = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata('',true);
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };

    });