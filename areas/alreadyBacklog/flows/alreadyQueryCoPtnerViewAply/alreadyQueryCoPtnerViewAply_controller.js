
angular.module('alreadyQueryCoPtnerViewAply.controller', [])
    .controller('AlreadyQueryCoPtnerViewAplyCtrl', function ($scope, $state, GlobalVariable, $ionicBackdrop, $window, $timeout, $ionicHistory, $rootScope,$ionicLoading) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

        show($ionicLoading);

        $scope.processDefineName = approveItem.processDefineName;
        $scope.beginTime = approveItem.beginTime;
        $scope.activityName = approveItem.activityName;

        var params = null;

        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            //$ionicHistory.goBack();
            javascript:history.go(-1);
        };

        $scope.list1 = [];
        $scope.list2 = [];

        $scope.queryCooPtnCtcInfVOSuccess = function (msg) {

            $scope.baseData = angular.fromJson(msg.applyvo);
            $scope.$apply();

            $scope.queryCooPtnCtcInfVOSuccessMsg = msg;
            console.log(msg);
            console.log($scope.baseData);
            /* console.log(person);*/

            var doGetColAprvInfVO = {
                bsnEtyId:msg.bizOptId,
                bsnEtyType:'50',
                actLinkId:"PAR_AUTH_APPLY_2",
                processInstanceId:msg.processInstanceId,
            }


            AjaxJsonp(SysServiceData('CPC', 'doGetColAprvInf', [jsonToXml(doGetColAprvInfVO)]), url.cpc, function(ret){
                hide($ionicLoading);
                $scope.doGetColAprvInfRet = ret.data;
                console.log(ret.data);
                $scope.$apply();
                if(ret.data == null){
                    $("input[name='approve']").removeAttr("checked");
                }else{
                    $("input[name='approve'][value='"+ret.data.aprvResult+"']").prop("checked","checked");
                }
            });


            var  gwf = $scope.baseData.nodeList
            //console.log(gwf);
            var a = 0;
            var b = 0;
            var  gwf = $scope.baseData.nodeList
            for (var i = 0; i < gwf.length; i++){

                if(gwf[i].nodeParentId == 0){
                    var parentJson = {id: gwf[i].nodeId, nodeName: gwf[i].nodeName, sn: gwf[i].sn,isCheck:false,children:[]};
                    if(gwf[i].isCheck != null&& gwf[i].isCheck == 'y'){
                        parentJson.isCheck = true;
                    }
                    $scope.$apply(function () {
                        $scope.list1.push(parentJson);
                    })
                    for(var j = 0; j < gwf.length; j++){
                        if(gwf[i].nodeId ==  gwf[j].nodeParentId){
                            var childJson = {id: gwf[j].nodeId, nodeName: gwf[j].nodeName, sn: gwf[j].sn,children:[]};
                            $scope.$apply(function () {
                               parentJson.children.push(childJson);
                            })
                        }
                    }
                }
            }

            $scope.dianji1 = function(data){
                var id = "div1" + data;
                $("#" + id).slideToggle(300);
            }

        }

        AjaxJsonp(SysServiceData('CPC', 'queryCoPtnerViewAply', [approveItem.businessKey, approveItem.actLinkId, approveItem.TASKID, approveItem.processInstanceId, '','<userNum>'+person.userNum+'</userNum>']), url.cpc, $scope.queryCooPtnCtcInfVOSuccess);




      

    })