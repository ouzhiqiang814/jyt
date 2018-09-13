angular.module("personcustomer.controller", [])
    .controller("personCustomerCtrl", function ($scope, $timeout, $ionicLoading, $ionicScrollDelegate, $state, $http, $ionicSideMenuDelegate, $ionicHistory) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                javascript:history.go(-1);
            }, 300);
        };

        $scope.cusItemClick = function (item) {
            var cus = angular.toJson(item);
            $state.go("personCustomerInfo", {
                data: cus
            }, {
                reload: true
            });
        };

      /*  $scope.cardTypes = [
            {id: "1010", name: "身份证"},
            {id: "1050", name: "护照"},
            {id: "1020", name: "军人身份证件"},
            {id: "1070", name: "港澳通行证"},
            {id: "1052", name: "外国护照"},
            {id: "1120", name: "外国人居留证"},
            {id: "1700", name: "外国身份证"},
            {id: "1011", name: "临时居民身份证"},
            {id: "1999", name: "其他证件（个人）"},
        ];*/
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
            $scope.items = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexDate();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };

        $scope.scrollTop = function () {
            $ionicScrollDelegate.scrollTop(true);
        };

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



        /**
         * 成功调用执行的方法
         * @param data
         */
        $scope.items = [];
        $scope.num = 0;
        $scope.size = 10;
        $scope.finite_state = false;
        $scope.success = function (msg) {
            console.log(msg);
            if($scope.itemsFlag){
                $scope.items = [];
            }

            for (var i = 0; i < msg.content.length; i++) {
                var dat = {
                    name: msg.content[i].ipNm,
                    no: msg.content[i].cstId,
                    id: msg.content[i].ipidNo,
                    ipid: msg.content[i].ipId,
                    insId: msg.content[i].insId,
                    cardType: msg.content[i].ipidTpcdNm  /*TypeValue("0001", )*/
                };
                $scope.items.push(dat);
            }

            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage; // 控制是否转圈圈，当它为false时，是没有下一页，即不转圈圈。当它为true 时，即有下一页时，则执行loadmore() 。
            },500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

        $scope.indexDate = function (obj) {
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var findCustforEmpeListVo = {
                cstId: cstId.value,
                ipNm: ipNm.value,
                ipTpcd: '02',
                ipidTpcd: $("#ipidTpcd").val(),
                ipidNo: ipidNo.value,
                cstCurSt: "068002",
            }
            AjaxJsonp(SysServiceData('CRM', 'findCustforEmpeList', [$scope.num, $scope.size, jsonToXml(findCustforEmpeListVo), person.userNum, person.currentGroup.manageOrgCode]), url.crm, $scope.success);
        }

        $scope.indexDate();

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.num = 0;
            $scope.indexDate(true);

        }

        //上拉加载更多
        $scope.loadMore = function () {
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;
            $scope.indexDate();
        }
    })


    .controller("personCustomerInfoCtrl", function ($scope, $state, $stateParams, $timeout, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var cus = angular.fromJson($stateParams.data);
        console.log(cus);
        var ipId = cus.ipid;
        var cstId = cus.no;
        var insId = cus.insId;


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                javascript:history.go(-1);
            }, 300);
        };
        show($ionicLoading);

        /* 基本信息 */
        $scope.search_state = true;
        $scope.items1 = [];
        $scope.indexdata1 = function () {
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngLglpsnId: person.currentGroup.blngLglpsnId,
                }
            }
            AjaxJsonp(SysServiceData('CRM', 'person_view', [ipId,insId, cstId, 1,jsonToXml(sysUserVo)]), url.crm, $scope.success1);

        }

        $scope.success1 = function (msg) {
            hide($ionicLoading);
            if(insId!=''&&insId != null){
                $scope.instId = insId;
            }else{
                $scope.instId = msg.instId;
            }
            $scope.basic = msg.vo1;
            $scope.indexdata2();
            $scope.indexdata3a();
            $scope.indexdata3b();
            $scope.indexdata3c();
            $scope.indexdata4a();
            $scope.indexdata4b();
        }

        $scope.indexdata1();


        /* 证件信息 */
        $scope.items2 = [];
        $scope.page2 = 0;
        $scope.size2 = 10;
        $scope.finite_state2 = false;
        $scope.success2 = function (msg) {
            //    msg = {"content":[{"CRDTDFDT":"2017-04-02","CRDTEXDAT":"2017-05-02","IPID":"10000000000000041956","IPIDNO":"4-18","IPIDSN":45531,"IPIDTPCD":"1010","IPIDTPCDNm":"身份证","ISSUCTFAHRLO":"签发地","ISSUCTFAHRNM":"签发机关","ISSUCTYCD":"156","ISSUCTYCDNm":"中国","PRIMCRDTIND":"是","ROW_ID":1}],"endRow":1,"first":true,"firstPage":true,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":true,"last":true,"lastPage":true,"list":[{"CRDTDFDT":"2017-04-02","CRDTEXDAT":"2017-05-02","IPID":"10000000000000041956","IPIDNO":"4-18","IPIDSN":45531,"IPIDTPCD":"1010","IPIDTPCDNm":"身份证","ISSUCTFAHRLO":"签发地","ISSUCTFAHRNM":"签发机关","ISSUCTYCD":"156","ISSUCTYCDNm":"中国","PRIMCRDTIND":"是","ROW_ID":1}],"navigatePages":8,"navigatepageNums":[1],"nextPage":0,"number":0,"numberOfElements":1,"pageNum":1,"pageSize":10,"pages":1,"prePage":0,"size":1,"startRow":1,"total":1,"totalElements":1,"totalPages":1}
            //console.log(msg);
            if ($scope.items2Flag) {
                $scope.items2 = [];
            }
            $scope.items2.push.apply($scope.items2, msg.content);

            setTimeout(function () {
                $scope.finite_state2 = msg.hasNextPage; //控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata2 = function (obj) {
            if (obj) {
                $scope.items2Flag = true;
            } else {
                $scope.items2Flag = false;
            }

            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles,
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findBeIpIdByIpIdMap', [$scope.page2, $scope.size2,  $scope.instId,ipId,insId==''?'1':'2',cstId,jsonToXml(sysUserVo)]), url.crm, $scope.success2);

        }



        //下拉刷新
        $scope.func_refresh2 = function () {
            $scope.page2 = 0;
            $scope.indexdata2(true);
        }
        //上拉加载更多
        $scope.loadMore2 = function () {
            $scope.page2 = $scope.page2 + 1;
            $scope.finite_state2 = false;
            $scope.indexdata2();
        }


        /* 联系信息 */
        /*地址联系信息*/
        $scope.items3a = [];
        $scope.page3a = 0;
        $scope.size3a = 10;
        $scope.finite_state3a = false;
        $scope.success3a = function (msg) {
            console.log(msg);
            if ($scope.items3aFlag) {
                $scope.items3a = [];
            }
            $scope.items3a.push.apply($scope.items3a, msg.content);

            setTimeout(function () {
                $scope.finite_state3a = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }

        $scope.indexdata3a = function (obj) {
            if (obj) {
                $scope.items3aFlag = true;
            } else {
                $scope.items3aFlag = false;
            }
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findBeIpPtAdrInfByIpIdMap', [$scope.page3a, $scope.size3a, cstId, $scope.instId, ipId, jsonToXml(sysUserVo)]), url.crm, $scope.success3a);
        }


        //下拉刷新
        $scope.func_refresh3a = function () {
            $scope.page3a = 0;
            $scope.indexdata3a(true);
        }
        //上拉加载更多
        $scope.loadMore3a = function () {
            $scope.page3a = $scope.page3a + 1;
            $scope.finite_state3a = false;
            $scope.indexdata3a();
        }

        /*电话联系信息*/
        $scope.items3b = [];
        $scope.page3b = 0;
        $scope.size3b = 10;
        $scope.finite_state3b = false;
        $scope.success3b = function (msg) {
            console.log(msg);
            if ($scope.items3bFlag) {
                $scope.items3b = [];
            }
            $scope.items3b.push.apply($scope.items3b, msg.content);

            setTimeout(function () {
                $scope.finite_state3b = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }

        $scope.indexdata3b = function (obj) {
            if (obj) {
                $scope.items3bFlag = true;
            } else {
                $scope.items3bFlag = false;
            }
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findBeIpTelInfByIpIdMap', [$scope.page3b, $scope.size3b, cstId, $scope.instId, ipId, jsonToXml(sysUserVo)]), url.crm, $scope.success3b);

        }


        //下拉刷新
        $scope.func_refresh3b = function () {
            $scope.page3b = 0;
            $scope.indexdata3b(true);
        }
        //上拉加载更多
        $scope.loadMore3b = function () {
            $scope.page3b = $scope.page3b + 1;
            $scope.finite_state3b = false;
            $scope.indexdata3b();
        }

        /*电子地址联系信息*/
        $scope.items3c = [];
        $scope.page3c = 0;
        $scope.size3c = 10;
        $scope.finite_state3c = false;
        $scope.success3c = function (msg) {
            console.log(msg);
            if ($scope.items3cFlag) {
                $scope.items3c = [];
            }

            $scope.items3c.push.apply($scope.items3c, msg.content);

            setTimeout(function () {
                $scope.finite_state3c = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }

        $scope.indexdata3c = function (obj) {
            if (obj) {
                $scope.items3cFlag = true;
            } else {
                $scope.items3cFlag = false;
            }
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findBeIpElcAdrInfByIpIdMap', [$scope.page3c, $scope.size3c, cstId,$scope.instId, ipId, jsonToXml(sysUserVo)]), url.crm, $scope.success3c);

        }


        //下拉刷新
        $scope.func_refresh3c = function () {
            $scope.page3c = 0;
            $scope.indexdata3c(true);
        }
        //上拉加载更多
        $scope.loadMore3c = function () {
            $scope.page3c = $scope.page3c + 1;
            $scope.finite_state3c = false;
            $scope.indexdata3c();
        }

        /* 左侧分类单击样式修改 */
        $scope.categoryLeftClick = function (e) {
            e.target.className = 'nav-current';
            $(e.target).siblings().removeClass().addClass('nav-blur');

            var index = $("#nav li").index(e.target);
            $("#pro .pro-warp").eq(index).siblings(".pro-warp").hide();
            $("#pro .pro-warp").eq(index).show();
        };


        /* 工作与教育背景 */
        /*工作情况*/
        $scope.items4a = [];
        $scope.page4a = 0;
        $scope.size4a = 10;
        $scope.finite_state4a = false;
        $scope.success4a = function (msg) {
            console.log(msg);
            if ($scope.items4aFlag) {
                $scope.items4a = [];
            }
            $scope.items4a.push.apply($scope.items4a, msg.content);
            console.log($scope.items4a);

            setTimeout(function () {
                $scope.finite_state4a = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata4a = function (obj) {
            if (obj) {
                $scope.items4aFlag = true;
            } else {
                $scope.items4aFlag = false;
            }

            var sysUserVO = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles,
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findBeIdvWrkInfByIpIdMap', [$scope.page4a, $scope.size4a, cstId, $scope.instId, ipId, jsonToXml(sysUserVO)]), url.crm, $scope.success4a);
        }


        //下拉刷新
        $scope.func_refresh4a = function () {
            $scope.page4a = 0;
            $scope.indexdata4a(true);
        }
        //上拉加载更多
        $scope.loadMore4a = function () {
            $scope.page4a = $scope.page4a + 1;
            $scope.finite_state4a = false;
            $scope.indexdata4a();
        }

        /*教育背景*/
        $scope.items4b = [];
        $scope.page4b = 0;
        $scope.size4b = 10;
        $scope.finite_state4b = false;
        $scope.success4b = function (msg) {
            console.log(msg);
            if ($scope.items4bFlag) {
                $scope.items4b = [];
            }
            $scope.items4b.push.apply($scope.items4b, msg.content);
            console.log($scope.items4b);

            setTimeout(function () {
                $scope.finite_state4b = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata4b = function (obj) {
            if (obj) {
                $scope.items4bFlag = true;
            } else {
                $scope.items4bFlag = false;
            }
            var sysUserVO = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles,
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findBeIdvEdBkgrdByIpIdMap', [$scope.page4b, $scope.size4b, cstId, $scope.instId, ipId, jsonToXml(sysUserVO)]), url.crm, $scope.success4b);
        }



        //下拉刷新
        $scope.func_refresh4b = function () {
            $scope.page4b = 0;
            $scope.indexdata4b(true);
        }
        //上拉加载更多
        $scope.loadMore4b = function () {
            $scope.page4b = $scope.page4b + 1;
            $scope.finite_state4b = false;
            $scope.indexdata4b();
        }


        /* 关联方信息 */
        $scope.items5 = [];
        $scope.page5 = 0;
        $scope.size5 = 10;
        $scope.finite_state5 = false;
        $scope.success5 = function (msg) {
            console.log(msg);
            if ($scope.items5Flag) {
                $scope.items5 = [];
            }
            $scope.items5.push.apply($scope.items5, msg.content);
            console.log($scope.items5);

            setTimeout(function () {
                $scope.finite_state5 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata5 = function (obj) {
            if (obj) {
                $scope.items5Flag = true;
            } else {
                $scope.items5Flag = false;
            }
            var searchtype = '02';
            var actiontype = '05';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page5, $scope.size5, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success5);
        }

        $scope.indexdata5();

        //下拉刷新
        $scope.func_refresh5 = function () {
            $scope.page5 = 0;
            $scope.indexdata5(true);
        }
        //上拉加载更多
        $scope.loadMore5 = function () {
            $scope.page5 = $scope.page5 + 1;
            $scope.finite_state5 = false;
            $scope.indexdata5();
        }


        /* 资产信息 */
        $scope.items6 = [];
        $scope.page6 = 0;
        $scope.size6 = 10;
        $scope.finite_state6 = false;
        $scope.success6 = function (msg) {
            console.log(msg);
            if ($scope.items6Flag) {
                $scope.items6 = [];
            }
            $scope.items6.push.apply($scope.items6, msg.content);
            console.log($scope.items6);

            setTimeout(function () {
                $scope.finite_state6 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata6 = function (obj) {
            if (obj) {
                $scope.items6Flag = true;
            } else {
                $scope.items6Flag = false;
            }
            var searchtype = '02';
            var actiontype = '06';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page6, $scope.size6, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success6);
        }

        $scope.indexdata6();

        //下拉刷新
        $scope.func_refresh6 = function () {
            $scope.page6 = 0;
            $scope.indexdata6(true);
        }
        //上拉加载更多
        $scope.loadMore6 = function () {
            $scope.page6 = $scope.page6 + 1;
            $scope.finite_state6 = false;
            $scope.indexdata6();
        }


        /* 不良评价信息 */
        $scope.items7 = [];
        $scope.page7 = 0;
        $scope.size7 = 10;
        $scope.finite_state7 = false;
        $scope.success7 = function (msg) {
            console.log(msg);
            if ($scope.items7Flag) {
                $scope.items7 = [];
            }
            $scope.items7.push.apply($scope.items7, msg.content);
            console.log($scope.items7);

            setTimeout(function () {
                $scope.finite_state7 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata7 = function (obj) {
            if (obj) {
                $scope.items7Flag = true;
            } else {
                $scope.items7Flag = false;
            }
            var searchtype = '02';
            var actiontype = '07';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page7, $scope.size7, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success7);
        }

        $scope.indexdata7();

        //下拉刷新
        $scope.func_refresh7 = function () {
            $scope.page7 = 0;
            $scope.indexdata7(true);
        }
        //上拉加载更多
        $scope.loadMore7 = function () {
            $scope.page7 = $scope.page7 + 1;
            $scope.finite_state7 = false;
            $scope.indexdata7();
        }


        /* 管理机构信息 */
        $scope.items8 = [];
        $scope.page8 = 0;
        $scope.size8 = 10;
        $scope.finite_state8 = false;
        $scope.success8 = function (msg) {
            console.log(msg);
            if ($scope.items8Flag) {
                $scope.items8 = [];
            }
            $scope.items8.push.apply($scope.items8, msg.content);
            console.log($scope.items8);

            setTimeout(function () {
                $scope.finite_state8 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata8 = function (obj) {
            if (obj) {
                $scope.items8Flag = true;
            } else {
                $scope.items8Flag = false;
            }
            var searchtype = '02';
            var actiontype = '08';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page8, $scope.size8, searchtype, actiontype, ipId, cstId, person.userNum, '18', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success8);
        }

        $scope.indexdata8();

        //下拉刷新
        $scope.func_refresh8 = function () {
            $scope.page8 = 0;
            $scope.indexdata8(true);
        }
        //上拉加载更多
        $scope.loadMore8 = function () {
            $scope.page8 = $scope.page8 + 1;
            $scope.finite_state8 = false;
            $scope.indexdata8();
        }


        /* 管理团队信息 */
        $scope.items9 = [];
        $scope.page9 = 0;
        $scope.size9 = 10;
        $scope.finite_state9 = false;
        $scope.success9 = function (msg) {
            console.log(msg);
            if ($scope.items9Flag) {
                $scope.items9 = [];
            }
            $scope.items9.push.apply($scope.items9, msg.content);
            console.log($scope.items9);

            setTimeout(function () {
                $scope.finite_state9 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            }, 500);
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            $ionicLoading.hide();
        }
        $scope.indexdata9 = function (obj) {
            if (obj) {
                $scope.items9Flag = true;
            } else {
                $scope.items9Flag = false;
            }
            var searchtype = '02';
            var actiontype = '09';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page8, $scope.size9, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success9);
        }

        $scope.indexdata9();

        //下拉刷新
        $scope.func_refresh9 = function () {
            $scope.page9 = 0;
            $scope.indexdata9(true);
        }
        //上拉加载更多
        $scope.loadMore9 = function () {
            $scope.page9 = $scope.page9 + 1;
            $scope.finite_state9 = false;
            $scope.indexdata9();
        }


    });