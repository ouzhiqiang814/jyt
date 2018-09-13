angular.module("employee.controller", [])
    .controller("employeeInfoList", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory,$stateParams) {       
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

            // 返回统计页面对应tab页面
            let typeKey = angular.fromJson(sessionStorage.getItem("statisticsVo"))
            console.log(typeKey)
            if(typeKey){
                let ads = {
                    typeKey : typeKey.typeKey
                }
                console.log(ads)
                var adss = angular.toJson(ads);
                sessionStorage.setItem('statisticsVoAds',adss);
            }

            // 清空统计类型
            let list = {
                typeKey : ''
            }
            var dels = angular.toJson(list);
            sessionStorage.setItem('statisticsVo',dels);
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

        var insIdStr = '';  //筛选条件-部门组织编号
        var elseKey = '';   //统计筛选条件
        var insCode = '';   //统计部分筛选编号
        // 获取员工列表
        $scope.items = [];
        var page = 0;
        var size = 5;
        $scope.finite_state = false;
        var delsArr = angular.fromJson(sessionStorage.getItem("statisticsVo"));
        console.log(delsArr)

        var orgBaseArr = [] //管辖结构树全局变量
        $scope.fnGetData = function (){
            
            //获取单位组织结构树
            let roleCodeStr = '';
            for(let i=0;i<person.groups.length;i++){
                for(let j=0;j<person.groups[i].roles.length;j++){
                    roleCodeStr += person.groups[i].roles[j].roleCode + ','
                }
            }
            roleCodeStr = roleCodeStr.substring(0,roleCodeStr.length-1);
            
            
            // 获取角色管辖部门
            let urlStr = url.adm_manageOrg + '?userNum=' + person.userNum;
            // let urlStr = url.adm_manageOrg + '?userNum=00001355';
            fnAjaxJson('',urlStr,fnManageOrg)
            
            if(delsArr == null || delsArr == undefined){
                elseKey =  '';
            }
            else{
                switch(delsArr.typeKey){
                    case 'org':
                        elseKey = '&org_code=';
                        break;
                    case 'age':
                        elseKey = '&age_range_code=';
                        break;
                    case 'sex':
                        elseKey = '&sex_code=';
                        break;
                    case 'education':
                        elseKey = '&Hgse_EdDgr_code=';
                        break;
                    case 'political':
                        elseKey = '&party_cd=';
                        break;
                    case 'working':
                        elseKey = '&wrk_year_range_code=';
                        break;
                    default:
                        elseKey =  '';
                        break;
                }
            }
            if(delsArr == null || delsArr == undefined){
                insCode =  person.currentGroup.blngDeptCode;
            }
            else if (delsArr.typeKey == 'org'){
                insCode = delsArr.tcode

            }
            else{
                insCode = delsArr.insIdStr;
            }
            fnGetDataMore()

        }
        
        function fnGetDataMore(){
            // insIdStr = person.currentGroup.blngDeptCode;
            if(elseKey == '' ){
               $scope.showBor = false;
                insIdStr = insCode;
                let urlStr = url.adm_userList + '?page='+ page + '&size=' + size  + '&org_code=' + insIdStr + '&user_num=' + person.userNum;
                // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + '&org_code=' + insIdStr;
                // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=00001400' + '&&org_code=' + insIdStr;
                console.log(urlStr)
                fnAjaxJson('',urlStr,fnVwData); 
            }
            else if(elseKey == '&org_code='){
                $scope.showBor = false;
                insIdStr = insCode; 
                let urlStr = url.adm_userList + '?page='+ page + '&size=' + size  + '&org_code=' + insIdStr + '&user_num=' + person.userNum;
                // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + '&org_code=' + insIdStr;
                // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=00001400' + '&&org_code=' + insIdStr;
                console.log(urlStr)
                fnAjaxJson('',urlStr,fnVwData); 
            }
            else{
                insIdStr = insCode
                $scope.showBor = false;
                let urlStr = url.adm_userList + '?page='+ page + '&size=' + size  + elseKey + delsArr.tcode + '&user_num=' + person.userNum + '&org_code=' + insIdStr;
                // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + elseKey + delsArr.tcode + '&org_code=' + insIdStr;
                // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=00001400' + elseKey + delsArr.tcode + '&&org_code=' + insIdStr;
                console.log(urlStr)
                fnAjaxJson('',urlStr,fnVwData); 
            }
        }

        function fnVwData(data){
            if($scope.itemsFlag){
                $scope.items = [];
            }
            // img/companycustomer/customer.png
            console.log(data)
            for(var i=0;i<data.pageInfo.content.length;i++){
                var postNameArr = data.pageInfo.content[i].pst_name.split('-');                
                var personList =  {
                        name:data.pageInfo.content[i].user_name,
                        department:data.pageInfo.content[i].dept_name,
                        postName:postNameArr[postNameArr.length - 1],
                        scr:fnImage(data.pageInfo.content[i].imageBase),
                        userNum : data.pageInfo.content[i].user_num
                    };

                $scope.$apply(function () {
                    $scope.items.push(personList);
                });
            }
            $scope.finite_state = data.pageInfo.hasNextPage;
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            hide($ionicLoading);           
        }

        // 判断头像
        function fnImage(date){
            let src = 'img/companycustomer/customerSmal.png'
            if(date){   
                return date
            }
            else{
                console.log(src)
                return src
            }
        }

        // 搜索查询
        // $scope.searchCont = {};//搜索内容
        // $scope.fnSearch = function(){
        //     $scope.itemsFlag = true;
        //     var keyWord = document.getElementById('search').value;
        //     page = 0;
        //     // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + '&name=' + keyWord;
        //     let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=00001400&user_name=' + keyWord;
        //     fnAjaxJson('',urlStr,fnVwData); 
        //     console.log(keyWord)
        // }
        // $scope.fnClearSearch = function(){
        //     $scope.searchCont = {};
        // }

        //上拉加载更多
        $scope.fnLoadMore = function(){
            page = page + 1;
            $scope.finite_state = false;
            $scope.itemsFlag = false;
            fnGetDataMore()
        }

        //下拉刷新
        $scope.fnRefresh = function(){
            page = 0;
            $scope.itemsFlag = true;
            fnGetDataMore()
        }

        //查看详情
        $scope.fnInfoDetil = function (el) {
            var dels = angular.toJson(el);
            console.log(dels)
            $state.go("employeeInfomation", {
                data:dels
            }, {
                reload: true
            });
        }
        
        /* 侧滑开关 */
        $scope.fnSearchEmployee = function(){
            $(".ion-ios-search").toggleClass("kai");
            if($(".ion-ios-search").hasClass("kai")){
                huago();
            }else{
                guanbi();
            }
        };

        //处理管辖机构数据组
        function fnManageOrg(ret){
            let arrCode = []
            if(ret){
                for(let i=0;i<ret.userTotalList.length;i++){
                    arrCode.push(ret.userTotalList[i].orgCode) 
                }
            }
            let arrCodeDate = []
            for(let j=0;j<arrCode.length;j++){
                if(arrCode.indexOf(arrCode[j]) == j){
                    arrCodeDate.push(arrCode[j])
                }
            }
            orgBaseArr = arrCodeDate;
            fnStep1(arrCodeDate)
        }

        
        // 处理管辖范围机构编号
        function fnStep1(msg){
            // let ret = ['02','0101','011001','0105']
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
            $scope.list = list
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
            $('#search').val('');          
        }

        $scope.fnOk = function(){
            console.log($scope.selected1)
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
            // insIdStr = orgCodeStr
            
            $scope.itemsFlag = true;
            var keyWord = document.getElementById('search').value;
            if(/^[a-zA-Z]*$/.test(keyWord)){
                console.log("字母");
                keyWord = keyWord.toLowerCase()

            }
            else if(/^[\u4e00-\u9fa5]*$/.test(keyWord)){
                console.log("汉字")
            }
            console.log(keyWord)
            page = 0;
            if(elseKey == '' || elseKey == '&org_code='){
                $scope.showBor = false;
                insIdStr = insCode;
                 let urlStr = url.adm_userList + '?page='+ page + '&size=' + size  + '&org_code=' + insIdStr + '&user_name=' + keyWord + '&user_num=' + person.userNum;
                 // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + '&org_code=' + insIdStr;
                 // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=00001400' + '&&org_code=' + insIdStr;
                 console.log(urlStr)
                 fnAjaxJson('',urlStr,fnVwData); 
             }
             else{
                 insIdStr = insCode;
                 $scope.showBor = false;
                 let urlStr = url.adm_userList + '?page='+ page + '&size=' + size  + elseKey + delsArr.tcode + '&user_num=' + person.userNum + '&user_name=' + keyWord + '&org_code=' + insIdStr;
                 // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + elseKey + delsArr.tcode + '&org_code=' + insIdStr;
                 // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=00001400' + elseKey + delsArr.tcode + '&&org_code=' + insIdStr;
                 console.log(urlStr)
                 fnAjaxJson('',urlStr,fnVwData); 
             }            
            // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + '&name=' + keyWord;
            // // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=' + person.userNum + '&name=' + keyWord + '&org_code=' + insIdStr;
            // // let urlStr = url.adm_userList + '?page='+ page + '&size=' + size + '&user_num=00001400&user_name=' + keyWord + '&&org_code=' + insIdStr;
            // fnAjaxJson('',urlStr,fnVwData); 

            guanbi();
        }        


    })
    .controller("employeeInfomationCtrl", function ($scope, $state, $stateParams, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory) {
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        };

        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var psn = angular.fromJson($stateParams.data);

        function fnconsole(msg){
            console.log(msg)
        }

        var list = {
            userNum : psn.userNum,
            loginName: psn.loginName
            
        }
        // AjaxJsonp(SysServiceDataDtl('PORTAL', 'findSysUserDtl', [jsonToXml(list)]), url.potal_potal, fnconsole);
        // fnconsole(SysServiceDataDtl('PORTAL', 'findSysUserDtl', [jsonToXml(list)]))



        // 初始化页面时获取数据
        $scope.fnInitGetData = function(){
            show($ionicLoading)
            var data = {
                "user_num" : psn.userNum
                // "user_num" : '00000102'
            }
            console.log(psn)
            // var url = '/adm/api/queryUserInfoDetail?user_num=00000092'
            var url = '/adm/api/queryUserInfoDetail?user_num='+psn.userNum
            console.log(url)
            fnAjaxJson ('',url,fnPushData,'','','','')
        }

        function fnJudgeEmpty(msg){
            var alertMsg = ''
            if(msg == ''){
                alertMsg = '-'; 
            }
            else{
                alertMsg = msg;
            }
            return alertMsg;
        }

        function fnPushData(ret){
           console.log(ret)
           hide($ionicLoading)
            if(fnIsEmptyObj(ret)){
                //基础信息
                fnGetBaseInfo(ret);
                //学历学位
                fnGetEducationaInfo(ret);
                //工作经历
                fnGetWorkInfo(ret);
                //职称信息
                fnGetProfessionalInfo(ret);
                //从业资格
                fnGetRequirementInfo(ret);
                //家庭情况
                fnGetFamilyInfo(ret);
                //语言能力
                fnGetLanguageInfo(ret);
                //政治面貌
                fnGetPoliticalInfo(ret);
                //联系方式
                fnGetRelationInfo(ret);  
            }
            else{
                $scope.baseInfo = [];
                $scope.eduInfo = [];
                $scope.worknfo = [];
                $scope.proInfo = [];
                $scope.requInfo = [];
                $scope.famInfo = [];
                $scope.lanInfo = [];
                $scope.poliInfo = [];
                $scope.relBaseInfo = [];
                $scope.relSecInfo = [];
            }
          
        }



        function fnGetBaseInfo(data){
                var pst_nameArr = data.userInfoDetail.pst_name.split('-') 
                $scope.baseInfo = [
                    {
                        title: '机构名称',
                        base: fnJudgeEmpty(data.userInfoDetail.org_name),
                        class: 'ow-span-four',
                        top:true
                    },
                    {
                        title: '姓名',
                        base: fnJudgeEmpty(data.userInfoDetail.user_name),
                        class: 'ow-span-two'
                    },
                    {
                        title: '部门名称',
                        base: fnJudgeEmpty(data.userInfoDetail.dept_name),
                        class: 'ow-span-four'
                    },
                    {
                        title: '岗位名称',
                        base: fnJudgeEmpty(pst_nameArr[pst_nameArr.length - 1]),
                        class: 'ow-span-four'
                    },
                    {
                        title: '国别',
                        base: fnJudgeEmpty(data.userInfoDetail.country),
                        class: 'ow-span-two'
                    },
                    {
                        title: '民族',
                        base: fnJudgeEmpty(data.userInfoDetail.nation),
                        class: 'ow-span-two'
                    },
                    {
                        title: '证件类型',
                        base: '身份证',
                        class: 'ow-span-four'
                    },
                    {
                        title: '证件号码',
                        base: fnJudgeEmpty(data.userInfoDetail.iDCard_No),
                        class: 'ow-span-four'
                    },
                    {
                        title: '入司时间',
                        base:  fnJudgeEmpty(data.userInfoDetail.enter_dep_date),
                        class: 'ow-span-four'
                    },
                    {
                        title: '参加工作时间',
                        base: fnJudgeEmpty(data.userInfoDetail.wrk_date),
                        class: ''
                    },
                    {
                        title: '出生日期',
                        base: fnJudgeEmpty(data.userInfoDetail.birth_date),
                        class: 'ow-span-four'
                    },
                    {
                        title: '最高学历',
                        base: fnJudgeEmpty(data.userInfoDetail.hgst_EdDgr),
                        class: 'ow-span-four'
                    },
                    {
                        title: '婚姻状况',
                        base: fnJudgeEmpty(data.userInfoDetail.mar_Sttn),
                        class: 'ow-span-four'
                    },
                    {
                        title: '生育状况',
                        base: fnJudgeEmpty(data.userInfoDetail.bear_Sttn),
                        class: 'ow-span-four'
                    },
                    {
                        title: '户口性质',
                        base: fnJudgeEmpty(data.userInfoDetail.registered_Type),
                        class: 'ow-span-four'
                    },
                    {
                        title: '户口所在地',
                        base: fnJudgeEmpty(data.userInfoDetail.dmclPlc),
                        class: 'ow-span-four'
                    },
                    {
                        title: '户口所在地（描述）',
                        base: fnJudgeEmpty(data.userInfoDetail.dmclPlc_Dsc),
                        class: 'ow-span-four'
                    },
                    {
                        title: '籍贯',
                        base: fnJudgeEmpty(data.userInfoDetail.ntvPlc),
                        class: 'ow-span-two'
                    },
                    {
                        title: '籍贯（描述）',
                        base: fnJudgeEmpty(data.userInfoDetail.ntvPlc_Dsc),
                        class: 'ow-span-four',
                        bottom:true
                    }
                ]
        }
         
        function fnGetEducationaInfo (data) {
            // for循环执行学历经历
            var eduInfoArr = [];
            for(var q=0;q<data.userInfoDetail.userDegreeInfoList.length;q++){
                eduInfoArr.push({
                    dels : [
                        {
                            title:'入学时间',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].etr_Tm),
                            class: 'ow-span-four',
                            top:true
                        },
                        {
                            title:'毕业时间',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].grdt_Tm),
                            class: 'ow-span-four'
                        },
                        {
                            title:'毕业学校',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].grdt_Sch),
                            class: 'ow-span-four',                            
                        },                       
                        {
                            title:'所学专业',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].mjr),
                            class: 'ow-span-four'
                        },
                        {
                            title:'学历',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].edDgr),
                            class: 'ow-span-two'
                        },
                        {
                            title:'学位',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].dgr),
                            class: 'ow-span-two'
                        },
                        {
                            title:'学位名称',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].dgr_Nm),
                            class: 'ow-span-four'
                        },
                        {
                            title:'学历性质',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].edDgr_Char),
                            class: 'ow-span-four',
                            
                        },
                        {
                            title:'学习形式',
                            info: fnJudgeEmpty(data.userInfoDetail.userDegreeInfoList[q].stdy_Form),
                            class: 'ow-span-four',
                            bottom:true
                        }    
                    ]
                })
            }

            $scope.eduInfo = eduInfoArr;           
        }


        function fnGetWorkInfo (data) {
            // for循环执行学历经历
            var worknfoArr = [];
            for(var w=0;w<data.userInfoDetail.userWorkInfoList.length;w++){
                worknfoArr.push({
                    dels : [
                        {
                            title:'所在单位',
                            info: fnJudgeEmpty(data.userInfoDetail.userWorkInfoList[w].wbt_Unit),
                            class: 'ow-span-four',
                            code: true,
                            top:true
                        },
                        {
                            title:'起始时间',
                            info: fnJudgeEmpty(data.userInfoDetail.userWorkInfoList[w].start_date),
                            class: 'ow-span-four',
                            code: true
                        },
                        {
                            title:'终止时间',
                            info: fnJudgeEmpty(data.userInfoDetail.userWorkInfoList[w].end_date),
                            class: 'ow-span-four',
                            code: true
                        },
                        {
                            title:'所在部门',
                            info: fnJudgeEmpty(data.userInfoDetail.userWorkInfoList[w].wbt_Dept),
                            class: 'ow-span-four',
                            code: true
                        },
                        {
                            title:'职位',
                            info: fnJudgeEmpty(data.userInfoDetail.userWorkInfoList[w].post),
                            class: 'ow-span-two',
                            code: true
                        },
                        {
                            title:'任职业绩',
                            info: fnJudgeEmpty(data.userInfoDetail.userWorkInfoList[w].holdPos_Prd_Dtl_Perf),
                            class: 'ow-span-four',
                            code: false,
                            codes:true,
                            bottom:true
                        }
                    ]
                })
            }

            $scope.worknfo = worknfoArr;           
        }

        function fnGetProfessionalInfo (data) {
            //for循环
            var proInfoArr = [];
            for(var k=0;k<data.userInfoDetail.userQualifiInfoList.length;k++){
                proInfoArr.push({
                    dels : [
                        {
                            title: '专业技术资格分类',
                            info: fnJudgeEmpty(data.userInfoDetail.userQualifiInfoList[k].profSkll_Qua_CL),
                            class:'ow-span-long-eight',
                            top:true
                        },
                        {
                            title: '专业技术资格名称',
                            info: fnJudgeEmpty(data.userInfoDetail.userQualifiInfoList[k].profSkll_Qua_Nm),
                            class:'ow-span-long-eight'
                        },
                        {
                            title: '职称等级',
                            info: fnJudgeEmpty(data.userInfoDetail.userQualifiInfoList[k].ttl_Grd),
                            class:'ow-span-long-four'
                        },
                        {
                            title: '取得资格时间',
                            info: fnJudgeEmpty(data.userInfoDetail.userQualifiInfoList[k].obtn_Qua_Tm),
                            class:'ow-span-long-six'
                        },
                        {
                            title: '取得资格途径',
                            info: fnJudgeEmpty(data.userInfoDetail.userQualifiInfoList[k].obtn_Qua_Way),
                            class:'ow-span-long-six'
                        },
                        {
                            title: '资格审批单位',
                            info: fnJudgeEmpty(data.userInfoDetail.userQualifiInfoList[k].qua_AprvForm_Bit),
                            class:'ow-span-long-six',
                            bottom:true
                        }
                    ] 
                })
            }
            $scope.proInfo = proInfoArr;
        }
        
        function fnGetRequirementInfo (data) {
            //for循环
            var requInfo = [];
            for(var r=0;r<data.userInfoDetail.userOccuInfoList.length;r++){
                requInfo.push({
                    dels : [
                        {
                            title: '职业资格名称',
                            info: fnJudgeEmpty(data.userInfoDetail.userOccuInfoList[r].ocp_Qua_Nm),
                            class:'',
                            top:true
                        },
                        {
                            title: '资格类别',
                            info: fnJudgeEmpty(data.userInfoDetail.userOccuInfoList[r].qua_Cgy),
                            class:'ow-span-four'
                        },
                        {
                            title: '获得时间',
                            info: fnJudgeEmpty(data.userInfoDetail.userOccuInfoList[r].obtn_Tm),
                            class:'ow-span-four'
                        },
                        {
                            title: '颁发机构',
                            info: fnJudgeEmpty(data.userInfoDetail.userOccuInfoList[r].authority_Inst),
                            class:'ow-span-four',
                            bottom:true
                        }
                    ] 
                })
            } 

            $scope.requInfo = requInfo; 
        }

        function fnGetFamilyInfo (data) {
            //for循环
            var famInfoArr =[];
            for(var h=0;h<data.userInfoDetail.userFamilyInfoList.length;h++){
                famInfoArr.push({
                    dels : [
                        {
                            title: '成员姓名',
                            info: fnJudgeEmpty(data.userInfoDetail.userFamilyInfoList[h].mbr_Nm),
                            class:'ow-span-four',
                            top:true
                        },
                        {
                            title: '与本人关系',
                            info: fnJudgeEmpty(data.userInfoDetail.userFamilyInfoList[h].with_Myslf_Rel),
                            class:''
                        },
                        {
                            title: '工作单位及职务',
                            info: fnJudgeEmpty(data.userInfoDetail.userFamilyInfoList[h].wrk_Unit_And_Post),
                            class:'ow-span-four',
                            bottom:true
                        }
                    ] 
                }) 
            }

            $scope.famInfo = famInfoArr;
        } 
        
        function fnGetLanguageInfo (data) {
            //for循环
            var lanInfoArr = [];
            for(var u=0;u<data.userInfoDetail.userLanguageInfoList.length;u++){
                lanInfoArr.push({
                    dels : [
                        {
                            title: '语种',
                            info: fnJudgeEmpty(data.userInfoDetail.userLanguageInfoList[u].lng),
                            class:'ow-span-two',
                            top:true
                        },
                        {
                            title: '证书名称',
                            info: fnJudgeEmpty(data.userInfoDetail.userLanguageInfoList[u].ctf_Nm),
                            class:'ow-span-four'
                        },
                        {
                            title: '获证日期',
                            info: fnJudgeEmpty(data.userInfoDetail.userLanguageInfoList[u].otn_Ctf_Dt),
                            class:'ow-span-four'
                        },
                        {
                            title: '语种熟练程度',
                            info: fnJudgeEmpty(data.userInfoDetail.userLanguageInfoList[u].lng_Dgr),
                            class:'',
                            bottom:true
                        }
                    ] 
                })
            }

            $scope.lanInfo = lanInfoArr;
        }

        function fnGetPoliticalInfo (data) {
            //for循环
            var poliInfoArr = []
            for(var t=0;t<data.userInfoDetail.userPartyInfoList.length;t++){
                poliInfoArr.push({
                    dels : [
                        {
                            title: '政治面貌',
                            info: fnJudgeEmpty(data.userInfoDetail.userPartyInfoList[t].pltclParty),
                            class:'ow-span-four',
                            top:true
                        },
                        {
                            title: '参加党派时间',
                            info: fnJudgeEmpty(data.userInfoDetail.userPartyInfoList[t].pcp_Prts_Dt),
                            class:''
                        },
                        {
                            title: '参加党派时所在单位',
                            info: fnJudgeEmpty(data.userInfoDetail.userPartyInfoList[t].pcp_Prts_Hr_Wbt_Unit),
                            class:''
                        },
                        {
                            title: '党组关系所在单位',
                            info: fnJudgeEmpty(data.userInfoDetail.userPartyInfoList[t].pty_Grp_Rel_Wbt_Unit),
                            class:'',
                            bottom:true
                        }
                    ] 
                })
            }

            $scope.poliInfo = poliInfoArr;
        }

        function fnGetRelationInfo (data) {
                $scope.relBaseInfo = [
                    {
                        title:'移动电话',
                        info:fnJudgeEmpty(data.userInfoDetail.mobile),
                        top:true
                    },
                    {
                        title:'办公室电话',
                        info:fnJudgeEmpty(data.userInfoDetail.wrk_Tel)
                    },
                    {
                        title:'个人邮箱',
                        info:fnJudgeEmpty(data.userInfoDetail.personal_Email)
                    },
                    {
                        title:'公司邮箱',
                        info:fnJudgeEmpty(data.userInfoDetail.comp_Email)
                    },
                    {
                        title:'联系地址',
                        info:fnJudgeEmpty(data.userInfoDetail.ctc_Adr),
                        bottom:true
                    }
                ],
                $scope.relSecInfo = [
                    {
                        title:'紧急联系人',
                        info:fnJudgeEmpty(data.userInfoDetail.emgr_CtcPsn),
                        top:true
                    },
                    {
                        title:'联系电话',
                        info:fnJudgeEmpty(data.userInfoDetail.emgr_CtcPsn_Tel)
                    },
                    {
                        title:'与本人关系',
                        info:fnJudgeEmpty(data.userInfoDetail.with_user_Rel),
                        bottom:true
                    }
                ]       
        }

        // 判断数据是否为空
        function fnIsEmptyObj(obj){
            for(let key in obj){
                return true;
            }
            return false;
        }
       
    });