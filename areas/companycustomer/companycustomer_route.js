angular.module("companycustomer.route",["companycustomer.controller","public_customers_list.controller"])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('companyCustomerList', {
                url: '/companyCustomerList',
                templateUrl: 'areas/companycustomer/list.html',
                controller: 'companyCustomerCtrl',
                cache:false
            })
            .state('companyCustomerInfo', {
                url: '/companyCustomerInfo/:data',
                templateUrl: 'areas/companycustomer/info.html',
                controller: 'companyCustomerInfoCtrl',
                cache:false
            })

            .state('public_customers_list', {
                url: '/public_customers_list',
                templateUrl: 'areas/companycustomer/public_customers_list/public_customers_list.html',
                controller: 'Public_customers_listCtrl',
                cache:false
            })



    });
