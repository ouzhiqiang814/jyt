angular.module("report.controller", [])
    .controller("report", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory){
        console.log(1)
        var discountData = {};

        discountData.from = "";

        discountData.tableHeader = [
            ["Adults"],
            ["Kids"],
            ["Kids "]
        ];

        discountData.rows = [{
            "rowVal": [
                ["10%", "14%", "12%"]
            ]
        }, {
            "rowVal": [
                ["8%", "12%", "10%"]
            ]
        }];

        // discountData.cellBreakpoints = {
        //     default: [0, 1],
        //     small: [460, 2],
        //     medium: [640, 3],
        //     large: [820, 4],
        //     xlarge: [1080, 5]
        // };

        // discountData.descBreakpoints = {
        //     default: [0, 0],
        //     medium: [700, 220],
        //     large: [900, 360]
        // };

        var pricelist = new Tabella(document.getElementById('tabella-rooms'), discountData);
    })