/**
 * Created by wjf on 2017/6/12.
 */
angular.module('count.route', ['count.controller']).config(function($stateProvider) {
    $stateProvider
        .state('foot.count', {
            url: "/count",
            views:{
                'foot-count': {
                    templateUrl: 'areas/count/count.html',
                    controller: 'CountCtrl'
                }
            }
        })
})