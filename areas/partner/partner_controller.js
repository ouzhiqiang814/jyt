angular.module("partner.controller", [])
    .controller("partnerCtrl", function ($scope, $timeout, $ionicLoading, $state, $ionicSideMenuDelegate, $ionicHistory) {

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            // $timeout(function () {
            //     //$ionicHistory.goBack();
            //     javascript:history.go(-1);
            // }, 300);

            MXWebui.closeWindow();
        };

        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        show($ionicLoading);
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


            $scope.partnerItemClick = function (item) {
                var partner = angular.toJson(item);
                $state.go("partnerInfo", {
                    data: partner
                }, {
                    reload: true
                });
            };
            $scope.items = [];

            $scope.toggleRight = function () {
                $ionicSideMenuDelegate.toggleRight();
            };

            //初始化合作伙伴类型下拉列表
            TypeValueList('0058', function (msg) {
                $scope.cooPtnTpCdData = msg;
                $scope.$apply();
            });

            //初始化行业类型下拉列表
            /*   TypeValueList('0004',function(msg){
            $scope.cooIdyCdData = msg;
            $scope.$apply();
            });
            */


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


            


            console.log($scope.items)

            $scope.items = [];
            $scope.num = 0;
            $scope.size = 10;
            $scope.finite_state = false;

            $scope.success = function (msg) {
                console.log(msg);
                if($scope.itemsFlag){
                    $scope.items = [];
                }

                $scope.items.push.apply($scope.items, msg.content);

                $timeout(function () {
                    $scope.finite_state = msg.hasNextPage;
                }, 500);

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
                console.log(cooPtnTpCd)
                console.log(cooPtnNm)
                AjaxJsonp(SysServiceData('CPC', 'queryptnist', [$scope.num, $scope.size, cooPtnNm.value, cooPtnTpCd.value]), url.cpc, $scope.success);
            }

            $scope.indexdata();

            /**
             * 下拉加载数据
             **/
            $scope.func_refresh = function () {
                $scope.num = 0;
                $scope.indexdata(true);
            }

            /**
             * 上拉刷新的方法
             */
            $scope.loadMore = function () {
                $scope.num = $scope.num + 1;
                $scope.finite_state = false;
                $scope.indexdata();
            }


            $scope.func_reset = function () {
                document.getElementById("cooPtnNm").value = "";
                document.getElementById("cooPtnTpCd").value = "";
                document.getElementById("cooIdyCd").value = "";
                document.getElementById("blngDeptNm").value = "";
            };

            $scope.func_ok = function () {
                $scope.items = [];
                show($ionicLoading);
                $scope.finite_state = false;
                $scope.indexdata();
                //$ionicSideMenuDelegate.toggleRight();
                $scope.guan();
            };
        }

    })



    .controller("partnerInfoCtrl", function ($scope, $state, $timeout, $stateParams, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $ionicScrollDelegate,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));//json = eval("(" + jsonText + ")"); 
        var partner = angular.fromJson($stateParams.data);

        var cooPtnId = partner.cooPtnId;
        $scope.partner = $stateParams.data;

        show($ionicLoading);

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            hide($ionicLoading);
            javascript:history.go(-1);
        };

        //合作事项信息
        $scope.togethers = [];
        $scope.showTogetherInfo = function (_info) {
            if (_info.limtInd == '是') {
                $state.go("partnerInfoTogether", {
                    data: angular.toJson(_info)
                }, {
                    reload: true
                });
            }
        };

        $scope.search_state = true;
        $scope.num = 0;
        $scope.size = 10;
        $scope.finite_state = false;
        $scope.success = function (msg) {
            $timeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);

            $scope.togethers.push.apply($scope.togethers, msg.content);
            $scope.$apply();
            hide($ionicLoading);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata = function () {
            var queryComatterInfolistVo = {
                cooPtnId:partner.cooPtnId,
                loginId:person.userNum,
                blngDeptId:person.currentGroup.blngDeptCode,//010107,
                cooPtnNm:partner.cooPtnNm,
                regCrdtTpCd:partner.regCrdtTpCd,
                regCrdtNo:partner.regCrdtNo,
                ctyNtCd:partner.ctyNtCd,
                cooPtnTpCd:partner.cooPtnTpCd,
                cooIdyCd:partner.cooIdyCd,
                cooPtnPropCd:partner.cooPtnPropCd,
                grpSubCom:partner.grpSubCom,
                grpId:partner.grpId,
                blngDeptName:partner.blngDeptName,
                blngEmpeName:partner.blngEmpeName,
            };

            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles
                }
            }

            AjaxJsonp(SysServiceData('CPC', 'queryComatterInfolist', [$scope.num, $scope.size, jsonToXml(queryComatterInfolistVo),jsonToXml(sysUserVo)]), url.cpc, $scope.success);
        }
        $scope.indexdata();


        //下拉刷新
        $scope.func_refresh = function () {
            $scope.togethers = [];
            $scope.num = 0;
            $scope.indexdata();
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }

        //基本信息
        AjaxJsonp(SysServiceData('CPC', 'viewCoPtnerInfo', [partner.cooPtnId]), url.cpc, function(msg){
            hide($ionicLoading);
            $scope.basic = angular.fromJson(msg.vo);
            $scope.$apply();
        });

    })


    .controller("partnerTogetherInfoCtrl", function ($scope, $state, $timeout, $stateParams, $location) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var data = angular.fromJson($stateParams.data);

        //合作事项基本信息
        $scope.partnerInfo = data;
        var cooItemId = data.cooItemId;
        console.log(data)

        $scope.goBackInfo = function () {
            javascript:history.go(-1);
        };


        //合作伙伴联系信息
        var sysUserVo = {
            userNum: person.userNum,
            currentGroup: {
                blngDeptCode: person.currentGroup.blngDeptCode,
                roles: person.currentGroup.roles
            }
        }

        AjaxJsonp(SysServiceData('CPC', 'viewCoPtnerCtcInfo', [cooItemId,jsonToXml(sysUserVo)]), url.cpc, function(msg){
            $scope.partnerConnect = angular.fromJson(msg.ctcvo);
            $scope.$apply();
            console.log($scope.partnerConnect);
        });

        //附件信息
        $scope.getAttchFileListNum = 0;
        $scope.getAttchFileListSize = 10;
        $scope.getAttchFileListData = [];
        $scope.finite_state = false;

        function getAttchFileList(){
            var ColAttachInfVO = {
                bsnEtyType:50,
                bsnEtyId:cooItemId
            }

            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                }
            }

            AjaxJsonp(SysServiceData('CPC', 'getAttchFileList', [ $scope.getAttchFileListNum, $scope.getAttchFileListSize,jsonToXml(ColAttachInfVO),jsonToXml(sysUserVo)]), url.cpc, function(msg){
                $scope.getAttchFileListData.push.apply($scope.getAttchFileListData, msg.content);

                $timeout(function () {
                    $scope.finite_state = msg.hasNextPage; //下一页
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

               // $ionicLoading.hide();
            });
        }

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.getAttchFileListData = [];
            $scope.getAttchFileListNum = 0;
            getAttchFileList();
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.getAttchFileListNum = $scope.getAttchFileListNum + 1;
            $scope.finite_state = false;
            getAttchFileList();
        }

        getAttchFileList();

        //附件下载
        $scope.dowload = function (obj) {
            var downloadUrl = url.cpcDownload + '/download?attachSN=' + obj.attachSN;
            MXCommon.download(downloadUrl);
        }

    });