angular.module("statistics.controller", [])
    .controller('employeeStatisticsCtrl', function ($scope,$ionicLoading,$timeout,$state,$ionicTabsDelegate){
       
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            // $timeout(function () {
            //     hide($ionicLoading);
            //     hideCommon($ionicLoading);
            //     javascript:history.go(-1);
            // }, 300);
            let list = {
                typeKey : ''
            }
            sessionStorage.setItem('statisticsVoAds',angular.toJson(list));
            MXWebui.closeWindow();
        };

        var personRole = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        $scope.ngflag = true;
        show($ionicLoading);
        document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载
        function onDeviceReady() {
            MXCommon.getCurrentUser(
                function (result) {
                    if(personRole == null){
                        getPerson1(result.login_name, init);
                    }else{
                        init();
                    }
                }
            );
        }

        function init(msg){
            if(msg==null || msg==''){
                $scope.position = personRole;
            }else{
                $scope.position = msg;
                $scope.$apply();
            }
            sessionStorage.setItem("sysUserVoJson", JSON.stringify($scope.position));
            personRole = angular.fromJson(sessionStorage.getItem("sysUserVoJson"))
            // var insIdStr = personRole.currentGroup.blngDeptCode;
            var insIdStr = '';
            var userNumStr = personRole.userNum;
            var type = 1;
            
            var orgBaseArr = [] //管辖结构树全局变量

            // 判断当前角色是否属于本部
        
            var addClass = angular.fromJson(sessionStorage.getItem("statisticsVoAds"));
                let PageNum = 0;       
                if(addClass){
                    console.log(addClass.typeKey)
                    switch(addClass.typeKey){
                        case 'org':
                            PageNum = 1;
                            break;
                        case 'age':
                            PageNum = 2;
                            break;
                        case 'sex':
                            PageNum = 4;
                            break;
                        case 'education':
                            PageNum = 3;
                            break;
                        case 'political':
                            PageNum = 0;
                            break;
                        case 'working':
                            PageNum = 5;
                            break;    
                        default:
                            PageNum = 1;
                            break;
                    }
                }
                // console.log($ionicTabsDelegate.selectedIndex()) 
                $timeout(function (){
                    $scope.myActiveSlide = PageNum
                },300)
                
                var sel_1 = sessionStorage.getItem("selected1")
                var sel_2 = sessionStorage.getItem("selected2")
                if(sel_1 != null && sel_1 != '' && sel_2 == ''){
                    insIdStr = sel_1
                }
                else if(sel_1 != null && sel_1 != '' && sel_2 != ''){
                    insIdStr = sel_2
                }
                else{
                    insIdStr = '';
                }

                // let roleCodeStr = '';
                // for(let i=0;i<personRole.groups.length;i++){
                //     for(let j=0;j<personRole.groups[i].roles.length;j++){
                //         roleCodeStr += personRole.groups[i].roles[j].roleCode + ','
                //     }
                // }
                // roleCodeStr = roleCodeStr.substring(0,roleCodeStr.length-1);
                
                // 获取角色管辖部门
                let urlStr = url.adm_manageOrg + '?userNum=' + personRole.userNum;
                // let urlStr = url.adm_manageOrg + '?userNum=00001355';
                fnAjaxJson('',urlStr,fnManageOrg)

            function fuGetOrgDate(){
                $scope.ngflag = false;                
                if(insIdStr == ''){
                    for(let i=0;i<orgBaseArr.length;i++){
                        insIdStr = orgBaseArr[i];
                        if(personRole.currentGroup.blngOrgCode == '0101'){
                            $scope.roleFlag = true 
                            fnGetCompanyData();
                        }
                        else{
                            $scope.roleFlag = false;
                            $("#comORdep").html('部门统计');
                            fnGetDepemantData();
                        }
                    }  
                }
                else{
                    if(personRole.currentGroup.blngOrgCode == '0101'){
                        $scope.roleFlag = true 
                        fnGetCompanyData();
                    }
                    else{
                        $scope.roleFlag = false;
                        $("#comORdep").html('部门统计');
                        fnGetDepemantData();
                    } 
                }
            }
            


            

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

            

            // 初始化查询公司统计信息（本部）
            function fnGetCompanyData(){
                console.log(insIdStr)    
                let urlStr = url.adm + '?type=01' + '&insId=' + insIdStr + '&userNum=' + userNumStr;
                // let urlStr = url.adm + '?type=01&userNum=00001400'+ '&&insId=' + insIdStr;
                fnAjaxJson('',urlStr,fnReplanyData,'items_1',false,'',fnEnd);       
            }
            // 初始化查询公司统计信息（分公司）
            function fnGetDepemantData(){
                let urlStr = url.adm + '?type=01&insId='+ insIdStr + '&userNum=' + userNumStr;
                // let urlStr = url.adm + '?type=01&insId='+ insIdStr + '&userNum=00001400';
                fnAjaxJson('',urlStr,fnReplanyData,'items_1',false,'',fnEnd);       
            }

            // 按年龄统计
            function fnGetAgeDate(){
                let urlStr = url.adm + '?type=04&userNum=' + userNumStr + '&insId=' + insIdStr;
                // let urlStr = url.adm + '?type=04&userNum=00001400'+ '&&insId=' + insIdStr;
                fnAjaxJson('',urlStr,fnReplanyData,'items_2',true,'age',fnGetEduDate);        
                
            }

            // 按学历统计
            function fnGetEduDate(){
                let urlStr = url.adm + '?type=03&userNum=' + userNumStr + '&insId=' + insIdStr; 
                // let urlStr = url.adm + '?type=03&userNum=00001400' + '&&insId=' + insIdStr; 
                fnAjaxJson('',urlStr,fnReplanyData,'items_3',true,'education',fnGetSexDate);
            }

            // 按性别统计
            function fnGetSexDate(){
                let urlStr = url.adm + '?type=02&userNum=' + userNumStr + '&insId=' + insIdStr; 
                // let urlStr = url.adm + '?type=02&userNum=00001400' + '&&insId=' + insIdStr;   
                fnAjaxJson('',urlStr,fnReplanyData,'items_4',true,'sex',fnGetPoliticalDate);
            }

            //政治面貌统计
            function fnGetPoliticalDate(){
                let urlStr = url.adm + '?type=05&userNum=' + userNumStr + '&insId=' + insIdStr; 
                // let urlStr = url.adm + '?type=05&userNum=00001400' + '&&insId=' + insIdStr;   
                fnAjaxJson('',urlStr,fnReplanyData,'items_5',true,'political',fnGetWorkingDate);
            }

            //工龄统计
            function fnGetWorkingDate(){
                let urlStr = url.adm + '?type=06&userNum=' + userNumStr + '&insId=' + insIdStr; 
                // let urlStr = url.adm + '?type=06&userNum=00001400' + '&&insId=' + insIdStr;   
                if(type == 1){
                    fnAjaxJson('',urlStr,fnReplanyData,'items_6',true,'working',fuGetOrgDate);
                }
                else{
                    fnAjaxJson('',urlStr,fnReplanyData,'items_6',true,'working',fnEnd);
                }                
            }

            function fnEnd(){
                console.log('完成');
                hide($ionicLoading)
            }
            // 数据展现
            function fnPushData(data,itemName,hasCharts,chartId,nextFn){
                var legendData = [];
                var seriesData = [];
                var itemsData = [];
                var typeKey = '';
                switch (chartId){
                    case 'age':
                        typeKey = 'age';
                        break;
                    case 'education':
                        typeKey = 'education';
                        break;
                    case 'sex':
                        typeKey = 'sex';
                        break;
                    case 'political':
                        typeKey = 'political';
                        break;
                    case 'working':
                        typeKey = 'working';
                        break;
                    default:
                        typeKey = 'org';
                        break;

                }
                for(let i=0;i<data.length;i++){
                    legendData.push(data[i].tname);
                    seriesData.push({
                        value:data[i].total,
                        name:data[i].tname
                    })
                    itemsData.push({
                        title:data[i].tname,
                        value:data[i].total,
                        point:fnMathPoint(data,i) + '%',
                        tcode:data[i].tcode,
                        typeKey:typeKey,
                        insIdStr:insIdStr
                    })
                }

                if(hasCharts){
                    var myChart = echarts.init(document.getElementById(chartId));
                    var option = {
                        legend: {
                            orient : 'horizontal',
                            x : 'center',
                            y : 'top',
                            data:legendData
                        },
                        color:['#f8e182','#2ec7c9','#5ab1ef','#d87a80','#b6a2de','#67d388','#fdad3d','#ffb980'],
                        calculable : true,
                        animation:false,
                        series : [
                            {
                                name:'统计',
                                type:'pie',
                                radius : '55%',
                                center: ['50%', '50%'],
                                data:seriesData
                            }
                        ]
                    };
                    myChart.setOption(option)
                }
                switch(itemName) {
                    case 'items_1':
                        $scope.items_1 = itemsData;
                        break;
                    case 'items_2':
                        $scope.items_2 = itemsData;
                        break;  
                    case 'items_3':
                        $scope.items_3 = itemsData;
                        break; 
                    case 'items_4':
                        $scope.items_4 = itemsData;
                        break; 
                    case 'items_5':
                        $scope.items_5 = itemsData;
                        break;  
                    case 'items_6':
                        $scope.items_6 = itemsData;
                        break;         
                }
                
                nextFn()
            }

            // 计算占比
            function fnMathPoint(data,e){
                var totalNum = 0;
                var point = 0;
                for(let k=0;k<data.length;k++){
                    totalNum +=  data[k].total
                }
                point = ((data[e].total) / totalNum)*100;
                point = point.toFixed(2);
                return point;
            }

            //升序操作
            function fnSortUp(a,b){
                return a.tcode - b.tcode    
            }

            //数据初步处理
            function fnReplanyData(data,itemName,hasCharts,chartId,nextFn){
                for(let q=0;q<data.userTotalList.length;q++){
                    if(data.userTotalList[q].tname == ''){
                        data.userTotalList[q].tname = '未知'
                    }
                    // console.log(JSON.stringify(data.userTotalList[q].tcode))
                }
            let dataJSon = data.userTotalList.sort(fnSortUp);
            //    console.log(JSON.stringify(dataJSon))
            
            fnPushData(dataJSon,itemName,hasCharts,chartId,nextFn)
            }


            
            $scope.fnGetDels = function(item){
                console.log(item);
                var dels = angular.toJson(item);
                sessionStorage.setItem('statisticsVo',dels)
                $state.go("employeeInfoList", {
                
                }, {
                    reload: true
                });
            }

            $scope.fnGetDeps = function(item){
                console.log(item);
                var dels = angular.toJson(item);
                sessionStorage.setItem("depemenDelstItem", dels);
                $state.go("depermantList", {
                }, {
                    reload: true
                });
            }   
            
            //处理管辖机构数据组
            function fnManageOrg(ret){
                let arrCode = []
                if(ret){
                    for(let i=0;i<ret.userTotalList.length;i++){
                        arrCode.push(ret.userTotalList[i].orgCode) 
                    }
                }
                // let arrCodeDate = []
                // for(let j=0;j<arrCode.length;j++){
                //     if(arrCode.indexOf(arrCode[j]) == j){
                //         arrCodeDate.push(arrCode[j])
                //     }
                // }
                orgBaseArr = arrCode;
                type = 1
                fnGetAgeDate();
                fnStep1(arrCode)
            }

            // 处理管辖范围机构编号
            function fnStep1(msg){
                // let ret = ['02','0101','011001','0105']
                console.log(msg)
                for(let i=0;i<msg.length;i++){
                    var list = {
                        orgCode:msg[i],
                        roleCode:''
                    }
                    fnAjaxJsonp(SysServiceDataDtl('PORTAL', 'getChildSysOrgVo', [jsonToXml(list)]), url.potal_potal, fnCode);
                }
                
            }
            var treeCodeArr = []
            function fnCode(msg){
                console.log(msg)
                let list = []
                treeCodeArr.push(success(msg))
                console.log(treeCodeArr)
                for(let i=0;i<treeCodeArr.length;i++){
                    list.push(treeCodeArr[i][0])
                }
                $scope.list = list;
                if(sel_1 != '' && sel_2 == ''){
                    $scope.selected1 = sel_1
                }
                else if(sel_1 != '' && sel_2 != ''){
                    $scope.selected1 = sel_1
                    $scope.selected2 = sel_2
                }
            }

            // 结构树函数
            function success(msg){
                let arr = []
                console.log(msg)
                if(msg.length != 0){
                    if(msg.length == 1){
                        arr.push({
                            orgCode:msg.orgCode,
                            orgName:msg.orgName,
                            orgLevelCd:msg.orgLevelCd,
                            parentOrgCode:msg.parentOrgCode,
                            child:[]
                        })
                    }
                    else{
                        console.log(orgBaseArr)
                            for(let y=0;y<orgBaseArr.length;y++){
                                //一级菜单写入
                                for(let i=0;i<msg.length;i++){ 
                                    if(msg[i].orgCode == orgBaseArr[y]){
                                        arr.push({
                                            orgCode:msg[i].orgCode,
                                            orgName:msg[i].orgName,
                                            orgLevelCd:msg[i].orgLevelCd,
                                            parentOrgCode:msg[i].parentOrgCode,
                                            child:[]
                                        })
                                    }
                            }
                        }
                            console.log(arr)
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
                }


                

                
                return arr
                
            }

            // 联动函数

            $scope.c = function () {
                $scope.selected2 = "";
                $scope.selected3 = "";
                $scope.selected4 = "";
                $scope.selected5 = "";
                if($scope.selected1){
                    sessionStorage.setItem('selected1',$scope.selected1.orgCode);
                    sessionStorage.setItem('selected2','');
                }
                else{
                    sessionStorage.setItem('selected1','');
                    sessionStorage.setItem('selected2','');
                }
                
            };
            
            $scope.c2 = function () {       
                $scope.selected3 = "";
                $scope.selected4 = "";
                $scope.selected5 = "";
                if($scope.selected2){
                    sessionStorage.setItem('selected2',$scope.selected2.orgCode);
                }
                else{
                    sessionStorage.setItem('selected2','');
                }
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
                var orgCodeStr
                if($scope.selected1){
                    if($scope.selected2){
                        if($scope.selected3){
                            if($scope.selected4){
                                if($scope.selected5){
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
                
                insIdStr = orgCodeStr;
                type = 2;
                fnGetAgeDate();
                if(personRole.currentGroup.blngOrgCode == '0101'){
                    fnGetCompanyData();
                }
                else{
                    fnGetDepemantData();
                }
                guanbi();
            }
        }
            
        })
        .controller('depermantListCtrl',function($scope,$ionicLoading,$timeout,$state){
            $scope.goBack = function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                $timeout(function () {
                    hide($ionicLoading);
                    hideCommon($ionicLoading);
                    javascript:history.go(-1);
                }, 300);
                let list = {
                    typeKey : 'org'
                }
                sessionStorage.setItem('statisticsVoAds',angular.toJson(list))
            };
            show($ionicLoading);
            var personRole = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
            var item = angular.fromJson(sessionStorage.getItem("depemenDelstItem"))
            $scope.fnGetData = function(){
                let urlStr = url.adm + '?type=01&insId='+ item.tcode + '&userNum=' + personRole.userNum;
                // let urlStr = url.adm + '?type=01&insId='+ item.tcode + '&userNum=00001400';
                fnAjaxJson('',urlStr,fnReplanyData,'items_1',false,'',''); 
            }

            // 数据展现
            function fnPushData(data,itemName,hasCharts,chartId,nextFn){
                var itemsData = [];
                for(let i=0;i<data.length;i++){
                    itemsData.push({
                        title:data[i].tname,
                        value:data[i].total,
                        point:fnMathPoint(data,i) + '%',
                        tcode:data[i].tcode,
                        typeKey : 'org'
                    })
                }

                $scope.items_1 = itemsData;
                
                hide($ionicLoading);
            }

            // 计算占比
            function fnMathPoint(data,e){
                var totalNum = 0;
                var point = 0;
                for(let k=0;k<data.length;k++){
                    totalNum +=  data[k].total
                }
                point = ((data[e].total) / totalNum)*100;
                point = point.toFixed(2);
                return point;
            }

            //升序操作
            function fnSortUp(a,b){
                return a.tcode - b.tcode    
            }

            //数据初步处理
            function fnReplanyData(data,itemName,hasCharts,chartId,nextFn){
                for(let q=0;q<data.userTotalList.length;q++){
                    if(data.userTotalList[q].tname == ''){
                        data.userTotalList[q].tname = '未知'
                    }
                    // console.log(JSON.stringify(data.userTotalList[q].tcode))
                }
            let dataJSon = data.userTotalList.sort(fnSortUp);
            //    console.log(JSON.stringify(dataJSon))
            fnPushData(dataJSon,itemName,hasCharts,chartId,nextFn)
            }


            $scope.fnGetDels = function(item){
                console.log(item);
                var dels = angular.toJson(item);
                sessionStorage.setItem('statisticsVo',dels)
                $state.go("employeeInfoList", {
                    
                }, {
                    reload: true
                });
            }
        
    })