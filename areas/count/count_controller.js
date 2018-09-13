/**
 * Created by wjf on 2017/6/12.
 */
angular.module('count.controller', [])
    .controller('CountCtrl', function () {

        /*项目类型分布比例*/
        var pie1 = echarts.init(document.getElementById('radio'));

        var option1 = {
            title : {
                text: '项目类型分布比例',
                x:'left'
            },
            color:['#2EC7C9','#B6A2DE','#5AB1EF'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'数量',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    }
                },
                {
                    name:'数量',
                    type:'pie',
                    radius: ['40%', '55%'],

                    data:[
                        {value:2, name:'共同投资协同'},
                        {value:3, name:'推进协同'},
                        {value:18, name:'资源协同'}
                    ]
                }
            ]
        };

        pie1.setOption(option1);

        /*各子公司机会统计分析*/
        var pie2 = echarts.init(document.getElementById('histogram'));
        var option2 = {
            title : {
                text: '各子公司机会统计',
                x:'left'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            /*legend: {
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
            },*/
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLabel: {
                        interval: 0,
                        formatter:function(value)
                        {
                            return value.split("").join("\n");
                        }
                    },
                    data : ['开发公司','信托','集团本部','城市开发','金融学院','金圆置业']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    data:[320, 332, 301, 334, 390, 330]
                },
                {
                    name:'邮件营销',
                    type:'bar',
                    stack: '广告',
                    data:[120, 132, 101, 134, 90, 230]
                },
                {
                    name:'搜索引擎',
                    type:'bar',
                    data:[862, 1018, 964, 1026, 1679, 1600],
                },
            ]
        };
        pie2.setOption(option2);

        /*厦门市城市开发有限公司客户近十二个月增长情况*/
        var pie3 = echarts.init(document.getElementById('diagram'));
        var option3 = {
            title : {
                text: '厦门市城市开发有限公司客户\n近十二个月增长情况',
                x:'left'
            },
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLabel: {
                        interval:0,
                        rotate:40
                    },
                    data : ['201605','201606','201607','201608','201609','201610','201611','201612','201606','201701','201702','201703']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'总客户',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
                },
                {
                    name:'公司客户',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
                },
                {
                    name:'个人客户',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190]
                },
            ]
        };

        pie3.setOption(option3);

        /*集团各子公司客户数统计*/
        var pie4 = echarts.init(document.getElementById('histogram2'));
        var option4 = {
            title : {
                text: '集团各子公司客户数统计',
                x:'left'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisLabel: {
                        interval: 0,
                        formatter:function(value)
                        {
                            return value.split("").join("\n");
                        }
                    },
                    data : ['信托', '担保', '产业发展', '创投','集团本部', '开发公司', '资产管理','金融学院', '城市开发', '资本管理','金圆置业', '融资租赁', '金圆国际']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'总客户',
                    type:'bar',
                    data:[320, 332, 301, 334, 390, 330, 0, 0, 0, 0, 0, 0]
                },
                {
                    name:'公司客户',
                    type:'bar',
                    stack: '广告',
                    data:[120, 132, 101, 134, 90, 230, 0, 0, 0, 0, 0, 0]
                },
                {
                    name:'个人客户',
                    type:'bar',
                    data:[862, 1018, 964, 1026, 1679, 1600, 0, 0, 0, 0, 0, 0],
                },
            ]
        };
        pie4.setOption(option4);

        /*金圆集团客户区域分布-地图*/
        var pie5 = echarts.init(document.getElementById('map1'));
        var option5 = {
            title : {
                text: '金圆集团客户区域分布',
                x:'left'
            },
            tooltip : {
                trigger: 'item'
            },
            dataRange: {
                show: false,
                min: 0,
                max: 2500,
                x: 'left',
                y: 'bottom',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true
            },
            series : [
                {
                    name: '客户区域比例',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '河南',value: Math.round(Math.random()*1000)},
                        {name: '云南',value: Math.round(Math.random()*1000)},
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        {name: '黑龙江',value: Math.round(Math.random()*1000)},
                        {name: '湖南',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '山东',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '江苏',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '湖北',value: Math.round(Math.random()*1000)},
                        {name: '广西',value: Math.round(Math.random()*1000)},
                        {name: '甘肃',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '陕西',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '贵州',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '青海',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '海南',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
            ]
        };

        pie5.setOption(option5);


        var pie6 = echarts.init(document.getElementById('map2'));
        var option6 = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x : 'right',
                y : 'bottom',
                data:['湖北','上海','江西','福建','新疆']
            },
            calculable : true,
            series : [
                {
                    name:'面积模式',
                    type:'pie',
                    radius : [30, 110],
                    center : ['50%', 200],
                    roseType : 'area',
                    x: '50%',               // for funnel
                    max: 40,                // for funnel
                    sort : 'ascending',     // for funnel
                    data:[
                        {value:10, name:'湖北'},
                        {value:5, name:'上海'},
                        {value:15, name:'江西'},
                        {value:25, name:'福建'},
                        {value:20, name:'新疆'},
                    ]
                }
            ]
        };

        pie6.setOption(option6);

    })