angular.module('queryCoPtnerViewAply.controller', [])
    .controller('QueryCoPtnerViewAplyCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope, $ionicPopup, $ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

        show($ionicLoading);
        $("title").html("合作伙伴查看权限申请审批");
        if (approveItem == null) {
            approveItem = {
                businessKey: getQueryString("businessKey"),
                activityId: getQueryString("activityId"),
                taskId: getQueryString("taskId"),
                processInstanceId: getQueryString("processInstanceId"),
            }
            $scope.showHeader = false;
        } else {
            $scope.showHeader = true;
        }


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            goBackByNum(1);
        };


        function init(initRet) {
            $scope.activityId = approveItem.activityId;
            if (person == null && initRet != null) {
                person = initRet;
            }
            $scope.list1 = [];
            $scope.list2 = [];

            $scope.permissions = [];

            $scope.queryCooPtnCtcInfVOSuccess = function (msg) {
                $scope.baseData = angular.fromJson(msg.applyvo);
                $scope.$apply();

                $scope.queryCooPtnCtcInfVOSuccessMsg = msg;
                console.log(msg);
                console.log($scope.baseData);
                /* console.log(person);*/

                var gwf = $scope.baseData.nodeList
                //console.log(gwf);
                var a = 0;
                var b = 0;
                var gwf = $scope.baseData.nodeList
                for (var i = 0; i < gwf.length; i++) {
                    if (gwf[i].nodeParentId == 0) {
                        var parentJson = {
                            id: gwf[i].nodeId,
                            nodeName: gwf[i].nodeName,
                            sn: gwf[i].sn,
                            isCheck: false
                        };

                        if (gwf[i].isCheck != null && gwf[i].isCheck == 'y') {
                            parentJson.isCheck = true;
                            /*var node = {
                             authInd: 1,
                             bsnTpcd: gwf[i].nodeId,
                             sn: gwf[i].sn,
                             }
                             $scope.permissions.push(node);*/
                        }

                        $scope.list1.push(parentJson);

                        var iChildArray = [];
                        for (var j = 0; j < gwf.length; j++) {
                            if (gwf[i].nodeId == gwf[j].nodeParentId) {
                                var childJson = {
                                    id: gwf[j].nodeId,
                                    nodeName: gwf[j].nodeName,
                                    sn: gwf[j].sn,
                                    /* children: [],*/
                                    num: gwf[j].num,
                                    isCheck: false
                                };
                                if (gwf[j].isCheck != null && gwf[j].isCheck == 'y') {
                                    childJson.isCheck = true;
                                    /*  var node = {
                                     authInd: 1,
                                     bsnTpcd: gwf[j].nodeId,
                                     sn: gwf[j].sn,
                                     }
                                     $scope.permissions.push(node);*/
                                }
                                iChildArray.push(childJson);
                                var jChildArray = [];
                                for (var k = 0; k < gwf.length; k++) {
                                    if (gwf[j].nodeId == gwf[k].nodeParentId) {
                                        var childChildJson = {
                                            id: gwf[k].nodeId,
                                            nodeName: gwf[k].nodeName,
                                            sn: gwf[k].sn,
                                        };
                                        jChildArray.push(childChildJson);

                                    }
                                }

                                if (jChildArray.length > 0) {
                                    var children = {};
                                    children["children"] = jChildArray;
                                    childJson = $.extend(childJson, children, true);
                                }

                            }
                        }
                        if (iChildArray.length > 0) {
                            var children = {};
                            children["children"] = iChildArray;
                            parentJson = $.extend(parentJson, children, true);
                        }

                    }
                }
                $scope.$apply();
                $scope.dianji1 = function (data) {
                    var id = "div1" + data;
                    $("#" + id).slideToggle(300);
                }

            }

            AjaxJsonp(SysServiceData('CPC', 'queryCoPtnerViewAply', [approveItem.businessKey, approveItem.actLinkId, approveItem.TASKID, approveItem.processInstanceId, '', '<userNum>' + person.userNum + '</userNum>']), url.cpc, $scope.queryCooPtnCtcInfVOSuccess);


            $scope.selectedPermissions = function (isCheck, id, isLeaf) {
                /*   var node = {
                 authInd: authInd,
                 bsnTpcd: bsnTpcd,
                 sn: sn
                 }*/

                /*  if (isCheck) {
                 $scope.permissions.push(node);
                 } else {
                 $scope.permissions.removeObjByBsnTpcd(node);
                 }*/
                //如果是父节点
                if (!isLeaf) {
                    for (var i = 0; i < $scope.list1.length; i++) {
                        if ($scope.list1[i].id == id) {
                            if ($scope.list1[i].children != null) {
                                for (var j = 0; j < $scope.list1[i].children.length; j++) {
                                    if ($scope.list1[i].children[j].num > 0) {
                                        $scope.list1[i].children[j].isCheck = isCheck;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    var flagfj;
                    for (var i = 0; i < $scope.list1.length; i++) {
                        if ($scope.list1[i].id == 1000) {
                            if ($scope.list1[i].children != null) {
                                for (var j = 0; j < $scope.list1[i].children.length; j++) {
                                    if ($scope.list1[i].children[j].num > 0) {
                                        if ($scope.list1[i].children[j].isCheck == true) {
                                            flagfj = true;
                                            break
                                        } else {
                                            flagfj = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < $scope.list1.length; i++) {
                        if ($scope.list1[i].id == 1000) {
                            $scope.list1[i].isCheck = flagfj;
                        }
                    }

                }
            }


            $scope.rejectApply = function () {
                var confirmInfo = "确定拒绝该申请？";

                var confirmPopup = $ionicPopup.confirm({
                    title: '提示',
                    buttons: [
                        {text: '取消'},
                        {
                            text: '确认',
                            onTap: function (e) {
                                return true;
                            },
                            type: 'button-positive',
                        },
                    ],
                    template: confirmInfo
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $scope.commitAprvCoptnerviewAply(0);
                    }
                });
            }

            /**
             * 合作事项信息查看权限申请通过按钮
             * add by wangxiaohui 20170213
             * aprvResult:审批结果类型  0:通过；1：不通过
             */

            $scope.commitAprvCoptnerviewAply = function (aprvResultType) {
                show($ionicLoading);
                $scope.permissions = [];
                for (var i = 0; i < $scope.list1.length; i++) {
                    if ($scope.list1[i].isCheck) {
                        var node = {
                            authInd: 1,
                            bsnTpcd: $scope.list1[i].id,
                            sn: $scope.list1[i].sn
                        }
                        if ($scope.list1[i].id != 1000) {
                            $scope.permissions.push(node);
                        }
                    }
                    if ($scope.list1[i].children != null) {
                        for (var j = 0; j < $scope.list1[i].children.length; j++) {
                            if ($scope.list1[i].children[j].isCheck) {
                                var node = {
                                    authInd: 1,
                                    bsnTpcd: $scope.list1[i].children[j].id,
                                    sn: $scope.list1[i].children[j].sn
                                }
                                $scope.permissions.push(node);
                            }
                        }
                    }
                }


                //通过
                if (aprvResultType == 1) {
                    if ($scope.permissions.length <= 0) {
                        hide($ionicLoading);
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: "请至少选择一项需要提交申请查看的信息"
                        });
                        return;
                    }

                    if (!$('#authEndDt').val()) {
                        hide($ionicLoading);
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: "请选择权限有效期！"
                        });
                        return;
                    }
                }


                //权限标志集合------------------end----------------------------------------------------------

                var aprvCoPtnerViewAplyVo = {
                    'msgReqTpcd': '04', // 01：申请审批  02：合作事项流程移交     03：合作事项流程移交    04：查看申请权限审批完成
                    //合作事项权限信息表报文------------------start------------
                    "cooItemId": $scope.queryCooPtnCtcInfVOSuccessMsg.bizOptId,	//合作事项编号
                    //员工信息 add by wangxiaohui 20170203
                    "empeId": $scope.baseData.empeId,//申请员工编号
                    "deptId": $scope.baseData.deptId,//申请员工所属机构编号
                    "aprvEmpeId": person.userNum,//审批人编号
                    "aprvDeptId": person.currentGroup.blngDeptCode,//审批人所属机构编号
                    //"cooItemAuthInfList":cooItemAuthInfListArray,//权限标志集合
                    "authInd": '0',//权限标志
                    "authEndDt": $("#authEndDt").val(),//权限结束时间
                    "blngLglPsnId": "",//所属法人编号
                    "udtEmpId": person.userNum,//#更新员工编号
                    "udtInsId": person.currentGroup.blngDeptCode,//#更新机构编号
                    //合作事项权限信息表报文------------------start------------

                    //协同审批信息表报文---------------------start------------
                    "bsnEtyType": '50',//业务实体类型
                    "bsnEtyId": $scope.queryCooPtnCtcInfVOSuccessMsg.bizOptId,//业务实体编号
                    "aplyEmpId": $scope.baseData.empeId,//申请员工编号
                    "aplyInsId": $scope.baseData.deptId,//申请机构编号
                    "aprvInsId": person.currentGroup.blngDeptCode,//审批机构编号
                    "aprvEmpId": person.userNum,//审批员工编号
                    "aprvRoleId": person.currentGroup.blngPostCode,// 审批员工岗位ID
                    "aprvStCd": '0',// 审批状态代码	0:已审批；1：未审批
                    "actLinkId": 'PAR_AUTH_APPLY_2',// 审批环节代码	(提交申请：PAR_AUTH_APPLY_1    结束审批：PAR_AUTH_APPLY_2)
                    "aprvOpns": $("#aprvRmrk").val(), //审批意见
                    "aprvResult": aprvResultType, //	审批结果
                    "processInstanceId": approveItem.processInstanceId, //#任务实例ID
                    "taskId": approveItem.taskId, //#任务实例ID
                    "blngLglPsnID": "",//所属法人编号
                    "oprEmpId": person.userNum,//当前操作员编号
                    "oprInsId": person.currentGroup.blngDeptCode,//当前操作员所属机构编号
                    "oprRoleId": person.currentGroup.blngPostCode,//当前操作员角色编号
                    //协同审批信息表报文---------------------end------------

                    "cooItemAndEmpReTpCd": '10'
                };
                //将拼接的权限标志集合添加至请求报文体
                var cooItemAuthInfList = {};
                cooItemAuthInfList["cooItemAuthInfList"] = $scope.permissions;

                aprvCoPtnerViewAplyVo = $.extend(aprvCoPtnerViewAplyVo, cooItemAuthInfList, true);


                var sysUserVO = {
                    userNum: person.userNum,
                    currentGroup: {blngDeptCode: person.currentGroup.blngDeptCode},
                }


                AjaxJsonp(SysServiceData('CPC', 'commitCoPtnerViewAply', [jsonToXml(aprvCoPtnerViewAplyVo), jsonToXml(sysUserVO)]), url.cpc, function (responseVO) {
                    hide($ionicLoading);
                    if (responseVO.status != '200') {
                        var alertPopup = $ionicPopup.alert({
                            title: '提示',
                            template: "操作失败!"
                        });


                    } else {
                        if (aprvResultType == 1) {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '审批成功！您通过了该申请!'
                            });
                            alertPopup.then(function (res) {
                                goBackByNum(1);
                            });

                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: '提示',
                                template: '审批成功！您拒绝了该申请!'
                            });
                            alertPopup.then(function (res) {
                                goBackByNum(1);
                            });
                        }

                    }
                });
            }
        }

        if (person != null) {
            init();
        } else {
            getPerson1(getQueryString("loginName"), init);//160590（管护机构调整测试）150218
        }

    })