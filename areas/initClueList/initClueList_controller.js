/**
 * Created by wjf on 2017/5/25.
 */
angular.module('initClueList.controller', [])
    .controller('InitClueListCtrl', function ($scope, $state, $http, $timeout, $ionicLoading, $ionicSideMenuDelegate, $stateParams, $ionicHistory,$ionicPopup) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));




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
            
            if($scope.itemsFlag){
                $scope.xiangmu = [];
            }

            $scope.xiangmu.push.apply($scope.xiangmu, msg.list);

            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage
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
            show($ionicLoading);
            if(getQueryString("dtype")!='SJLB'&&getQueryString("dtype")!='WTJ'){
                hide($ionicLoading);
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '参数错误'
                });
               return
            }
            var clueListVo = {
                "entry": [{
                    "key": "dtype",
                    "value": {"item":getQueryString("dtype")}
                }, {
                    "key": "userNum",
                    "value": {"item": person.userNum}
                }, {
                    "key": "blngOrgCode",
                    "value": {"item": person.currentGroup.blngOrgCode}
                }, {
                    "key": "manageOrgCode",
                    "value": {"item": person.currentGroup.manageOrgCode}
                }, {
                    "key": "roleFlag",
                    "value": {"item": true}
                }, {
                    "key": "CST_ID",
                    "value": {"item": CST_ID.value}
                }, {
                    "key": "CST_NM",
                    "value": {"item": CST_NM.value}
                }, {
                    "key": "SRCCD",
                    "value": {"item": SRCCD.value}
                }, {
                    "key": "CLUE_NM",
                    "value": {"item": CLUE_NM.value}
                }, {
                    "key": "STG_TPCD",
                    "value": {"item": ""}
                }, {
                    "key": "CLUE_NO",
                    "value": {"item": CLUE_NO.value}
                }, {
                    "key": "CRT_DT_START",
                    "value": {"item": ""}
                }, {
                    "key": "CRT_DT_END",
                    "value": {"item": ""}
                }]
            }

            AjaxJsonp(SysServiceData('CRM', 'findClueList', [$scope.page, $scope.size, jsonToXml(clueListVo)]), url.crm, $scope.success);
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
            document.getElementById("CLUE_NO").value = "";
            document.getElementById("CST_ID").value = "";
            document.getElementById("CST_NM").value = "";
            document.getElementById("SRCCD").value = "";
            document.getElementById("CLUE_NM").value = "";
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
            sessionStorage.setItem("InitClueInfoCtrl.detailViewPanel", data);

            $state.go("initClueInfo", {}, {
                reload: true
            });
        }

    })


    .controller('InitClueInfoCtrl', function ($scope, $http, $state, $timeout,  $ionicLoading, $stateParams, $ionicSideMenuDelegate, $location) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                /*$state.go("foot.index");*/
                javascript:history.go(-1);
            }, 300);
        }

        var data = angular.fromJson(sessionStorage.getItem("InitClueInfoCtrl.detailViewPanel"));
        console.log(data);

        show($ionicLoading);

        $scope.initClueInfoSuccess = function (msg) {
            
            $scope.initClueInfoSuccessMsg = msg;

            $scope.clue = msg.clue;
            $scope.pdlst = msg.pdlst;
            $scope.stafflst = msg.stafflst;
            $scope.pdPlanlst = msg.pdPlanlst;

            hide($ionicLoading);
        }

        AjaxJsonp(SysServiceData('CRM', 'detailViewPanel', [data.CLUE_ID, data.BSOP_CST_TPCD]), url.crm, $scope.initClueInfoSuccess);

        $scope.akk = function (e) {
            $(e.target).parents(".mokuai").find(".switch").toggleClass("more");
            $(e.target).parents(".mokuai").find("ol").slideToggle(300);
            $(e.target).parents(".mokuai").siblings(".mokuai").find("ol").slideUp(300);
            $(e.target).parents(".mokuai").siblings(".mokuai").find(".switch").removeClass("more");
        }


        /* 需求调查 */
        $scope.xiangmu = [];
        $scope.page = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.success = function (msg) {
            

            $scope.xiangmu.push.apply($scope.xiangmu, msg.list);
            console.log($scope.xiangmu);

            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage; //下一页
            },500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }

        $scope.indexdata = function () {
            console.log(data);
            var findCstVstInfVo = {
                vstSrcCd: '08',
                srcBsnId: data.CLUE_NO,
                cstNm: data.CST_NM,
                cstId: data.CST_ID,
                vstStTm: '',
                vstEdTm: '',
                vstStCd: '',
                crtEmpId: '',
                crtEmpNm: '',
            }

            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngLglpsnId: person.currentGroup.blngLglpsnId,
                    manageOrgCode: person.currentGroup.manageOrgCode
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findCstVstInf', [$scope.page, $scope.size, jsonToXml(findCstVstInfVo), jsonToXml(sysUserVo)]), url.crm, $scope.success);
        }

        $scope.indexdata();

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.xiangmu = [];
            $scope.page = 0;
            $scope.indexdata();
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.page = $scope.page + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }


        /* 跳到需求调查详情页 */
        $scope.show_info = function (item) {
            var data = angular.toJson(item);
            sessionStorage.setItem("Cst_vst_addCtrl.cst_vst_show", data);

            $state.go("cst_vst_add", {}, {
                reload: true
            });
        }

    })




    