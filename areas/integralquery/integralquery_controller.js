angular.module('integralquery.controller', ['integralquery.service'])
    .controller('IntegralQueryCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicPopup,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        $scope.realname = person.realname;
        $scope.blngDeptName = person.currentGroup.blngDeptName;
        console.log($ionicHistory.viewHistory());

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                /*$ionicHistory.goBack();*/
                javascript:history.go(-1);
                $(".hello").removeClass("end-right");
            }, 300);
        };

        /* 判断是安卓还是ios 系统 */
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //苹果系统
            $(".searchlei").css({"margin-top":"65px"});
        }else{

        }


        /* 员工选择 */
        $scope.huadong = function () {
            //alert(1);
            //console.log(1111111);
            $(".cehua").show();
            $(".cehua .kuang").animate({"right": "0"}, 300);
        };

        $scope.hdclose = function () {
            //alert(1);
            //console.log(1111111);
            $(".cehua .kuang").animate({"right": "-72%"}, 300);
            $(".cehua").fadeOut(600);
        };


        $scope.user = '';


        $scope.indexdata = function (newValue) {
            if (newValue != null && newValue != '') {
                $scope.num = 0;
                $scope.size = 600;
                var searchType = '01';
                AjaxJsonp(SysServiceData('CPC', 'findList', [$scope.num, $scope.size, searchType, newValue]), url.cpc, $scope.userResult);
            }

        };
        $scope.userResult = function (msg) {
            console.log(msg);
            $scope.userList = [];
            for (var i = 0; i < msg.content.length; i++) {
                var a = {
                    realname: msg.content[i].realname,
                    userNum: msg.content[i].userNum
                };
                $scope.userList[i] = a;
            }
            $scope.$apply();
        }


        var watch = $scope.$watch('user', function (newValue, oldValue) {
            $scope.indexdata(newValue);
        }, true);


        $scope.num = 0;


        /*$scope.indexdata();*/

        // $scope.success(angular.fromJson(sessionStorage.getItem("userList")));
        /* 为了使 电话目录 加载的快些，把indexdata() 搬到首页加载 */


        /* 机构积分查询 */
        /**
         * 新的
         */
        $scope.huadong2 = function () {
            $(".cehua2").show();
            $(".cehua2 .kuang").animate({"right": "0"});
        }

        $scope.hdclose2 = function () {
            $(".cehua2 .kuang").animate({"right": "-72%"}, 300);
            $(".cehua2").fadeOut(600);
        };


        $scope.search_state = true;
        $scope.num = 0;
        $scope.size = 10;
        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];
        $scope.list4 = [];
        $scope.list5 = [];

        $scope.indexdata2 = function (newValue) {
            if (newValue != null && newValue != '') {
                var searchType = '02';
                AjaxJsonp(SysServiceData('CPC', 'findList', [$scope.num, $scope.size, searchType, "", "", "", newValue]), url.cpc, $scope.success2);
            }
        }

        $scope.success2 = function (msg) {
            console.log(msg);
            $scope.orgList = msg;
            $scope.$apply();
        }

        var watch = $scope.$watch('orgSearch', function (newValue, oldValue) {
            $scope.indexdata2(newValue);
        }, true);

        //   $scope.indexdata2();
        var userObjVo = {
            userObj: {},
            rptDt1: "",
            rptDt2: ""
        };
        $scope.chooseUser = function (userObj) {
            $scope.hdclose();
            $scope.realname = userObj.realname;
            userObjVo.userObj = userObj;
        }

        var orgObjVo = {
            orgObj: {},
            rptDt1: "",
            rptDt2: ""
        };
        $scope.chooseOrg = function (orgObj) {
            $scope.hdclose2();
            console.log(orgObj);
            $scope.blngDeptName = orgObj.orgName;
            // $scope.$apply();
            orgObjVo.orgObj = orgObj;

        }

        $scope.querUser = function () {
            userObjVo.rptDt1 = rptDt1.value;
            userObjVo.rptDt2 = rptDt2.value;

            if (userObjVo.rptDt1 != "" && userObjVo.rptDt2 != "" && userObjVo.rptDt1 > userObjVo.rptDt2) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '截止日期不能早于开始日期!'
                });
                return;
            }

            sessionStorage.setItem("PersonIntegralQueryCtrl.queryempedetailList", JSON.stringify(userObjVo));

            $state.go("personintegralquery", {}, {
                reload: true
            });
        }

        $scope.querOrg = function () {
            orgObjVo.rptDt1 = orgRptDt1.value;
            orgObjVo.rptDt2 = orgRptDt2.value;

            if (orgObjVo.rptDt1 != "" && orgObjVo.rptDt2 != "" && orgObjVo.rptDt1 > orgObjVo.rptDt2) {
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '截止日期不能早于开始日期!'
                });
                return;
            }

            sessionStorage.setItem("OrganizationIntegralQueryCtrl.queryempedetailList", JSON.stringify(orgObjVo));

            $state.go("organizationintegralquery", {}, {
                reload: true
            });
        }

    })


