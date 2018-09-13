angular.module('calendar.controller', ['ionic', 'ngAnimate', 'ui.rCalendar'])
    .run(function ($ionicPlatform, $animate) {
        'use strict';
        $animate.enabled(false);
    })
    .controller("employeeCareCtrl",function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory){
        var date = new Date();
        var year = date.getFullYear();
        var month = fnZero(date.getMonth()+1);
        var day = fnZero(date.getDate());
        $scope.goBack = function () {
            hide($ionicLoading);
            hideCommon($ionicLoading);
            $timeout(function () {
                hide($ionicLoading);
                hideCommon($ionicLoading);
                javascript:history.go(-1);
            }, 300);
        }; 
 
        'use strict';

         $scope.calendar = {};
         $scope.changeMode = function (mode) {
             $scope.calendar.mode = mode;
         };
        //  $scope.calendar.eventSource = createRandomEvents();

        function fnZero(s) {
            return s < 10 ? '0' + s: s;
        }

        function fnTanDate(time){
            return (time.split('/')[2] + '-' + time.split('/')[1] + '-' + time.split('/')[0]) 
        }

        function fnPushState(el){
            if(el == '成功'){
                return true;
            }
            else{
                return false;
            }
        }
        function fnPushStateBtn(el){
            if(el == '成功'){
                return false;
            }
            else{
                return true;
            }
        }

        function fnParseInt(e,rank){
            if(rank == 1){
                return (parseInt(e.split('/')[rank]) - 1)
            }else{
                return (parseInt(e.split('/')[rank]))
            }
            
        }

         $scope.onEventSelected = function (event) {
             console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
             console.log(event)
             sessionStorage.setItem("eventJson", JSON.stringify(event));
             
             $state.go("careDels", {
                // data:event
            }, {
                reload: true
            });

         };
         
        $scope.fnInitData = function (){
            var time = day + '/' + month + '/' + year; 
            fnGetData(time)
            show($ionicLoading)
            // $scope.calendar.eventSource = createRandomEvents();
        }

        function fnGetData(time,selectedTime){
            var urlStr = url.careList + '?createTm=' + time;
            // $scope.calendar.eventSource = createRandomEvents(selectedTime,time);
            fnAjaxJson('',urlStr,function(ret){
                $scope.calendar.eventSource = fnEvents(ret,selectedTime)   
                hide($ionicLoading)             
            }); 
        }

        var eventsArr = [];
        
        function fnEvents(data,selectedTime){
            eventsArr = [];
            console.log(data.empeCareTblVOList.length)
            for(let i=0;i<data.empeCareTblVOList.length;i++){
                var dates = new Date(selectedTime) 
                console.log(dates)
                var startTime = new Date(Date.UTC(dates.getUTCFullYear(), dates.getUTCMonth(), dates.getUTCDate()));
                var endTime = new Date(Date.UTC(dates.getUTCFullYear(), dates.getUTCMonth(), dates.getUTCDate()+1));
                eventsArr.push({
                    title: data.empeCareTblVOList[i].careParmTypeName,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    person:'',
                    createTime:fnTanDate(data.empeCareTblVOList[i].createTm),
                    pushTime:'',
                    time:fnTanDate(data.empeCareTblVOList[i].createTm),
                    ifPush:data.empeCareTblVOList[i].sndSttn,
                    pushState:fnPushState(data.empeCareTblVOList[i].sndSttn),
                    info:data.empeCareTblVOList[i].careComment,
                    pushStateBtn:fnPushStateBtn(data.empeCareTblVOList[i].sndSttn),
                    recipient:['']                      
                });
            }
            console.log(eventsArr)
            return eventsArr;            
        }

         $scope.onViewTitleChanged = function (title) {
             $scope.viewTitle = title;
         };
 
         $scope.today = function () {
             $scope.calendar.currentDate = new Date();
             var time = day + '/' + month + '/' + year; 
             fnGetData(time)
            //  $scope.calendar.eventSource = createRandomEvents();
         };
 
         $scope.isToday = function () {
             var today = new Date(),
                 currentCalendarDate = new Date($scope.calendar.currentDate);
 
             today.setHours(0, 0, 0, 0);
             currentCalendarDate.setHours(0, 0, 0, 0);
             return today.getTime() === currentCalendarDate.getTime();
         };
 
         $scope.onTimeSelected = function (selectedTime, events, disabled) {
            // $scope.calendar.eventSource = []; 
            var date = new Date(selectedTime)
            var time = fnZero(date.getDate()) + '/' + fnZero(date.getMonth()+1) + '/' + fnZero(date.getFullYear())
            // console.log(time)
            fnGetData(time,selectedTime)           
            //  $scope.calendar.eventSource = createRandomEvents(selectedTime,time);
            
         }; 
                 
         function createRandomEvents(selectedTime,time) {
            var events = [];
            for (var i = 0; i < 5; i += 1) {
                var dates = new Date(selectedTime);
                var startTime = new Date(Date.UTC(dates.getUTCFullYear(), dates.getUTCMonth(), dates.getUTCDate()));
                var endTime = new Date(Date.UTC(dates.getUTCFullYear(), dates.getUTCMonth(), dates.getUTCDate()+1));
                events.push({
                    title: 'All Day - ' + dates,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            }
            console.log(events)
            return events;
        }


    });
