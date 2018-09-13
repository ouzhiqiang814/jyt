angular.module('querysprvinfpage.controller', [])
    .controller('QuerysprvinfpageCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicSideMenuDelegate) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            /*            $("#companydata").removeClass("begin-right");
             $("#companydata").addClass("end-right");*/

            javascript:history.go(-1);

        };


        //初始化合作伙伴类型下拉列表
        TypeValueList('0200', function (msg) {
            $scope.sprvTpCdData = msg;
            $scope.$apply();
        });

        /* 侧滑开关 */
        $scope.qiehuan = function () {
            $(".ion-ios-search").toggleClass("kai");
            if ($(".ion-ios-search").hasClass("kai")) {
                huago();
            } else {
                guanbi();
            }
        };
        $scope.guan = function () {
            guanbi();
            $(".ion-ios-search").removeClass("kai");
        }


        show($ionicLoading);

        $scope.xiangmu = [];
        $scope.page = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.success = function (msg) {
            console.log(msg);
            if ($scope.itemsFlag) {
                $scope.xiangmu = [];
            }

            $scope.xiangmu.push.apply($scope.xiangmu, msg.content);

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
            var doGetsprvinfListVo = {
                mtgNm: mtgNm.value,
                sprvID: sprvID.value,
                sprvTpCd: sprvTpCd.value,
            }
            var sysUserVO = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles,
                }

            }

            AjaxJsonp(SysServiceData('CPC', 'doGetsprvinfList', [$scope.page, $scope.size, jsonToXml(doGetsprvinfListVo), jsonToXml(sysUserVO)]), url.cpc, $scope.success);
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


        /*搜索框*/
        $scope.func_reset = function () {
            document.getElementById("mtgNm").value = "";
            document.getElementById("sprvID").value = "";
            document.getElementById("sprvTpCd").value = "";
        };

        $scope.func_ok = function () {
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
            sessionStorage.setItem("approveItem", '');
            sessionStorage.setItem("SprvinfhomepageCtrl.viewRightPage", data);
            /* ！！！以上的两句代码，是传递给详情页的参数 */

            $state.go("sprvinfhomepage", {}, {
                reload: true
            });
        }

    })
