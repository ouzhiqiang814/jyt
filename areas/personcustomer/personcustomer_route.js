angular.module("personcustomer.route",["personcustomer.controller","person_cust_search.controller"])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('personCustomerList', {
                url: '/personCustomerList',
                templateUrl: 'areas/personcustomer/list.html',
                controller: 'personCustomerCtrl',
                cache:false
            })
            .state('personCustomerInfo', {
                url: '/personCustomerInfo:data',
                templateUrl: 'areas/personcustomer/info.html',
                controller: 'personCustomerInfoCtrl',
                cache:false
            })
            .state('person_cust_search', {
                url: '/person_cust_search',
                templateUrl: 'areas/personcustomer/person_cust_search/person_cust_search.html',
                controller: 'Person_cust_searchCtrl',
                cache:false
            })
    });
