/**
 * Created by wjf on 2017/5/25.
 */
angular.module('clue.controller', ['clue.service'])
    .controller('ClueCtrl', function ($scope, $state, $http, $timeout, $ionicLoading, $ionicSideMenuDelegate, $stateParams, $ionicHistory) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var sales = angular.fromJson($stateParams.data);
        $scope.sales = sales;

        if (sales == 1) {
            //初始化线索价值
            TypeValueList('0063', function (msg) {
                $scope.clueValCdData = msg;
                $scope.$apply();
            });

            //初始化线索状态
            TypeValueList('0064', function (msg) {
                $scope.clueStCdData = msg;
                $scope.$apply();
            });

            $scope.search1 = '线索标题';
            $scope.search2 = '管理机构';
            $scope.til1 = '线索标题';
            $scope.til2 = '管理人员';
            $scope.til3 = '管理机构';
            $scope.til4 = '线索状态';
            $scope.til5 = '创建时间';
            $scope.title = '线索查询';
        }
        if (sales == 2) {
            //紧急程度
            TypeValueList('0063', function (msg) {
                $scope.emgcyCdData = msg;
                $scope.$apply();
            });

            //机会类型
            TypeValueList('0065', function (msg) {
                $scope.bizOptTpCdData = msg;
                $scope.$apply();
            });

            //机会状态
            TypeValueList('0066', function (msg) {
                $scope.bizOptStCdData = msg;
                $scope.$apply();
            });

            $scope.search1 = '机会标题';
            $scope.search2 = '管理机构';
            $scope.til1 = '机会标题';
            $scope.til2 = '管理人员';
            $scope.til3 = '管理机构';
            $scope.til4 = '机会状态';
            $scope.til5 = '创建时间';
            $scope.title = '机会查询';
        }
        if (sales == 3) {
            //项目类型
            TypeValueList('0065', function (msg) {
                $scope.projTpCdData = msg;
                $scope.$apply();
            });

            //项目状态
            TypeValueList('0068', function (msg) {
                $scope.projStCdData = msg;
                $scope.$apply();
            });

            //紧急程度
            TypeValueList('0063', function (msg) {
                $scope.emgcyCdData = msg;
                $scope.$apply();
            });

            $scope.search1 = '项目名称';
            $scope.search2 = '管理机构';
            $scope.til1 = '项目名称';
            $scope.til2 = '项目经理';
            $scope.til3 = '管理机构';
            $scope.til4 = '项目状态';
            $scope.til5 = '创建时间';
            $scope.title = '项目查询';
        }


        $scope.show_list = function () {
            $ionicSideMenuDelegate.toggleRight();
        };

        $scope.show_info = function (item, id) {
            /*   if (id == 1) {
             var historyData = {
             clueId: approveItem.businessKey,
             clueType: 10
             };
             sessionStorage.setItem("historyData", angular.toJson(historyData));
             }*/
            var cooItemAuthInfList = {};
            cooItemAuthInfList["id"] = id;
            item = $.extend(item, cooItemAuthInfList, true);
            var sales = angular.toJson(item);

            sessionStorage.setItem("ClueInfoCtrl.item", sales);

            $state.go("clueInfo", {}, {
                reload: true
            });
        }

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            javascript:history.go(-1);
        }

        $scope.xiangmu = [];

        /*$scope.show_ok = function () {
         show($ionicLoading);
         $scope.xiangmu = [];
         $ionicSideMenuDelegate.toggleRight();
         $scope.indexdata();
         }*/

        $scope.func_reset = function () {
            if (sales == 1) {
                document.getElementById("clueTitle").value = "";
                document.getElementById("clueNum").value = "";
                document.getElementById("clueValCd").value = "";
                document.getElementById("clueStCd").value = "";
            }
            if(sales == 2){
                document.getElementById("bizOptTitle").value = "";
                document.getElementById("bizOptNum").value = "";
                document.getElementById("emgcyCd").value = "";
                document.getElementById("bizOptTpCd").value = "";
                document.getElementById("bizOptStCd").value = "";
                document.getElementById("crtTm21").value = "";
                document.getElementById("crtTm22").value = ""
            }
            if(sales == 3){
                document.getElementById("projNm").value = "";
                document.getElementById("projNum").value = "";
                document.getElementById("projTpCd").value = "";
                document.getElementById("projStCd").value = "";
                document.getElementById("emgcyCd").value = "";
                document.getElementById("crtTm1").value = "";
                document.getElementById("crtTm2").value = ""
            }

        };

        $scope.func_ok = function () {
            $scope.xiangmu = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };

        show($ionicLoading);

        /* 侧滑开关 */
        $scope.qiehuan = function () {
            $(".ion-ios-search").toggleClass("kai");
            if ($(".ion-ios-search").hasClass("kai")) {
                huago();
            } else {
                guanbi();
            }
        };
        $scope.guan = function () {
            guanbi();
            $(".ion-ios-search").removeClass("kai");
        }


        $scope.num = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.indexdata = function (obj) {
            if (obj) {
                $scope.itemsFlag = true;
            } else {
                $scope.itemsFlag = false;
            }

        /*    var roles = person.currentGroup.roles;
            $scope.str = [];
            for (var i = 0; i < roles.length; i++) {
                $scope.str.push(roles[i].roleCode);
            }*/

            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngDeptCode: person.currentGroup.blngDeptCode,
                    manageOrgCode: person.currentGroup.manageOrgCode,
                    roles: person.currentGroup.roles
                }
            }
            if (sales == 1) {
                var findColueListVo = {
                    clueTitle: $('#clueTitle').val(),
                    clueNum: $('#clueNum').val(),
                    crtInsId: '',
                    crtInsNm: '',
                    crtEmpId: '',
                    crtEmpNm: '',
                    clueValCd: $('#clueValCd').val(),
                    clueStCd: $('#clueStCd').val(),
                    qryFlamInd: '',
                }
                console.log(SysServiceData('CPC', 'findColueList', [$scope.num, $scope.size, jsonToXml(findColueListVo), jsonToXml(sysUserVo)]));
                AjaxJsonp(SysServiceData('CPC', 'findColueList', [$scope.num, $scope.size, jsonToXml(findColueListVo), jsonToXml(sysUserVo)]), url.cpc, $scope.success);
            }
            if (sales == 2) {
                var doGetColBizOptListVo = {
                    qryFlamInd: '',
                    bizOptTitle: $('#bizOptTitle').val(),
                    bizOptID: '',
                    bizOptNum: $('#bizOptNum').val(),
                    emgcyCd: $('#emgcyCd').val(),
                    bizOptTpCd: $('#bizOptTpCd').val(),
                    mgmtInsID: '',
                    mgmtInsNm: '',
                    mgmtEmpID: '',
                    mgmtEmpNm: '',
                    bizOptStCd: $('#bizOptStCd').val(),
                    crtTm1: $('#crtTm21').val(),
                    crtTm2: $('#crtTm22').val(),
                }
                AjaxJsonp(SysServiceData('CPC', 'doGetColBizOptList', [$scope.num, $scope.size, jsonToXml(doGetColBizOptListVo), jsonToXml(sysUserVo)]), url.cpc, $scope.success);
            }
            if (sales == 3) {
                var doGetProjListVo = {
                    qryFlamInd: '',
                    projNm: $('#projNm').val(),
                    projId: '',
                    projNum: $('#projNum').val(),
                    projTpCd: $('#projTpCd').val(),
                    projStCd: $('#projStCd').val(),
                    mgmtInsId: '',
                    mgmtInsNm: '',
                    mgmtEmpId: '',
                    mgmtEmpNm: '',
                    emgcyCd: $('#emgcyCd').val(),
                    crtTm1: $('#crtTm1').val(),
                    crtTm2: $('#crtTm2').val(),
                }
                AjaxJsonp(SysServiceData('CPC', 'doGetProjList', [$scope.num, $scope.size, jsonToXml(doGetProjListVo), jsonToXml(sysUserVo)]), url.cpc, $scope.success);
            }
        }

        $scope.success = function (msg) {
            console.log(msg);
            if ($scope.itemsFlag) {
                $scope.xiangmu = [];
            }

            setTimeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);

            if (sales == 1) {
                /*var cooItemAuthInfList = {};
                 cooItemAuthInfList["id"] = 1;
                 msg.content = $.extend(msg.content, cooItemAuthInfList, true);*/

                $scope.xiangmu.push.apply($scope.xiangmu, msg.content);
                $scope.$apply();

            }
            if (sales == 2) {

                $scope.xiangmu.push.apply($scope.xiangmu, msg.content);
                $scope.$apply();
            }
            if (sales == 3) {

                /* var cooItemAuthInfList = {};
                 cooItemAuthInfList["id"] = 3;
                 msg.content = $.extend(msg.content, cooItemAuthInfList, true);*/
                $scope.xiangmu.push.apply($scope.xiangmu, msg.content);
                $scope.$apply();
            }

            if ($scope.xiangmu.length == 0) {
                $scope.dataFlag = false;
            }

            hide($ionicLoading);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.indexdata();

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.num = 0;
            $scope.indexdata(true);
        }

        /**
         * 上拉加载更多
         */
        $scope.loadMore = function (obj) {
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }

    })


    .controller('ClueInfoCtrl', function ($scope, $http, $state, $stateParams, $ionicSideMenuDelegate, $location, $ionicLoading) {
        var item = angular.fromJson(sessionStorage.getItem("ClueInfoCtrl.item"));
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));

        var sales = item.id;

        $scope.id = item.id;
        console.log(sales);

        /*数据*/
        $scope.type = sales;
        $scope.title = '详情页';
        $scope.last = 0;
        if (sales == 1) {
            $scope.tab2 = '线索';
            $scope.search1 = '线索标题';
            $scope.search2 = '管理机构';
        }
        if (sales == 2) {
            $scope.tab2 = '机会';
            $scope.search1 = '机会标题';
            $scope.search2 = '管理机构';
        }
        if (sales == 3) {
            $scope.tab2 = '项目';
            $scope.search1 = '项目名称';
            $scope.search2 = '管理机构';
        }

        $scope.itemList = [{
            id: 0,
            name: '概况',
            class: 'action',
        }, {
            id: 1,
            name: $scope.tab2 + '信息',
            class: '',
        }, {
            id: 2,
            name: '已完成工作',
            class: '',
        }];

        /*概况信息列表*/
        $scope.surveyList = [];

        $scope.tableInfo = [];

        $scope.infor_one = [{
            id: '0',
            title: '基本信息',
            state_img: 'img/clue/more.png',
            state: true
        }]

        $scope.infor_two = [{
            id: '1',
            title: '协同方信息',
            state_img: 'img/clue/more.png',
            state: true
        }]

        $scope.infor_thr = [{
            id: '2',
            title: '资料附件信息',
            state_img: 'img/clue/more.png',
            state: true
        }]

        $scope.infor_for = [{
            id: '3',
            title: '已完成工作',
            state_img: 'img/clue/more.png',
            state: true
        }]

        /*基本信息模块*/
        /*线索*/
        $scope.infor_one_info = [];

        /*机会*/
        $scope.infor_two_info = [];

        /*项目*/
        $scope.infor_thr_info = [];

        /*协同方*/
        $scope.infor_coor_info = [];

        /*资料附件*/
        $scope.infor_data_info = [];

        /*资料附件*/
        $scope.infor_work_info = [];

        /*方法*/

        show($ionicLoading);


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            javascript:history.go(-1);
        }

        $scope.show_survey = function (e, flag) {
            if (flag) {
                $(e.target).parents(".card").find(".biao").toggleClass("close");
                $(e.target).parents(".card").find(".list").slideToggle(200);
                $(e.target).parents(".card").siblings(".card").find(".list").hide(200);
                $(e.target).parents(".card").siblings(".card").find(".biao").removeClass("close");
            }
        };


        //协同审批历史查询
        $scope.queryHistoryInfo = function () {
            var getcolprocinfVo;
            if (sales == 1) {
                getcolprocinfVo = {
                    clueId: item.clueId,
                    clueType: 10
                };
            } else if (sales == 2) {
                getcolprocinfVo = {
                    bizOptId: item.bizOptID,
                    bizOptType: '20',
                    prjTpCd: item.bizOptTpCd,
                };
            } else if (sales == 3) {

                var getcolprocinfVo = {
                    bizOptId: item.bizOptId,
                    bizOptType: '20',
                    projId: item.projId,
                    projType: '30',
                    prjTpCd: item.projTpCd,
                    //    processInstanceId:item.processInstanceId
                };
            }

            AjaxJsonp(SysServiceData('CPC', 'doGetColProcInf', [jsonToXml(getcolprocinfVo)]), url.cpc, function (ret) {
                $scope.queryHistoryInfoDate = ret.data;
                console.log(ret.data);
                $scope.$apply();
            });
            //  var msg = {"data":[{"aprvList":[],"bsnEtyId":11032,"bsnEtyType":"10","endTm":"2017-09-07","prcDsc":"新建线索","prcSort":1,"procId":18,"processInstanceId":"240002","processTm":0,"stTm":"2017-09-07"},{"aprvList":[{"actLinkId":"CLM_APPLY_1","aprvDeptId":"015602","aprvEmpId":"00000033","aprvEmpNm":"王颖希","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvOpns":"1111","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12623,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-07 09:22","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11032,"bsnEtyType":"10","processInstanceId":"240002","procsNum":"100","taskId":"240011","tmPrd":"        0.0"}],"bsnEtyId":11032,"bsnEtyType":"10","endTm":"2017-09-07","prcDsc":"线索审批","prcSort":2,"procId":19,"processInstanceId":"240002","processTm":0,"rmrk1":"2","stTm":"2017-09-07"},{"aprvList":[{"actLinkId":"ACT_1","aprvDeptId":"015602","aprvEmpId":"00000707","aprvEmpNm":"丁亮","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvRoleId":"J000000001","aprvSn":12624,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:05","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"240025","tmPrd":"      361.7"}],"bsnEtyId":11013,"bsnEtyType":"20","endTm":"2017-09-22","prcDsc":"新建机会","prcSort":11,"procId":20,"processInstanceId":"240015","processTm":0,"stTm":"2017-09-22"},{"aprvList":[{"actLinkId":"ACT_2","aprvDeptId":"015602","aprvEmpId":"00000033","aprvEmpNm":"王颖希","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvOpns":"111","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12912,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:05","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"245656","tmPrd":"        0.0"},{"actLinkId":"ACT_3","aprvDeptId":"012005","aprvEmpId":"00001049","aprvEmpNm":"郑懋阳","aprvInsId":"0120","aprvInsNm":"担保-业务一部","aprvOpns":"111","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12913,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:06","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"245673","tmPrd":"        0.0"},{"actLinkId":"ACT_4","aprvDeptId":"015602","aprvEmpId":"00000707","aprvEmpNm":"丁亮","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12914,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:06","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"245679","tmPrd":"        0.0"}],"bsnEtyId":11013,"bsnEtyType":"20","endTm":"2017-09-22","prcDsc":"机会认定","prcSort":12,"procId":21,"processInstanceId":"240015","processTm":0,"stTm":"2017-09-22"},{"aprvList":[{"actLinkId":"ACT_2","aprvDeptId":"012005","aprvEmpId":"00001049","aprvEmpNm":"郑懋阳","aprvInsId":"0120","aprvInsNm":"担保-业务一部","aprvSn":12916,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:08","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":10152,"bsnEtyType":"30","processInstanceId":"245685","procsNum":"100","taskId":"245703","tmPrd":"        0.0"},{"actLinkId":"ACT_3","aprvDeptId":"015602","aprvEmpId":"00000707","aprvEmpNm":"丁亮","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvSn":12918,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:10","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":10152,"bsnEtyType":"30","processInstanceId":"245685","procsNum":"100","taskId":"245709","tmPrd":"        0.0"}],"bsnEtyId":10152,"bsnEtyType":"30","endTm":"2017-09-22","prcDsc":"项目立项","prcSort":21,"procId":22,"processInstanceId":"245685","processTm":0,"stTm":"2017-09-22"},{"aprvList":[],"bsnEtyType":"30","prcDsc":"项目审批","prcSort":22,"procId":23,"processTm":0},{"aprvList":[],"bsnEtyId":10152,"bsnEtyType":"30","prcDsc":"合同签署","prcSort":23,"procId":24,"processInstanceId":"245685","processTm":0,"stTm":"2017-09-22"},{"aprvList":[],"bsnEtyType":"30","prcDsc":"结束","prcSort":100,"procId":25,"processTm":0}],"status":200};  $scope.queryHistoryInfoDate = msg.data;
        }
        $scope.queryHistoryInfo();


        //基本信息查询
        $scope.getCluebscInfSuccess = function (msg) {
            hide($ionicLoading);
            $scope.baseData = msg.clueVO;
            $scope.$apply();
        }
        if (sales == 1) {
            var getCluebscInfVo = {
                clueId: item.clueId
            }

            AjaxJsonp(SysServiceData('CPC', 'getCluebscInf', [jsonToXml(getCluebscInfVo)]), url.cpc, $scope.getCluebscInfSuccess);
        } else if (sales == 2) {
            //基本信息查询
            $scope.getcolbizoptbscinfSuccess = function (msg) {
                hide($ionicLoading);
                $scope.baseData = msg.data;
                $scope.$apply();
                /*  //查询名单信息
                 var queryCstAhnInfoVo = {
                 bizOptID:$scope.baseData.bizOptID,
                 bizOptTpCd:$scope.baseData.bizOptTpCd
                 }

                 //接口参数  bizOptID:$scope.baseData.bizOptID   bizOptTpCd:$scope.baseData.bizOptTpCd
                 AjaxJsonp(SysServiceData('CPC', 'queryCstAhnInfo', [jsonToXml(queryCstAhnInfoVo)]), url.cpc, $scope.queryCstAhnInfoSuccess);*/
            }

            AjaxJsonp(SysServiceData('CPC', 'doGetColBizOptBscInf', [item.bizOptID]), url.cpc, $scope.getcolbizoptbscinfSuccess);
        } else if (sales == 3) {
            $scope.getProjBscInfSuccess = function (msg) {
                hide($ionicLoading);
                $scope.baseData = msg.data;
                $scope.$apply();
                /* if ($scope.baseData.projTpCd == 11) {
                 //接口参数  bizOptID:$scope.baseData.bizOptID   bizOptTpCd:$scope.baseData.bizOptTpCd
                 //查询名单信息
                 var queryCstAhnInfoVo = {
                 bizOptID: $scope.baseData.bizOptId,
                 bizOptTpCd: $scope.baseData.bizOptNm
                 }
                 //接口参数  bizOptID:$scope.baseData.bizOptID   bizOptTpCd:$scope.baseData.bizOptTpCd
                 AjaxJsonp(SysServiceData('CPC', 'queryCstAhnInfo', [jsonToXml(queryCstAhnInfoVo)]), url.cpc, $scope.queryCstAhnInfoSuccess);
                 }*/
            }

            AjaxJsonp(SysServiceData('CPC', 'getProjBscInf', [item.projId]), url.cpc, $scope.getProjBscInfSuccess);
        }


        //协同方信息查询
        $scope.doGetProjCooTeamListData = [];
        $scope.doGetProjCooTeamListData_num = 0;
        $scope.doGetProjCooTeamListData_size = 10;
        $scope.finite_state = false;

        $scope.doGetProjCooTeamListSuccess = function (msg) {

            $scope.doGetProjCooTeamListData.push.apply($scope.doGetProjCooTeamListData, msg.content);

            setTimeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);

            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

        }

        $scope.doGetProjCooTeamList = function () {
            var doGetProjCooTeamListVo;
            if (sales == 1) {
                doGetProjCooTeamListVo = {
                    bsnEtyType: 10,//默认
                    bsnEtyID: item.clueId,
                };
            } else if (sales == 2) {
                doGetProjCooTeamListVo = {
                    bsnEtyType: 20,//默认
                    bsnEtyID: item.bizOptID,
                };
            } else if (sales == 3) {
                doGetProjCooTeamListVo = {
                    bsnEtyType: 30,//默认
                    bsnEtyID: item.projId,
                };
            }

            AjaxJsonp(SysServiceData('CPC', 'doGetProjCooTeamList', [$scope.doGetProjCooTeamListData_num, $scope.doGetProjCooTeamListData_size, jsonToXml(doGetProjCooTeamListVo)]), url.cpc, $scope.doGetProjCooTeamListSuccess);
        }

        //下拉刷新
        $scope.doGetProjCooTeamListData_refresh = function () {
            $scope.doGetProjCooTeamListData = [];
            $scope.doGetProjCooTeamListData_num = 0;
            $scope.doGetProjCooTeamList();
        }

        //上拉加载
        $scope.doGetProjCooTeamListData_loadMore = function () {
            $scope.doGetProjCooTeamListData_num = $scope.doGetProjCooTeamListData_num + 1;
            $scope.finite_state = false;
            $scope.doGetProjCooTeamList();
        }


        //附件信息查询
        $scope.getAttchListData = [];
        $scope.getAttchList_num = 0;
        $scope.getAttchList_finite_state = false;

        $scope.getAttchListSuccess = function (msg) {
            $scope.getAttchListData.push.apply($scope.getAttchListData, msg.content);

            setTimeout(function () {
                $scope.getAttchList_finite_state = msg.hasNextPage;
            }, 500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.getAttchList = function () {
            var getAttchListVo;
            if (sales == 1) {
                var getAttchListVo = {
                    bsnEtyType: 10,
                    bsnEtyId: item.clueId,
                }
            } else if (sales == 2) {
                var getAttchListVo = {
                    bsnEtyType: 20,
                    bsnEtyId: item.bizOptID,
                }
            } else if (sales == 3) {
                var getAttchListVo = {
                    bsnEtyType: 30,
                    bsnEtyId: item.projId,
                }
            }


            AjaxJsonp(SysServiceData('CPC', 'getAttchList', [$scope.getAttchList_num, 10, jsonToXml(getAttchListVo)]), url.cpc, $scope.getAttchListSuccess);

        }

        //下拉刷新
        $scope.getAttchList_refresh = function () {
            $scope.getAttchListData = [];
            $scope.getAttchList_num = 0;
            $scope.getAttchList();
        }

        //上拉加载
        $scope.getAttchList_loadMore = function () {
            $scope.getAttchList_num = $scope.getAttchList_num + 1;
            $scope.getAttchList_finite_state = false;
            $scope.getAttchList();
        }
        $scope.getAttchList();


        //已完成工作查询
        $scope.doGetActyListData = [];
        $scope.doGetActyList_num = 0;
        $scope.doGetActyList_finite_state = false;

        $scope.doGetActyListSuccess = function (msg) {
            console.log("-------------");
            console.log(msg);

            $scope.doGetActyListData.push.apply($scope.doGetActyListData, msg.content);

            setTimeout(function () {
                $scope.doGetActyList_finite_state = msg.hasNextPage;
            }, 500);

            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.doGetActyList = function () {
            var doGetActyListVo;
            if (sales == 1) {
                doGetActyListVo = {
                    bsnEtyType: 10,
                    bsnEtyId: item.clueId,
                }
            } else if (sales == 2) {
                doGetActyListVo = {
                    bsnEtyType: 20,
                    bsnEtyId: item.bizOptID,
                }
            } else if (sales == 3) {
                doGetActyListVo = {
                    bsnEtyType: 30,
                    bsnEtyId: item.projId,
                }
            }

            AjaxJsonp(SysServiceData('CPC', 'doGetActyList', [$scope.doGetActyList_num, 10, jsonToXml(doGetActyListVo)]), url.cpc, $scope.doGetActyListSuccess);
        }

        //下拉刷新
        $scope.doGetActyList_refresh = function () {
            $scope.doGetActyListData = [];
            $scope.doGetActyList_num = 0;
            $scope.doGetActyList();
        }

        //上拉加载
        $scope.doGetActyList_loadMore = function () {
            $scope.doGetActyList_num = $scope.doGetActyList_num + 1;
            $scope.doGetActyList_finite_state = false;
            $scope.doGetActyList();
        }

        $scope.doGetActyList();


        $scope.show_information = function (id) {
            if (id == 0) {
                $scope.infor_one[0].state = !$scope.infor_one[0].state;
                if (!$scope.infor_one[0].state) {
                    $scope.infor_one[0].state_img = 'img/clue/less.png';
                } else {
                    $scope.infor_one[0].state_img = 'img/clue/more.png';
                }

                if (sales == 1) {
                    $scope.infor_one_info[0].state = !$scope.infor_one_info[0].state;
                }
                if (sales == 2) {
                    $scope.infor_two_info[0].state = !$scope.infor_two_info[0].state;
                }
                if (sales == 3) {
                    $scope.infor_thr_info[0].state = !$scope.infor_thr_info[0].state;
                }
            }
            if (id == 1) {
                $scope.infor_two[0].state = !$scope.infor_two[0].state;
                if (!$scope.infor_two[0].state) {
                    $scope.infor_two[0].state_img = 'img/clue/less.png';
                } else {
                    $scope.infor_two[0].state_img = 'img/clue/more.png';
                }
            }
            if (id == 2) {
                $scope.infor_thr[0].state = !$scope.infor_thr[0].state;
                if (!$scope.infor_thr[0].state) {
                    $scope.infor_thr[0].state_img = 'img/clue/less.png';
                } else {
                    $scope.infor_thr[0].state_img = 'img/clue/more.png';
                }
            }
        };

        $scope.show_work = function () {
            $scope.infor_for[0].state = !$scope.infor_for[0].state;
            if (!$scope.infor_for[0].state) {
                $scope.infor_for[0].state_img = 'img/clue/less.png';
            } else {
                $scope.infor_for[0].state_img = 'img/clue/more.png';
            }
        }

        $scope.show_list = function () {
            $ionicSideMenuDelegate.toggleRight();
        };

        $scope.search = function (search_one, search_two) {
            console.log(search_one);
            console.log(search_two);
        }

        $scope.downfile = function (url) {
            console.log(url);
            window.location.href = url;
        }

        $scope.show_slide = function (id) {
            $scope.itemList[$scope.last].class = '';
            $scope.itemList[id].class = 'action';
            $scope.last = id;
        }

        $scope.slideHasChanged = function (id) {
            $scope.show_slide(id);
        }

        /**
         * 数据请求部分
         */
        $scope.num = 0;
        $scope.size = 10;
        $scope.img;
        /*        $scope.a;
         $scope.b;
         $scope.c;
         $scope.d;*/
        $scope.infoList = [];
        var searchType;

        switch ($scope.id) {
            case 1:
                searchType = '01';
                $scope.code = item.clueId;
                break;
            case 2:
                searchType = '02';
                $scope.code = item.bizOptID;
                break;
            case 3:
                searchType = '03';
                $scope.code = item.projId;
                break;
        }


        $scope.success = function (msg) {
            console.log(msg);

            for (var i = 0; i < msg.length; i++) {
                switch (msg[i].prcDsc) {
                    case '新建线索':
                        $scope.img = 'img/clue/clue1.png';
                        break;
                    case '线索审批':
                        $scope.img = 'img/clue/clue2.png';
                        break;
                    case '新建机会':
                        $scope.img = 'img/clue/clue3.png';
                        break;
                    case '机会认定':
                        $scope.img = 'img/clue/clue4.png';
                        break;
                    case '项目立项':
                        $scope.img = 'img/clue/clue5.png';
                        break;
                    case '项目审批':
                        $scope.img = 'img/clue/clue6.png';
                        break;
                    case '合同签署':
                        $scope.img = 'img/clue/clue7.png';
                        break;
                    case '结束':
                        $scope.img = 'img/clue/clue8.png';
                        break;
                }
                var inf = [];
                for (var j = 0; j < msg[i].aprvList.length; j++) {
                    var da = {
                        name: msg[i].aprvList[j].aprvEmpNm,
                        org: msg[i].aprvList[j].aprvInsNm,
                        result: msg[i].aprvList[j].aprvResultDsc,
                        time: msg[i].aprvList[j].aprvTm,
                        state: msg[i].aprvList[j].aprvStCdDsc,
                        opinion: msg[i].aprvList[j].aprvOpns,
                        consuming: msg[i].aprvList[j].tmPrd,
                        speed: msg[i].aprvList[j].procsNum
                    };
                    ;
                    inf.push(da);
                }
                $scope.infoList.push(inf);
                var dat = {id: i, img: $scope.img, title: msg[i].prcDsc, state_img: 'img/clue/more.png', state: true};
                $scope.$apply(function () {
                    $scope.surveyList.push(dat);
                })
            }
        };


        $scope.success2 = function (msg) {
            console.log(msg);
            switch ($scope.id) {
                case 1:
                    $scope.infor_one_info = [{
                        title: msg.data[0].clueTitle,
                        name: msg.data[0].crtEmpNm,
                        department: msg.data[0].crtInsNm,
                        phone: msg.data[0].crtMobile,
                        time: msg.data[0].crtTm,
                        background: msg.data[0].clueBkgDsc,
                        content: msg.data[0].clueCntDsc,
                        value: msg.data[0].clueValCd,
                        leader: msg.data[0].dirLeaderNm,
                        state: true
                    }];
                    break;
                case 2:
                    $scope.infor_two_info = [{
                        title: msg.data[0].bizOptTitle,
                        type: msg.data[0].bizOptTpCd,
                        degree: msg.data[0].emgcyCd,
                        department: msg.data[0].mgmtInsNm,
                        name: msg.data[0].mgmtEmpNm,
                        phone: msg.data[0].telNo,
                        time: msg.data[0].crtTm,
                        content: msg.data[0].bizOptDsc,
                        clue: msg.data[0].clueNm,
                        state: true
                    }];
                    break;
                case 3:
                    $scope.infor_thr_info = [{
                        title: msg.data[0].projNm,
                        num: msg.data[0].projId,
                        scale: msg.data[0].projScale,
                        type: msg.data[0].projTpCd,
                        leader: msg.data[0].mgmtEmpNm,
                        department: msg.data[0].mgmtInsNm,
                        phone: msg.data[0].mgmtEmptelNo,
                        opport: msg.data[0].bizOptId,
                        degree: msg.data[0].emgcyCd,
                        money: msg.data[0].ctrctAmt,
                        time: msg.data[0].ctrctDt,
                        content: msg.data[0].projDsc,
                        state: true
                    }];
                    break;
            }

            var infor = msg.data[1].content;
            for (var i = 0; i < infor.length; i++) {
                var a = {
                    department: infor[i].instNm,
                    name: infor[i].crtEmpNm,
                    part: infor[i].cooPtnNm,
                    prop: '*',
                    content: infor[i].colCntDsc,
                    state: true
                };
                $scope.infor_coor_info.push(a);
            }

            var att = msg.data[2].content;
            for (var i = 0; i < att.length; i++) {
                var a = {
                    name: att[i].attachNm,
                    person: att[i].blngEmpeNm,
                    department: att[i].blngDeptNm,
                    time: att[i].udtTm,
                    url: null,
                    state: true
                };
                $scope.infor_data_info.push(a);
            }
        }

        $scope.success3 = function (msg) {
            console.log(msg);
            var a = msg.content;
            for (var i = 0; i < a.length; i++) {
                $scope.infor_work_info = [{
                    title: a[i].actyTitle,
                    num: a[i].actySn,
                    type: a[i].actyTpcd,
                    person: a[i].exeEmpeNm,
                    department: a[i].exeInsNm,
                    time: a[i].exeDt,
                    record: a[i].udtEmpNm,
                    state: true
                }];
            }
        }

        $scope.dd = function () {
            // AjaxJsonp(SysServiceData('CPC', 'queryClueInfo', [$scope.num, $scope.size, searchType, '01', $scope.code]), url.cpc, $scope.success);
            AjaxJsonp(SysServiceData('CPC', 'queryClueInfo', [$scope.num, $scope.size, searchType, '02', $scope.code]), url.cpc, $scope.success2);
            AjaxJsonp(SysServiceData('CPC', 'queryClueInfo', [$scope.num, $scope.size, searchType, '03', $scope.code]), url.cpc, $scope.success3);
        };

        $scope.dd();

        $scope.doGetProjCooTeamList();
        $scope.aaa = false;
        $scope.bbb = false;
        $scope.ccc = true;
        /* 左侧分类单击样式修改 */
        $scope.categoryLeftClick = function (e) {

            if (e.target.innerText == "基础信息") {
                // $scope.doGetProjCooTeamList();
                $scope.aaa = false;
                $scope.bbb = false;
                $scope.ccc = true;
            }

            if (e.target.innerText == "协同方信息") {
                // $scope.doGetProjCooTeamList();
                $scope.aaa = true;
                $scope.bbb = false;
                $scope.ccc = false;
            }
            if (e.target.innerText == "资料附件信息") {
                // $scope.doGetProjCooTeamList();
                $scope.bbb = true;
                $scope.aaa = false;
                $scope.ccc = false;
            }
            e.target.className = 'nav-current';
            $(e.target).siblings().removeClass().addClass('nav-blur');

            /*  var index = $("#nav li").index(e.target);
             $("#pro .pro-warp").eq(index).siblings(".pro-warp").hide();
             $("#pro .pro-warp").eq(index).show();*/

        };

        $scope.dowload = function (obj) {
            var downloadUrl = url.cpcDownload +'/download?attachSN=' + obj.attachSN;
            MXCommon.download(downloadUrl);
        }


    })