angular.module("product_query_list.route", ["product_query_list.controller","productList.controller","product_edit_addaspd.controller"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('product_query_list', {
                url: '/product_query_list',
                templateUrl: 'areas/product_query_list/product_query_list.html',
                controller: 'Product_query_listCtrl',
                cache: true
            })
            .state('productList', {
                url: '/productList',
                templateUrl: 'areas/product_query_list/productList/productList.html',
                controller: 'ProductListCtrl',
                cache: false
            })
            .state('product_edit_addaspd', {
                url: '/product_edit_addaspd',
                templateUrl: 'areas/product_query_list/productList/product_edit_addaspd.html',
                controller: 'Product_edit_addaspdCtrl',
                cache: false
            })
    });
