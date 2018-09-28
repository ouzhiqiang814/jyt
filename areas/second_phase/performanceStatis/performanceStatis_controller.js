angular.module("performanceStatis.controller", [])
    .controller('performanceStatisCtrl',function($scope,$ionicLoading,$timeout,$state,$ionicPopup,$ionicSlideBoxDelegate){
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            // $timeout(function () {
            //     hide($ionicLoading);
            //     hideCommon($ionicLoading);
            //     javascript:history.go(-1);
            // }, 300);
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
            var insIdStr = personRole.currentGroup.blngDeptCode;

            var size = 5;
            var page = 0
            $scope.finite_state = false;
            $scope.items_2 = [];
            $scope.itemsFlag = true;
            $scope.title = '';
            var date = new Date;
            var year = date.getFullYear(); 
            var month = parseInt(date.getMonth() + 1);
            var qurter = 4;
            if(month >=1 && month<=3){
                qurter = 1
            }
            else if(month >=4 && month<=6){
                qurter = 2
            }
            else if(month >=7 && month<=9){
                qurter = 3
            }
            else{
                qurter = 4
            }

            var search = '&fd_year='+ year;
            var yearStr = sessionStorage.getItem('yearStr');
            if(yearStr){
                search = '&fd_year='+ yearStr
            }
            console.log(yearStr)

            var seasonStr = qurter;
            var monthStr = '';
            
            fnInit();

            // 开始获取函数
            function fnInit(){
                fnSearchOrd()
                // let urlStr = url.adm + '?type=01' + '&insId=' + insIdStr + '&userNum=' + userNumStr;
                let urlStr = url.adm_queryFlowAmount + '?person_code='+ personRole.loginName + search;
                fnAjaxJson('',urlStr,fnReplanyData,'items_1',true,'flow',fnEnd);   //效能流程统计
            }

            function fnReplanyData(data,itemName,hasCharts,chartId,nextFn){
                console.log(data)
                for(let q=0;q<data.VOaFlowstatStaffFlowInfoList.length;q++){
                    if(data.VOaFlowstatStaffFlowInfoList[q].module_name == ''){
                        data.VOaFlowstatStaffFlowInfoList[q].module_name = '未知'
                    }
                }
                
                // if(hasCharts == 'items_1'){
                    fnPushData(data,itemName,hasCharts,chartId,nextFn)
                // }
            }

            function fnPushData(data,itemName,hasCharts,chartId,nextFn){
                
                var itemsData = [];
                var dataArr = [];
                var seriesData = [];
                for(let i=0;i<data.VOaFlowstatStaffFlowInfoList.length;i++){
                    itemsData.push({
                        title:data.VOaFlowstatStaffFlowInfoList[i].module_name,
                        value:data.VOaFlowstatStaffFlowInfoList[i].doc_count,
                        point:fnMathPoint(data.VOaFlowstatStaffFlowInfoList,i) + '%',
                    })
                    dataArr.push(data.VOaFlowstatStaffFlowInfoList[i].module_name)
                    seriesData.push({
                            name:data.VOaFlowstatStaffFlowInfoList[i].module_name,
                            value:data.VOaFlowstatStaffFlowInfoList[i].doc_count
                    })                   
                }
                var myChart = echarts.init(document.getElementById(chartId));
                var option = {
                    legend: {
                        orient : 'horizontal',
                        x : 'center',
                        y : 'top',
                        data:dataArr
                    },
                    color:['#f8e182','#2ec7c9','#5ab1ef','#d87a80','#b6a2de','#67d388','#fdad3d','#ffb980'],
                    calculable : true,
                    animation:false,
                    series : [
                        {
                            name:'统计',
                            type:'pie',
                            radius : '50%',
                            center: ['50%', '55%'],
                            data:seriesData,
                            label:{
                                normal:{
                                    formatter(v) {
                                        let text = v.name
                                        return text.length < 4 
                                            ? text 
                                            : `${text.slice(0,4)}\n${text.slice(4)}`
                                    }
                                }  
                            }
                        }
                    ]
                };
                $scope.title = data.VOaFlowstatStaffFlowInfo.fd_year + '年流程数统计'
                myChart.setOption(option)
                $scope.items_1 = itemsData;
                hide($ionicLoading);
                $scope.ngflag = false;
                nextFn();
            }
            // 计算占比
            function fnMathPoint(data,e){
                var totalNum = 0;
                var point = 0;
                for(let k=0;k<data.length;k++){
                    totalNum +=  parseInt(data[k].doc_count)
                }
                point = ((parseInt(data[e].doc_count)) / totalNum)*100;
                point = point.toFixed(2);
                return point
            }

            function fnEnd(){

            }

            function fnSearchOrd(){
                var listArr = []
                console.log(listArr)
              
                for(let j=0;j<10;j++){
                    listArr.push({
                        name: (year + j) + '年',
                        value:(year + j),
                        child:[]
                    })
                }
            
                for(let j=1;j<10;j++){
                    listArr.unshift({
                        name: (year - j) + '年',
                        value:(year - j),
                        child:[]
                    })
                }
                $scope.list =listArr
            }


            $scope.fnOk = function(){
                if($scope.selected1){
                    search = '&fd_year='+ $scope.selected1.value;
                    sessionStorage.setItem('yearStr',$scope.selected1.value)
                }
                else{
                    search = ''
                    $ionicPopup.alert({
                        title: '提示',
                        template: '请选择年份！'
                    });
                    return;
                }
                $scope.itemsFlag = true;
                console.log(search)
                fnInit();
                guanbi();
            }
            $scope.fnReset = function(){
                $scope.selected1 = "";
                $scope.selected2 = "";
                $scope.selected3 = "";        
            }

            $scope.fnGoNext = function (){
                $state.go("performanceStatisUnf", {
                }, {
                    reload: true
                });
            }
               
            /* 侧滑开关 */
            $scope.qiehuan = function(){
                $(".button-icon").toggleClass("kai");
                if($(".button-icon").hasClass("kai")){
                    huago();
                }else{
                    guanbi();
                }
            };
            $scope.guan = function(){
                guanbi();
                $(".button-icon").removeClass("kai");
            }

        }
    })
    .controller('performanceStatisUnfCtrl',function($scope,$ionicLoading,$timeout,$state,$ionicPopup,$ionicSlideBoxDelegate){
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            // $timeout(function () {
            //     hide($ionicLoading);
            //     hideCommon($ionicLoading);
            //     javascript:history.go(-1);
            // }, 300);
            MXWebui.closeWindow();
        }; 

        // var personRole = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
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
            var insIdStr = personRole.currentGroup.blngDeptCode;

            var size = 5;
            var page = 0;
            $scope.sort = '';
            $scope.sortIon = ''
            $scope.finite_state = false;
            $scope.items_2 = [];
            $scope.itemsFlag = true;
            var date = new Date;
            var year = date.getFullYear(); 
            var month = parseInt(date.getMonth() + 1);
            var qurter = 4;
            if(month >=1 && month<=3){
                qurter = 1
            }
            else if(month >=4 && month<=6){
                qurter = 2
            }
            else if(month >=7 && month<=9){
                qurter = 3
            }
            else{
                qurter = 4
            }
            var yearStr = year;
            var seasonStr = qurter;
            console.log(sessionStorage.getItem('seasonStr'))
            if(sessionStorage.getItem('seasonStr')){
                seasonStr = sessionStorage.getItem('seasonStr')
            }
            var monthStr = '';
            if(sessionStorage.getItem('monthStr')){
                monthStr = sessionStorage.getItem('monthStr')
            }
            var search = '&fd_year='+ year;
            var searchStr = sessionStorage.getItem('search');
            console.log(searchStr)
            if(searchStr){
                search = searchStr;
            }else{
                searchStr = search;
            }
            fnInit();

            // 开始获取函数
            function fnInit(){
                fnSearchOrd();
                // let urlStr = url.adm + '?type=01' + '&insId=' + insIdStr + '&userNum=' + userNumStr;
                let urlStr = url.adm_queryFlowstatNodeTimeAmount + '?person_code='+ personRole.loginName + search + '&sort=' + $scope.sort;
                fnAjaxJson('',urlStr,fnReplanyDataUnfished,'items_1',true,'dealt',fnUnfinishedDetil);   //效能流程统计
            }

            

            // 效能待办数统计（图表）
            function fnUnfinished(){
                let urlStr = url.adm_queryFlowstatNodeTimeAmount + '?person_code='+personRole.loginName + search + '&sort=' + $scope.sort;
                fnAjaxJson('',urlStr,fnReplanyDataUnfished,'items_1',true,'dealt',fnUnfinishedDetil);   //效能流程统计
            }

            function fnReplanyDataUnfished(data,itemName,hasCharts,chartId,nextFn){
            
                for(let q=0;q<data.VOaFlowstatNodeTimeInfoList.length;q++){
                    if(data.VOaFlowstatNodeTimeInfoList[q].module_name == ''){
                        data.VOaFlowstatNodeTimeInfoList[q].module_name = '未知'
                    }
                }
                fnPushDataUnfished(data,itemName,hasCharts,chartId,nextFn)
            }

            function fnPushDataUnfished(data,itemName,hasCharts,chartId,nextFn){
                
                var dataArr = [];
                var seriesData = [];
                for(let i=0;i<data.VOaFlowstatNodeTimeInfoList.length;i++){
                    dataArr.push(data.VOaFlowstatNodeTimeInfoList[i].module_name)
                    seriesData.push({
                            name:data.VOaFlowstatNodeTimeInfoList[i].module_name,
                            value:data.VOaFlowstatNodeTimeInfoList[i].doc_count
                    })                   
                }
                var myChart = echarts.init(document.getElementById(chartId));
                var option = {
                    legend: {
                        orient : 'horizontal',
                        x : 'center',
                        y : 'top',
                        data:dataArr
                    },
                    color:['#f8e182','#2ec7c9','#5ab1ef','#d87a80','#b6a2de','#67d388','#fdad3d','#ffb980'],
                    calculable : true,
                    animation:false,
                    series : [
                        {
                            name:'统计',
                            type:'pie',
                            radius : '50%',
                            center: ['50%', '55%'],
                            data:seriesData,
                            label:{
                                normal:{
                                    formatter(v) {
                                        let text = v.name
                                        return text.length < 4 
                                            ? text 
                                            : `${text.slice(0,4)}\n${text.slice(4)}`
                                    }
                                }  
                            }
                        }
                    ]
                };
                myChart.setOption(option)
                $scope.ngflag = false;
                hide($ionicLoading);
                nextFn();
            }

            // 待办流程——详情
            function fnUnfinishedDetil(){
                console.log(page)
                var searchs = '&fd_year=2016'
                let urlStr = url.adm_queryFlowstatNodeTimeList + '?person_code=' + personRole.loginName + search + '&page='+ page +'&size=' + size + '&sort=' + $scope.sort;
                fnAjaxJson('',urlStr,fnReplanyDataUnfishedDetil,'items_1',true,'dealt',fnEnd);   //效能流程统计
            }

            function fnReplanyDataUnfishedDetil(data,itemName,hasCharts,chartId,nextFn){
                console.log(data)
                for(let q=0;q<data.pageInfo.content.length;q++){
                    if(data.pageInfo.content[q].module_name == ''){
                        data.pageInfo.content[q].module_name = '未知'
                    }
                }
                fnPushDataUnfishedDetil(data,itemName,hasCharts,chartId,nextFn)
            }

            function fnPushDataUnfishedDetil(data,itemName,hasCharts,chartId,nextFn){
                if($scope.itemsFlag){
                    $scope.items_2 = [];
                }
                for(let i=0,len=data.pageInfo.content.length;i<len;i++){
                    var dataArr = {
                        name:data.pageInfo.content[i].module_name,
                        year:data.pageInfo.content[i].fd_year + '年',
                        season:'第' + data.pageInfo.content[i].fd_season + '季度',
                        month:data.pageInfo.content[i].fd_month + '月',
                        start:data.pageInfo.content[i].start_time,
                        end:data.pageInfo.content[i].end_time,
                        time:data.pageInfo.content[i].handle_hours + '小时'
                    }
                    $scope.$apply(function () {
                        $scope.items_2.push(dataArr);
                    });

                }

                console.log($scope.items_2)
                var title_mid = '';
                var fd_season = sessionStorage.getItem('seasonStr');
                var fd_month = sessionStorage.getItem('monthStr');
                if(fd_season){
                    title_mid = '第'+ fd_season +'季度'
                }
                else if(fd_month){
                    title_mid = fd_month +'月份'
                }
                $scope.title = data.VOaFlowstatNodeTimeInfo.fd_year + '年'+ title_mid +'效能待办统计';
                $scope.finite_state = data.pageInfo.hasNextPage;
                // $scope.$apply();
                // $scope.$broadcast('scroll.infiniteScrollComplete');
                // $scope.$broadcast('scroll.refreshComplete');
                $scope.ngflag = false;
                hide($ionicLoading);
                nextFn();
            }

            function fnEnd(){

            }


            $scope.fninit = function(){
                fnSearchOrd()
            }



            

            /* 侧滑开关 */
            $scope.qiehuan = function(){
                $(".button-icon").toggleClass("kai");
                if($(".button-icon").hasClass("kai")){
                    huago();
                }else{
                    guanbi();
                }
            };
            $scope.guan = function(){
                guanbi();
                $(".button-icon").removeClass("kai");
            }

            $scope.fnLoadMore = function(){
                page = page + 1;
                $scope.finite_state = false;
                $scope.itemsFlag = false;
                fnUnfinishedDetil();
            }

            //下拉刷新
            $scope.fnRefresh = function(){
                page = 0;
                $scope.itemsFlag = true;
                fnGetDataMore()
            }


            function fnSearchOrd(){
                var listArr = [
                    {
                        name:'按年查询',
                        value:'year',
                        child:[]
                    },
                    {
                        name:'按季查询',
                        value:'quter',
                        child:[]
                    },
                    {
                        name:'按月查询',
                        value:'month',
                        child:[]
                    }
                ]
                console.log(listArr)
                for(let i=0;i<3;i++){
                    for(let j=0;j<10;j++){
                        listArr[i].child.push({
                            name: (year + j) + '年',
                            value:(year + j),
                            child:[]
                        })
                    }
                }
                for(let i=0;i<3;i++){
                    for(let j=1;j<10;j++){
                        listArr[i].child.unshift({
                            name: (year - j) + '年',
                            value:(year - j),
                            child:[]
                        })
                    }
                }
                for(let j=0;j<listArr[2].child.length;j++){
                    for(let k=0;k<12;k++){
                        listArr[2].child[j].child.push({
                            name: (k + 1) + '月',
                            value:(k + 1),
                            child:[]
                        })
                    }
                }
                for(let j=0;j<listArr[1].child.length;j++){
                    for(let k=1;k<5;k++){
                        listArr[1].child[j].child.push({
                            name: '第' + k + '季度',
                            value:k,
                            child:[]
                        })
                    }
                }
            
                console.log(listArr)
                $scope.list =listArr
            }

            $scope.c = function () {
                if($scope.selected1.value == 'quter'){
                    $('#lv_3').html('季度') 
                 }
                 else{
                     $('#lv_3').html('月份') 
                 }  
                 $scope.selected2 = ""; 
                 $scope.selected3 = ""; 
            };

            $scope.c2 = function () { 
                $scope.selected3 = ""; 
                console.log($scope.selected1)     
            };
            $scope.c3 = function () {          
            };

            $scope.fnOk = function(){
                page = 0;
                if($scope.selected1){
                    if($scope.selected1.value == 'year'){
                        if($scope.selected2){
                            search = '&fd_year='+ $scope.selected2.value;
                            yearStr = $scope.selected2.value;
                            monthStr = '';
                            seasonStr = ''; 
                            sessionStorage.setItem('search',search);
                            sessionStorage.setItem('seasonStr',seasonStr)
                            sessionStorage.setItem('monthStr',monthStr)
                        }
                        else{
                            search = ''
                            $ionicPopup.alert({
                                title: '提示',
                                template: '请选择年份！'
                            });
                            return;
                        }
                    }
                    else if($scope.selected1.value == 'quter'){
                        if($scope.selected2){
                            if($scope.selected3){
                                search = '&fd_year='+ $scope.selected2.value +'&fd_season=' + $scope.selected3.value;
                                yearStr = $scope.selected2.value;
                                seasonStr = $scope.selected3.value;
                                monthStr = '';
                                sessionStorage.setItem('search',search)
                                sessionStorage.setItem('seasonStr',seasonStr)
                                sessionStorage.setItem('monthStr',monthStr)
                            }
                            else{
                                search = ''
                                $ionicPopup.alert({
                                    title: '提示',
                                    template: '请选择季度！'
                                });
                                return;
                            }
                        }
                        else{
                            search = ''
                            $ionicPopup.alert({
                                title: '提示',
                                template: '请选择年份！'
                            });
                            return;
                        }
                    }
                    else if($scope.selected1.value == 'month'){
                        if($scope.selected2){
                            if($scope.selected3){
                                search = '&fd_year='+ $scope.selected2.value +'&fd_month=' + $scope.selected3.value;
                                yearStr = $scope.selected2.value;
                                monthStr = $scope.selected3.value;
                                seasonStr = '';
                                sessionStorage.setItem('search',search);
                                sessionStorage.setItem('seasonStr',seasonStr)
                                sessionStorage.setItem('monthStr',monthStr)
                            }
                            else{
                                search = ''
                                $ionicPopup.alert({
                                    title: '提示',
                                    template: '请选择月份！'
                                });
                                return;
                            }
                        }
                        else{
                            search = ''
                            $ionicPopup.alert({
                                title: '提示',
                                template: '请选择年份！'
                            });
                            return;
                        }
                    }
                    else{
                        search = '';
                        $ionicPopup.alert({
                            title: '提示',
                            template: '请选择查询条件！'
                        });
                        return;
                    }
                }
                else{
                    search = ''
                    $ionicPopup.alert({
                        title: '提示',
                        template: '请选择查询条件！'
                    });
                    return;
                }
                $scope.itemsFlag = true;
                console.log(search)
                fnUnfinished();
                guanbi();
            }
            $scope.fnReset = function(){
                $scope.selected1 = "";
                $scope.selected2 = "";
                $scope.selected3 = "";        
            }
            $scope.fnGoNext = function (){
                $state.go("performanceStatis", {
                }, {
                    reload: true
                });
            }
            
            $scope.fnSort = function(){
                page = 0;
                if($scope.sort == 'asc'){
                    $scope.sort = 'desc';
                    $scope.sortIon = 'ion-android-arrow-down'
                }
                else{
                    $scope.sort = 'asc';
                    $scope.sortIon = 'ion-android-arrow-up'
                }
                $scope.itemsFlag = true;
                fnUnfinished();
            }
        }
    })