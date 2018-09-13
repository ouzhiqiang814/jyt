// 总路由模块
angular.module('route', [
    'tab.route',
    'home.route',
    'chart.route',
    'companydata.route',
    'integralquery.route',
    'companycustomer.route',
    'personcustomer.route',
    'partner.route',
    'backlog.route',
    'clue.route',
    'personintegralquery.route',
    'organizationintegralquery.route',
    'foot.route',
    'index.route',
    'organizationdetailintegralquery.route',
    'persondata.route',
    'count.route',
    'moremenu.route',
    'finishedtask.route',
    'initClueList.route',
    'cst_vst.route',
    'finishedFlows.route',
    'alreadyBacklog.route',
    'querysprvinfpage.route',
    "product_query_list.route",
    'employee.route',
    'report.route',
])
    .config(function ($stateProvider, $urlRouterProvider) {

    // 第一次登陆
//  if(localStorage["isFirst"])
//  {
      $urlRouterProvider.otherwise('/foot/index');

      /*  $urlRouterProvider.otherwise('/');

        $stateProvider.state('page1', {
            url: '/',
            templateUrl: './page1.html',
            cache: false
        });

        $stateProvider.state('page2', {
            url: '/page2',

            templateUrl: './page2.html',
            cache: false
        });*/
//  }
//  else {
//    $urlRouterProvider.otherwise('/guidePage');
//  }


  });
