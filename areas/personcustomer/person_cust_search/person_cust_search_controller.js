angular.module("person_cust_search.controller", [])
    .controller("Person_cust_searchCtrl", function ($scope, $timeout, $ionicLoading, $ionicScrollDelegate, $state, $http, $ionicSideMenuDelegate, $ionicHistory, $ionicModal, $ionicPopup) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        $ionicModal.fromTemplateUrl('templates/queryPersonCustomers.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;

        });

        $scope.num = 0;
        $scope.size = 10;

        $scope.dataFlag = true;

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
            $state.go("personCustomerInfo", {
                data: cus
            }, {
                reload: true
            });
        };

        $scope.items = [];

        //初始化证件类型
        TypeValueList('0001', function (msg) {
            $scope.cardTypes = msg;
            $scope.$apply();
        });

        $scope.toggleRight = function () {
            $ionicSideMenuDelegate.toggleRight();
        };

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

            show($ionicLoading);
            $scope.func_refresh();
            $scope.modal.show();
        };

        $scope.scrollTop = function () {
            $ionicScrollDelegate.scrollTop(true);
        };


        $scope.finite_state = false;
        /**
         * 成功调用执行的方法
         * @param data
         */
        $scope.success = function (msg) {
            console.log(msg);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            hide($ionicLoading);
            if ($scope.num == 0) {
                $scope.items = [];
            }
            for (var i = 0; i < msg.content.length; i++) {
                var dat = {
                    name: msg.content[i].ipNm,
                    no: msg.content[i].cstId,
                    id: msg.content[i].ipidNo,
                    ipid: msg.content[i].ipId,
                    insId: '',
                    cardType: msg.content[i].ipidTpcdNm  /*TypeValue("0001", )*/
                };
                $scope.items.push(dat);
            }

            if ($scope.items.length == 0) {
                $scope.dataFlag = false;
            }

            setTimeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);
            $scope.$apply();
        }

        $scope.indexDate = function () {
            $scope.dataFlag = true;

            var findCustforEmpeListVo = {
                cstId: cstId.value,
                ipNm: ipNm.value,
                iptpCd: '02',
                ipidTpcd: $("#ipidTpcd").val(),
                ipidNo: ipidNo.value,
            }
            AjaxJsonp(SysServiceData('CRM', 'findPersonCustInfoList', [$scope.num, $scope.size, jsonToXml(findCustforEmpeListVo)]), url.crm, $scope.success);
        }


        $scope.func_refresh = function () {
            console.log('上托刷新');
            $scope.num = 0;
            $scope.items = [];
            $scope.indexDate();

        }
        /**
         * 下拉刷新的方法
         */
        $scope.loadMore = function () {
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;
            $scope.indexDate();
        }
    });