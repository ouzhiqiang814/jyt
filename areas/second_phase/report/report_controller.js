angular.module("report.controller", [])
    .controller("report", function ($scope, $state, $timeout, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory){
        console.log(1)
            var discountData = {};

            discountData.from = "";
    
            discountData.tableHeader = [
                ["Adults"],
                ["Kids 0-4 year-old"],
                ["Kids 5-10 years-old"]
            ];
    
            discountData.rows = [{
                "rowDesc": ["Discount per night in May"],
                "rowVal": [
                    ["10%", "14%", "12%"]
                ]
            }, {
                "rowDesc": ["Discount per night in June"],
                "rowVal": [
                    ["8%", "12%", "10%"]
                ]
            }];
    
            discountData.cellBreakpoints = {
                default: [0,0],
                small: [460, 2],
                medium: [640, 3],
                large: [820, 4],
                xlarge: [1080, 5]
            };
    
            discountData.descBreakpoints = {
                default: [0, 0],
                medium: [700, 220],
                large: [900, 360]
            };
    
            var pricelist = new Tabella(document.getElementById('tabella-rooms'), discountData);
    })