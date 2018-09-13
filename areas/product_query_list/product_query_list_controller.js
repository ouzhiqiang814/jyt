angular.module("product_query_list.controller", [])
    .controller("Product_query_listCtrl", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory, $ionicModal, $ionicPopup) {


        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载
        function onDeviceReady() {
            MXCommon.getCurrentUser(
                function (result) {
                    if(person == null){
                        getPerson1(result.login_name, init);
                    }else{
                        init();
                    }
                }
            );
        }

        // 返回方法
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            // $timeout(function () {
            //     javascript:history.go(-1);
            // }, 300);
            MXWebui.closeWindow();
        };

        function init(msg) {
            $ionicModal.fromTemplateUrl('templates/sortProduct.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            if(msg==null || msg==''){
                $scope.position = person;
            }else{
                $scope.position = msg;
                $scope.$apply();
            }
            sessionStorage.setItem("sysUserVoJson", JSON.stringify($scope.position));
            angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

            $scope.cusItemClick = function (item) {
                $scope.modal.hide();
                var cus = angular.toJson(item);
                $state.go("companyCustomerInfo", {
                    data: cus
                }, {
                    reload: true
                });
            };


            $scope.func_ok = function () {
                var item = {
                    bspdEcd: '',
                    level: '',
                    aspdId: document.getElementById("aspdId").value,
                    aspdNm: document.getElementById("aspdNm").value,
                }
                var data = angular.toJson(item);
                sessionStorage.setItem("ProductListCtrl.findProductList", data);

                $state.go("productList", {
                    reload: true
                });
            };

            $scope.func_reset = function () {
                document.getElementById("aspdId").value = "";
                document.getElementById("aspdNm").value = "";
            };


            var treeData = [];
            $scope.showSortPage = function () {
                $scope.modal.show();

            }
            //初始化产品树
            show($ionicLoading);
            AjaxJsonp(SysServiceData('CRM', 'findAllProTree', ['', '']), url.crm, function (msg) {
                treeData = msg;
                getCategoryData();
                $scope.getCategoryDetailData($scope.categoryData[0].id);
                hide($ionicLoading);
            });

            //$scope.$apply();

            function getCategoryData() {
                $scope.categoryData = [];
                for (var i = 0; i < treeData.length; i++) {
                    if (treeData[i].blngsuprid == '000') {
                        $scope.categoryData.push(treeData[i]);
                    }
                }
            }

            // 头部滚动条数据
            $scope.getCategoryDetailData = function (id) {

                $scope.categoryDetailData = [];
                for (var i = 0; i < treeData.length; i++) {
                    if (treeData[i].blngsuprid == id) {
                        var DetailItem = {
                            name: treeData[i].name,
                            src: "img/moremenu/partners.png",
                            id: treeData[i].id,
                            sref: 'productList?bspdEcd=' + treeData[i].id + '&level=' + treeData[i].type,
                            data: []
                        }
                        for (var j = 0; j < treeData.length; j++) {
                            if (treeData[j].blngsuprid == treeData[i].id) {
                                var DetailItemChild = {
                                    name: treeData[j].name,
                                    id: treeData[j].id,
                                    sref: 'productList?bspdEcd=' + treeData[j].id + '&level=' + treeData[j].type
                                }
                                DetailItem.data.push(DetailItemChild);
                            }
                        }
                        $scope.categoryDetailData.push(DetailItem);
                    }
                }
            };

            $scope.categoryLeftClick = function (e) {
                e.target.className = 'nav-current';
                $(e.target).siblings().removeClass().addClass('nav-blur');

            };
        }

    });