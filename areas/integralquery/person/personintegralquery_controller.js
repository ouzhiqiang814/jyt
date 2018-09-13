angular.module('personintegralquery.controller', ['personintegralquery.service'])
    .controller('PersonIntegralQueryCtrl', function ($scope, $state, $ionicLoading, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory) {
        
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        // show($ionicLoading);

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

        function init(msg){
            if(msg==null || msg==''){
                $scope.position = person;
            }else{
                $scope.position = msg;
                $scope.$apply();
            }
            
            sessionStorage.setItem("sysUserVoJson", JSON.stringify($scope.position));
            person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

            $scope.dataFlag = true;
            var userObjVo = angular.fromJson(sessionStorage.getItem("PersonIntegralQueryCtrl.queryempedetailList"));
            var id = null;



            $scope.pesonSum = "0";

            if (userObjVo == null) {
                var userObjVo = {
                    rptDt1:'',
                    rptDt2:'',
                    userObj:{
                        userNum:'',
                        realname:''
                    }
                }
            }

            if (userObjVo == null || userObjVo.userObj.userNum==''|| userObjVo.userObj.userNum==null) {
                id = person.userNum;
            } else {
                id = userObjVo.userObj.userNum;
            }
            $scope.finite_state = false;


            $scope.goBack = function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                // javascript:history.go(-1);
                MXWebui.closeWindow();
            };

            if (userObjVo == null || userObjVo.userObj.realname == ''|| userObjVo.userObj.realname == null) {
                $scope.realname = person.realname;
            } else {
                $scope.realname = userObjVo.userObj.realname;
            }

            


            $scope.items = [];

            $scope.num = 0;
            $scope.size = 15;

            $scope.indexdata = function () {
                $scope.dataFlag = true;

                var searchType = '01';
                AjaxJsonp(SysServiceData('CPC', 'queryempedetailList', [$scope.num, $scope.size, searchType, id, userObjVo.rptDt1, userObjVo.rptDt2]), url.cpc, $scope.success);

            }

            $scope.success = function (msg) {
                console.log(msg)
                if (msg.data[0] == null) {
                    $scope.pesonSum = 0;
                } else {
                    $scope.pesonSum = msg.data[0].ptsVal;
                }




                var shuju = msg.data[1].content;
                for (var i = 0; i < shuju.length; i++) {
                    var dat = {rptDt: shuju[i].rptDt, scoreStep: shuju[i].scoreStep, ptsVal: shuju[i].ptsVal};
                    $scope.items.push(dat);
                }

                if ($scope.items.length == 0) {
                    $scope.dataFlag = false;
                }
                setTimeout(function(){
                    $scope.finite_state = msg.data[1].hasNextPage;
                },1000);

                $scope.$apply();


                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                hide($ionicLoading);




            }

            $scope.indexdata();

            $scope.func_refresh = function () {
                $scope.num = 0;
                $scope.items = [];

                $scope.indexdata();


            }

            $scope.loadMore = function () {
                $scope.num = $scope.num + 1;
                $scope.indexdata();
            }

            $scope.fnGoNext = function(){
                $state.go("organizationintegralquery", {
                }, {
                    reload: true
                });
            }
        }

    })
