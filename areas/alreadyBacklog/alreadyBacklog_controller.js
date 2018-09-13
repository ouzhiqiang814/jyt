angular.module("alreadyBacklog.controller", [])
    .controller("AlreadyBacklogCtrl", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory) {
        $scope.dataFlag = true;
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        $scope.finite_state = true;
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            // $timeout(function () {
            //     javascript:history.go(-1);
            // }, 300);
            MXWebui.closeWindow();
        };

        $scope.fnGoNext = function(){
            $state.go("backlogList", {
            }, {
                reload: true
            });
        }

        $scope.backlogItemClick = function (item) {
            var backlog = angular.toJson(item);
            $state.go("backlogInfo", {
                data: backlog
            }, {
                reload: true
            });
        };

        $scope.func_reset = function () {
            document.getElementById("auditTitle").value = "";
            document.getElementById("auditPeople").value = "";
        };

        $scope.func_ok = function () {
            $scope.xiangmu = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };

        $scope.clues = function () {
            $state.go("synergyclues", {}, {
                reload: true
            });
        };
        $scope.chance = function () {
            $state.go("synergychance", {}, {
                reload: true
            });
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





        $scope.xiangmu = [];

        var processType = 2;//1待办 2 已办

        var processDefineKey = '';//流程名称

        var isFinish = '';//审批是否结束

        var startTime = '';//开始时间 xxxx-xx-xx

        var endTime = '';//结束时间 xxxx-xx-xx

        var pageNo = 1;
        $scope.success = function (msg) {
            console.log(msg);

            if (msg.total % 10 != 0) {
                $scope.totalPage = (msg.total - msg.total % 10) / 10 + 1;
            } else {
                $scope.totalPage = msg.total / 10;
            }

            $scope.xiangmu.push.apply($scope.xiangmu, msg.taskList);
            $scope.$apply();
            // $scope.xiangmu = ;

            if ($scope.xiangmu.length == 0) {
                $scope.dataFlag = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');

            hide($ionicLoading);
        }

        $scope.indexdata = function () {
            $scope.dataFlag = true;
            //var iptpCd = '02';
            AjaxJsonp(SysServiceData('WF', 'taskList', [processType, processDefineKey, isFinish, startTime, endTime, person.userNum, pageNo]), url.wf, $scope.success);
        }

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.xiangmu = [];
            $scope.finite_state = true;
            pageNo = 1;
            $scope.indexdata();
        }
        //上拉加载更多
        $scope.loadMore = function () {
            pageNo = pageNo + 1;
            if (pageNo > $scope.totalPage) {
                $scope.finite_state = false;
            } else {
                $scope.indexdata();
            }

        }

        //点击进入审批详情
        $scope.approve = function (item) {

            var approveItem = angular.toJson(item);
            sessionStorage.setItem("approveItem", approveItem);
            //公司及个人客户查看权限申请审批流程
            if (item.formKey.indexOf('power_mana_approve') > -1) {

                $state.go("customerDataViewing", {}, {
                    reload: true
                });
                return;
            }
            //管护机构调整审批流程
            if (item.formKey.indexOf('aprv_cst_app') > -1) {
                $state.go("alreadyAprvCstApp", {}, {
                    reload: true
                });
                return;
            }
            //合作伙伴移交审批流程
            if (item.formKey.indexOf('querycooptnbscinf') > -1) {
                $state.go("alreadyQueryCooptnBscInf", {}, {
                    reload: true
                });
                return;
            }

            //合作伙伴查看权限申请审批流程
            if (item.formKey.indexOf('querycoptnerviewaply') > -1) {
                $state.go("alreadyQueryCoPtnerViewAply", {}, {
                    reload: true
                });
                return;
            }

            //合作事项移交审批流程
            if (item.formKey.indexOf('querycooptnctcinfvo') > -1) {
                $state.go("alreadyQueryCooPtnCtcInfVO", {}, {
                    reload: true
                });
                return;
            }

            //线索审批流程查
            if (item.formKey.indexOf('approveclue') > -1) {
                $state.go("alreadyApproveclue", {}, {
                    reload: true
                });
                return;
            }

            //机会审批流程
            if (item.formKey.indexOf('cfmtbizoptinfhome') > -1) {
                $state.go("alreadyCfmtbizoptinfhome", {}, {
                    reload: true
                });
                return;
            }

            //项目审批流程
            if (item.formKey.indexOf('cmtdataprojbscinfpage') > -1) {
                $state.go("alreadyCmtdataprojbscinfpage", {}, {
                    reload: true
                });
                return;
            }
            //会议督办
            if (item.formKey.indexOf('sprvinfhomepage') > -1) {
                if (item.formKey.indexOf('fbksprvinfhomepage') > -1) {
                    $state.go("alreadyFbksprvinfhomepage", {}, {
                        reload: true
                    });
                    return;
                }

                $state.go("alreadySprvinfhomepage", {}, {
                    reload: true
                });
                return;
            }
            //协同抄送
            if (item.formKey.indexOf('carbonbizoptinfhome') > -1) {
                $state.go("alreadyCarbonbizoptinfhome", {}, {
                    reload: true
                });
                return;
            }


            $state.go("noSupportMobile1", {}, {
                reload: true
            });

        };

        $scope.indexdata();

    })

