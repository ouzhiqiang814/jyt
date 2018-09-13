angular.module('supervisionStatistics.controller',[])
    .controller('supervisionStatisticsCtrl', function($scope,$timeout,$ionicLoading,$state){
        var person = angular.fromJson(sessionStorage.getItem("sysUserVoJson"));
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        };

        //获取数据
        $scope.fnGetData = function (){
        var url = '/cpc/api/queryTotal4App';
        fnAjaxJson('',url,fnPushData,'items',true,'supervision')

     
        }

        //加载数据
        function fnPushData(data,itemName,hasCharts,chartId,nextFn){
            var legendData = [];
            var seriesData = [];
            var itemsData = [];
            for(let i=0;i<data.colSprvTotalVoList.length;i++){
                legendData.push(data.colSprvTotalVoList[i].complSttnNm);
                seriesData.push({
                    value:data.colSprvTotalVoList[i].total,
                    name:data.colSprvTotalVoList[i].complSttnNm
                });
                itemsData.push({
                    title:fnEmpty(data.colSprvTotalVoList[i].complSttnNm),
                    value:data.colSprvTotalVoList[i].total,
                    point:fnPointNum(data.colSprvTotalVoList[i].ratio)
                })
            }

            var myChart = echarts.init(document.getElementById(chartId)); 
            
            var option = {
                legend: {
                    orient : 'horizontal',
                    x : 'center',
                    y : 'top',
                    data:legendData
                },
                color:['#f8e182','#2ec7c9','#5ab1ef','#d87a80','#b6a2de'],
                animation:false,
                calculable : true,
                series : [
                    {
                        name:'会议督办统计',
                        type:'pie',
                        radius : '70%',
                        center: ['50%', '50%'],
                        data:seriesData
                    }
                ]
            };
            myChart.setOption(option);
            $scope.items = itemsData;
        }

        // 为空返回为‘未知’
        function fnEmpty(e){
            var emptyStr = '未知'
            if(e == ''){
                return emptyStr;
            }
            else{
                return e;
            }
        }

        function fnPointNum(num){
            num = num * 100;
            num = num.toFixed(2);
            return (num + '%')
            
        }

        $scope.fnGetDels = function(item){
            var list = {
                userNum : '00000162',
                loginName: '140180'
                
            }
            var dels = angular.toJson(list);
            $state.go("supervisionStatisticsInfo", {
                data:dels
            }, {
                reload: true
            });
        }
    })
    .controller('supervisionStatisticsInfoCtrl', function($scope, $ionicLoading, $timeout, $stateParams){
        var psn = angular.fromJson($stateParams.data);
        console.log(psn)
        $scope.goBack = function () {
			hide($ionicLoading);
			hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        };

        $scope.fnGetData = function(){
            $scope.items = [
                {
                    person:'张XX',
                    deparment:'财务部',
                    time:'2018-05-02',
                    type:'其他'
                }, 
                {
                    person:'张XX',
                    deparment:'财务部',
                    time:'2018-05-02',
                    type:'其他'
                }   
            ]
        }


        $scope.selectedType = {
            title:'全部类型',
            value:0
        }

        $scope.types = [
            {
                title:'全部类型',
                value:0
            },
            {
                title:'类型1',
                value:1
            },
            {
                title:'类型二',
                value:3
            }
        ] 

        $scope.selectChange = function(value){

            console.log(value)
        }
    })