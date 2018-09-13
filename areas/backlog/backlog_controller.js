angular.module("backlog.controller", [])
    .controller("backlogCtrl", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory) {
        $scope.dataFlag = true;
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        show($ionicLoading);
        document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载
        function onDeviceReady() {
            MXCommon.getCurrentUser(
                function (result) {
                    if(person == null){
                        getPerson1(result.login_name, init);
                    }else{
                        init();
                    }
                }
            );
        }

        function init(msg){
            if(msg==null || msg==''){
                $scope.position = person;
            }else{
                $scope.position = msg;
                $scope.$apply();
            }
            
            sessionStorage.setItem("sysUserVoJson", JSON.stringify($scope.position));
            person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
            $scope.finite_state = true;
            console.log(person);
            $scope.goBack = function () {

                // $timeout(function () {
                //     //$ionicHistory.goBack();
                //     /*$state.go('foot.index');*/
                //     javascript:history.go(-1);
                // }, 300);
                MXWebui.closeWindow();
            };

            $scope.fnGoNext = function(){
                $state.go("alreadyBacklog", {
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

            $scope.chance = function () {
                $state.go("synergychance", {}, {
                    reload: true
                });
            };
            


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


            $scope.xiangmu = [];
            $scope.page = 0;
            $scope.size = 10;
            $scope.finite_state = false;

            var processType = 1;//1待办 2 已办

            var processDefineKey = '';//流程名称

            var isFinish = '';//审批是否结束

            var startTime = '';//开始时间 xxxx-xx-xx

            var endTime = '';//结束时间 xxxx-xx-xx

            var pageNo = 1;
            $scope.success = function (msg) {
                if (msg.total % 10 != 0) {
                    $scope.totalPage = (msg.total - msg.total % 10) / 10 + 1;
                } else {
                    $scope.totalPage = msg.total / 10;
                }

                console.log(msg);
                if ($scope.itemsFlag) {
                    $scope.xiangmu = [];
                }

                $scope.xiangmu.push.apply($scope.xiangmu, msg.taskList);
                // setTimeout(function () {
                //     $scope.finite_state = msg.hasNextPage;
                // }, 500);
                
                $scope.finite_state = true;
                

                $scope.$apply();

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

                $ionicLoading.hide();
            }

            $scope.indexdata = function (obj) {
                if (obj) {
                    $scope.itemsFlag = true;
                } else {
                    $scope.itemsFlag = false;
                }

                //var iptpCd = '02';
                AjaxJsonp(SysServiceData('WF', 'taskList', [processType, processDefineKey, isFinish, startTime, endTime, person.userNum, pageNo]), url.wf, $scope.success);
            }

            $scope.indexdata();

            //下拉刷新
            $scope.func_refresh = function () {
                $scope.xiangmu = [];
                $scope.finite_state = true;
                pageNo = 1;
                $scope.indexdata(true);
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


            //点击进入审批详情
            $scope.approve = function (item) {

                var approveItem = angular.toJson(item);
                sessionStorage.setItem("approveItem", approveItem);
                sessionStorage.setItem("SprvinfhomepageCtrl.viewRightPage", '');
                //公司及个人客户查看权限申请审批流程
                if (item.formKey.indexOf('power_mana_approve') > -1) {
                    if(item.activityId != 'ACT_5'){
                        $state.go("power_mana_approve", {}, {
                            reload: true
                        });
                        return;
                    }
                }
                //管护机构调整审批流程
                if (item.formKey.indexOf('aprv_cst_app') > -1) {
                    $state.go("aprvCstApp", {}, {
                        reload: true
                    });
                    return;
                }
                //合作伙伴移交审批流程
                if (item.formKey.indexOf('querycooptnbscinf') > -1) {
                    $state.go("queryCooptnBscInf", {}, {
                        reload: true
                    });
                    return;
                }

                //合作伙伴查看权限申请审批流程
                if (item.formKey.indexOf('querycoptnerviewaply') > -1) {
                    $state.go("querycoptnerviewaply", {}, {
                        reload: true
                    });
                    return;
                }

                //合作事项移交审批流程
                if (item.formKey.indexOf('querycooptnctcinfvo') > -1) {
                    $state.go("queryCooPtnCtcInfVO", {}, {
                        reload: true
                    });
                    return;
                }

                //线索审批流程查
                if (item.formKey.indexOf('approveclue') > -1) {
                    if(item.activityId != 'CLM_APPLY_3'&& item.activityId != 'ACT_1'){
                        $state.go("approveclue", {}, {
                            reload: true
                        });
                        return;
                    }
                }

                //机会审批流程
                if (item.formKey.indexOf('cfmtbizoptinfhome') > -1) {
                    if(item.activityId != 'ACT_5' && item.activityId != 'ACT_1'){
                        $state.go("cfmtbizoptinfhome", {}, {
                            reload: true
                        });
                        return;
                    }

                }

                //项目审批流程
                if (item.formKey.indexOf('cmtdataprojbscinfpage') > -1) {
                    //item.activityId != 'ACT_7'&&
                    if(item.activityId != 'ACT_1'){
                        $state.go("cmtdataprojbscinfpage", {}, {
                            reload: true
                        });
                        return;
                    }
                }

                if (item.formKey.indexOf('sprvinfhomepage') > -1) {
                    if (item.formKey.indexOf('fbksprvinfhomepage') > -1) {
                        $state.go("fbksprvinfhomepage", {}, {
                            reload: true
                        });
                        return;
                    }

                    // $state.go("sprvinfhomepage", {}, {
                    //     reload: true
                    // });
                    console.log(1111)
                    parent.window.location.href='#/sprvinfhomepage'
                    return;
                }

                //会议督办抄送流程
                if (item.formKey.indexOf('carbonbizoptinfhome') > -1) {
                    window.location.href='#/carbonbizoptinfhome';
                /* $state.go("carbonbizoptinfhome", {}, {
                        reload: true
                    });*/
                    return;
                }

                $state.go("noSupportMobile1", {}, {
                    reload: true
                });

            };
        }

    })

    .controller("backlogInfoCtrl", function ($scope, $state, $stateParams) {
        $scope.backlogInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
            //$state.go("backlogList");
            javascript:history.go(-1);
        };
        $scope.goAuditingHistory = function () {
            $state.go("backlogInfoHistory", {
                data: $stateParams.data
            }, {
                reload: true
            });
        };
        $scope.goPersonInfo = function () {
            $state.go("backlogInfoPersonInfo", {
                data: $stateParams.data
            }, {
                reload: true
            });
        };
        $scope.goAuditing = function () {
            $state.go("backlogInfoAuditing", {
                data: $stateParams.data
            }, {
                reload: true
            });
        };
        //客户数据查看 开始
        $scope.cusDataListDivImgUrl = "img/clue/more.png";
        $scope.cusDataListShow = false;
        $scope.cusDataFormData = {
            billno: "10705",
            name: "王松",
            cusNO: "564613123",
            belong: "厦门两岸金融中心",
            desc: "客户数据申请的用途"
        };
        $scope.showDataList = function () {
            if ($scope.cusDataListDivImgUrl == "img/clue/more.png") {
                $scope.cusDataListDivImgUrl = "img/clue/less.png";
                $scope.cusDataListShow = true;
            } else {
                $scope.cusDataListDivImgUrl = "img/clue/more.png";
                $scope.cusDataListShow = false;
            }
        };
        $scope.cusDataListDatas = [
            {type: "资产信息", message: "资产描述，资产编号"},
            {type: "关联方信息", message: "关联方名称，关联方客户编号，关联类型"},
            {type: "地址联系信息", message: "国家省市区县，详细地址"},
        ];
        //客户数据查看 结束

        //客户管户机构调整 开始
        $scope.tendInstitutionFormData = {
            billno: "10022", name: "张海峰", cusNO: "2650665",
            outInstitution: "厦门国际信托有限公司", outPerson: "连坚", outDept: "运营管理部",
            inInstitution: "厦门国际信托有限公司", inPerson: "连坚", inDept: "运营管理部",
            desc: "需要做出调整"
        };
        //客户管户机构调整 结束

        //合作伙伴 开始
        $scope.partnerFormData = {
            name: "海上合作有限公司", type: "国有央企-非金融", cardType: "营业执照",
            cardNO: "2356232652", country: "中国", trade: "农业", class: "单一公司型",
            isChild: "否", parent: "", dept: "运营管理部", person: "丁亮"
        };
        //合作伙伴 结束

        //合作事项 开始
        $scope.thingSendFormData = {
            reason: "互利互惠", dept: "投资管理部", person: "丁亮", personPhone: "13765589565", date: "2017-05-21",
            relationName: "05102", relationDept: "零售部", relationJob: "销售顾问", relationTel: "6569565",
            relationPhone: "13636956235", relationEmail: "hzsx@hzr.com", relationCountry: "中国",
            relationZipCode: "360000", relationCity: "福建厦门", relationAddress: "会展北路116号"
        };
        $scope.thingSendFileListData = [
            {name: "第一阶段目标", time: "2017-05-22"},
            {name: "合作协议", time: "2017-05-21"},
        ];
        //合作事项 结束

        //合作伙伴查看权限 开始
        $scope.partnerSeeRoleFormData = {
            name: "合作有限公司", type: "国有央企-非金融", relation: "王洪亮",
            relationDept: "销售部", relationJob: "销售部经理", trade: "农业", class: "单一公司型",
            isChild: "否", parent: "", dept: "运营管理部", person: "丁亮"
        };
        //合作伙伴查看权限 结束
    })

    .controller("backlogInfoHistoryCtrl", function ($scope, $ionicHistory, $state, $stateParams) {
        $scope.backlogInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
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

    .controller("backlogInfoPersonInfoCtrl", function ($scope, $ionicHistory, $state, $stateParams) {
        $scope.backlogInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $scope.personinfos = [
            {label: '姓名', info: $scope.backlogInfo.people},
            {label: '编号', info: "235685"},
            {label: '联系信息', info: "1365989856"},
            {label: '机构', info: "销售部"},
        ];

    })

    .controller("backlogInfoAuditingCtrl", function ($scope, $ionicHistory, $state, $stateParams, $http) {
        $scope.backlogInfo = angular.fromJson($stateParams.data);

        $scope.goBack = function () {
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };
        $scope.goNextInfo = function () {
            $state.go("backlogInfoAuditingNextInfo", {
                data: $stateParams.data
            }, {
                reload: true
            });
        };

        $scope.goList = function () {
            $state.go("backlogList", {}, {
                reload: true
            });
        };

    })

    .controller("backlogInfoAuditingNextInfoCtrl", function ($scope, $ionicHistory, $state, $stateParams) {
        $scope.backlogInfo = angular.fromJson($stateParams.data);
        $scope.goBack = function () {
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $scope.personinfos = [
            {label: '姓名', info: "陈诗琪"},
            {label: '编号', info: "235685"},
            {label: '联系信息', info: "1365989856"},
            {label: '机构', info: "销售部"},
        ];

    })

    .controller("SynergyCluesCtrl", function ($scope, $timeout, $ionicHistory, $state, $stateParams, $rootScope) {

        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));


        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));


        var processType = 1;//1待办 2 已办

        var processDefineKey = '';//流程名称

        var isFinish = '';//审批是否结束

        var startTime = '';//开始时间 xxxx-xx-xx

        var endTime = '';//结束时间 xxxx-xx-xx

        var pageNo = 1;

        AjaxJsonp(SysServiceData('WF', 'taskList', [processType, processDefineKey, isFinish, startTime, endTime, person.userNum, pageNo, approveItem.taskId]), url.wf, function (msg) {
            console.log(msg);
        });

        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;


        $scope.goBack = function () {
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $timeout(function () {
            $scope.indexdata1();
        }, 300);

        $scope.num = 0;
        $scope.size = 10;

        /* 数据权限申请基本信息 */
        $scope.items1 = [];

        $scope.indexdata1 = function () {
            //   console.log(SysServiceData('CRM', 'power_mana_approve', [approveItem.businessKey, approveItem.activityId, approveItem.taskId, person.userNum]));
            AjaxJsonp(SysServiceData('CRM', 'power_mana_approve', [approveItem.businessKey, approveItem.activityId, approveItem.taskId, person.userNum]), url.crm, $scope.success1);

        }
        $scope.success1 = function (msg) {
            console.log(msg);
            var aprv = {
                orgCode: msg.vo.aprvInsID,
                roleCode: msg.vo.aprvRoleID,
            }
            var aprvStr = angular.toJson(aprv);
            sessionStorage.setItem("selectUser", aprvStr);

            $scope.vo = angular.toJson(msg.vo);
            sessionStorage.setItem("SynergyCluesCtrl.vo", $scope.vo);

            var dat = {
                appID: msg.vo.appID,
                cstNm: msg.vo.cstNm,
                cstID: msg.vo.cstID,
                orgNm: msg.vo.orgNm,
                useDsc: msg.vo.useDsc,
                empeNm: msg.vo.empeNm,
                mobile: msg.vo.mobile,
                deptNm: msg.vo.deptNm,
                applyDt: msg.vo.applyDt,
                authEndDt: msg.vo.authEndDt
            };
            $scope.$apply(function () {
                $scope.items1.push(dat);
            });
            $scope.indexdata2(msg.vo);
        }


        /* 数据权限申请清单 */
        $scope.items2 = [];
        $scope.search_state2 = true;
        $scope.indexdata2 = function (vo) {

            var cstDataAppInfoVO = {
                appID: vo.appID,
                cstID: vo.cstID,
                cstNm: vo.cstNm,
                blngLglPsnID: vo.blngLglPsnID,
                useDsc: vo.useDsc,
                empeID: vo.empeID,
                applyDt: vo.applyDt,
                deptID: vo.deptID,
                authEndDt: vo.authEndDt,
                deptNm: vo.deptNm,
                empeNm: vo.empeNm,
                ipId: vo.ipId,
                appIds: vo.appIds
            }


            var xotree = new XML.ObjTree();

            var xml = xotree.writeXML(cstDataAppInfoVO);
            var xmlText = formatXml(xml);

            AjaxJsonp(SysServiceData('CRM', 'getApproveInfo', [$scope.num, $scope.size, xmlText, person.userNum]), url.crm, $scope.success2);

        }
        $scope.success2 = function (msg) {
            for (i = 0; i < msg.content.length; i++) {
                var dat = {
                    dataEnt: msg.content[i].dataEnt,
                    dataAttr: msg.content[i].dataAttr,
                    authInd: msg.content[i].authInd
                };
                $scope.$apply(function () {
                    $scope.items2.push(dat);
                })
            }

        }

        //点击进入审批详情
        $scope.approve = function () {
            if (angular.fromJson($scope.vo).isEnd == 1) {
                alert('请在电脑上进行审批！');
                $state.go("backlogList", {}, {
                    reload: true
                });
                return;
            }
            $scope.aprvOpns = aprvOpns.value
            sessionStorage.setItem("SynergyCluesCtrl.aprvOpns", aprvOpns.value);
            $state.go("synergyselect", {}, {
                reload: true
            });

        };
        $scope.submitSuccess = function (msg) {
            if ('提交成功！' == msg) {
                shanxian("提交成功！");
                setTimeout(function () {
                    $state.go("backlogList", {}, {
                        reload: true
                    });
                }, 2000);
            }
        }

        sessionStorage.setItem("submitMethod", 'synergyCluesCtrlSubmit');
        $rootScope.$on('synergyCluesCtrlSubmit', function (d, data) {
            console.log(data);         //子级能得到值
            var vo = $scope.vo;
            var objVo = angular.fromJson(vo);
            var aprvOpns = $scope.aprvOpns;
            //  console.log(SysServiceData('CRM', 'updateCstDataAppInfoPass', [vo, objVo.appID, 1, aprvOpns, $scope.user.userNum, $scope.user.realname, $scope.user.orgCode,person.userNum,person.realname,person.currentGroup.organization.orgCode]));
            AjaxJsonp(SysServiceData('CRM', 'updateCstDataAppInfoPass', [vo, objVo.appID, 1, aprvOpns, data.userNum, data.realname, data.orgCode, person.userNum, person.realname, person.currentGroup.organization.orgCode]), url.crm, $scope.submitSuccess);

            $(".btn-sumbit").css({"background": "#01B0E7"});
            setTimeout(function () {
                $(".btn-sumbit").css("background", "#01B0E7");
            }, 400);
        });


    })


    .controller("SynergyChanceCtrl", function ($scope, $ionicHistory, $state, $stateParams) {
        $scope.goBack = function () {
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };
    })
    .directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last == true) {
                    $timeout(function () {
                        $(".GaugeMeter").gaugeMeter();
                    });
                }
            }
        }
    })

    .controller("SynergySelectCtrl", function ($scope, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory, $state, $stateParams, $rootScope) {
        var aprv = angular.fromJson(sessionStorage.getItem("selectUser"));
        $scope.goBack = function () {
            //$ionicHistory.goBack();
            javascript:history.go(-1);
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


        /* 选择审批人 */
        $scope.items = [];
        $scope.num = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.success = function (msg) {
            hide($ionicLoading);
            console.log(msg);
            if ($scope.itemsFlag) {
                $scope.items = [];
            }
            /* console.log(msg);
             $scope.msg = msg;*/
            $scope.items.push.apply($scope.items, msg.content);

            setTimeout(function () {
                $scope.finite_state = msg.hasNextPage;
            }, 500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

        $scope.indexdata = function (obj) {
            if (obj) {
                $scope.itemsFlag = true;
            } else {
                $scope.itemsFlag = false;
            }
            // var aprv = angular.fromJson(sessionStorage.getItem("selectUser"));
            //是否为多选或者单选 否的话为单选
            if (aprv.isCheckbox == null || aprv.isCheckbox == '' || aprv.isCheckbox == undefined) {
                $scope.isCheckbox = false;
            } else {
                $scope.isCheckbox = aprv.isCheckbox;
            }

            //是否返回数组是用户对象 否的话则返回用户id
            if (aprv.getUserObj == null || aprv.getUserObj == '' || aprv.getUserObj == undefined) {
                $scope.getUserObj = false;
            } else {
                $scope.getUserObj = aprv.getUserObj;
            }

            //是否是统一待办入口进入
            if (aprv.enterFromOa == null || aprv.enterFromOa == '' || aprv.enterFromOa == undefined) {
                $scope.enterFromOa = false;
            } else {
                $scope.enterFromOa = aprv.enterFromOa;
            }

            selectUser($scope.num, $scope.size, aprv.orgCode, aprv.roleCode, $scope.success, $("#realname").val());
        }
        $scope.indexdata();


        //下拉刷新
        $scope.func_refresh = function () {
            $scope.num = 0;
            $scope.indexdata(true);
        }

        //上拉加载更多
        $scope.loadMore = function () {
            /*$scope.num = $scope.msg.nextPage - 1
             $scope.finite_state = $scope.msg.hasNextPage;
             $scope.indexdata();*/
            $scope.num = $scope.num + 1;
            $scope.finite_state = false;
            $scope.indexdata();
        }

        // 重置
        $scope.func_reset = function () {
            document.getElementById("realname").value = "";
            //document.getElementById("loginName").value = "";
        };

        //  完成
        $scope.func_ok = function () {
            $scope.items = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };


        $scope.user = "";
        //选择用户
        $scope.selectUser = function (user) {
            $scope.user = user;

        }

        /*  $scope.success1 = function (msg) {
         if ('提交成功！' == msg) {
         shanxian("提交成功！");
         setTimeout(function () {
         $state.go("backlogList", {}, {
         reload: true
         });
         }, 2000);
         }
         }*/
        //var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        /* /!* 点击按钮 *!/
         $scope.submit = function () {
         var vo = sessionStorage.getItem("SynergyCluesCtrl.vo");
         var objVo = angular.fromJson(vo);
         var aprvOpns = sessionStorage.getItem("SynergyCluesCtrl.aprvOpns");
         //  console.log(SysServiceData('CRM', 'updateCstDataAppInfoPass', [vo, objVo.appID, 1, aprvOpns, $scope.user.userNum, $scope.user.realname, $scope.user.orgCode,person.userNum,person.realname,person.currentGroup.organization.orgCode]));
         AjaxJsonp(SysServiceData('CRM', 'updateCstDataAppInfoPass', [vo, objVo.appID, 1, aprvOpns, $scope.user.userNum, $scope.user.realname, $scope.user.orgCode, person.userNum, person.realname, person.currentGroup.organization.orgCode]), url.crm, $scope.success1);

         $(".btn-sumbit").css({"background": "#01B0E7"});
         setTimeout(function () {
         $(".btn-sumbit").css("background", "#01B0E7");
         }, 400);


         }*/

        $scope.submit1 = function () {
            var submitMethod = sessionStorage.getItem("submitMethod");
            if ($scope.getUserObj) {
                console.log($scope.users);
                $rootScope.$broadcast(submitMethod, $scope.users);
            } else {
                for (i = 0; i < $scope.users.length; i++) {
                    if ($scope.user == "") {
                        $scope.user = $scope.users[i];
                    } else {
                        $scope.user = $scope.user + "," + $scope.users[i];
                    }

                }
                $rootScope.$broadcast(submitMethod, $scope.user);
            }
        }

        //CheckBox记录选人信息
        $scope.users = [];
        $scope.selectedUser = function (user) {
            if ($scope.getUserObj) {
                if (user.checked) {
                    $scope.users.push(user);
                } else {
                    $scope.users.removeByValue(user);
                }
            } else {
                if (user.checked) {
                    $scope.users.push(user.userNum);
                } else {
                    $scope.users.removeByValue(user.userNum);
                }
            }
        }

    })
