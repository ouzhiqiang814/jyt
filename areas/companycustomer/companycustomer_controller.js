angular.module("companycustomer.controller", [])
    .controller("companyCustomerCtrl", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        show($ionicLoading);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        };


        $scope.dataFlag = true;

        $scope.cusItemClick = function (item) {
            var cus = angular.toJson(item);
            console.log(cus)
            $state.go("companyCustomerInfo", {
                data: cus
            }, {
                reload: true
            });
        };

       


        //初始化证件类型
        TypeValueList('0002', function (msg) {
            $scope.cardTypes = msg;
            $scope.$apply();
        });

       /* $scope.cardTypes = [
            {id: "2010", name: "营业执照"},
            {id: "2020", name: "组织机构代码证"},
            {id: "2140", name: "商业登记证"},
            {id: "2011", name: "统一社会信用代码"},
            {id: "2120", name: "金融许可证"},
            {id: "2040", name: "事业法人登记证书"},
            {id: "2130", name: "民办非企业登记证书"},
            {id: "2150", name: "经营保险业务许可证"},
            {id: "2160", name: "经营证券业务许可证"},
            {id: "2190", name: "国家主管部门颁发的外国驻华机构批文"},
            {id: "2200", name: "国家登记机关颁发的外资企业驻华代表、办事处登记证"},
            {id: "2710", name: "境外合法注册成立的证明文件"},
            {id: "2992", name: "其他登记注册证件"},
            {id: "2090", name: "税务登记证"},
        ];*/

        $scope.toggleRight = function () {
            $ionicSideMenuDelegate.toggleRight(false);
        };

        $scope.func_reset = function () {
            document.getElementById("cstId").value = "";
            document.getElementById("ipNm").value = "";
            document.getElementById("ipidTpcd").value = "";
            document.getElementById("ipidNo").value = "";
        };

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
	         $scope.items = [];
	     }
            
            for (var i = 0; i < msg.content.length; i++) {
                var dat = {
                    name: msg.content[i].ipNm,
                    statusrc: 'img/companycustomer/customer.png',
                    no: msg.content[i].cstId,
                    id: msg.content[i].ipidNo,
                    ipid: msg.content[i].ipId,
                    insId:msg.content[i].insId,
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
        $scope.indexdata = function (obj){
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var iptpCd = '01';
            $scope.dataFlag = true;
            var findCustforEmpeListVo = {
                cstId: cstId.value,
                ipNm: ipNm.value,
                ipTpcd: '01',
                ipidTpcd: $("#ipidTpcd").val(),
                ipidNo: ipidNo.value,
                cstCurSt:"068002",
            }
            AjaxJsonp(SysServiceData('CRM', 'findCustforEmpeList', [$scope.num, $scope.size,jsonToXml(findCustforEmpeListVo) , person.userNum, person.currentGroup.manageOrgCode]), url.crm, $scope.success);
        }
	
        $scope.indexdata();
        //下拉刷新
        $scope.func_refresh = function(){
            /*$scope.num = 0;
            $scope.search_state = true;
            $scope.indexdata();
            $scope.sch_st = 2;
            $scope.items = [];*/
            $scope.num = 0;
            $scope.indexdata(true);
        }

        //上拉加载更多
        $scope.loadMore = function(){
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
            $scope.items = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };
    })

    .controller("companyCustomerInfoCtrl", function ($scope, $state, $stateParams, $timeout, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $ionicScrollDelegate,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var cus = angular.fromJson($stateParams.data);
        var ipId = cus.ipid;
        var cstId = cus.no;
        var insId = cus.insId;


        show($ionicLoading);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function() {
                javascript:history.go(-1);
            }, 300);
        };

        $scope.num = 0;
        $scope.size = 10;


        /* 基础信息 */
        $scope.search_state1 = true;
        $scope.items1 = [];
        $scope.indexdata1 = function () {
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngLglpsnId: person.currentGroup.blngLglpsnId,
                }
            }
            AjaxJsonp(SysServiceData('CRM', 'doView', [ipId,'',insId,insId==''?'1':'2' ,cstId,jsonToXml(sysUserVo)]), url.crm, $scope.success1);
        }

        $scope.success1 = function (msg) {
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
        }

        $scope.indexdata1();


        /* 证件信息 */
        $scope.items2 = [];
        $scope.page2 = 0;
        $scope.size2 = 10;
        $scope.finite_state2 = false;

        $scope.success2 = function (msg) {

            if( $scope.items2Flag){
                $scope.items2 = [];
            }

            $scope.items2.push.apply($scope.items2, msg.content);
            $scope.finite_state2 = msg.hasNextPage; //控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            hide($ionicLoading);
        }

        $scope.indexdata2 = function (obj) {
            if(obj){
                $scope.items2Flag = true;
            }else{
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
            $scope.indexdata2();
        }


        /* 单位联系信息 */
        /*地址联系信息*/
        $scope.items3a = [];
        $scope.page3a = 0;
        $scope.size3a = 10;
        $scope.finite_state3a = false;
        $scope.success3a = function (msg) {
            console.log(msg);
            if($scope.items3aFlag){
                $scope.items3a = [];
            }

            $scope.items3a.push.apply($scope.items3a, msg.content);

            $scope.finite_state3a = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }

        $scope.indexdata3a = function (obj) {
            if(obj){
                $scope.items3aFlag = true;
            }else{
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
            $scope.indexdata3a();
        }

        /*电话联系信息*/
        $scope.items3b = [];
        $scope.page3b = 0;
        $scope.size3b = 10;
        $scope.finite_state3b = false;
        $scope.success3b = function (msg) {

            if($scope.items3bFlag){
                $scope.items3b = [];
            }

            $scope.items3b.push.apply($scope.items3b, msg.content);


            $scope.finite_state3b = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }

        $scope.indexdata3b = function (obj) {
            if(obj){
                $scope.items3bFlag = true;
            }else{
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

            AjaxJsonp(SysServiceData('CRM', 'findBeIpTelInfByIpIdMap', [$scope.page3b, $scope.size3b, cstId,  $scope.instId, ipId, jsonToXml(sysUserVo)]), url.crm, $scope.success3b);

        }



        //下拉刷新
        $scope.func_refresh3b = function () {
            $scope.page3b = 0;
            $scope.indexdata3b(true);
        }
        //上拉加载更多
        $scope.loadMore3b = function () {
            $scope.page3b = $scope.page3b + 1;
            $scope.indexdata3b();
        }

        /*电子地址联系信息*/
        $scope.items3c = [];
        $scope.page3c = 0;
        $scope.size3c = 10;
        $scope.finite_state3c = false;
        $scope.success3c = function (msg) {

            if($scope.items3cFlag){
                $scope.items3c = [];
            }

            $scope.items3c.push.apply($scope.items3c, msg.content);

            $scope.finite_state3c = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }

        $scope.indexdata3c = function (obj) {
            if(obj){
                $scope.items3cFlag = true;
            }else{
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

            AjaxJsonp(SysServiceData('CRM', 'findBeIpElcAdrInfByIpIdMap', [$scope.page3c, $scope.size3c, cstId,  $scope.instId, ipId, jsonToXml(sysUserVo)]), url.crm, $scope.success3c);

        }


        //下拉刷新
        $scope.func_refresh3c = function () {
            $scope.page3c = 0;
            $scope.indexdata3c(true);
        }
        //上拉加载更多
        $scope.loadMore3c = function () {
            $scope.page3c = $scope.page3c + 1;
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


        /* 联系人联系信息 */
        $scope.items4 = [];
        $scope.page4 = 0;
        $scope.size4 = 10;
        $scope.finite_state4 = false;
        $scope.success4 = function (msg) {
console.log(msg);
            if($scope.items4Flag){
                $scope.items4 = [];
            }

            $scope.items4.push.apply($scope.items4, msg.content);

            $scope.finite_state4 = msg.hasNextPage; //控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata4 = function (obj) {
            if(obj){
                $scope.items4Flag = true;
            }else{
                $scope.items4Flag = false;
            }
            var searchtype = '01';
            var actiontype = '04';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page4, $scope.size4, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success4);
            console.log(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page4, $scope.size4, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]))
        }

        $scope.indexdata4();

        //下拉刷新
        $scope.func_refresh4 = function () {
            $scope.page4 = 0;
            $scope.indexdata4(true);
        }
        //上拉加载更多
        $scope.loadMore4 = function () {
            $scope.page4 = $scope.page4 + 1;
            $scope.indexdata4();
            alert(2);
        }


        /* 关联方信息 */
        $scope.items5 = [];
        $scope.page5 = 0;
        $scope.size5 = 10;
        $scope.finite_state5 = false;
        $scope.success5 = function (msg) {

            if($scope.items5Flag){
                $scope.items5 = [];
            }
            $scope.items5.push.apply($scope.items5, msg.content);

            $scope.finite_state5 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata5 = function (obj) {
            if(obj){
                $scope.items5Flag = true;
            }else{
                $scope.items5Flag = false;
            }
            var searchtype = '01';
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
            $scope.indexdata5();
        }


        /* 股东信息 */
        $scope.items6 = [];
        $scope.page6 = 0;
        $scope.size6 = 10;
        $scope.finite_state6 = false;

        $scope.success6 = function (msg) {
            //console.log(msg);
            if($scope.items6Flag){
                $scope.items6 = [];
            }
            $scope.items6.push.apply($scope.items6, msg.content);

            $scope.finite_state6 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata6 = function (obj) {
            if(obj){
                $scope.items6Flag = true;
            }else{
                $scope.items6Flag = false;
            }
            var searchtype = '01';
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
            $scope.indexdata6();
        }



        /* 资产信息 */
        $scope.items7 = [];
        $scope.page7 = 0;
        $scope.size7 = 10;
        $scope.finite_state7 = false;

        $scope.success7 = function (msg) {
            //console.log(msg);
            if($scope.items7Flag){
                $scope.items7 = [];
            }
            $scope.items7.push.apply($scope.items7, msg.content);

            $scope.finite_state7 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata7 = function (obj) {
            if(obj){
                $scope.items7Flag = true;
            }else{
                $scope.items7Flag = false;
            }
            var searchtype = '01';
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
            $scope.indexdata7();
        }


        /* 不良评价信息 */
        $scope.items8 = [];
        $scope.page8 = 0;
        $scope.size8 = 10;
        $scope.finite_state8 = false;

        $scope.success8 = function (msg) {
            //console.log(msg);
            if($scope.items8Flag){
                $scope.items8 = [];
            }
            $scope.items8.push.apply($scope.items8, msg.content);

            $scope.finite_state8 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata8 = function (obj) {
            if(obj){
                $scope.items8Flag = true;
            }else{
                $scope.items8Flag = false;
            }
            var searchtype = '01';
            var actiontype = '08';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page8, $scope.size8, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success8);

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
            $scope.indexdata8();
        }


        /* 管理机构信息 */
        $scope.items9 = [];
        $scope.page9 = 0;
        $scope.size9 = 10;
        $scope.finite_state9 = false;

        $scope.success9 = function (msg) {
            //console.log(msg);
            if($scope.items9Flag){
                $scope.items9 = [];
            }
            $scope.items9.push.apply($scope.items9, msg.content);

            $scope.finite_state9 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata9 = function (obj) {
            if(obj){
                $scope.items9Flag = true;
            }else{
                $scope.items9Flag = false;
            }
            var searchtype = '01';
            var actiontype = '09';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page9, $scope.size9, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success9);
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
            $scope.indexdata9();
        }


        /* 管理团队信息 */
        $scope.items10 = [];
        $scope.page10 = 0;
        $scope.size10 = 10;
        $scope.finite_state10 = false;

        $scope.success10 = function (msg) {
            if($scope.items10Flag){
                $scope.items10 = [];
            }
            $scope.items10.push.apply($scope.items10, msg.content);

            $scope.finite_state10 = msg.hasNextPage; // 控制是否转圈圈，false 是没有下一页即不转圈圈。
            $scope.$apply();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }
        $scope.indexdata10 = function (obj) {
            if(obj){
                $scope.items10Flag = true;
            }else{
                $scope.items10Flag = false;
            }
            var searchtype = '01';
            var actiontype = '10';
            var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }

            AjaxJsonp(SysServiceData('CRM', 'findPersonViewInfoList', [$scope.page10, $scope.size10, searchtype, actiontype, ipId, cstId, person.userNum, '17', person.currentGroup.manageOrgCode, person.currentGroup.blngDeptCode, $scope.str]), url.crm, $scope.success10);

        }

        $scope.indexdata10();

        //下拉刷新
        $scope.func_refresh10 = function () {
            $scope.page10 = 0;
            $scope.indexdata10(true);
        }
        //上拉加载更多
        $scope.loadMore10 = function () {
            $scope.page10 = $scope.page10 + 1;
            $scope.indexdata10();
        }


        $scope.labelA = [
            {name: '企业'},
        ];
        $scope.labelB = [
            {name: '车辆'},
        ];
        $scope.labelC = [
            {name: '运动'},
        ];
        $scope.labelD = [
            {name: '电话'},
        ];
        $scope.labelE = [];
        $scope.labelF = [
            {name: '良好'},
        ];


    });