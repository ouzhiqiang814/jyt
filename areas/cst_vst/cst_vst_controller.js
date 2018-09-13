/**
 * Created by wjf on 2017/5/25.
 */
angular.module('cst_vst.controller', [])
    .controller('Cst_vstCtrl', function($scope, $state, $http, $timeout, $ionicLoading, $ionicSideMenuDelegate, $stateParams,$ionicHistory) {
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));


        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function() {
                javascript:history.go(-1);
            }, 300);
        }

        show($ionicLoading);

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
        $scope.page = 0;
        $scope.size = 10;
        $scope.finite_state = false;

        $scope.cst_vstSuccess = function (msg) {
             console.log(angular.toJson(msg));
            if($scope.itemsFlag){
                $scope.xiangmu = [];
            }

            $scope.xiangmu.push.apply($scope.xiangmu, msg.list);

            setTimeout(function(){
                $scope.finite_state = msg.hasNextPage; //下一页
            },500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            $ionicLoading.hide();
        }

        $scope.indexdata = function (obj) {
            if(obj){
                $scope.itemsFlag = true;
            }else{
                $scope.itemsFlag = false;
            }
            var findCstVstInfVo = {
                vstSrcCd: '',
                srcBsnId: '',
                cstNm: cstNm.value,
                cstId: cstId.value,
                vstStTm: vstStTm.value,
                vstEdTm: vstEdTm.value,
                vstStCd: vstStCd.value,
                crtEmpId: '',
                crtEmpNm: '',
            }
            var sysUserVo = {
                userNum: person.userNum,
                currentGroup: {
                    blngLglpsnId: person.currentGroup.blngLglpsnId,
                    manageOrgCode: person.currentGroup.manageOrgCode
                }
            }

            AjaxJsonp(SysServiceData('CRM', 'findCstVstInf', [$scope.page, $scope.size, jsonToXml(findCstVstInfVo), jsonToXml(sysUserVo)]), url.crm, $scope.cst_vstSuccess);

        }

        $scope.indexdata();

        //下拉刷新
        $scope.func_refresh = function () {
            $scope.page = 0;
            $scope.indexdata(true);
        }
        //上拉加载更多
        $scope.loadMore = function () {
            $scope.page = $scope.page + 1;
            $scope.finite_state = false;
            $scope.indexdata();


        }

        $scope.func_reset = function () {
            document.getElementById("cstNm").value = "";
            document.getElementById("cstId").value = "";
            document.getElementById("vstStTm").value = "";
            document.getElementById("vstEdTm").value = "";
            document.getElementById("vstStCd").value = "";
        };

        $scope.func_ok = function () {
            $scope.xiangmu = [];
            show($ionicLoading);
            $scope.finite_state = false;
            $scope.indexdata();
            //$ionicSideMenuDelegate.toggleRight();
            $scope.guan();
        };




        /* 跳到需求调查详情页 */
        $scope.show_info = function (item) {
            var data = angular.toJson(item);
            sessionStorage.setItem("Cst_vst_addCtrl.cst_vst_show", data);

            $state.go("cst_vst_add", {}, {
                reload: true
            });
        }

    })


  /*  .controller('Cst_vstInfoCtrl', function($scope, $state, $http, $timeout, $ionicLoading, $ionicSideMenuDelegate, $stateParams,$ionicHistory) {
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function() {
                javascript:history.go(-1);
            }, 300);
        }

        $scope.cst_vstInfoSuccess = function (msg) {
            $scope.cst_vstInfoSuccessMsg = msg;
            console.log(2222);
            console.log(msg);

            $scope.cst_vstInfo = msg.content;
            console.log($scope.cst_vstInfo);

            $ionicLoading.hide();
        }

        //AjaxJsonp(SysServiceData('CPC', 'cst_vst', [approveItem.businessKey, approveItem.actLinkId, approveItem.TASKID, approveItem.processInstanceId, '']), url.cpc, $scope.cst_vstInfoSuccess);
        var msg = {"content":[{"blngLglPsnId":"12","crtEmpId":"00000707","crtEmpNm":"丁亮","cstId":"600003644217","cstNm":"张某某","cstPrvdInf":"sdfsdf","cstVstId":"CVST170731001099","execPlc":"sadf","nxtStepActn":"ssdfasf","vstMtdCd":"01","vstPpsCd":"01","vstSrcCd":"01","vstStCd":"02","vstTm":"2017-07-31","weSptOpin":"fsdf"},{"blngLglPsnId":"12","crtEmpId":"00000707","crtEmpNm":"丁亮","cstId":"600003644277","cstNm":"测试","cstPrvdInf":"fds","cstVstId":"CVST170727001035","execPlc":"fd","nxtStepActn":"sda","vstMtdCd":"01","vstPpsCd":"01","vstSrcCd":"01","vstStCd":"02","vstTm":"2017-07-27","weSptOpin":"fd"},{"blngLglPsnId":"12","crtEmpId":"00000707","crtEmpNm":"丁亮","cstId":"600003644231","cstNm":"412","cstPrvdInf":"拜访对象名称","cstVstId":"CVST170727000942","execPlc":"拜访对象名称","nxtStepActn":"拜访对象名称","vstMtdCd":"01","vstPpsCd":"01","vstSrcCd":"01","vstStCd":"02","vstTm":"2017-07-27","weSptOpin":"拜访对象名称"},{"blngLglPsnId":"12","crtEmpId":"00000707","crtEmpNm":"丁亮","cstVstId":"CVST170726000903","vstMtdCd":"01","vstPpsCd":"01","vstSrcCd":"01","vstStCd":"01"},{"blngLglPsnId":"12","crtEmpId":"00000707","crtEmpNm":"丁亮","cstId":"600000034550","cstNm":"金某某","cstPrvdInf":"2341","cstVstId":"CVST170726000902","execPlc":"31234","nxtStepActn":"3241234","vstMtdCd":"01","vstPpsCd":"01","vstSrcCd":"01","vstStCd":"02","vstTm":"2017-07-26","weSptOpin":"234"},{"blngLglPsnId":"12","crtEmpId":"00000707","crtEmpNm":"丁亮","cstId":"600000034567","cstPrvdInf":"wer","cstVstId":"CVST170725000881","execPlc":"erqwer","nxtStepActn":"werqwr","vstMtdCd":"01","vstPpsCd":"01","vstSrcCd":"01","vstStCd":"02","vstTm":"2017-07-25","weSptOpin":"wqer"},{"blngLglPsnId":"12","crtEmpId":"00000707","crtEmpNm":"丁亮","cstId":"600000034550","cstNm":"金某某","cstPrvdInf":"sdfasd","cstVstId":"CVST170720000822","execPlc":"dsasdf","nxtStepActn":"sdfsdf","vstMtdCd":"01","vstPpsCd":"01","vstSrcCd":"01","vstStCd":"02","vstTm":"2017-07-25","weSptOpin":"adfsdf"}],"endRow":7,"first":true,"firstPage":true,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":true,"isLastPage":true,"last":true,"lastPage":true,"list":[{"$ref":"$.content[0]"},{"$ref":"$.content[1]"},{"$ref":"$.content[2]"},{"$ref":"$.content[3]"},{"$ref":"$.content[4]"},{"$ref":"$.content[5]"},{"$ref":"$.content[6]"}],"navigatePages":8,"navigatepageNums":[1],"nextPage":0,"number":0,"numberOfElements":7,"pageNum":1,"pageSize":10,"pages":1,"prePage":0,"size":7,"startRow":1,"total":7,"totalElements":7,"totalPages":1};
        $scope.cst_vstInfoSuccess(msg);

    })*/
