angular.module('uncompleteSupervision.controller', [])
    .controller('uncompleteSupervisionCtrl', function($scope,$ionicLoading,$timeout){
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        };

        show($ionicLoading);

        // 获取未完成反馈
        $scope.items = [];
        var page = 0;
        var size = 10;
        $scope.finite_state = false;
        var itemsFlag = true;
        
        $scope.fnGetData = function (){
            var url = '/cpc/api/queryColSprvItmInf?page='+ page +'&size='+size;
            fnAjaxJson('',url,fnPushData,'','','')
        }

        //展示数据
        function fnPushData(data){
            if(itemsFlag){
                $scope.items = [];
            }
            console.log($scope.items.length)
            for(let i=0;i<data.pageInfo.content.length;i++){
                var list = {
                    person:data.pageInfo.content[i].fdbkPsnNm,
                    time:data.pageInfo.content[i].complTm,
                    type:data.pageInfo.content[i].mtgTpCdNm,
                    state:data.pageInfo.content[i].complSttnCdNm,
                    info:data.pageInfo.content[i].hisComplCmnt,
                    dsc : data.pageInfo.content[i].mtgItmDsc
                };
                $scope.$apply(function () {
                    $scope.items.push(list);
                });
            }
            setTimeout(function(){
                $scope.finite_state = data.pageInfo.hasNextPage;
            },500);
            $scope.$apply();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
            hide($ionicLoading);

        }

        //上拉加载更多
        $scope.fnLoadMore = function(){
            page = page + 1;
            $scope.finite_state = false;
            itemsFlag = false
            url = '/cpc/api/queryColSprvItmInf?page='+ page +'&size='+size;
            fnAjaxJson('',url,fnPushData,'','','')
        }

        //下拉刷新
        $scope.fnRefresh = function(){
            page = 0;
            itemsFlag = true;
            url = '/cpc/api/queryColSprvItmInf?page='+ page +'&size='+size;
            fnAjaxJson('',url,fnPushData,'','','')
        }


    })