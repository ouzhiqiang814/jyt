angular.module("finishedtask.controller",[])
    .controller("finishedtaskCtrl", function($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory) {
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            $("#integralquery").removeClass("begin-right");
            $("#integralquery").addClass("end-right");
            $timeout(function() {
                javascript:history.go(-1);
            }, 300);
        };
        $scope.finishedtaskItemClick = function(item) {
            var finishedtask = angular.toJson(item);
            $state.go("finishedtaskInfo", {
                data: finishedtask
            }, {
                reload: true
            });
        };
        $scope.items = [{
            title: '厦门金圆担保公司协同关于xxx的协同项目',
            people: '张海峰',
            date: '2017年5月28日',
            statusrc: 'img/finishedtask/xt.png',
            progresrc: 'img/task/blue_pro1.png',
            post: '客户经理主管',
            type:'xt',
            level:3,
            status: 1,
            sta: '待审批',
            next: '林海生',
            step: '协同',
            percent: '55',
            color: '#0c93e1',
            category:'客户管户机构调整'
        }, {
            title: "厦门金圆担保公司营销项目",
            people: '刘能',
            date: '2017年6月6日',
            statusrc: 'img/finishedtask/yx.png',
            progresrc: 'img/finishedtask/yx.png',
            post: '客户经理',
            type:'yx',
            level:1,
            status: 2,
            sta: '待审批',
            next: '丁亮',
            step: '立项',
            percent: '36',
            color: '#02cb94',
            category:'客户数据查看权限'
        }, {
            title: "厦门金圆客户数据",
            people: '刘能',
            date: '2017年5月22日',
            statusrc: 'img/finishedtask/kh.png',
            progresrc: 'img/task/yellow_pro3.png',
            post: '客户经理主管',
            type:'kh',
            level:1,
            status: 3,
            sta: '待审批',
            next: '陈荣锋',
            step: '创建商机',
            percent: '82',
            color: '#fbc31f',
            category:'合作伙伴'
        }, {
            title: "厦门金圆担保公司协同",
            people: '刘能',
            date: '2017年5月8日',
            statusrc: 'img/finishedtask/xt.png',
            progresrc: 'img/task/red_pro4.png',
            post: '客户经理主管',
            type:'xt',
            level:1,
            status: 4,
            sta: '待审批',
            next: '曾少芳',
            step: '协同',
            percent: '20',
            color: '#0c93e1',
            category:'合作事项移交'
        }, {
            title: "厦门金圆担保公司营销项目",
            people: '刘能',
            date: '2017年5月5日',
            statusrc: 'img/finishedtask/yx.png',
            progresrc: 'img/finishedtask/yx.png',
            post: '客户经理',
            type:'yx',
            level:1,
            status: 2,
            sta: '待审批',
            next: '丁亮',
            step: '立项',
            percent: '36',
            color: '#02cb94',
            category:'合作伙伴查看权限申请'
        }];

        $scope.func_reset = function() {
            document.getElementById("auditTitle").value="";
            document.getElementById("auditPeople").value="";
        };

        $scope.func_ok = function() {
            $ionicSideMenuDelegate.toggleRight();
        };
        $scope.clues = function(){
            $state.go("finishedsynergyclues", {

            }, {
                reload: true
            });
        };
        $scope.chance = function(){
            $state.go("finishedsynergychance", {

            }, {
                reload: true
            });
        };

    })
    .controller("finishedtaskInfoCtrl", function($scope, $state,$stateParams, $ionicLoading) {
        $scope.finishedtaskInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$state.go("finishedtaskList");
            javascript:history.go(-1);
        };
        $scope.goAuditingHistory=function(){
            $state.go("finishedtaskInfoHistory", {
                data: $stateParams.data
            }, {
                reload: true
            });
        };
        $scope.goPersonInfo=function(){
            $state.go("finishedtaskInfoPersonInfo", {
                data: $stateParams.data
            }, {
                reload: true
            });
        };
        $scope.goAuditing=function(){
            $state.go("finishedtaskInfoAuditing", {
                data: $stateParams.data
            }, {
                reload: true
            });
        };
        //客户数据查看 开始
        $scope.cusDataListDivImgUrl = "img/clue/more.png";
        $scope.cusDataListShow = false;
        $scope.cusDataFormData = {billno:"10705",name:"王松",cusNO:"564613123",belong:"厦门两岸金融中心",desc:"客户数据申请的用途"};
        $scope.showDataList=function(){
            if($scope.cusDataListDivImgUrl =="img/clue/more.png"){
                $scope.cusDataListDivImgUrl = "img/clue/less.png";
                $scope.cusDataListShow = true;
            }else{
                $scope.cusDataListDivImgUrl = "img/clue/more.png";
                $scope.cusDataListShow = false;
            }
        };
        $scope.cusDataListDatas = [
            {type:"资产信息",message:"资产描述，资产编号"},
            {type:"关联方信息",message:"关联方名称，关联方客户编号，关联类型"},
            {type:"地址联系信息",message:"国家省市区县，详细地址"},
        ];
        //客户数据查看 结束

        //客户管户机构调整 开始
        $scope.tendInstitutionFormData = {
            billno:"10022",name:"张海峰",cusNO:"2650665",
            outInstitution:"厦门国际信托有限公司",outPerson:"连坚",outDept:"运营管理部",
            inInstitution:"厦门国际信托有限公司",inPerson:"连坚",inDept:"运营管理部",
            desc:"需要做出调整"
        };
        //客户管户机构调整 结束

        //合作伙伴 开始
        $scope.partnerFormData = {
            name:"海上合作有限公司",type:"国有央企-非金融",cardType:"营业执照",
            cardNO:"2356232652",country:"中国",trade:"农业",class:"单一公司型",
            isChild:"否",parent:"",dept:"运营管理部",person:"丁亮"
        };
        //合作伙伴 结束

        //合作事项 开始
        $scope.thingSendFormData = {
            reason:"互利互惠",dept:"投资管理部",person:"丁亮",personPhone:"13765589565",date:"2017-05-21",
            relationName:"05102",relationDept:"零售部",relationJob:"销售顾问",relationTel:"6569565",
            relationPhone:"13636956235",relationEmail:"hzsx@hzr.com",relationCountry:"中国",
            relationZipCode:"360000",relationCity:"福建厦门",relationAddress:"会展北路116号"
        };
        $scope.thingSendFileListData = [
            {name:"第一阶段目标",time:"2017-05-22"},
            {name:"合作协议",time:"2017-05-21"},
        ];
        //合作事项 结束

        //合作伙伴查看权限 开始
        $scope.partnerSeeRoleFormData = {
            name:"合作有限公司",type:"国有央企-非金融",relation:"王洪亮",
            relationDept:"销售部",relationJob:"销售部经理",trade:"农业",class:"单一公司型",
            isChild:"否",parent:"",dept:"运营管理部",person:"丁亮"
        };
        //合作伙伴查看权限 结束

    })
    .controller("finishedtaskInfoHistoryCtrl", function($scope,$ionicHistory, $state,$stateParams, $ionicLoading) {
        $scope.finishedtaskInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $scope.historys = [{
            title: '提交 2017年5月28日 16:22',
            portrait: 'img/companycustomer/customer.png',
            info: '张海峰 提交项目',
            hasMsg: false,
            message: null,
            type: 0
        }, {
            title: '业务经理审批审批 2017年5月28日 16:10',
            portrait: 'img/companycustomer/customer.png',
            info: '李华新',
            hasMsg: false,
            message: '审批金额:300万',
            type: 1
        }, {
            title: '客户经理主管审批2017年5月29日 10:09',
            portrait: 'img/companycustomer/customer.png',
            info: '林萧 同意',
            hasMsg: true,
            message: '审批金额:300万,结束时间:2017年5月31日',
            type: 2
        }, {
            title: '董事长2017年5月29日 15:33',
            portrait: 'img/companycustomer/customer.png',
            info: '陈明明 驳回',
            hasMsg: true,
            message: '审批金额不明',
            type: 3
        }];

    })
    .controller("finishedtaskInfoPersonInfoCtrl", function($scope,$ionicHistory, $state,$stateParams, $ionicLoading) {
        $scope.finishedtaskInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $scope.personinfos = [
            {label: '姓名',info: $scope.finishedtaskInfo.people},
            {label: '编号',info: "235685"},
            {label: '联系信息',info: "1365989856"},
            {label: '机构',info: "销售部"},
        ];

    })
    .controller("finishedtaskInfoAuditingCtrl", function($scope,$ionicHistory, $ionicLoading, $state,$stateParams,$http) {
        $scope.finishedtaskInfo = angular.fromJson($stateParams.data);



        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };
        $scope.goNextInfo = function() {
            $state.go("finishedtaskInfoAuditingNextInfo", {
                data:$stateParams.data
            }, {
                reload: true
            });
        };

        $scope.goList = function() {
            $state.go("finishedtaskList", {
            }, {
                reload: true
            });
        };

    })
    .controller("finishedtaskInfoAuditingNextInfoCtrl", function($scope,$ionicHistory, $state,$stateParams, $ionicLoading) {
        $scope.finishedtaskInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $ionicHistory.goBack();
        };

        $scope.personinfos = [
            {label: '姓名',info: "陈诗琪"},
            {label: '编号',info: "235685"},
            {label: '联系信息',info: "1365989856"},
            {label: '机构',info: "销售部"},
        ];

    })
    .controller("FinishedSynergyCluesCtrl", function($scope,$ionicHistory, $ionicLoading, $state,$stateParams) {
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $ionicHistory.goBack();
        };
    })
    .controller("FinishedSynergyChanceCtrl", function($scope,$ionicHistory, $ionicLoading, $state,$stateParams) {
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $ionicHistory.goBack();
        };
    })
    .directive('onFinishRenderFilters', function($timeout) {
        return {
            restrict : 'A',
            link : function(scope, element, attr) {
                if (scope.$last == true) {
                    $timeout(function() {
                        $(".GaugeMeter").gaugeMeter();
                    });
                }
            }
        }
    });
