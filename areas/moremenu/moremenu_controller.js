/**
 * Created by wjf on 2017/6/2.
 */
angular.module('moremenu.controller', [])
    .controller('MoreMenuCtrl', function ($scope, $http, $stateParams, $state, $rootScope,$timeout, $location, $ionicSideMenuDelegate,$ionicHistory) {

        // 返回方法
        $scope.func_goBack = function () {
            $("#moremenu").removeClass("begin-right");
            $("#moremenu").addClass("end-right");
            $timeout(function() {
                //$ionicHistory.goBack();
                $state.go('foot.index');
            }, 300);

            //$state.go('foot.index');
        }

      /*  console.log($rootScope.viewFlag);
        if($rootScope.viewFlag=='1'){
            $("#moremenu").addClass("begin-right");
            $rootScope.viewFlag = ""
        }else{
            $("#moremenu").removeClass("begin-right");

        }*/


        $scope.$on('$ionicView.enter', function (e) {
            getCategoryData();
            $scope.getCategoryDetailData(100);
        });




        function getCategoryData() {
            $scope.categoryData = [
                {
                    name: "工作平台",
                    typeNumber: '100'
                },
                {
                    name: "客户管理",
                    typeNumber: '101'
                },
                {
                    name: "协同管理",
                    typeNumber: '102'
                },
                {
                    name: "协同分析",
                    typeNumber: '103'
                },
                {
                    name: "销售管理",
                    typeNumber: '104'
                },
                {
                    name: "服务管理",
                    typeNumber: '105'
                },
                {
                    name: "会议管理",
                    typeNumber: '106'
                }
                ,
                {
                    name: "营销管理",
                    typeNumber: '107'
                },
                {
                    name: "员工信息",
                    typeNumber: '108'
                },
                {
                    name: "效能统计",
                    typeNumber: '109'
                }
            ];

        }

        // 头部滚动条数据
        $scope.getCategoryDetailData = function (typeNumber) {
            if (typeNumber == 100) {
                $scope.categoryDetailData = [
                    {
                        title: "工作任务",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "待办任务",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'backlogList'
                            },
                            {
                                name: "已办任务",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'alreadyBacklog'
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 101) {
                $scope.categoryDetailData = [
                    {
                        title: "公司客户管理",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "公司客户查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'public_customers_list'
                            },
                            {
                                name: "我的公司客户",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'companyCustomerList'
                            },
                        ]
                    },
                    {
                        title: "个人客户管理",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "个人客户查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'person_cust_search    '
                            },
                            {
                                name: "我的个人客户",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'personCustomerList    '
                            },
                        ]
                    },
                    {
                        title: "客户数据申请",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "公司数据申请",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'companydata'
                            },
                            {
                                name: "个人数据申请",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'persondata'
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 102) {
                $scope.categoryDetailData = [
                    {
                        title: "合作伙伴管理",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "合作伙伴查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'partnerList'
                            },
                        ]
                    },
                    {
                        title: "综合查询",
                        src: "img/moremenu/search.png",
                        data: [
                            {
                                name: "线索查询",
                                src: "img/home/nav0.png",
                                typeNumber: '10001',
                                sref:'clue/1'
                            },
                            {
                                name: "机会查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'clue/2'
                            },
                            {
                                name: "项目查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'clue/3'
                            },
                        ]
                    },
                    {
                        title: "积分管理",
                        src: "img/moremenu/soremgr.png",
                        data: [
                            {
                                name: "个人积分查询",
                                src: "img/home/nav0.png",
                                typeNumber: '10001',
                                sref:'personintegralquery'
                            },
                            {
                                name: "机构积分查询",
                                src: "img/home/nav0.png",
                                typeNumber: '10001',
                                sref:'organizationintegralquery'
                            },
                            {
                                name: "积分统计分析",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:''
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 103) {
                $scope.categoryDetailData = [
                    {
                        title: "效果分析",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "集团机会分析",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:''
                            },
                            {
                                name: "协同效果分析",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:''
                            },
                            {
                                name: "项目类型分析",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:''
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 104) {
                $scope.categoryDetailData = [
                    {
                        title: "销售商机管理",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "我的商机列表",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'initClueList?dtype=SJLB'
                            },
                            {
                                name: "我的推荐商机",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'initClueList?dtype=WTJ'
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 105) {
                $scope.categoryDetailData = [
                    {
                        title: "拜访记录管理",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "拜访记录查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'cst_vst'
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 106) {
                $scope.categoryDetailData = [
                    {
                        title: "会议督办管理",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "督办事项查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'querysprvinfpage'
                            },
                            {
                                name: "督办事项统计",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'supervisionStatistics'
                            },
                            {
                                name: "未完成事项查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'uncompleteSupervision'
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 107) {
                $scope.categoryDetailData = [
                    {
                        title: "产品管理",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "产品查询",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref:'product_query_list'
                            },
                        ]
                    },
                ];
            }else if (typeNumber == 108) {
                $scope.categoryDetailData = [
                    {
                        title: "员工信息",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "员工信息",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref: 'employeeInfoList'
                            },
                            {
                                name: "员工关怀",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref: 'employeeCare'
                            },
                            {
                                name: "员工统计",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref: 'employeeStatistics'
                            },
                            // {
                            //     name: "财务报表",
                            //     src: "img/home/nav1.png",
                            //     typeNumber: '10002',
                            //     sref: 'report'
                            // }
                        ]
                    }
                ];
            }else if (typeNumber == 109) {
                $scope.categoryDetailData = [
                    {
                        title: "效能统计",
                        src: "img/moremenu/partners.png",
                        data: [
                            {
                                name: "效能统计",
                                src: "img/home/nav1.png",
                                typeNumber: '10002',
                                sref: 'performanceStatis'
                            }
                        ]
                    }
                ];
            }
        };


        // 左侧分类单击样式修改
        $scope.categoryLeftClick = function (e) {
            e.target.className = 'nav-current';
            $(e.target).siblings().removeClass().addClass('nav-blur');

        };

    })
