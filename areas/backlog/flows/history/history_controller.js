/**
 * Created by wjf on 2017/5/25.
 */
angular.module('history.controller', [])
    .controller('HistoryCtrl', function ($scope, $http, $state, $stateParams, $ionicLoading, $ionicSideMenuDelegate, $location, $timeout) {

        var approveItem = angular.fromJson(sessionStorage.getItem("approveItem"));

        var getcolprocinfVo = angular.fromJson(sessionStorage.getItem("historyData"));

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

        console.log(approveItem);

        //协同审批历史查询
        $scope.queryHistoryInfo = function () {
            AjaxJsonp(SysServiceData('CPC', 'doGetColProcInf', [jsonToXml(getcolprocinfVo)]), url.cpc, function (ret) {
                $scope.queryHistoryInfoDate = ret.data;
                console.log(ret.data);
                hide($ionicLoading);
                $scope.$apply();
            });
            //  var msg = {"data":[{"aprvList":[],"bsnEtyId":11032,"bsnEtyType":"10","endTm":"2017-09-07","prcDsc":"新建线索","prcSort":1,"procId":18,"processInstanceId":"240002","processTm":0,"stTm":"2017-09-07"},{"aprvList":[{"actLinkId":"CLM_APPLY_1","aprvDeptId":"015602","aprvEmpId":"00000033","aprvEmpNm":"王颖希","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvOpns":"1111","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12623,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-07 09:22","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11032,"bsnEtyType":"10","processInstanceId":"240002","procsNum":"100","taskId":"240011","tmPrd":"        0.0"}],"bsnEtyId":11032,"bsnEtyType":"10","endTm":"2017-09-07","prcDsc":"线索审批","prcSort":2,"procId":19,"processInstanceId":"240002","processTm":0,"rmrk1":"2","stTm":"2017-09-07"},{"aprvList":[{"actLinkId":"ACT_1","aprvDeptId":"015602","aprvEmpId":"00000707","aprvEmpNm":"丁亮","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvRoleId":"J000000001","aprvSn":12624,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:05","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"240025","tmPrd":"      361.7"}],"bsnEtyId":11013,"bsnEtyType":"20","endTm":"2017-09-22","prcDsc":"新建机会","prcSort":11,"procId":20,"processInstanceId":"240015","processTm":0,"stTm":"2017-09-22"},{"aprvList":[{"actLinkId":"ACT_2","aprvDeptId":"015602","aprvEmpId":"00000033","aprvEmpNm":"王颖希","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvOpns":"111","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12912,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:05","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"245656","tmPrd":"        0.0"},{"actLinkId":"ACT_3","aprvDeptId":"012005","aprvEmpId":"00001049","aprvEmpNm":"郑懋阳","aprvInsId":"0120","aprvInsNm":"担保-业务一部","aprvOpns":"111","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12913,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:06","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"245673","tmPrd":"        0.0"},{"actLinkId":"ACT_4","aprvDeptId":"015602","aprvEmpId":"00000707","aprvEmpNm":"丁亮","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvResult":"1","aprvResultDsc":"通过","aprvSn":12914,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:06","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":11013,"bsnEtyType":"20","processInstanceId":"240015","procsNum":"100","taskId":"245679","tmPrd":"        0.0"}],"bsnEtyId":11013,"bsnEtyType":"20","endTm":"2017-09-22","prcDsc":"机会认定","prcSort":12,"procId":21,"processInstanceId":"240015","processTm":0,"stTm":"2017-09-22"},{"aprvList":[{"actLinkId":"ACT_2","aprvDeptId":"012005","aprvEmpId":"00001049","aprvEmpNm":"郑懋阳","aprvInsId":"0120","aprvInsNm":"担保-业务一部","aprvSn":12916,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:08","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":10152,"bsnEtyType":"30","processInstanceId":"245685","procsNum":"100","taskId":"245703","tmPrd":"        0.0"},{"actLinkId":"ACT_3","aprvDeptId":"015602","aprvEmpId":"00000707","aprvEmpNm":"丁亮","aprvInsId":"0156","aprvInsNm":"城市开发-投资管理部","aprvSn":12918,"aprvStCd":"1","aprvStCdDsc":"已执行","aprvTm":"2017-09-22 11:10","aprvTpCd":"1","aprvTpCdDsc":"审批","bsnEtyId":10152,"bsnEtyType":"30","processInstanceId":"245685","procsNum":"100","taskId":"245709","tmPrd":"        0.0"}],"bsnEtyId":10152,"bsnEtyType":"30","endTm":"2017-09-22","prcDsc":"项目立项","prcSort":21,"procId":22,"processInstanceId":"245685","processTm":0,"stTm":"2017-09-22"},{"aprvList":[],"bsnEtyType":"30","prcDsc":"项目审批","prcSort":22,"procId":23,"processTm":0},{"aprvList":[],"bsnEtyId":10152,"bsnEtyType":"30","prcDsc":"合同签署","prcSort":23,"procId":24,"processInstanceId":"245685","processTm":0,"stTm":"2017-09-22"},{"aprvList":[],"bsnEtyType":"30","prcDsc":"结束","prcSort":100,"procId":25,"processTm":0}],"status":200};  $scope.queryHistoryInfoDate = msg.data;
        }
        $scope.queryHistoryInfo();

    })