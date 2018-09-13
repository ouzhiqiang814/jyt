angular.module('index.controller', ['index.service'])
    //.controller('IndexCtrl', ["$scope","$rootScope", "$state", "GlobalVariable", "$window", "$cordovaVibration", "$ionicModal","$ionicPopup", function ($scope,$rootScope, $state, GlobalVariable, $window, $cordovaVibration, $ionicModal,$ionicPopup){
    .controller('IndexCtrl', function ($scope, $rootScope, $state, GlobalVariable, $window, $cordovaVibration, $ionicModal,$ionicPopup){

        //getHeaderSlideData()
        //headerChangeColor();
        function init(msg) {




            /*菜单*/
            $scope.nav_list = [{
                href: 'backlogList',
                img_src: 'img/index/nav0.png',
                title: '待办事项'
            }, {
                href: 'alreadyBacklog',
                img_src: 'img/index/nav1.png',
                title: '已办事项'
            }, {
                href: 'partnerList',
                img_src: 'img/index/nav2.png',
                title: '合作伙伴'
            }, {
                href: 'clue({data:3})',
                img_src: 'img/index/nav3.png',
                title: '项目查询'
            }, {
                href: 'clue({data:2})',
                img_src: 'img/index/nav4.png',
                title: '机会查询'
            }, {
                href: 'clue({data:1})',
                img_src: 'img/index/nav5.png',
                title: '线索查询'
            }, {
                href: 'companyCustomerList',
                img_src: 'img/index/nav6.png',
                title: '客户查询'
            }/*, {
                href: 'moremenu',
                img_src: 'img/index/nav7.png',
                title: '更多'
            }*/]


            //任务列表
            $scope.todo_list = [{
                year: '2017',
                time: '05.31',
                color: '#FF5357',
                title: '协同项目审批',
                content: '厦门金圆担保公司协同关于xxx的协同项目',
                name: '张茂宜',
            }, {
                year: '2017',
                time: '06.01',
                color: '#53ACFF',
                title: "厦门金圆担保公司协同",
                content: '厦门金圆担保公司协同关于xxx的协同项目',
                name: '张茂宜',
            }, {
                year: '2017',
                time: '05.31',
                color: '#53ACFF',
                title: "厦门金圆担保公司协同",
                content: '厦门金圆担保公司协同关于xxx的协同项目需要作出处理',
                name: '张茂宜',
            }, {
                year: '2017',
                time: '05.31',
                color: '#53ACFF',
                title: "厦门金圆担保公司协同",
                content: '厦门金圆担保公司协同关于xxx的协同项目需要作出处理',
                name: '张茂宜',
            }];

            $scope.show_list = function () {

                MXWebui.closeWindow();
            };

            $scope.switchPosition = function () {
                alert(1);
            }
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });


console.log(msg);
            $scope.position = msg;
            var position = $scope.position;
            sessionStorage.setItem("sysUserVoJson", JSON.stringify(position));

       /*     var xotree = new XML.ObjTree();
            var jsonText = sessionStorage.getItem("sysUserVoJson");
            var json = eval("(" + jsonText + ")");
            var xml = xotree.writeXML(json);
            var xmlText = formatXml(xml);
            sessionStorage.setItem("sysUserVoXml", xmlText);
            //	console.log(xmlText);


            var dt = sessionStorage.getItem("sysUserVoXml");*/
            /* --end-- 积分明细查询  */
        }

       /* document.addEventListener("deviceready", onDeviceReady, false); //等待cordova加载
        function onDeviceReady() {
            MXCommon.getCurrentUser(
                function (result) {
                    getPerson1(result.login_name, init);
                }
            );
            //如果需要页面加载完成后，就调用平台的API，必须加在此处。加在onload里面不行。
        }*/
      //  test();
         getPerson1("130073",init);//160590（管护机构调整测试）150218   150230  160613  140181 140180
        //getPerson("110031");//110031王颖希   160600郑路平   080244   150394丁亮   160622  120052  949004  120058
    } )
