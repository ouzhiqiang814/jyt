/**
 * 线索审批
 */
angular.module('fbksprvinfhomepage.controller', [])
    .controller('FbksprvinfhomepageCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading,$ionicActionSheet) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));
        show($ionicLoading);
        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            goBackByNum(1);
        };

        $("title").html("督办会议流程审批");
        if (approveItem == null) {
            approveItem = {
                businessKey: getQueryString("businessKey"),
                activityId: getQueryString("activityId"),
                taskId: getQueryString("taskId"),
                processInstanceId: getQueryString("processInstanceId"),
            }
            //     sessionStorage.setItem("approveItem", angular.toJson(approveItem));
            $scope.showHeader = false;
        } else {
            $scope.showHeader = true;
        }

        function init(initRet) {
            $scope.activityId = approveItem.activityId;
            if (person == null && initRet != null) {
                person = initRet;
            }

            show($ionicLoading);


            TypeValueList('0202', function (msg) {
                $scope.complSttnCd = msg;
                $scope.$apply();
            });

            /*基本信息*/
            $scope.success = function (msg) {
                console.log(msg);
                $scope.msg = msg;
                $scope.baseData = msg.vo;
                //  $scope.indexdata1();
                $scope.indexdata2();
            }

            $scope.indexdata = function (obj) {
                var fbksprvinfhomepageVo = {
                    actLinkId: approveItem.activityId,
                    bizOptId: approveItem.businessKey,
                    TASKID: approveItem.taskId,
                    processInstanceId: approveItem.processInstanceId,
                }

                var sysUserVO = {
                    userNum: person.userNum,
                    realname: person.realname,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                        blngDeptName: person.currentGroup.blngDeptName,
                        blngOrgCode: person.currentGroup.blngOrgCode,
                        blngOrgName: person.currentGroup.blngOrgName,
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'fbksprvinfhomepage', [jsonToXml(fbksprvinfhomepageVo), jsonToXml(sysUserVO)]), url.cpc, $scope.success);
            }

            $scope.indexdata();

            //附件资料列表
            /*资料附件*/
            /*   $scope.xiangmu = [];
             $scope.page = 0;
             $scope.size = 10;
             $scope.finite_state = false;
             $scope.getAttchListSuccess = function (msg) {
             console.log(msg);
             if ($scope.itemsFlag) {
             $scope.xiangmu = [];
             }

             $scope.xiangmu.push.apply($scope.xiangmu, msg.content);
             console.log($scope.xiangmu);

             setTimeout(function () {
             $scope.finite_state = msg.hasNextPage;
             }, 500);
             $scope.$apply();

             $scope.$broadcast('scroll.infiniteScrollComplete');
             $scope.$broadcast('scroll.refreshComplete');
             hide($ionicLoading);
             }

             $scope.indexdata1 = function (obj) {
             //console.log(data);
             if (obj) {
             $scope.itemsFlag = true;
             } else {
             $scope.itemsFlag = false;
             }
             var getAttchListVo = {
             bsnEtyType: 'SPRVITEM',
             bsnEtyId: $scope.baseData.itmID,
             blngEmpeId: '',
             actLinkId: approveItem.activityId,
             }
             AjaxJsonp(SysServiceData('CPC', 'getAttchList', [$scope.page, $scope.size, jsonToXml(getAttchListVo)]), url.cpc, $scope.getAttchListSuccess);
             }*/


            /*    //下拉刷新
             $scope.func_refresh = function () {
             $scope.page = 0;
             $scope.indexdata1(true);
             }
             //上拉加载更多
             $scope.loadMore = function () {
             $scope.page = $scope.page + 1;
             $scope.finite_state = false;
             $scope.indexdata1();
             }*/


            /*审核信息列表*/

            $scope.checkData = [];
            $scope.page3 = 0;
            $scope.size3 = 10;
            $scope.finite_state3 = false;

            $scope.success3 = function (msg) {
                if ($scope.itemsFlag3) {
                    $scope.checkData = [];
                }
                $scope.checkData.push.apply($scope.checkData, msg.list);

                setTimeout(function () {
                    $scope.finite_state3 = msg.hasNextPage;
                }, 500);
                $scope.$apply();


                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                hide($ionicLoading)
            }

            $scope.indexdata3 = function (obj) {
                if (obj) {
                    $scope.itemsFlag3 = true;
                } else {
                    $scope.itemsFlag3 = false;
                }
                var doGetColAprvInfPageVo = {
                    bsnEtyType: 'SPRV',
                    bsnEtyId: approveItem.businessKey,
                    actLinkId: 'ACT4',
                    processInstanceId: approveItem.processInstanceId,
                }

                AjaxJsonp(SysServiceData('CPC', 'doGetColAprvInfPage', [$scope.page3, $scope.size3, jsonToXml(doGetColAprvInfPageVo)]), url.cpc, $scope.success3);
            }

            $scope.indexdata3();

            //下拉刷新
            $scope.func_refresh3 = function () {
                $scope.page3 = 0;
                $scope.indexdata3(true);
            }
            //上拉加载更多
            $scope.loadMore3 = function () {
                $scope.page3 = $scope.page3 + 1;
                $scope.finite_state = false;
                $scope.indexdata3();
            }


            /*知悉人列表*/
            $scope.xiangmu1 = [];
            $scope.page1 = 0;
            $scope.size1 = 9999;
            $scope.finite_state1 = false;
            $scope.getRmdListSuccess = function (msg) {
                console.log(msg);
                if ($scope.itemsFlag1) {
                    $scope.xiangmu1 = [];
                }

                $scope.xiangmu1.push.apply($scope.xiangmu1, msg.content);


                setTimeout(function () {
                    $scope.finite_state1 = msg.hasNextPage;
                }, 500);
                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

            }

            $scope.indexdata2 = function (obj) {
                //console.log(data);
                if (obj) {
                    $scope.itemsFlag1 = true;
                } else {
                    $scope.itemsFlag1 = false;
                }
                var getRmdListVo = {
                    itmID: $scope.baseData.itmID,
                }
                var doGetsprviteminfListVo = {
                    sprvID: $scope.baseData.sprvID,
                    itmLvl: 2,
                    blngItmId: $scope.baseData.itmID,
                    fdbkPsnID: '',
                    queryType: '01'
                }
                AjaxJsonp(SysServiceData('CPC', 'doGetsprviteminfList', [$scope.page1, $scope.size1, jsonToXml(doGetsprviteminfListVo)]), url.cpc, $scope.getRmdListSuccess);

            }


            //下拉刷新
            $scope.func_refresh1 = function () {
                $scope.page1 = 0;
                $scope.indexdata2(true);
            }
            //上拉加载更多
            $scope.loadMore1 = function () {
                $scope.page1 = $scope.page1 + 1;
                $scope.finite_state1 = false;
                $scope.indexdata2();
            }


            $scope.cfmSprvInf = function () {
                
                var complCmnt = $("#complCmnt").val();


                var aprvOpns = $('#aprvOpns').val();
                // console.log(aprvOpns)
                if(aprvOpns == '点此处，最多输入1000字' || aprvOpns == ''){
                    var alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '请填写反馈说明！'
                    });
                    return;
                }
                var aprvResult = $('input:radio[name=aprvResult]:checked').val();
                var msg = "流程提交成功";

                if (aprvResult == undefined || aprvResult == null || aprvResult == '') {
                    aprvResult = '1';
                    if ($("#complSttnCd").val() == '2') {
                        aprvResult = '0';
                    }
                }
                showCommon($ionicLoading);

                var requestData = {
                    //    aprvSn: $scope.shenpi.aprvSn,//$('#aprvSn').getValue(),
                    bsnEtyType: "SPRV",
                    bsnEtyId:  $scope.baseData.sprvID,
                    actLinkId: approveItem.activityId,
                    aprvInsId: $scope.baseData.sprvRsplPsnInst,//$('#sprvRsplPsnInst').getValue(),
                    aprvDeptId: $scope.baseData.sprvRsplPsnDept,//$('#sprvRsplPsnDept').getValue(),
                    aprvEmpId: $scope.baseData.sprvRsplPsnID,//$('#sprvRsplPsnID').getValue(),
                    aprvOpns: aprvOpns,
                    aprvResult: aprvResult,
                    taskId: approveItem.taskId,
                    aprvStCd: '1',
                    aplyEmpId: $scope.baseData.sprvRsplPsnID,//$('#sprvRsplPsnID').getValue(),
                    aplyInsId: $scope.baseData.sprvRsplPsnInst,// $('#sprvRsplPsnInst').getValue(),
                    aplyDeptId: $scope.baseData.sprvRsplPsnDept,// $('#sprvRsplPsnDept').getValue(),
                    oprEmpId: person.userNum,
                    processInstanceId: approveItem.processInstanceId,
                    bsnNm: $scope.baseData.mtgNm,// $('#mtgNm').getValue()

                };

                var sysUserVO = {
                    userNum: person.userNum,
                    postCode: person.postCode,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                        blngOrgCode: person.currentGroup.blngOrgCode,
                    }
                }

                AjaxJsonp(SysServiceData('CPC', 'commitColSprvInf', [jsonToXml(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                    hideCommon($ionicLoading);
                    if (responseVO.status == 200) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: msg
                        });
                        alertPopup.then(function (res) {
                            goBackByNum(1);
                        });

                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '后台异常！请稍后再试'
                        });
                        alertPopup.then(function (res) {
                            goBackByNum(1);
                        });
                    }
                });
            }

            $scope.saveSprvInfform = function (type) {
                var requestData = [];
                for (var i = 0; i < $scope.xiangmu1.length; i++) {
                    if (!$("#complCmnt" + $scope.xiangmu1[i].itmID).val() || $("#complCmnt" + $scope.xiangmu1[i].itmID).val() == '点此处，最多输入1000字') {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '请填写事项编号' + $scope.xiangmu1[i].itmID + '的反馈说明！'
                        });
                        return;
                    }
                    if (!$('input:radio[name=complSttnCd' + $scope.xiangmu1[i].itmID + ']:checked').val()) {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '请选择事项编号' + $scope.xiangmu1[i].itmID + '的完成状态！'
                        });
                        return;
                    }
                    var obj = {
                        itmID: $scope.xiangmu1[i].itmID,
                        complCmnt: $("#complCmnt" + $scope.xiangmu1[i].itmID).val(),
                        complSttnCd: $('input:radio[name=complSttnCd' + $scope.xiangmu1[i].itmID + ']:checked').val()
                    };
                    requestData.push(obj);
                }


                var sysUserVO = {
                    userNum: person.userNum,
                    currentGroup: {
                        blngDeptCode: person.currentGroup.blngDeptCode,
                    }
                }
                AjaxJsonp(SysServiceData('CPC', 'doUpdateColSprvItemDtl', [angular.toJson(requestData), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                    if (responseVO.status == 200) {
                        if (type == 1) {
                            $scope.cfmSprvInf(requestData);
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: responseVO.description
                            });
                        }

                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: '后台异常！请稍后再试'
                        });

                    }
                });
                /*   $.ajaxquery({
                 "url" : "../colSprvInfo/doUpdateColSprvItemDtl",
                 "data" :{listStr : JSON.stringify(requestData)},
                 "success" : function(responseVO) {
                 if(responseVO.status==200){
                 if(type == 1){
                 $scope.cfmSprvInf(requestData);
                 }else{
                 $.alert('提示', responseVO.description, 'success',function(){

                 //closePortalPanel("督办会议流程审批");
                 });
                 }

                 }
                 else{
                 $.alert('提示', '后台异常！请稍后再试', 'failure',function(){
                 //closePortalPanel("督办会议流程审批");
                 });
                 }
                 }
                 });*/
            }


        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }

        $scope.fnActionSheets = function(){
            $ionicActionSheet.show({
                buttons: [
                  { text: '转发' }
                ],
                // destructiveText: '收回',
                titleText: '会议督办操作',
                cancelText: '取消',
                buttonClicked: function(index) {
                    // var confirmPopup = $ionicPopup.confirm({
                    //     title: '',
                    //     template: '是否确定转发当前任务？',
                    //     okText: '确定',
                    //     cancelText: '取消'
                    //   });
                    //   confirmPopup.then(function(res) {
                    //     if(res) {
                    //       console.log('确定');

                    //     console.log(angular.fromJson(sessionStorage.getItem("selectUser")))
                    //     } else {
                    //       console.log('取消');
                    //     }
                    //   });
                      $state.go("tanPonList", {}, {
                        reload: true
                    });
                    return true;
                }
              });            
        }

    })
    .controller('tanPonListCtrl', function($scope,$ionicLoading,$timeout,$ionicPopup,$state){
        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            $timeout(function () {
                javascript:history.go(-1);
            }, 300);
        };

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
        var personData = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        var orgCodeStr = '';
        
        show($ionicLoading);
        $scope.fnGetData = function(){
            // show($ionicLoading);
            // selectUser($scope.num, $scope.size, personData.posts[0].orgCode, '', $scope.success, '');
            // selectUser($scope.num, $scope.size, '', '', $scope.success, '');
            var aprv = {
                realname: '',
                loginName: '',
                orgCode: orgCodeStr,
                roleCode: '',
            }
            
            var list = {
                orgCode:'',
                roleCode:''
            }       

            AjaxJsonp(SysServiceDataDtl('PORTAL', 'findSysUserByOrg', [jsonToXml(aprv),$scope.num,$scope.size]), url.potal_potal, fnSuccess);
            fnAjaxJsonp(SysServiceDataDtl('PORTAL', 'getChildSysOrgVo', [jsonToXml(list)]), url.potal_potal, success);
        }
        function success(msg){
            var arr = []
            if(msg.length != 0){
                //一级菜单写入
                for(let i=0;i<msg.length;i++){ 
                    if(msg[i].parentOrgCode == '00'){
                        arr.push({
                            orgCode:msg[i].orgCode,
                            orgName:msg[i].orgName,
                            orgLevelCd:msg[i].orgLevelCd,
                            parentOrgCode:msg[i].parentOrgCode,
                            child:[]
                        })
                    }
                }
                // 二级菜单写入
                for(let i=0;i<msg.length;i++){
                    for(let j=0;j<arr.length;j++){
                        if(msg[i].parentOrgCode == arr[j].orgCode){
                            arr[j].child.push({
                                orgCode:msg[i].orgCode,
                                orgName:msg[i].orgName,
                                orgLevelCd:msg[i].orgLevelCd,
                                parentOrgCode:msg[i].parentOrgCode,
                                child:[]
                            }) 
                        }
                    }
                }
                //三级菜单写入
                for(let i=0;i<msg.length;i++){
                    for(let j=0;j<arr.length;j++){
                        for(let k=0;k<arr[j].child.length;k++){
                            if(msg[i].parentOrgCode == arr[j].child[k].orgCode){
                                arr[j].child[k].child.push({
                                    orgCode:msg[i].orgCode,
                                    orgName:msg[i].orgName,
                                    orgLevelCd:msg[i].orgLevelCd,
                                    parentOrgCode:msg[i].parentOrgCode,
                                    child:[]
                                })
                            }
                        }
                    }
                }
                // 四级菜单写入
                for(let i=0;i<msg.length;i++){
                    for(let j=0;j<arr.length;j++){
                        for(let k=0;k<arr[j].child.length;k++){
                            for(let t=0;t<arr[j].child[k].child.length;t++){
                                if(msg[i].parentOrgCode == arr[j].child[k].child[t].orgCode){
                                    arr[j].child[k].child[t].child.push({
                                        orgCode:msg[i].orgCode,
                                        orgName:msg[i].orgName,
                                        orgLevelCd:msg[i].orgLevelCd,
                                        parentOrgCode:msg[i].parentOrgCode,
                                        child:[]
                                    })
                                }
                            }
                        }
                    }
                }
                // 五级菜单写入
                for(let i=0;i<msg.length;i++){
                    for(let j=0;j<arr.length;j++){
                        for(let k=0;k<arr[j].child.length;k++){
                            for(let t=0;t<arr[j].child[k].child.length;t++){
                                for(let o=0;o<arr[j].child[k].child[t].child.length;o++){
                                    if(msg[i].parentOrgCode == arr[j].child[k].child[t].child[o].orgCode){
                                        arr[j].child[k].child[t].child[o].child.push({
                                            orgCode:msg[i].orgCode,
                                            orgName:msg[i].orgName,
                                            orgLevelCd:msg[i].orgLevelCd,
                                            parentOrgCode:msg[i].parentOrgCode,
                                            child:[]
                                        })
                                    }  
                                }
                            }
                        }
                    }
                }          
            }
            console.log(arr)
            $scope.list = arr
        }

        // 联动函数

        $scope.c = function () {
            $scope.selected2 = "";
            $scope.selected3 = "";
            $scope.selected4 = "";
            $scope.selected5 = "";
        };
        
        $scope.c2 = function () {       
            $scope.selected3 = "";
            $scope.selected4 = "";
            $scope.selected5 = "";
        };
        
        $scope.c3 = function () {
            $scope.selected4 = "";
            $scope.selected5 = "";
        };

        $scope.c4 = function () {  
            $scope.selected5 = "";          
        };
        $scope.c5 = function () {           
        };

        $scope.fnReset = function(){
            $scope.selected1 = "";
            $scope.selected2 = "";
            $scope.selected3 = "";
            $scope.selected4 = "";
            $scope.selected5 = "";
        }

        $scope.fnOk = function(){
            if($scope.selected1.orgCode){
                if($scope.selected2.orgCode){
                    if($scope.selected3.orgCode){
                        if($scope.selected4.orgCode){
                            if($scope.selected5.orgCode){
                                orgCodeStr = $scope.selected5.orgCode
                            }
                            else{
                                orgCodeStr = $scope.selected4.orgCode
                            }
                            
                        }
                        else{
                            orgCodeStr = $scope.selected3.orgCode 
                        }
                    }
                    else{
                        orgCodeStr = $scope.selected2.orgCode 
                    }
                }
                else{
                    orgCodeStr = $scope.selected1.orgCode
                }
            }
            else{
                orgCodeStr = ''
            }
            console.log(orgCodeStr)
            var aprv = {
                realname: '',
                loginName: '',
                orgCode: orgCodeStr,
                roleCode: '',
            }            
        
            $scope.items = [];
            AjaxJsonp(SysServiceDataDtl('PORTAL', 'findSysUserByOrg', [jsonToXml(aprv),$scope.num,$scope.size]), url.potal_potal, fnSuccess);
            guanbi();
        }

        function fnSuccess(msg) {
            hide($ionicLoading);
            console.log(msg);
            if ($scope.itemsFlag) {
                $scope.items = [];
            }
            $scope.items.push.apply($scope.items, msg.content);
            $scope.finite_state = msg.hasNextPage;
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

           //下拉刷新
        $scope.fuRefresh = function () {
            $scope.num = 0;
            $scope.itemsFlag = true;
           
            var aprv = {
                realname: '',
                loginName: '',
                orgCode: orgCodeStr,
                roleCode: '',
            }        
            AjaxJsonp(SysServiceDataDtl('PORTAL', 'findSysUserByOrg', [jsonToXml(aprv),$scope.num,$scope.size]), url.potal_potal, fnSuccess);
        }

        //上拉加载更多
        $scope.fnLoadMore = function () {
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;          
            
            var aprv = {
                realname: '',
                loginName: '',
                orgCode: orgCodeStr,
                roleCode: '',
            }                   
            AjaxJsonp(SysServiceDataDtl('PORTAL', 'findSysUserByOrg', [jsonToXml(aprv),$scope.num,$scope.size]), url.potal_potal, fnSuccess);       
        }

        // 搜索
        $scope.searchCont = {};//搜索内容
        $scope.fnSearch = function(){
            $scope.itemsFlag = true;
            // show($ionicLoading)
            var keyWord = document.getElementById('search').value;
            $scope.num = 0;
            var aprv = {
                realname: keyWord,
                loginName: '',
                orgCode: orgCodeStr,
                roleCode: '',
            }                   
            AjaxJsonp(SysServiceDataDtl('PORTAL', 'findSysUserByOrg', [jsonToXml(aprv),$scope.num,$scope.size]), url.potal_potal, fnSuccess);  
        }
        $scope.fnClearSearch = function(){
            $scope.searchCont = {};
        }

        $scope.user = "";
        //选择用户
        $scope.selectUser = function (user) {
            $scope.user = user;

        }
        // 提交转发信息
        $scope.submit = function(){
            console.log($scope.user) 
            if($scope.user == ''){
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '请选择要转发的用户!'
                  });
                return;
            }
            console.log(angular.fromJson(sessionStorage.getItem("approveItem")).taskId)
            var taskId = angular.fromJson(sessionStorage.getItem("approveItem")).taskId
            var urlStr = url.cpc_tanform +'?taskId=' + taskId + '&userNum=' + $scope.user.userNum;
            fnAjaxJson('',urlStr,fnTanSucc)           
        }
        function fnTanSucc(msg){
            $state.go('backlogList')
        }
    })