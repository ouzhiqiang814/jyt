angular.module('organizationintegralquery.controller', ['organizationintegralquery.service'])
    .controller('OrganizationIntegralQueryCtrl', function ($scope, $state, $stateParams, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicLoading) {
        /*var Date = angular.fromJson($stateParams.data);
         var id = Date.id;
         $scope.Date = $stateParams.data;
         console.log(Date);
         console.log($scope.Date);
         */

        var agent = navigator.userAgent;
        if (/iphone|ipad|ipod/i.test(agent)) {
        /*    $('#orgintegral').css("margin-top","205px");*/
            var hightCLient = document.documentElement.clientHeight;
            $('#orgintegralContent').css("height",hightCLient-205-65+"px");
            $('#orgintegralContent1').css("height",205+"px");
            $('#orgintegralContent').css("top",205+65+"px");


        }else{
            var hightCLient = document.documentElement.clientHeight;
            $('#orgintegralContent').css("height",hightCLient-205-44+"px");
            $('#orgintegralContent1').css("height",205+"px");
            $('#orgintegralContent').css("top",205+44+"px");
          /*  $('#orgintegral').css("margin-top","185px");*/
        }

        $scope.dataFlag = true;
        $scope.finite_state = false;

        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var id = person.currentGroup.blngDeptCode;
        $scope.blngDeptName = person.currentGroup.blngDeptName;
        $scope.deptSum = 0;
        show($ionicLoading);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            // javascript:history.go(-1);
            MXWebui.closeWindow();
        };

       /* var agent = navigator.userAgent;
         if (/iphone|ipad|ipod/i.test(agent)) {
         $('#orgintegral').css({"margin-top":"225px"});
         }*/

        $scope.items = [];


        $scope.num = 0;
        $scope.size = 10;

        $scope.indexdata = function () {
            $scope.dataFlag = true;

            var queryempedetailListData = angular.fromJson(sessionStorage.getItem("OrganizationIntegralQueryCtrl.queryempedetailList"));

            if (queryempedetailListData == null) {
                var queryempedetailListData = {
                    rptDt1:'',
                    rptDt2:'',
                    orgObj:{
                        id:'',
                        orgName:''
                    }
                }
            }

            if (queryempedetailListData == null || queryempedetailListData.orgObj.id == null|| queryempedetailListData.orgObj.id == '') {
                id = person.currentGroup.blngDeptCode;
            } else {
                id = queryempedetailListData.orgObj.orgCode;
            }
            if (queryempedetailListData == null || queryempedetailListData.orgObj.orgName == null|| queryempedetailListData.orgObj.orgName == '') {
                $scope.blngDeptName = person.currentGroup.blngDeptName;
            } else {
                $scope.blngDeptName = queryempedetailListData.orgObj.orgName;
            }

         /*   if (queryempedetailListData&&queryempedetailListData.orgObj.id) {
                id = queryempedetailListData.orgObj.orgCode;
                $scope.blngDeptName = queryempedetailListData.orgObj.orgName;
            }else{

            }*/
            var searchType = '02';

            AjaxJsonp(SysServiceData('CPC', 'queryempedetailList', [$scope.num, $scope.size, searchType, id,queryempedetailListData.rptDt1,queryempedetailListData.rptDt2]), url.cpc, $scope.success);

        }

        $scope.func_refresh = function () {
            $scope.finite_state = false;
            $scope.num = 0;
            $scope.items = [];
            $scope.indexdata();
        }

        $scope.success = function (msg) {
            console.log(msg);
            if ($scope.num == 0) {
                $scope.items = [];
            }

            if (msg.data[0]) {
                $scope.deptSum = msg.data[0].ptsVal;
            }else{
                $scope.deptSum = 0;
            }

            setTimeout(function(){
                $scope.finite_state = msg.data[1].hasNextPage;

            },500);

            var shuju = msg.data[1].content;
            for (var i = 0; i < shuju.length; i++) {
                var dat = {rptDt: shuju[i].rptDt, ptsVal: shuju[i].ptsVal, deptId: shuju[i].deptId};
                $scope.items.push(dat);
            }
            $scope.$apply();


            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');



            hide($ionicLoading);

        }

        $scope.indexdata();

        $scope.loadMore = function () {
            $scope.num++;
            $scope.indexdata();

        }


        $scope.dianji = function (item) {
            var orgintegral = angular.toJson(item);

            $state.go("organizationdetailintegralquery", {
                data: orgintegral
            }, {
                reload: true
            });
        };


        $scope.fnGoNext = function(){
            $state.go("personintegralquery", {
            }, {
                reload: true
            });
        }

    })
