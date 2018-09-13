angular.module('chart.controller', [])
	.controller('ChartCtrl', function($scope) {

		$scope.datas = [{
			value: "散点图",
			id: "1"
		}, {
			value: "折线图",
			id: "2"
		}, {
			value: "柱状图",
			id: "3"
		}, {
			value: "地图",
			id: "4"
		}, {
			value: "雷达",
			id: "5"
		}, {
			//			value: "k线图",
			//			id: "6"
			//		}, {
			//			value: "箱线图",
			//			id: "7"
			//		}, {
			//			value: "热力图",
			//			id: "8"
			//		}, {
			value: "关系图",
			id: "9"
		}, {
			//			value: "矩形树图",
			//			id: "10"
			//		}, {
			//			value: "平行坐标",
			//			id: "11"
			//		}, {
			//			value: "桑基图",
			//			id: "12"
			//		}, {
			value: "漏斗图",
			id: "13"
		}, {
			value: "仪表图",
			id: "14"
		}];
	})

.controller('pieCtrl', function($scope, $ionicPopover, $ionicPopup) {
	//echarts
	var pie1 = echarts.init(document.getElementById('pie1'));
	var pie2 = echarts.init(document.getElementById('pie2'));

	option = {
		title: {
			text: '客户分布饼图',
			subtext: '客户分布',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['东南', '西南', '东北', '西北', '华南']
		},
		series: [{
			name: '客户分布',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [{
				value: 335,
				name: '东南'
			}, {
				value: 310,
				name: '西南'
			}, {
				value: 234,
				name: '东北'
			}, {
				value: 135,
				name: '西北'
			}, {
				value: 1548,
				name: '华南'
			}],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	pie1.setOption(option)

	option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		title: {
			text: '建行东南地区业务分部',
			subtext: '纯属虚构',
			x: 'center'
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: ['福州分区', '厦门分区', '泉州分区', '漳州分区', '深圳分区', '广州分区', '惠州分区', '杭州分区', '温州分区', '其他']
		},
		series: [{
			name: '子公司',
			type: 'pie',
			selectedMode: 'single',
			radius: [0, '35%'],
			center: ['60%', '55%'],
			label: {
				normal: {
					position: 'inner'
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
				value: 335,
				name: '福建省',
				selected: true
			}, {
				value: 679,
				name: '浙江省'
			}, {
				value: 1548,
				name: '广东省'
			}]
		}, {
			name: '子公司',
			type: 'pie',
			radius: ['45%', '65%'],
			center: ['60%', '55%'],
			data: [{
				value: 335,
				name: '福州分区'
			}, {
				value: 310,
				name: '厦门分区'
			}, {
				value: 234,
				name: '泉州分区'
			}, {
				value: 135,
				name: '深圳分区'
			}, {
				value: 1048,
				name: '广州分区'
			}, {
				value: 251,
				name: '杭州分区'
			}, {
				value: 147,
				name: '温州分区'
			}, {
				value: 102,
				name: '其他'
			}]
		}]
	};
	pie2.setOption(option)

	$scope.popover = $ionicPopover.fromTemplateUrl('areas/popover/operate.html', {
		scope: $scope
	});

	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('areas/popover/operate.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});

	// 清除浮动框
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
	// 在隐藏浮动框后执行
	$scope.$on('popover.hidden', function() {
		// 执行代码
	});
	// 移除浮动框后执行
	$scope.$on('popover.removed', function() {
		// 执行代码
	});

	$scope.onSwipeRight = function($event) {
		$scope.popover.show($event);
	}

	pie1.on('click', function(params) {
		// 控制台打印数据的名称
		// 自定义弹窗
		var myPopup = $ionicPopup.show({
			template: '<b>' + params.name + '</b>',
			scope: $scope,
			buttons: [{
				text: '关闭'
			}]
		});
	});
	
	$scope.func_zan = function(){
		$scope.popover.hide();
		alert("你点了赞");
	}

})

.controller('scatterCtrl', function($scope) {

	var scatter1 = echarts.init(document.getElementById('scatter1'));
	var scatter2 = echarts.init(document.getElementById('scatter2'));

	var data = [
		[
			[28604, 77, 17096869, '金融一部', 1990],
			[31516, 68, 115460577, '金融二部', 1990],
			[29476, 77.1, 56943299, '金融三部', 1990],
			[1777, 57.7, 870601776, '金融四部', 1990],
			[12087, 72, 42972254, '金融五部', 1990],
			[20088, 70.8, 38195258, '金融六部', 1990],
			[23670, 67.3, 53994605, '金融七部', 1990],
			[48666, 78.1, 25483021, '金融八部', 1990],
			[43296, 76.8, 424037512, '金融九部', 1990]
		],
		[
			[48056, 81.8, 239689732, '金融一部', 2015],
			[21291, 78.5, 11389562, '金融二部', 2015],
			[37599, 81.9, 64395345, '金融三部', 2015],
			[40053, 81.1, 806885451, '金融四部', 2015],
			[5903, 66.8, 1311050527, '金融五部', 2015],
			[36162, 83.5, 126573481, '金融六部', 2015],
			[24787, 77.3, 38611794, '金融七部', 2015],
			[23038, 73.13, 143456918, '金融八部', 2015],
			[19360, 76.5, 78665830, '金融九部', 2015]
		]
	];

	option = {
		backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
			offset: 0,
			color: '#f7f8fa'
		}, {
			offset: 1,
			color: '#cdd0d5'
		}]),
		title: {
			text: '1990 与 2015 年各子公司业绩'
		},
		legend: {
			right: 5,
			data: ['1990', '2015']
		},
		xAxis: {
			splitLine: {
				lineStyle: {
					type: 'dashed'
				}
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					type: 'dashed'
				}
			},
			scale: true
		},
		series: [{
			name: '1990',
			data: data[0],
			type: 'scatter',
			symbolSize: function(data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function(param) {
						return param.data[3];
					},
					position: 'top'
				}
			},
			itemStyle: {
				normal: {
					shadowBlur: 10,
					shadowColor: 'rgba(120, 36, 50, 0.5)',
					shadowOffsetY: 5,
					color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
						offset: 0,
						color: 'rgb(251, 118, 123)'
					}, {
						offset: 1,
						color: 'rgb(204, 46, 72)'
					}])
				}
			}
		}, {
			name: '2015',
			data: data[1],
			type: 'scatter',
			symbolSize: function(data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function(param) {
						return param.data[3];
					},
					position: 'top'
				}
			},
			itemStyle: {
				normal: {
					shadowBlur: 10,
					shadowColor: 'rgba(25, 100, 150, 0.5)',
					shadowOffsetY: 5,
					color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
						offset: 0,
						color: 'rgb(129, 227, 238)'
					}, {
						offset: 1,
						color: 'rgb(25, 183, 207)'
					}])
				}
			}
		}]
	};

	scatter1.setOption(option)

	var dataAll = [
		[
			[10.0, 8.04],
			[8.0, 6.95],
			[13.0, 7.58],
			[9.0, 8.81],
			[11.0, 8.33],
			[14.0, 9.96],
			[6.0, 7.24],
			[4.0, 4.26],
			[12.0, 10.84],
			[7.0, 4.82],
			[5.0, 5.68]
		],
		[
			[10.0, 9.14],
			[8.0, 8.14],
			[13.0, 8.74],
			[9.0, 8.77],
			[11.0, 9.26],
			[14.0, 8.10],
			[6.0, 6.13],
			[4.0, 3.10],
			[12.0, 9.13],
			[7.0, 7.26],
			[5.0, 4.74]
		],
		[
			[10.0, 7.46],
			[8.0, 6.77],
			[13.0, 12.74],
			[9.0, 7.11],
			[11.0, 7.81],
			[14.0, 8.84],
			[6.0, 6.08],
			[4.0, 5.39],
			[12.0, 8.15],
			[7.0, 6.42],
			[5.0, 5.73]
		],
		[
			[8.0, 6.58],
			[8.0, 5.76],
			[8.0, 7.71],
			[8.0, 8.84],
			[8.0, 8.47],
			[8.0, 7.04],
			[8.0, 5.25],
			[19.0, 12.50],
			[8.0, 5.56],
			[8.0, 7.91],
			[8.0, 6.89]
		]
	];

	var markLineOpt = {
		animation: false,
		label: {
			normal: {
				formatter: 'y = 0.5 * x + 3',
				textStyle: {
					align: 'right'
				}
			}
		},
		lineStyle: {
			normal: {
				type: 'solid'
			}
		},
		tooltip: {
			formatter: 'y = 0.5 * x + 3'
		},
		data: [
			[{
				coord: [0, 3],
				symbol: 'none'
			}, {
				coord: [20, 13],
				symbol: 'none'
			}]
		]
	};

	option = {
		title: {
			text: '金融二部三月份业绩',
			x: 'center',
			y: 0
		},
		grid: [{
			x: '7%',
			y: '7%',
			width: '38%',
			height: '38%'
		}, {
			x2: '7%',
			y: '7%',
			width: '38%',
			height: '38%'
		}, {
			x: '7%',
			y2: '7%',
			width: '38%',
			height: '38%'
		}, {
			x2: '7%',
			y2: '7%',
			width: '38%',
			height: '38%'
		}],
		tooltip: {
			formatter: 'Group {a}: ({c})'
		},
		xAxis: [{
			gridIndex: 0,
			min: 0,
			max: 20
		}, {
			gridIndex: 1,
			min: 0,
			max: 20
		}, {
			gridIndex: 2,
			min: 0,
			max: 20
		}, {
			gridIndex: 3,
			min: 0,
			max: 20
		}],
		yAxis: [{
			gridIndex: 0,
			min: 0,
			max: 15
		}, {
			gridIndex: 1,
			min: 0,
			max: 15
		}, {
			gridIndex: 2,
			min: 0,
			max: 15
		}, {
			gridIndex: 3,
			min: 0,
			max: 15
		}],
		series: [{
			name: 'I',
			type: 'scatter',
			xAxisIndex: 0,
			yAxisIndex: 0,
			data: dataAll[0],
			markLine: markLineOpt
		}, {
			name: 'II',
			type: 'scatter',
			xAxisIndex: 1,
			yAxisIndex: 1,
			data: dataAll[1],
			markLine: markLineOpt
		}, {
			name: 'III',
			type: 'scatter',
			xAxisIndex: 2,
			yAxisIndex: 2,
			data: dataAll[2],
			markLine: markLineOpt
		}, {
			name: 'IV',
			type: 'scatter',
			xAxisIndex: 3,
			yAxisIndex: 3,
			data: dataAll[3],
			markLine: markLineOpt
		}]
	};
	scatter2.setOption(option)

})

.controller('lineCtrl', function($scope) {

	var line1 = echarts.init(document.getElementById('line1'));
	var line2 = echarts.init(document.getElementById('line2'));

	option = {
		title: {
			//			text: '堆叠区域图'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['金融一部', '金融二部', '金融三部', '金融四部', '金融五部']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['2000', '2011', '2012', '2013', '2014', '2015', '2016']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '金融一部',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [120, 132, 101, 134, 90, 230, 210]
		}, {
			name: '金融二部',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [220, 182, 191, 234, 290, 330, 310]
		}, {
			name: '金融三部',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [150, 232, 201, 154, 190, 330, 410]
		}, {
			name: '金融四部',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [320, 332, 301, 334, 390, 330, 320]
		}, {
			name: '金融五部',
			type: 'line',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			areaStyle: {
				normal: {}
			},
			data: [820, 932, 901, 934, 1290, 1330, 1320]
		}]
	};

	line1.setOption(option)

	var base = +new Date(1968, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var date = [];

	var data = [Math.random() * 300];

	for(var i = 1; i < 20000; i++) {
		var now = new Date(base += oneDay);
		date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
		data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
	}

	option = {
		tooltip: {
			trigger: 'axis',
			position: function(pt) {
				return [pt[0], '10%'];
			}
		},
		title: {
			left: 'center',
			text: '金融一部2016年度营销面积图',
		},
		toolbox: {
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: date
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
		},
		dataZoom: [{
			type: 'inside',
			start: 0,
			end: 10
		}, {
			start: 0,
			end: 10,
			handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			handleSize: '80%',
			handleStyle: {
				color: '#fff',
				shadowBlur: 3,
				shadowColor: 'rgba(0, 0, 0, 0.6)',
				shadowOffsetX: 2,
				shadowOffsetY: 2
			}
		}],
		series: [{
			name: '模拟数据',
			type: 'line',
			smooth: true,
			symbol: 'none',
			sampling: 'average',
			itemStyle: {
				normal: {
					color: 'rgb(255, 70, 131)'
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgb(255, 158, 68)'
					}, {
						offset: 1,
						color: 'rgb(255, 70, 131)'
					}])
				}
			},
			data: data
		}]
	};
	line2.setOption(option)
})

.controller('barCtrl', function($scope) {
	var bar1 = echarts.init(document.getElementById('bar1'));
	var bar2 = echarts.init(document.getElementById('bar2'));

	var dataAxis = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
	var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149];
	var yMax = 500;
	var dataShadow = [];

	for(var i = 0; i < data.length; i++) {
		dataShadow.push(yMax);
	}

	option = {
		title: {
			text: '金融一部2016年度业绩',
			subtext: ''
		},
		xAxis: {
			data: dataAxis,
			axisLabel: {
				inside: false,
				textStyle: {
					color: '#000'
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			}
		},
		dataZoom: [{
			type: 'inside'
		}],
		series: [{ // For shadow
			type: 'bar',
			itemStyle: {
				normal: {
					color: 'rgba(0,0,0,0.05)'
				}
			},
			barGap: '-100%',
			barCategoryGap: '40%',
			data: dataShadow,
			animation: false
		}, {
			type: 'bar',
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
							offset: 0,
							color: '#83bff6'
						}, {
							offset: 0.5,
							color: '#188df0'
						}, {
							offset: 1,
							color: '#188df0'
						}]
					)
				},
				emphasis: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
							offset: 0,
							color: '#2378f7'
						}, {
							offset: 0.7,
							color: '#2378f7'
						}, {
							offset: 1,
							color: '#83bff6'
						}]
					)
				}
			},
			data: data
		}]
	};

	// Enable data zoom when user click bar.
	var zoomSize = 6;
	bar1.on('click', function(params) {
		console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
		bar1.dispatchAction({
			type: 'dataZoom',
			startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
			endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
		});
	});

	bar1.setOption(option)

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: ['金融一部', '金融二部', '金融三部', '金融四部', '金融五部', '金融六部', '金融七部', '金融八部', '其他']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '金融一部',
			type: 'bar',
			data: [320, 332, 301, 334, 390, 330, 320]
		}, {
			name: '金融二部',
			type: 'bar',
			stack: '广告',
			data: [120, 132, 101, 134, 90, 230, 210]
		}, {
			name: '金融三部',
			type: 'bar',
			stack: '广告',
			data: [220, 182, 191, 234, 290, 330, 310]
		}, {
			name: '金融四部',
			type: 'bar',
			stack: '广告',
			data: [150, 232, 201, 154, 190, 330, 410]
		}, {
			name: '金融五部',
			type: 'bar',
			data: [862, 1018, 964, 1026, 1679, 1600, 1570],
			markLine: {
				lineStyle: {
					normal: {
						type: 'dashed'
					}
				},
				data: [
					[{
						type: 'min'
					}, {
						type: 'max'
					}]
				]
			}
		}, {
			name: '金融六部',
			type: 'bar',
			barWidth: 5,
			stack: '业绩',
			data: [620, 732, 701, 734, 1090, 1130, 1120]
		}, {
			name: '金融七部',
			type: 'bar',
			stack: '业绩',
			data: [120, 132, 101, 134, 290, 230, 220]
		}, {
			name: '金融八部',
			type: 'bar',
			stack: '业绩',
			data: [60, 72, 71, 74, 190, 130, 110]
		}, {
			name: '其他',
			type: 'bar',
			stack: '业绩',
			data: [62, 82, 91, 84, 109, 110, 120]
		}]
	};
	bar2.setOption(option)
})

.controller('mapCtrl', function($scope) {
	var map1 = echarts.init(document.getElementById('map1'));
	var map2 = echarts.init(document.getElementById('map2'));

	var geoCoordMap = {
		'上海': [121.4648, 31.2891],
		'东莞': [113.8953, 22.901],
		'东营': [118.7073, 37.5513],
		'中山': [113.4229, 22.478],
		'临汾': [111.4783, 36.1615],
		'临沂': [118.3118, 35.2936],
		'丹东': [124.541, 40.4242],
		'丽水': [119.5642, 28.1854],
		'乌鲁木齐': [87.9236, 43.5883],
		'佛山': [112.8955, 23.1097],
		'保定': [115.0488, 39.0948],
		'兰州': [103.5901, 36.3043],
		'包头': [110.3467, 41.4899],
		'北京': [116.4551, 40.2539],
		'北海': [109.314, 21.6211],
		'南京': [118.8062, 31.9208],
		'南宁': [108.479, 23.1152],
		'南昌': [116.0046, 28.6633],
		'南通': [121.1023, 32.1625],
		'厦门': [118.1689, 24.6478],
		'台州': [121.1353, 28.6688],
		'合肥': [117.29, 32.0581],
		'呼和浩特': [111.4124, 40.4901],
		'咸阳': [108.4131, 34.8706],
		'哈尔滨': [127.9688, 45.368],
		'唐山': [118.4766, 39.6826],
		'嘉兴': [120.9155, 30.6354],
		'大同': [113.7854, 39.8035],
		'大连': [122.2229, 39.4409],
		'天津': [117.4219, 39.4189],
		'太原': [112.3352, 37.9413],
		'威海': [121.9482, 37.1393],
		'宁波': [121.5967, 29.6466],
		'宝鸡': [107.1826, 34.3433],
		'宿迁': [118.5535, 33.7775],
		'常州': [119.4543, 31.5582],
		'广州': [113.5107, 23.2196],
		'廊坊': [116.521, 39.0509],
		'延安': [109.1052, 36.4252],
		'张家口': [115.1477, 40.8527],
		'徐州': [117.5208, 34.3268],
		'德州': [116.6858, 37.2107],
		'惠州': [114.6204, 23.1647],
		'成都': [103.9526, 30.7617],
		'扬州': [119.4653, 32.8162],
		'承德': [117.5757, 41.4075],
		'拉萨': [91.1865, 30.1465],
		'无锡': [120.3442, 31.5527],
		'日照': [119.2786, 35.5023],
		'昆明': [102.9199, 25.4663],
		'杭州': [119.5313, 29.8773],
		'枣庄': [117.323, 34.8926],
		'柳州': [109.3799, 24.9774],
		'株洲': [113.5327, 27.0319],
		'武汉': [114.3896, 30.6628],
		'汕头': [117.1692, 23.3405],
		'江门': [112.6318, 22.1484],
		'沈阳': [123.1238, 42.1216],
		'沧州': [116.8286, 38.2104],
		'河源': [114.917, 23.9722],
		'泉州': [118.3228, 25.1147],
		'泰安': [117.0264, 36.0516],
		'泰州': [120.0586, 32.5525],
		'济南': [117.1582, 36.8701],
		'济宁': [116.8286, 35.3375],
		'海口': [110.3893, 19.8516],
		'淄博': [118.0371, 36.6064],
		'淮安': [118.927, 33.4039],
		'深圳': [114.5435, 22.5439],
		'清远': [112.9175, 24.3292],
		'温州': [120.498, 27.8119],
		'渭南': [109.7864, 35.0299],
		'湖州': [119.8608, 30.7782],
		'湘潭': [112.5439, 27.7075],
		'滨州': [117.8174, 37.4963],
		'潍坊': [119.0918, 36.524],
		'烟台': [120.7397, 37.5128],
		'玉溪': [101.9312, 23.8898],
		'珠海': [113.7305, 22.1155],
		'盐城': [120.2234, 33.5577],
		'盘锦': [121.9482, 41.0449],
		'石家庄': [114.4995, 38.1006],
		'福州': [119.4543, 25.9222],
		'秦皇岛': [119.2126, 40.0232],
		'绍兴': [120.564, 29.7565],
		'聊城': [115.9167, 36.4032],
		'肇庆': [112.1265, 23.5822],
		'舟山': [122.2559, 30.2234],
		'苏州': [120.6519, 31.3989],
		'莱芜': [117.6526, 36.2714],
		'菏泽': [115.6201, 35.2057],
		'营口': [122.4316, 40.4297],
		'葫芦岛': [120.1575, 40.578],
		'衡水': [115.8838, 37.7161],
		'衢州': [118.6853, 28.8666],
		'西宁': [101.4038, 36.8207],
		'西安': [109.1162, 34.2004],
		'贵阳': [106.6992, 26.7682],
		'连云港': [119.1248, 34.552],
		'邢台': [114.8071, 37.2821],
		'邯郸': [114.4775, 36.535],
		'郑州': [113.4668, 34.6234],
		'鄂尔多斯': [108.9734, 39.2487],
		'重庆': [107.7539, 30.1904],
		'金华': [120.0037, 29.1028],
		'铜川': [109.0393, 35.1947],
		'银川': [106.3586, 38.1775],
		'镇江': [119.4763, 31.9702],
		'长春': [125.8154, 44.2584],
		'长沙': [113.0823, 28.2568],
		'长治': [112.8625, 36.4746],
		'阳泉': [113.4778, 38.0951],
		'青岛': [120.4651, 36.3373],
		'韶关': [113.7964, 24.7028]
	};

	var BJData = [
		[{
			name: '北京'
		}, {
			name: '上海',
			value: 95
		}],
		[{
			name: '北京'
		}, {
			name: '广州',
			value: 90
		}],
		[{
			name: '北京'
		}, {
			name: '大连',
			value: 80
		}],
		[{
			name: '北京'
		}, {
			name: '南宁',
			value: 70
		}],
		[{
			name: '北京'
		}, {
			name: '南昌',
			value: 60
		}],
		[{
			name: '北京'
		}, {
			name: '拉萨',
			value: 50
		}],
		[{
			name: '北京'
		}, {
			name: '长春',
			value: 40
		}],
		[{
			name: '北京'
		}, {
			name: '包头',
			value: 30
		}],
		[{
			name: '北京'
		}, {
			name: '重庆',
			value: 20
		}],
		[{
			name: '北京'
		}, {
			name: '常州',
			value: 10
		}]
	];

	var SHData = [
		[{
			name: '上海'
		}, {
			name: '包头',
			value: 95
		}],
		[{
			name: '上海'
		}, {
			name: '昆明',
			value: 90
		}],
		[{
			name: '上海'
		}, {
			name: '广州',
			value: 80
		}],
		[{
			name: '上海'
		}, {
			name: '郑州',
			value: 70
		}],
		[{
			name: '上海'
		}, {
			name: '长春',
			value: 60
		}],
		[{
			name: '上海'
		}, {
			name: '重庆',
			value: 50
		}],
		[{
			name: '上海'
		}, {
			name: '长沙',
			value: 40
		}],
		[{
			name: '上海'
		}, {
			name: '北京',
			value: 30
		}],
		[{
			name: '上海'
		}, {
			name: '丹东',
			value: 20
		}],
		[{
			name: '上海'
		}, {
			name: '大连',
			value: 10
		}]
	];

	var GZData = [
		[{
			name: '广州'
		}, {
			name: '福州',
			value: 95
		}],
		[{
			name: '广州'
		}, {
			name: '太原',
			value: 90
		}],
		[{
			name: '广州'
		}, {
			name: '长春',
			value: 80
		}],
		[{
			name: '广州'
		}, {
			name: '重庆',
			value: 70
		}],
		[{
			name: '广州'
		}, {
			name: '西安',
			value: 60
		}],
		[{
			name: '广州'
		}, {
			name: '成都',
			value: 50
		}],
		[{
			name: '广州'
		}, {
			name: '常州',
			value: 40
		}],
		[{
			name: '广州'
		}, {
			name: '北京',
			value: 30
		}],
		[{
			name: '广州'
		}, {
			name: '北海',
			value: 20
		}],
		[{
			name: '广州'
		}, {
			name: '海口',
			value: 10
		}]
	];

	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var dataItem = data[i];
			var fromCoord = geoCoordMap[dataItem[0].name];
			var toCoord = geoCoordMap[dataItem[1].name];
			if(fromCoord && toCoord) {
				res.push({
					fromName: dataItem[0].name,
					toName: dataItem[1].name,
					coords: [fromCoord, toCoord]
				});
			}
		}
		return res;
	};

	var color = ['#a6c84c', '#ffa022', '#46bee9'];
	var series = [];
	[
		['北京', BJData],
		['上海', SHData],
		['广州', GZData]
	].forEach(function(item, i) {
		series.push({
			name: item[0] + ' Top10',
			type: 'lines',
			zlevel: 1,
			effect: {
				show: true,
				period: 6,
				trailLength: 0.7,
				color: '#fff',
				symbolSize: 3
			},
			lineStyle: {
				normal: {
					color: color[i],
					width: 0,
					curveness: 0.2
				}
			},
			data: convertData(item[1])
		}, {
			name: item[0] + ' Top10',
			type: 'lines',
			zlevel: 2,
			effect: {
				show: true,
				period: 6,
				trailLength: 0,
				symbol: planePath,
				symbolSize: 15
			},
			lineStyle: {
				normal: {
					color: color[i],
					width: 1,
					opacity: 0.4,
					curveness: 0.2
				}
			},
			data: convertData(item[1])
		}, {
			name: item[0] + ' Top10',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			zlevel: 2,
			rippleEffect: {
				brushType: 'stroke'
			},
			label: {
				normal: {
					show: true,
					position: 'right',
					formatter: '{b}'
				}
			},
			symbolSize: function(val) {
				return val[2] / 8;
			},
			itemStyle: {
				normal: {
					color: color[i]
				}
			},
			data: item[1].map(function(dataItem) {
				return {
					name: dataItem[1].name,
					value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
				};
			})
		});
	});

	option = {
		backgroundColor: '#404a59',
		title: {
			text: '模拟迁徙',
			subtext: '数据纯属虚构',
			left: 'center',
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			top: 'bottom',
			left: 'right',
			data: ['北京 Top10', '上海 Top10', '广州 Top10'],
			textStyle: {
				color: '#fff'
			},
			selectedMode: 'single'
		},
		geo: {
			map: 'china',
			label: {
				emphasis: {
					show: false
				}
			},
			roam: true,
			itemStyle: {
				normal: {
					areaColor: '#323c48',
					borderColor: '#404a59'
				},
				emphasis: {
					areaColor: '#2a333d'
				}
			}
		},
		series: series
	};

	//	map1.setOption(option);

	function randomData() {
		return Math.round(Math.random() * 1000);
	}

	option = {
		title: {
			text: '子公司业务分部',
			subtext: '纯属虚构',
			left: 'center'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['金融一部', '金融二部', '金融三部']
		},
		visualMap: {
			min: 0,
			max: 2500,
			left: 'left',
			top: 'bottom',
			text: ['高', '低'], // 文本，默认为数值文本
			calculable: true
		},
		toolbox: {
			show: true,
			orient: 'vertical',
			left: 'right',
			top: 'center',
			feature: {
				dataView: {
					readOnly: false
				},
				restore: {},
				saveAsImage: {}
			}
		},
		series: [{
			name: '金融一部',
			type: 'map',
			mapType: 'china',
			roam: false,
			label: {
				normal: {
					show: true
				},
				emphasis: {
					show: true
				}
			},
			data: [{
				name: '北京',
				value: randomData()
			}, {
				name: '天津',
				value: randomData()
			}, {
				name: '上海',
				value: randomData()
			}, {
				name: '重庆',
				value: randomData()
			}, {
				name: '河北',
				value: randomData()
			}, {
				name: '河南',
				value: randomData()
			}, {
				name: '云南',
				value: randomData()
			}, {
				name: '辽宁',
				value: randomData()
			}, {
				name: '黑龙江',
				value: randomData()
			}, {
				name: '湖南',
				value: randomData()
			}, {
				name: '安徽',
				value: randomData()
			}, {
				name: '山东',
				value: randomData()
			}, {
				name: '新疆',
				value: randomData()
			}, {
				name: '江苏',
				value: randomData()
			}, {
				name: '浙江',
				value: randomData()
			}, {
				name: '江西',
				value: randomData()
			}, {
				name: '湖北',
				value: randomData()
			}, {
				name: '广西',
				value: randomData()
			}, {
				name: '甘肃',
				value: randomData()
			}, {
				name: '山西',
				value: randomData()
			}, {
				name: '内蒙古',
				value: randomData()
			}, {
				name: '陕西',
				value: randomData()
			}, {
				name: '吉林',
				value: randomData()
			}, {
				name: '福建',
				value: randomData()
			}, {
				name: '贵州',
				value: randomData()
			}, {
				name: '广东',
				value: randomData()
			}, {
				name: '青海',
				value: randomData()
			}, {
				name: '西藏',
				value: randomData()
			}, {
				name: '四川',
				value: randomData()
			}, {
				name: '宁夏',
				value: randomData()
			}, {
				name: '海南',
				value: randomData()
			}, {
				name: '台湾',
				value: randomData()
			}, {
				name: '香港',
				value: randomData()
			}, {
				name: '澳门',
				value: randomData()
			}]
		}, {
			name: '金融二部',
			type: 'map',
			mapType: 'china',
			label: {
				normal: {
					show: true
				},
				emphasis: {
					show: true
				}
			},
			data: [{
				name: '北京',
				value: randomData()
			}, {
				name: '天津',
				value: randomData()
			}, {
				name: '上海',
				value: randomData()
			}, {
				name: '重庆',
				value: randomData()
			}, {
				name: '河北',
				value: randomData()
			}, {
				name: '安徽',
				value: randomData()
			}, {
				name: '新疆',
				value: randomData()
			}, {
				name: '浙江',
				value: randomData()
			}, {
				name: '江西',
				value: randomData()
			}, {
				name: '山西',
				value: randomData()
			}, {
				name: '内蒙古',
				value: randomData()
			}, {
				name: '吉林',
				value: randomData()
			}, {
				name: '福建',
				value: randomData()
			}, {
				name: '广东',
				value: randomData()
			}, {
				name: '西藏',
				value: randomData()
			}, {
				name: '四川',
				value: randomData()
			}, {
				name: '宁夏',
				value: randomData()
			}, {
				name: '香港',
				value: randomData()
			}, {
				name: '澳门',
				value: randomData()
			}]
		}, {
			name: '金融三部',
			type: 'map',
			mapType: 'china',
			label: {
				normal: {
					show: true
				},
				emphasis: {
					show: true
				}
			},
			data: [{
				name: '北京',
				value: randomData()
			}, {
				name: '天津',
				value: randomData()
			}, {
				name: '上海',
				value: randomData()
			}, {
				name: '广东',
				value: randomData()
			}, {
				name: '台湾',
				value: randomData()
			}, {
				name: '香港',
				value: randomData()
			}, {
				name: '澳门',
				value: randomData()
			}]
		}]
	};

	map1.setOption(option);
})

.controller('radarCtrl', function($scope) {
	var radar1 = echarts.init(document.getElementById('radar1'));
	var radar2 = echarts.init(document.getElementById('radar2'));

	var dataBJ = [
		[55, 9, 56, 0.46, 18, 6, 1],
		[25, 11, 21, 0.65, 34, 9, 2],
		[56, 7, 63, 0.3, 14, 5, 3],
		[33, 7, 29, 0.33, 16, 6, 4],
		[42, 24, 44, 0.76, 40, 16, 5],
		[82, 58, 90, 1.77, 68, 33, 6],
		[74, 49, 77, 1.46, 48, 27, 7],
		[78, 55, 80, 1.29, 59, 29, 8],
		[267, 216, 280, 4.8, 108, 64, 9],
		[185, 127, 216, 2.52, 61, 27, 10],
		[39, 19, 38, 0.57, 31, 15, 11],
		[41, 11, 40, 0.43, 21, 7, 12],
		[64, 38, 74, 1.04, 46, 22, 13],
		[108, 79, 120, 1.7, 75, 41, 14],
		[108, 63, 116, 1.48, 44, 26, 15],
		[33, 6, 29, 0.34, 13, 5, 16],
		[94, 66, 110, 1.54, 62, 31, 17],
		[186, 142, 192, 3.88, 93, 79, 18],
		[57, 31, 54, 0.96, 32, 14, 19],
		[22, 8, 17, 0.48, 23, 10, 20],
		[39, 15, 36, 0.61, 29, 13, 21],
		[94, 69, 114, 2.08, 73, 39, 22],
		[99, 73, 110, 2.43, 76, 48, 23],
		[31, 12, 30, 0.5, 32, 16, 24],
		[42, 27, 43, 1, 53, 22, 25],
		[154, 117, 157, 3.05, 92, 58, 26],
		[234, 185, 230, 4.09, 123, 69, 27],
		[160, 120, 186, 2.77, 91, 50, 28],
		[134, 96, 165, 2.76, 83, 41, 29],
		[52, 24, 60, 1.03, 50, 21, 30],
		[46, 5, 49, 0.28, 10, 6, 31]
	];

	var dataGZ = [
		[26, 37, 27, 1.163, 27, 13, 1],
		[85, 62, 71, 1.195, 60, 8, 2],
		[78, 38, 74, 1.363, 37, 7, 3],
		[21, 21, 36, 0.634, 40, 9, 4],
		[41, 42, 46, 0.915, 81, 13, 5],
		[56, 52, 69, 1.067, 92, 16, 6],
		[64, 30, 28, 0.924, 51, 2, 7],
		[55, 48, 74, 1.236, 75, 26, 8],
		[76, 85, 113, 1.237, 114, 27, 9],
		[91, 81, 104, 1.041, 56, 40, 10],
		[84, 39, 60, 0.964, 25, 11, 11],
		[64, 51, 101, 0.862, 58, 23, 12],
		[70, 69, 120, 1.198, 65, 36, 13],
		[77, 105, 178, 2.549, 64, 16, 14],
		[109, 68, 87, 0.996, 74, 29, 15],
		[73, 68, 97, 0.905, 51, 34, 16],
		[54, 27, 47, 0.592, 53, 12, 17],
		[51, 61, 97, 0.811, 65, 19, 18],
		[91, 71, 121, 1.374, 43, 18, 19],
		[73, 102, 182, 2.787, 44, 19, 20],
		[73, 50, 76, 0.717, 31, 20, 21],
		[84, 94, 140, 2.238, 68, 18, 22],
		[93, 77, 104, 1.165, 53, 7, 23],
		[99, 130, 227, 3.97, 55, 15, 24],
		[146, 84, 139, 1.094, 40, 17, 25],
		[113, 108, 137, 1.481, 48, 15, 26],
		[81, 48, 62, 1.619, 26, 3, 27],
		[56, 48, 68, 1.336, 37, 9, 28],
		[82, 92, 174, 3.29, 0, 13, 29],
		[106, 116, 188, 3.628, 101, 16, 30],
		[118, 50, 0, 1.383, 76, 11, 31]
	];

	var dataSH = [
		[91, 45, 125, 0.82, 34, 23, 1],
		[65, 27, 78, 0.86, 45, 29, 2],
		[83, 60, 84, 1.09, 73, 27, 3],
		[109, 81, 121, 1.28, 68, 51, 4],
		[106, 77, 114, 1.07, 55, 51, 5],
		[109, 81, 121, 1.28, 68, 51, 6],
		[106, 77, 114, 1.07, 55, 51, 7],
		[89, 65, 78, 0.86, 51, 26, 8],
		[53, 33, 47, 0.64, 50, 17, 9],
		[80, 55, 80, 1.01, 75, 24, 10],
		[117, 81, 124, 1.03, 45, 24, 11],
		[99, 71, 142, 1.1, 62, 42, 12],
		[95, 69, 130, 1.28, 74, 50, 13],
		[116, 87, 131, 1.47, 84, 40, 14],
		[108, 80, 121, 1.3, 85, 37, 15],
		[134, 83, 167, 1.16, 57, 43, 16],
		[79, 43, 107, 1.05, 59, 37, 17],
		[71, 46, 89, 0.86, 64, 25, 18],
		[97, 71, 113, 1.17, 88, 31, 19],
		[84, 57, 91, 0.85, 55, 31, 20],
		[87, 63, 101, 0.9, 56, 41, 21],
		[104, 77, 119, 1.09, 73, 48, 22],
		[87, 62, 100, 1, 72, 28, 23],
		[168, 128, 172, 1.49, 97, 56, 24],
		[65, 45, 51, 0.74, 39, 17, 25],
		[39, 24, 38, 0.61, 47, 17, 26],
		[39, 24, 39, 0.59, 50, 19, 27],
		[93, 68, 96, 1.05, 79, 29, 28],
		[188, 143, 197, 1.66, 99, 51, 29],
		[174, 131, 174, 1.55, 108, 50, 30],
		[187, 143, 201, 1.39, 89, 53, 31]
	];

	var lineStyle = {
		normal: {
			width: 1,
			opacity: 0.5
		}
	};

	option = {
		backgroundColor: '#161627',
		title: {
			text: '业务分部雷达图',
			left: 'center',
			textStyle: {
				color: '#eee'
			}
		},
		legend: {
			bottom: 5,
			data: ['北京', '上海', '广州'],
			itemGap: 20,
			textStyle: {
				color: '#fff',
				fontSize: 14
			},
			selectedMode: 'single'
		},
		radar: {
			indicator: [{
				name: '金融一部',
				max: 300
			}, {
				name: '金融二部',
				max: 250
			}, {
				name: '金融三部',
				max: 300
			}, {
				name: '金融四部',
				max: 5
			}, {
				name: '金融五部',
				max: 200
			}, {
				name: '金融六部',
				max: 100
			}],
			shape: 'circle',
			splitNumber: 5,
			name: {
				textStyle: {
					color: 'rgb(238, 197, 102)'
				}
			},
			splitLine: {
				lineStyle: {
					color: [
						'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
						'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
						'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
					].reverse()
				}
			},
			splitArea: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(238, 197, 102, 0.5)'
				}
			}
		},
		series: [{
			name: '北京',
			type: 'radar',
			lineStyle: lineStyle,
			data: dataBJ,
			symbol: 'none',
			itemStyle: {
				normal: {
					color: '#F9713C'
				}
			},
			areaStyle: {
				normal: {
					opacity: 0.1
				}
			}
		}, {
			name: '上海',
			type: 'radar',
			lineStyle: lineStyle,
			data: dataSH,
			symbol: 'none',
			itemStyle: {
				normal: {
					color: '#B3E4A1'
				}
			},
			areaStyle: {
				normal: {
					opacity: 0.05
				}
			}
		}, {
			name: '广州',
			type: 'radar',
			lineStyle: lineStyle,
			data: dataGZ,
			symbol: 'none',
			itemStyle: {
				normal: {
					color: 'rgb(238, 197, 102)'
				}
			},
			areaStyle: {
				normal: {
					opacity: 0.05
				}
			}
		}]
	};

	radar1.setOption(option);

	option = {
		title: {
			text: ''
		},
		tooltip: {},
		legend: {
			data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
		},
		radar: {
			// shape: 'circle',
			indicator: [{
				name: '金融一部',
				max: 6500
			}, {
				name: '金融二部',
				max: 16000
			}, {
				name: '金融三部',
				max: 30000
			}, {
				name: '金融四部',
				max: 38000
			}, {
				name: '金融五部',
				max: 52000
			}, {
				name: '金融六部',
				max: 25000
			}]
		},
		series: [{
			name: '预算 vs 开销（Budget vs spending）',
			type: 'radar',
			// areaStyle: {normal: {}},
			data: [{
				value: [4300, 10000, 28000, 35000, 50000, 19000],
				name: '预算分配（Allocated Budget）'
			}, {
				value: [5000, 14000, 28000, 31000, 42000, 21000],
				name: '实际开销（Actual Spending）'
			}]
		}]
	};
	radar2.setOption(option);
})

.controller('klineCtrl', function($scope) {
	var kline1 = echarts.init(document.getElementById('kline1'));
	var kline2 = echarts.init(document.getElementById('kline2'));

	function splitData(rawData) {
		var categoryData = [];
		var values = [];
		var volumns = [];
		for(var i = 0; i < rawData.length; i++) {
			categoryData.push(rawData[i].splice(0, 1)[0]);
			values.push(rawData[i]);
			volumns.push(rawData[i][4]);
		}
		return {
			categoryData: categoryData,
			values: values,
			volumns: volumns
		};
	}

	function calculateMA(dayCount, data) {
		var result = [];
		for(var i = 0, len = data.values.length; i < len; i++) {
			if(i < dayCount) {
				result.push('-');
				continue;
			}
			var sum = 0;
			for(var j = 0; j < dayCount; j++) {
				sum += data.values[i - j][1];
			}
			result.push(+(sum / dayCount).toFixed(3));
		}
		return result;
	}

	$.getJSON('data/stock-DJI.json', function(rawData) {

		var data = splitData(rawData);

		kline1.setOption(option = {
			backgroundColor: '#eee',
			animation: false,
			legend: {
				bottom: 10,
				left: 'center',
				data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line'
				}
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: false
					},
					brush: {
						type: ['lineX', 'clear']
					}
				}
			},
			brush: {
				xAxisIndex: 'all',
				brushLink: 'all',
				outOfBrush: {
					colorAlpha: 0.1
				}
			},
			grid: [{
				left: '10%',
				right: '8%',
				height: '50%'
			}, {
				left: '10%',
				right: '8%',
				top: '63%',
				height: '16%'
			}],
			xAxis: [{
				type: 'category',
				data: data.categoryData,
				scale: true,
				boundaryGap: false,
				axisLine: {
					onZero: false
				},
				splitLine: {
					show: false
				},
				splitNumber: 20,
				min: 'dataMin',
				max: 'dataMax'
			}, {
				type: 'category',
				gridIndex: 1,
				data: data.categoryData,
				scale: true,
				boundaryGap: false,
				axisLine: {
					onZero: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: false
				},
				splitNumber: 20,
				min: 'dataMin',
				max: 'dataMax'
			}],
			yAxis: [{
				scale: true,
				splitArea: {
					show: true
				}
			}, {
				scale: true,
				gridIndex: 1,
				splitNumber: 2,
				axisLabel: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				}
			}],
			dataZoom: [{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: 98,
				end: 100
			}, {
				show: true,
				xAxisIndex: [0, 1],
				type: 'slider',
				top: '85%',
				start: 98,
				end: 100
			}],
			series: [{
				name: 'Dow-Jones index',
				type: 'candlestick',
				data: data.values,
				itemStyle: {
					normal: {
						borderColor: null,
						borderColor0: null
					}
				},
				tooltip: {
					formatter: function(param) {
						var param = param[0];
						return [
							'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
							'Open: ' + param.data[0] + '<br/>',
							'Close: ' + param.data[1] + '<br/>',
							'Lowest: ' + param.data[2] + '<br/>',
							'Highest: ' + param.data[3] + '<br/>'
						].join('');
					}
				}
			}, {
				name: 'MA5',
				type: 'line',
				data: calculateMA(5, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}, {
				name: 'MA10',
				type: 'line',
				data: calculateMA(10, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}, {
				name: 'MA20',
				type: 'line',
				data: calculateMA(20, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}, {
				name: 'MA30',
				type: 'line',
				data: calculateMA(30, data),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}, {
				name: 'Volumn',
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: data.volumns
			}]
		}, true);

		kline1.dispatchAction({
			type: 'brush',
			areas: [{
				brushType: 'lineX',
				coordRange: ['2016-06-02', '2016-06-20'],
				xAxisIndex: 0
			}]
		});
	});

	function splitData0(rawData) {
		var categoryData = [];
		var values = []
		for(var i = 0; i < rawData.length; i++) {
			categoryData.push(rawData[i].splice(0, 1)[0]);
			values.push(rawData[i])
		}
		return {
			categoryData: categoryData,
			values: values
		};
	}

	var data0 = splitData0([
		['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
		['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
		['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
		['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
		['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
		['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
		['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
		['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
		['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
		['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
		['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
		['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
		['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
		['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
		['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
		['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
		['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
		['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
		['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
		['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
		['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
		['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
		['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
		['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
		['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
		['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
		['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
		['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
		['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
		['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
		['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
		['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
		['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
		['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
		['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
		['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
		['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
		['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
		['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
		['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
		['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
		['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
		['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
		['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
		['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
		['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
		['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
		['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
		['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
		['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
		['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
		['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
		['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
		['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
		['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
		['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
		['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
		['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
		['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
		['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
		['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
		['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
		['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
		['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
		['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
		['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
		['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
		['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
		['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
		['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
		['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
		['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
		['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
		['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
		['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
		['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
		['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
		['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
		['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
		['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
		['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
		['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
		['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
		['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
		['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
		['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
		['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
		['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
	]);

	option = {
		title: {
			text: '',
			left: 0
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'line'
			}
		},
		legend: {
			data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
		},
		grid: {
			left: '10%',
			right: '10%',
			bottom: '15%'
		},
		xAxis: {
			type: 'category',
			data: data0.categoryData,
			scale: true,
			boundaryGap: false,
			axisLine: {
				onZero: false
			},
			splitLine: {
				show: false
			},
			splitNumber: 20,
			min: 'dataMin',
			max: 'dataMax'
		},
		yAxis: {
			scale: true,
			splitArea: {
				show: true
			}
		},
		dataZoom: [{
			type: 'inside',
			start: 50,
			end: 100
		}, {
			show: true,
			type: 'slider',
			y: '90%',
			start: 50,
			end: 100
		}],
		series: [{
				name: '日K',
				type: 'candlestick',
				data: data0.values,
				markPoint: {
					label: {
						normal: {
							formatter: function(param) {
								return param != null ? Math.round(param.value) : '';
							}
						}
					},
					data: [{
						name: 'XX标点',
						coord: ['2013/5/31', 2300],
						value: 2300,
						itemStyle: {
							normal: {
								color: 'rgb(41,60,85)'
							}
						}
					}, {
						name: 'highest value',
						type: 'max',
						valueDim: 'highest'
					}, {
						name: 'lowest value',
						type: 'min',
						valueDim: 'lowest'
					}, {
						name: 'average value on close',
						type: 'average',
						valueDim: 'close'
					}],
					tooltip: {
						formatter: function(param) {
							return param.name + '<br>' + (param.data.coord || '');
						}
					}
				},
				markLine: {
					symbol: ['none', 'none'],
					data: [
						[{
							name: 'from lowest to highest',
							type: 'min',
							valueDim: 'lowest',
							symbol: 'circle',
							symbolSize: 10,
							label: {
								normal: {
									show: false
								},
								emphasis: {
									show: false
								}
							}
						}, {
							type: 'max',
							valueDim: 'highest',
							symbol: 'circle',
							symbolSize: 10,
							label: {
								normal: {
									show: false
								},
								emphasis: {
									show: false
								}
							}
						}], {
							name: 'min line on close',
							type: 'min',
							valueDim: 'close'
						}, {
							name: 'max line on close',
							type: 'max',
							valueDim: 'close'
						}
					]
				}
			}, {
				name: 'MA5',
				type: 'line',
				data: calculateMA(5, data0),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}, {
				name: 'MA10',
				type: 'line',
				data: calculateMA(10, data0),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}, {
				name: 'MA20',
				type: 'line',
				data: calculateMA(20, data0),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}, {
				name: 'MA30',
				type: 'line',
				data: calculateMA(30, data0),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			},

		]
	};

	kline2.setOption(option);

})

.controller('boxlineCtrl', function($scope) {
	var boxline1 = echarts.init(document.getElementById('boxline1'));
	var boxline2 = echarts.init(document.getElementById('boxline2'));

	var data = echarts.dataTool.prepareBoxplotData([
		[850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
		[960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
		[880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
		[890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
		[890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
	]);

	option = {
		title: [{
			text: 'Michelson-Morley Experiment',
			left: 'center',
		}, {
			text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
			borderColor: '#999',
			borderWidth: 1,
			textStyle: {
				fontSize: 14
			},
			left: '10%',
			top: '90%'
		}],
		tooltip: {
			trigger: 'item',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			left: '10%',
			right: '10%',
			bottom: '15%'
		},
		xAxis: {
			type: 'category',
			data: data.axisData,
			boundaryGap: true,
			nameGap: 30,
			splitArea: {
				show: false
			},
			axisLabel: {
				formatter: 'expr {value}'
			},
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			name: 'km/s minus 299,000',
			splitArea: {
				show: true
			}
		},
		series: [{
			name: 'boxplot',
			type: 'boxplot',
			data: data.boxData,
			tooltip: {
				formatter: function(param) {
					return [
						'Experiment ' + param.name + ': ',
						'upper: ' + param.data[4],
						'Q3: ' + param.data[3],
						'median: ' + param.data[2],
						'Q1: ' + param.data[1],
						'lower: ' + param.data[0]
					].join('<br/>')
				}
			}
		}, {
			name: 'outlier',
			type: 'scatter',
			data: data.outliers
		}]
	};

	boxline1.setOption(option);

	data = [];
	for(var seriesIndex = 0; seriesIndex < 5; seriesIndex++) {
		var seriesData = [];
		for(var i = 0; i < 18; i++) {
			var cate = [];
			for(var j = 0; j < 100; j++) {
				cate.push(Math.random() * 200);
			}
			seriesData.push(cate);
		}
		data.push(echarts.dataTool.prepareBoxplotData(seriesData));
	}

	option = {
		title: {
			text: 'Multiple Categories',
			left: 'center',
		},
		legend: {
			y: '10%',
			data: ['category0', 'category1', 'category2', 'category3']
		},
		tooltip: {
			trigger: 'item',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			left: '10%',
			top: '20%',
			right: '10%',
			bottom: '15%'
		},
		xAxis: {
			type: 'category',
			data: data[0].axisData,
			boundaryGap: true,
			nameGap: 30,
			splitArea: {
				show: true
			},
			axisLabel: {
				formatter: 'expr {value}'
			},
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			name: 'Value',
			min: -400,
			max: 600,
			splitArea: {
				show: false
			}
		},
		dataZoom: [{
			type: 'inside',
			start: 0,
			end: 20
		}, {
			show: true,
			height: 20,
			type: 'slider',
			top: '90%',
			xAxisIndex: [0],
			start: 0,
			end: 20
		}],
		series: [{
			name: 'category0',
			type: 'boxplot',
			data: data[0].boxData,
			tooltip: {
				formatter: formatter
			}
		}, {
			name: 'category1',
			type: 'boxplot',
			data: data[1].boxData,
			tooltip: {
				formatter: formatter
			}
		}, {
			name: 'category2',
			type: 'boxplot',
			data: data[2].boxData,
			tooltip: {
				formatter: formatter
			}
		}]
	};

	function formatter(param) {
		return [
			'Experiment ' + param.name + ': ',
			'upper: ' + param.data[0],
			'Q1: ' + param.data[1],
			'median: ' + param.data[2],
			'Q3: ' + param.data[3],
			'lower: ' + param.data[4]
		].join('<br/>')
	}
	boxline2.setOption(option);
})

.controller('hotCtrl', function($scope) {
	var hot1 = echarts.init(document.getElementById('hot1'));
	var hot2 = echarts.init(document.getElementById('hot2'));

	var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
		'7a', '8a', '9a', '10a', '11a',
		'12p', '1p', '2p', '3p', '4p', '5p',
		'6p', '7p', '8p', '9p', '10p', '11p'
	];
	var days = ['Saturday', 'Friday', 'Thursday',
		'Wednesday', 'Tuesday', 'Monday', 'Sunday'
	];

	var data = [
		[0, 0, 5],
		[0, 1, 1],
		[0, 2, 0],
		[0, 3, 0],
		[0, 4, 0],
		[0, 5, 0],
		[0, 6, 0],
		[0, 7, 0],
		[0, 8, 0],
		[0, 9, 0],
		[0, 10, 0],
		[0, 11, 2],
		[0, 12, 4],
		[0, 13, 1],
		[0, 14, 1],
		[0, 15, 3],
		[0, 16, 4],
		[0, 17, 6],
		[0, 18, 4],
		[0, 19, 4],
		[0, 20, 3],
		[0, 21, 3],
		[0, 22, 2],
		[0, 23, 5],
		[1, 0, 7],
		[1, 1, 0],
		[1, 2, 0],
		[1, 3, 0],
		[1, 4, 0],
		[1, 5, 0],
		[1, 6, 0],
		[1, 7, 0],
		[1, 8, 0],
		[1, 9, 0],
		[1, 10, 5],
		[1, 11, 2],
		[1, 12, 2],
		[1, 13, 6],
		[1, 14, 9],
		[1, 15, 11],
		[1, 16, 6],
		[1, 17, 7],
		[1, 18, 8],
		[1, 19, 12],
		[1, 20, 5],
		[1, 21, 5],
		[1, 22, 7],
		[1, 23, 2],
		[2, 0, 1],
		[2, 1, 1],
		[2, 2, 0],
		[2, 3, 0],
		[2, 4, 0],
		[2, 5, 0],
		[2, 6, 0],
		[2, 7, 0],
		[2, 8, 0],
		[2, 9, 0],
		[2, 10, 3],
		[2, 11, 2],
		[2, 12, 1],
		[2, 13, 9],
		[2, 14, 8],
		[2, 15, 10],
		[2, 16, 6],
		[2, 17, 5],
		[2, 18, 5],
		[2, 19, 5],
		[2, 20, 7],
		[2, 21, 4],
		[2, 22, 2],
		[2, 23, 4],
		[3, 0, 7],
		[3, 1, 3],
		[3, 2, 0],
		[3, 3, 0],
		[3, 4, 0],
		[3, 5, 0],
		[3, 6, 0],
		[3, 7, 0],
		[3, 8, 1],
		[3, 9, 0],
		[3, 10, 5],
		[3, 11, 4],
		[3, 12, 7],
		[3, 13, 14],
		[3, 14, 13],
		[3, 15, 12],
		[3, 16, 9],
		[3, 17, 5],
		[3, 18, 5],
		[3, 19, 10],
		[3, 20, 6],
		[3, 21, 4],
		[3, 22, 4],
		[3, 23, 1],
		[4, 0, 1],
		[4, 1, 3],
		[4, 2, 0],
		[4, 3, 0],
		[4, 4, 0],
		[4, 5, 1],
		[4, 6, 0],
		[4, 7, 0],
		[4, 8, 0],
		[4, 9, 2],
		[4, 10, 4],
		[4, 11, 4],
		[4, 12, 2],
		[4, 13, 4],
		[4, 14, 4],
		[4, 15, 14],
		[4, 16, 12],
		[4, 17, 1],
		[4, 18, 8],
		[4, 19, 5],
		[4, 20, 3],
		[4, 21, 7],
		[4, 22, 3],
		[4, 23, 0],
		[5, 0, 2],
		[5, 1, 1],
		[5, 2, 0],
		[5, 3, 3],
		[5, 4, 0],
		[5, 5, 0],
		[5, 6, 0],
		[5, 7, 0],
		[5, 8, 2],
		[5, 9, 0],
		[5, 10, 4],
		[5, 11, 1],
		[5, 12, 5],
		[5, 13, 10],
		[5, 14, 5],
		[5, 15, 7],
		[5, 16, 11],
		[5, 17, 6],
		[5, 18, 0],
		[5, 19, 5],
		[5, 20, 3],
		[5, 21, 4],
		[5, 22, 2],
		[5, 23, 0],
		[6, 0, 1],
		[6, 1, 0],
		[6, 2, 0],
		[6, 3, 0],
		[6, 4, 0],
		[6, 5, 0],
		[6, 6, 0],
		[6, 7, 0],
		[6, 8, 0],
		[6, 9, 0],
		[6, 10, 1],
		[6, 11, 0],
		[6, 12, 2],
		[6, 13, 1],
		[6, 14, 3],
		[6, 15, 4],
		[6, 16, 0],
		[6, 17, 0],
		[6, 18, 0],
		[6, 19, 0],
		[6, 20, 1],
		[6, 21, 2],
		[6, 22, 2],
		[6, 23, 6]
	];

	data = data.map(function(item) {
		return [item[1], item[0], item[2] || '-'];
	});

	option = {
		tooltip: {
			position: 'top'
		},
		animation: false,
		grid: {
			height: '50%',
			y: '10%'
		},
		xAxis: {
			type: 'category',
			data: hours,
			splitArea: {
				show: true
			}
		},
		yAxis: {
			type: 'category',
			data: days,
			splitArea: {
				show: true
			}
		},
		visualMap: {
			min: 0,
			max: 10,
			calculable: true,
			orient: 'horizontal',
			left: 'center',
			bottom: '15%'
		},
		series: [{
			name: 'Punch Card',
			type: 'heatmap',
			data: data,
			label: {
				normal: {
					show: true
				}
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	hot1.setOption(option);

	var noise = getNoiseHelper();
	var xData = [];
	var yData = [];
	noise.seed(Math.random());

	function generateData(theta, min, max) {
		var data = [];
		for(var i = 0; i <= 200; i++) {
			for(var j = 0; j <= 100; j++) {
				// var x = (max - min) * i / 200 + min;
				// var y = (max - min) * j / 100 + min;
				data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5]);
				// data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
			}
			yData.push(i);
			xData.push(i);
		}
		return data;
	}
	var data = generateData(2, -5, 5);

	option = {
		tooltip: {},
		grid: {
			right: 10,
			left: 140
		},
		xAxis: {
			type: 'category',
			data: xData
		},
		yAxis: {
			type: 'category',
			data: yData
		},
		visualMap: {
			type: 'piecewise',
			min: 0,
			max: 1,
			calculable: true,
			realtime: false,
			splitNumber: 8,
			inRange: {
				color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
			}
		},
		series: [{
			name: 'Gaussian',
			type: 'heatmap',
			data: data,
			itemStyle: {
				emphasis: {
					borderColor: '#333',
					borderWidth: 1
				}
			},
			progressive: 1000,
			animation: false
		}]
	};

	///////////////////////////////////////////////////////////////////////////
	// Simplex and perlin noise helper from https://github.com/josephg/noisejs
	///////////////////////////////////////////////////////////////////////////
	function getNoiseHelper(global) {

		var module = {};

		function Grad(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}

		Grad.prototype.dot2 = function(x, y) {
			return this.x * x + this.y * y;
		};

		Grad.prototype.dot3 = function(x, y, z) {
			return this.x * x + this.y * y + this.z * z;
		};

		var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
			new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
			new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)
		];

		var p = [151, 160, 137, 91, 90, 15,
			131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
			190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
			88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
			77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
			102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
			135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
			5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
			223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
			129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
			251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
			49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
			138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
		];
		// To remove the need for index wrapping, double the permutation table length
		var perm = new Array(512);
		var gradP = new Array(512);

		// This isn't a very good seeding function, but it works ok. It supports 2^16
		// different seed values. Write something better if you need more seeds.
		module.seed = function(seed) {
			if(seed > 0 && seed < 1) {
				// Scale the seed out
				seed *= 65536;
			}

			seed = Math.floor(seed);
			if(seed < 256) {
				seed |= seed << 8;
			}

			for(var i = 0; i < 256; i++) {
				var v;
				if(i & 1) {
					v = p[i] ^ (seed & 255);
				} else {
					v = p[i] ^ ((seed >> 8) & 255);
				}

				perm[i] = perm[i + 256] = v;
				gradP[i] = gradP[i + 256] = grad3[v % 12];
			}
		};

		module.seed(0);

		/*
		for(var i=0; i<256; i++) {
		  perm[i] = perm[i + 256] = p[i];
		  gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
		}*/

		// Skewing and unskewing factors for 2, 3, and 4 dimensions
		var F2 = 0.5 * (Math.sqrt(3) - 1);
		var G2 = (3 - Math.sqrt(3)) / 6;

		var F3 = 1 / 3;
		var G3 = 1 / 6;

		// 2D simplex noise
		module.simplex2 = function(xin, yin) {
			var n0, n1, n2; // Noise contributions from the three corners
			// Skew the input space to determine which simplex cell we're in
			var s = (xin + yin) * F2; // Hairy factor for 2D
			var i = Math.floor(xin + s);
			var j = Math.floor(yin + s);
			var t = (i + j) * G2;
			var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
			var y0 = yin - j + t;
			// For the 2D case, the simplex shape is an equilateral triangle.
			// Determine which simplex we are in.
			var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
			if(x0 > y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
				i1 = 1;
				j1 = 0;
			} else { // upper triangle, YX order: (0,0)->(0,1)->(1,1)
				i1 = 0;
				j1 = 1;
			}
			// A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
			// a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
			// c = (3-sqrt(3))/6
			var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
			var y1 = y0 - j1 + G2;
			var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
			var y2 = y0 - 1 + 2 * G2;
			// Work out the hashed gradient indices of the three simplex corners
			i &= 255;
			j &= 255;
			var gi0 = gradP[i + perm[j]];
			var gi1 = gradP[i + i1 + perm[j + j1]];
			var gi2 = gradP[i + 1 + perm[j + 1]];
			// Calculate the contribution from the three corners
			var t0 = 0.5 - x0 * x0 - y0 * y0;
			if(t0 < 0) {
				n0 = 0;
			} else {
				t0 *= t0;
				n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
			}
			var t1 = 0.5 - x1 * x1 - y1 * y1;
			if(t1 < 0) {
				n1 = 0;
			} else {
				t1 *= t1;
				n1 = t1 * t1 * gi1.dot2(x1, y1);
			}
			var t2 = 0.5 - x2 * x2 - y2 * y2;
			if(t2 < 0) {
				n2 = 0;
			} else {
				t2 *= t2;
				n2 = t2 * t2 * gi2.dot2(x2, y2);
			}
			// Add contributions from each corner to get the final noise value.
			// The result is scaled to return values in the interval [-1,1].
			return 70 * (n0 + n1 + n2);
		};

		// 3D simplex noise
		module.simplex3 = function(xin, yin, zin) {
			var n0, n1, n2, n3; // Noise contributions from the four corners

			// Skew the input space to determine which simplex cell we're in
			var s = (xin + yin + zin) * F3; // Hairy factor for 2D
			var i = Math.floor(xin + s);
			var j = Math.floor(yin + s);
			var k = Math.floor(zin + s);

			var t = (i + j + k) * G3;
			var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
			var y0 = yin - j + t;
			var z0 = zin - k + t;

			// For the 3D case, the simplex shape is a slightly irregular tetrahedron.
			// Determine which simplex we are in.
			var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
			var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
			if(x0 >= y0) {
				if(y0 >= z0) {
					i1 = 1;
					j1 = 0;
					k1 = 0;
					i2 = 1;
					j2 = 1;
					k2 = 0;
				} else if(x0 >= z0) {
					i1 = 1;
					j1 = 0;
					k1 = 0;
					i2 = 1;
					j2 = 0;
					k2 = 1;
				} else {
					i1 = 0;
					j1 = 0;
					k1 = 1;
					i2 = 1;
					j2 = 0;
					k2 = 1;
				}
			} else {
				if(y0 < z0) {
					i1 = 0;
					j1 = 0;
					k1 = 1;
					i2 = 0;
					j2 = 1;
					k2 = 1;
				} else if(x0 < z0) {
					i1 = 0;
					j1 = 1;
					k1 = 0;
					i2 = 0;
					j2 = 1;
					k2 = 1;
				} else {
					i1 = 0;
					j1 = 1;
					k1 = 0;
					i2 = 1;
					j2 = 1;
					k2 = 0;
				}
			}
			// A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
			// a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
			// a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
			// c = 1/6.
			var x1 = x0 - i1 + G3; // Offsets for second corner
			var y1 = y0 - j1 + G3;
			var z1 = z0 - k1 + G3;

			var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
			var y2 = y0 - j2 + 2 * G3;
			var z2 = z0 - k2 + 2 * G3;

			var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
			var y3 = y0 - 1 + 3 * G3;
			var z3 = z0 - 1 + 3 * G3;

			// Work out the hashed gradient indices of the four simplex corners
			i &= 255;
			j &= 255;
			k &= 255;
			var gi0 = gradP[i + perm[j + perm[k]]];
			var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
			var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
			var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];

			// Calculate the contribution from the four corners
			var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
			if(t0 < 0) {
				n0 = 0;
			} else {
				t0 *= t0;
				n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
			}
			var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
			if(t1 < 0) {
				n1 = 0;
			} else {
				t1 *= t1;
				n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
			}
			var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
			if(t2 < 0) {
				n2 = 0;
			} else {
				t2 *= t2;
				n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
			}
			var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
			if(t3 < 0) {
				n3 = 0;
			} else {
				t3 *= t3;
				n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
			}
			// Add contributions from each corner to get the final noise value.
			// The result is scaled to return values in the interval [-1,1].
			return 32 * (n0 + n1 + n2 + n3);

		};

		// ##### Perlin noise stuff

		function fade(t) {
			return t * t * t * (t * (t * 6 - 15) + 10);
		}

		function lerp(a, b, t) {
			return(1 - t) * a + t * b;
		}

		// 2D Perlin Noise
		module.perlin2 = function(x, y) {
			// Find unit grid cell containing point
			var X = Math.floor(x),
				Y = Math.floor(y);
			// Get relative xy coordinates of point within that cell
			x = x - X;
			y = y - Y;
			// Wrap the integer cells at 255 (smaller integer period can be introduced here)
			X = X & 255;
			Y = Y & 255;

			// Calculate noise contributions from each of the four corners
			var n00 = gradP[X + perm[Y]].dot2(x, y);
			var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
			var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
			var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

			// Compute the fade curve value for x
			var u = fade(x);

			// Interpolate the four results
			return lerp(
				lerp(n00, n10, u),
				lerp(n01, n11, u),
				fade(y));
		};

		// 3D Perlin Noise
		module.perlin3 = function(x, y, z) {
			// Find unit grid cell containing point
			var X = Math.floor(x),
				Y = Math.floor(y),
				Z = Math.floor(z);
			// Get relative xyz coordinates of point within that cell
			x = x - X;
			y = y - Y;
			z = z - Z;
			// Wrap the integer cells at 255 (smaller integer period can be introduced here)
			X = X & 255;
			Y = Y & 255;
			Z = Z & 255;

			// Calculate noise contributions from each of the eight corners
			var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
			var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
			var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
			var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
			var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
			var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
			var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
			var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);

			// Compute the fade curve value for x, y, z
			var u = fade(x);
			var v = fade(y);
			var w = fade(z);

			// Interpolate
			return lerp(
				lerp(
					lerp(n000, n100, u),
					lerp(n001, n101, u), w),
				lerp(
					lerp(n010, n110, u),
					lerp(n011, n111, u), w),
				v);
		};

		return module;
	}

	hot2.setOption(option);
})

.controller('relationCtrl', function($scope) {
	var relation1 = echarts.init(document.getElementById('relation1'));
	var relation2 = echarts.init(document.getElementById('relation2'));

	relation1.showLoading();
	$.get('data/les-miserables.gexf', function(xml) {
		relation1.hideLoading();

		var graph = echarts.dataTool.gexf.parse(xml);
		var categories = [];
		//		for(var i = 0; i < 6; i++) {
		//			categories[i] = {
		//				name: '类目' + (i +1)
		//			};
		//		}
		categories = [{
			name: '金融一部'
		}, {
			name: '金融二部'
		}, {
			name: '金融三部'
		}, {
			name: '金融四部'
		}, {
			name: '金融五部'
		}, {
			name: '金融六部'
		}, {
			name: '金融七部'
		}]
		graph.nodes.forEach(function(node) {
			node.itemStyle = null;
			node.symbolSize = 10;
			node.value = node.symbolSize;
			node.category = node.attributes.modularity_class;
			// Use random x, y
			node.x = node.y = null;
			node.draggable = true;
		});
		option = {
			title: {
				text: '子公司关系图',
				subtext: '',
				top: 'bottom',
				left: 'right'
			},
			tooltip: {},
			legend: [{
				// selectedMode: 'single',
				data: categories.map(function(a) {
					return a.name;
				})
			}],
			animation: false,
			series: [{
				name: 'Les Miserables',
				type: 'graph',
				layout: 'force',
				data: graph.nodes,
				links: graph.links,
				categories: categories,
				roam: true,
				label: {
					normal: {
						position: 'right'
					}
				},
				force: {
					repulsion: 100
				}
			}]
		};

		relation1.setOption(option);
	}, 'xml');

	var axisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
	var data = axisData.map(function(item, i) {
		return Math.round(Math.random() * 1000 * (i + 1));
	});
	var links = data.map(function(item, i) {
		return {
			source: i,
			target: i + 1
		};
	});
	links.pop();
	option = {
		title: {
			text: '金融三部一周收益关系图'
		},
		tooltip: {},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: axisData
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			type: 'graph',
			layout: 'none',
			coordinateSystem: 'cartesian2d',
			symbolSize: 40,
			label: {
				normal: {
					show: true
				}
			},
			edgeSymbol: ['circle', 'arrow'],
			edgeSymbolSize: [4, 10],
			data: data,
			links: links,
			lineStyle: {
				normal: {
					color: '#2f4554'
				}
			}
		}]
	};

	relation2.setOption(option);

})

.controller('rectCtrl', function($scope) {
	var rect1 = echarts.init(document.getElementById('rect1'));
	var rect2 = echarts.init(document.getElementById('rect2'));

	rect1.showLoading();

	$.getJSON('data/disk.tree.json', function(diskData) {
		rect1.hideLoading();

		function colorMappingChange(value) {
			var levelOption = getLevelOption(value);
			chart.setOption({
				series: [{
					levels: levelOption
				}]
			});
		}

		var formatUtil = echarts.format;

		function getLevelOption() {
			return [{
				itemStyle: {
					normal: {
						borderWidth: 0,
						gapWidth: 5
					}
				}
			}, {
				itemStyle: {
					normal: {
						gapWidth: 1
					}
				}
			}, {
				colorSaturation: [0.35, 0.5],
				itemStyle: {
					normal: {
						gapWidth: 1,
						borderColorSaturation: 0.6
					}
				}
			}];
		}

		rect1.setOption(option = {

			title: {
				text: 'Disk Usage',
				left: 'center'
			},

			tooltip: {
				formatter: function(info) {
					var value = info.value;
					var treePathInfo = info.treePathInfo;
					var treePath = [];

					for(var i = 1; i < treePathInfo.length; i++) {
						treePath.push(treePathInfo[i].name);
					}

					return [
						'<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
						'Disk Usage: ' + formatUtil.addCommas(value) + ' KB',
					].join('');
				}
			},

			series: [{
				name: 'Disk Usage',
				type: 'treemap',
				visibleMin: 300,
				label: {
					show: true,
					formatter: '{b}'
				},
				itemStyle: {
					normal: {
						borderColor: '#fff'
					}
				},
				levels: getLevelOption(),
				data: diskData
			}]
		});
	});

	rect2.showLoading();

	var household_america_2012 = 113616229;
	$.getJSON('data/obama_budget_proposal_2012.tree.json', function(obama_budget_2012) {
		rect2.hideLoading();

		var visualMin = -100;
		var visualMax = 100;
		var visualMinBound = -40;
		var visualMaxBound = 40;

		convertData(obama_budget_2012);

		function convertData(originList) {
			var min = Infinity;
			var max = -Infinity;

			for(var i = 0; i < originList.length; i++) {
				var node = originList[i];
				if(node) {
					var value = node.value;
					value[2] != null && value[2] < min && (min = value[2]);
					value[2] != null && value[2] > max && (max = value[2]);
				}
			}

			for(var i = 0; i < originList.length; i++) {
				var node = originList[i];
				if(node) {
					var value = node.value;

					// Scale value for visual effect
					if(value[2] != null && value[2] > 0) {
						value[3] = echarts.number.linearMap(
							value[2], [0, max], [visualMaxBound, visualMax], true
						);
					} else if(value[2] != null && value[2] < 0) {
						value[3] = echarts.number.linearMap(
							value[2], [min, 0], [visualMin, visualMinBound], true
						);
					} else {
						value[3] = 0;
					}

					if(!isFinite(value[3])) {
						value[3] = 0;
					}

					if(node.children) {
						convertData(node.children);
					}
				}
			}
		}

		function isValidNumber(num) {
			return num != null && isFinite(num);
		}

		rect2.setOption(option = {
			title: {
				left: 'center',
				text: 'Gradient Mapping',
				subtext: 'Growth > 0: green; Growth < 0: red; Growth = 0: grey'
			},
			tooltip: {
				formatter: function(info) {
					var value = info.value;

					var amount = value[0];
					amount = isValidNumber(amount) ?
						echarts.format.addCommas(amount * 1000) + '$' :
						'-';

					var amount2011 = value[1];
					amount2011 = isValidNumber(amount2011) ?
						echarts.format.addCommas(amount2011 * 1000) + '$' :
						'-';

					var change = value[2];
					change = isValidNumber(change) ?
						change.toFixed(2) + '%' :
						'-';

					return [
						'<div class="tooltip-title">' + echarts.format.encodeHTML(info.name) + '</div>',
						'2012 Amount: &nbsp;&nbsp;' + amount + '<br>',
						'2011 Amount: &nbsp;&nbsp;' + amount2011 + '<br>',
						'Change From 2011: &nbsp;&nbsp;' + change
					].join('');
				}
			},
			series: [{
				name: 'ALL',
				top: 80,
				type: 'treemap',
				label: {
					show: true,
					formatter: "{b}",
					normal: {
						textStyle: {
							ellipsis: true
						}
					}
				},
				itemStyle: {
					normal: {
						borderColor: 'black'
					}
				},
				visualMin: visualMin,
				visualMax: visualMax,
				visualDimension: 3,
				levels: [{
					itemStyle: {
						normal: {
							borderWidth: 3,
							borderColor: '#333',
							gapWidth: 3
						}
					}
				}, {
					color: ['#942e38', '#aaa', '#269f3c'],
					colorMappingBy: 'value',
					itemStyle: {
						normal: {
							gapWidth: 1
						}
					}
				}],
				data: obama_budget_2012
			}]
		});

	});

})

.controller('parallelCtrl', function($scope) {
	var parallel1 = echarts.init(document.getElementById('parallel1'));
	var parallel2 = echarts.init(document.getElementById('parallel2'));

	var schema = [{
		name: 'AQIindex',
		index: 1,
		text: 'AQI'
	}, {
		name: 'PM25',
		index: 2,
		text: 'PM 2.5'
	}, {
		name: 'PM10',
		index: 3,
		text: 'PM 10'
	}, {
		name: 'CO',
		index: 4,
		text: 'CO'
	}, {
		name: 'NO2',
		index: 5,
		text: 'NO₂'
	}, {
		name: 'SO2',
		index: 6,
		text: 'SO₂'
	}, {
		name: '等级',
		index: 7,
		text: '等级'
	}];

	var rawData = [
		[55, 9, 56, 0.46, 18, 6, "良", "北京"],
		[25, 11, 21, 0.65, 34, 9, "优", "北京"],
		[56, 7, 63, 0.3, 14, 5, "良", "北京"],
		[33, 7, 29, 0.33, 16, 6, "优", "北京"],
		[42, 24, 44, 0.76, 40, 16, "优", "北京"],
		[82, 58, 90, 1.77, 68, 33, "良", "北京"],
		[74, 49, 77, 1.46, 48, 27, "良", "北京"],
		[78, 55, 80, 1.29, 59, 29, "良", "北京"],
		[267, 216, 280, 4.8, 108, 64, "重度", "北京"],
		[185, 127, 216, 2.52, 61, 27, "中度", "北京"],
		[39, 19, 38, 0.57, 31, 15, "优", "北京"],
		[41, 11, 40, 0.43, 21, 7, "优", "北京"],
		[64, 38, 74, 1.04, 46, 22, "良", "北京"],
		[108, 79, 120, 1.7, 75, 41, "轻度", "北京"],
		[108, 63, 116, 1.48, 44, 26, "轻度", "北京"],
		[33, 6, 29, 0.34, 13, 5, "优", "北京"],
		[94, 66, 110, 1.54, 62, 31, "良", "北京"],
		[186, 142, 192, 3.88, 93, 79, "中度", "北京"],
		[57, 31, 54, 0.96, 32, 14, "良", "北京"],
		[22, 8, 17, 0.48, 23, 10, "优", "北京"],
		[39, 15, 36, 0.61, 29, 13, "优", "北京"],
		[94, 69, 114, 2.08, 73, 39, "良", "北京"],
		[99, 73, 110, 2.43, 76, 48, "良", "北京"],
		[31, 12, 30, 0.5, 32, 16, "优", "北京"],
		[42, 27, 43, 1, 53, 22, "优", "北京"],
		[154, 117, 157, 3.05, 92, 58, "中度", "北京"],
		[234, 185, 230, 4.09, 123, 69, "重度", "北京"],
		[160, 120, 186, 2.77, 91, 50, "中度", "北京"],
		[134, 96, 165, 2.76, 83, 41, "轻度", "北京"],
		[52, 24, 60, 1.03, 50, 21, "良", "北京"],
		[46, 5, 49, 0.28, 10, 6, "优", "北京"],

		[26, 37, 27, 1.163, 27, 13, "优", "广州"],
		[85, 62, 71, 1.195, 60, 8, "良", "广州"],
		[78, 38, 74, 1.363, 37, 7, "良", "广州"],
		[21, 21, 36, 0.634, 40, 9, "优", "广州"],
		[41, 42, 46, 0.915, 81, 13, "优", "广州"],
		[56, 52, 69, 1.067, 92, 16, "良", "广州"],
		[64, 30, 28, 0.924, 51, 2, "良", "广州"],
		[55, 48, 74, 1.236, 75, 26, "良", "广州"],
		[76, 85, 113, 1.237, 114, 27, "良", "广州"],
		[91, 81, 104, 1.041, 56, 40, "良", "广州"],
		[84, 39, 60, 0.964, 25, 11, "良", "广州"],
		[64, 51, 101, 0.862, 58, 23, "良", "广州"],
		[70, 69, 120, 1.198, 65, 36, "良", "广州"],
		[77, 105, 178, 2.549, 64, 16, "良", "广州"],
		[109, 68, 87, 0.996, 74, 29, "轻度", "广州"],
		[73, 68, 97, 0.905, 51, 34, "良", "广州"],
		[54, 27, 47, 0.592, 53, 12, "良", "广州"],
		[51, 61, 97, 0.811, 65, 19, "良", "广州"],
		[91, 71, 121, 1.374, 43, 18, "良", "广州"],
		[73, 102, 182, 2.787, 44, 19, "良", "广州"],
		[73, 50, 76, 0.717, 31, 20, "良", "广州"],
		[84, 94, 140, 2.238, 68, 18, "良", "广州"],
		[93, 77, 104, 1.165, 53, 7, "良", "广州"],
		[99, 130, 227, 3.97, 55, 15, "良", "广州"],
		[146, 84, 139, 1.094, 40, 17, "轻度", "广州"],
		[113, 108, 137, 1.481, 48, 15, "轻度", "广州"],
		[81, 48, 62, 1.619, 26, 3, "良", "广州"],
		[56, 48, 68, 1.336, 37, 9, "良", "广州"],
		[82, 92, 174, 3.29, 0, 13, "良", "广州"],
		[106, 116, 188, 3.628, 101, 16, "轻度", "广州"],
		[118, 50, 0, 1.383, 76, 11, "轻度", "广州"],

		[91, 45, 125, 0.82, 34, 23, "良", "上海"],
		[65, 27, 78, 0.86, 45, 29, "良", "上海"],
		[83, 60, 84, 1.09, 73, 27, "良", "上海"],
		[109, 81, 121, 1.28, 68, 51, "轻度", "上海"],
		[106, 77, 114, 1.07, 55, 51, "轻度", "上海"],
		[109, 81, 121, 1.28, 68, 51, "轻度", "上海"],
		[106, 77, 114, 1.07, 55, 51, "轻度", "上海"],
		[89, 65, 78, 0.86, 51, 26, "良", "上海"],
		[53, 33, 47, 0.64, 50, 17, "良", "上海"],
		[80, 55, 80, 1.01, 75, 24, "良", "上海"],
		[117, 81, 124, 1.03, 45, 24, "轻度", "上海"],
		[99, 71, 142, 1.1, 62, 42, "良", "上海"],
		[95, 69, 130, 1.28, 74, 50, "良", "上海"],
		[116, 87, 131, 1.47, 84, 40, "轻度", "上海"],
		[108, 80, 121, 1.3, 85, 37, "轻度", "上海"],
		[134, 83, 167, 1.16, 57, 43, "轻度", "上海"],
		[79, 43, 107, 1.05, 59, 37, "良", "上海"],
		[71, 46, 89, 0.86, 64, 25, "良", "上海"],
		[97, 71, 113, 1.17, 88, 31, "良", "上海"],
		[84, 57, 91, 0.85, 55, 31, "良", "上海"],
		[87, 63, 101, 0.9, 56, 41, "良", "上海"],
		[104, 77, 119, 1.09, 73, 48, "轻度", "上海"],
		[87, 62, 100, 1, 72, 28, "良", "上海"],
		[168, 128, 172, 1.49, 97, 56, "中度", "上海"],
		[65, 45, 51, 0.74, 39, 17, "良", "上海"],
		[39, 24, 38, 0.61, 47, 17, "优", "上海"],
		[39, 24, 39, 0.59, 50, 19, "优", "上海"],
		[93, 68, 96, 1.05, 79, 29, "良", "上海"],
		[188, 143, 197, 1.66, 99, 51, "中度", "上海"],
		[174, 131, 174, 1.55, 108, 50, "中度", "上海"],
		[187, 143, 201, 1.39, 89, 53, "中度", "上海"]
	];

	var CATEGORY_DIM_COUNT = 6;
	var GAP = 1;
	var BASE_LEFT = 5;
	var BASE_TOP = 10;
	// var GRID_WIDTH = 220;
	// var GRID_HEIGHT = 220;
	var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
	var GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
	var CATEGORY_DIM = 7;
	var SYMBOL_SIZE = 3;

	function retrieveScatterData(data, dimX, dimY) {
		var result = [];
		for(var i = 0; i < data.length; i++) {
			var item = [data[i][dimX], data[i][dimY]];
			item[CATEGORY_DIM] = data[i][CATEGORY_DIM];
			result.push(item);
		}
		return result;
	}

	function generateGrids(option) {
		var index = 0;

		for(var i = 0; i < CATEGORY_DIM_COUNT; i++) {
			for(var j = 0; j < CATEGORY_DIM_COUNT; j++) {
				if(CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
					continue;
				}

				option.grid.push({
					left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
					top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
					width: GRID_WIDTH + '%',
					height: GRID_HEIGHT + '%'
				});

				option.brush.xAxisIndex && option.brush.xAxisIndex.push(index);
				option.brush.yAxisIndex && option.brush.yAxisIndex.push(index);

				option.xAxis.push({
					splitNumber: 3,
					position: 'top',
					axisLine: {
						show: j === 0,
						onZero: false
					},
					axisTick: {
						show: j === 0,
						inside: true
					},
					axisLabel: {
						show: j === 0
					},
					type: 'value',
					gridIndex: index,
					scale: true
				});

				option.yAxis.push({
					splitNumber: 3,
					position: 'right',
					axisLine: {
						show: i === CATEGORY_DIM_COUNT - 1,
						onZero: false
					},
					axisTick: {
						show: i === CATEGORY_DIM_COUNT - 1,
						inside: true
					},
					axisLabel: {
						show: i === CATEGORY_DIM_COUNT - 1
					},
					type: 'value',
					gridIndex: index,
					scale: true
				});

				option.series.push({
					type: 'scatter',
					symbolSize: SYMBOL_SIZE,
					xAxisIndex: index,
					yAxisIndex: index,
					data: retrieveScatterData(rawData, i, j)
				});

				option.visualMap.seriesIndex.push(option.series.length - 1);

				index++;
			}
		}
	}

	var option = {
		animation: false,
		brush: {
			brushLink: 'all',
			xAxisIndex: [],
			yAxisIndex: [],
			inBrush: {
				opacity: 1
			}
		},
		visualMap: {
			type: 'piecewise',
			categories: ["北京", "上海", "广州"],
			dimension: CATEGORY_DIM,
			orient: 'horizontal',
			top: 0,
			left: 'center',
			inRange: {
				color: ['#c23531', '#2f4554', '#61a0a8']
			},
			outOfRange: {
				color: '#ddd'
			},
			seriesIndex: [0]
		},
		tooltip: {
			trigger: 'item'
		},
		parallelAxis: [{
			dim: 0,
			name: schema[0].text
		}, {
			dim: 1,
			name: schema[1].text
		}, {
			dim: 2,
			name: schema[2].text
		}, {
			dim: 3,
			name: schema[3].text
		}, {
			dim: 4,
			name: schema[4].text
		}, {
			dim: 5,
			name: schema[5].text
		}, {
			dim: 6,
			name: schema[6].text,
			type: 'category',
			data: ['优', '良', '轻度', '中度', '重度', '严重']
		}],
		parallel: {
			bottom: '5%',
			left: '5%',
			height: '31%',
			width: '55%',
			parallelAxisDefault: {
				type: 'value',
				name: 'AQI指数',
				nameLocation: 'end',
				nameGap: 20,
				splitNumber: 3,
				nameTextStyle: {
					fontSize: 14
				},
				axisLine: {
					lineStyle: {
						color: '#555'
					}
				},
				axisTick: {
					lineStyle: {
						color: '#555'
					}
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#555'
					}
				}
			}
		},
		grid: [],
		xAxis: [],
		yAxis: [],
		series: [{
			name: 'parallel',
			type: 'parallel',
			smooth: true,
			lineStyle: {
				normal: {
					width: 1,
					opacity: 0.3
				}
			},
			data: rawData
		}]
	};

	generateGrids(option);

	parallel1.setOption(option);

})

.controller('sankeyCtrl', function($scope) {
	var sankey1 = echarts.init(document.getElementById('sankey1'));
	var sankey2 = echarts.init(document.getElementById('sankey2'));

	sankey1.showLoading();
	$.getJSON('data/energy.json', function(data) {
		sankey1.hideLoading();

		sankey1.setOption(option = {
			title: {
				text: 'Sankey Diagram'
			},
			tooltip: {
				trigger: 'item',
				triggerOn: 'mousemove'
			},
			series: [{
				type: 'sankey',
				layout: 'none',
				data: data.nodes,
				links: data.links,
				itemStyle: {
					normal: {
						borderWidth: 1,
						borderColor: '#aaa'
					}
				},
				lineStyle: {
					normal: {
						color: 'source',
						curveness: 0.5
					}
				}
			}]
		});
	});

	sankey2.showLoading();
	$.getJSON('data/product.json', function(data) {
		sankey2.hideLoading();

		sankey2.setOption(option = {
			title: {
				text: 'Sankey Diagram'
			},
			tooltip: {
				trigger: 'item',
				triggerOn: 'mousemove'

			},
			series: [{
				type: 'sankey',
				layout: 'none',
				data: data.nodes,
				links: data.links,
				itemStyle: {
					normal: {
						borderWidth: 1,
						borderColor: '#aaa'
					}
				},
				lineStyle: {
					normal: {
						curveness: 0.5
					}
				}
			}]
		});
	});

})

.controller('funnelCtrl', function($scope) {
	var funnel1 = echarts.init(document.getElementById('funnel1'));
	var funnel2 = echarts.init(document.getElementById('funnel2'));

	option = {
		title: {
			text: '营销活动预期',
			subtext: ''
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {
			feature: {
				dataView: {
					readOnly: false
				},
				restore: {},
				saveAsImage: {}
			}
		},
		legend: {
			top: '10%',
			data: ['展现', '点击', '访问', '咨询', '订单']
		},
		series: [{
			name: '预期',
			type: 'funnel',
			left: '1%',
			top: '27%',
			width: '80%',
			height: '70%',
			label: {
				normal: {
					formatter: '{b}预期'
				},
				emphasis: {
					position: 'inside',
					formatter: '{b}预期: {c}%'
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			itemStyle: {
				normal: {
					opacity: 0.7
				}
			},
			data: [{
				value: 60,
				name: '访问'
			}, {
				value: 40,
				name: '咨询'
			}, {
				value: 20,
				name: '订单'
			}, {
				value: 80,
				name: '点击'
			}, {
				value: 100,
				name: '展现'
			}]
		}, {
			name: '实际',
			type: 'funnel',
			left: '1%',
			top: '27%',
			width: '80%',
			height: '70%',
			maxSize: '80%',
			label: {
				normal: {
					position: 'inside',
					formatter: '{c}%',
					textStyle: {
						color: '#fff'
					}
				},
				emphasis: {
					position: 'inside',
					formatter: '{b}实际: {c}%'
				}
			},
			itemStyle: {
				normal: {
					opacity: 0.5,
					borderColor: '#fff',
					borderWidth: 2
				}
			},
			data: [{
				value: 30,
				name: '访问'
			}, {
				value: 10,
				name: '咨询'
			}, {
				value: 5,
				name: '订单'
			}, {
				value: 50,
				name: '点击'
			}, {
				value: 80,
				name: '展现'
			}]
		}]
	};

	funnel1.setOption(option);

	option = {
		title: {
			text: '营销活动漏斗图',
			subtext: '纯属虚构',
			left: 'left',
			top: 'bottom'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {
			orient: 'vertical',
			top: 'center',
			feature: {
				dataView: {
					readOnly: false
				},
				restore: {},
				saveAsImage: {}
			}
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['展现', '点击', '访问', '咨询', '订单']
		},
		calculable: true,
		series: [{
			name: '漏斗图',
			type: 'funnel',
			width: '40%',
			height: '45%',
			left: '5%',
			top: '50%',
			data: [{
				value: 60,
				name: '访问'
			}, {
				value: 30,
				name: '咨询'
			}, {
				value: 10,
				name: '订单'
			}, {
				value: 80,
				name: '点击'
			}, {
				value: 100,
				name: '展现'
			}]
		}, {
			name: '金字塔',
			type: 'funnel',
			width: '40%',
			height: '45%',
			left: '5%',
			top: '5%',
			sort: 'ascending',
			data: [{
				value: 60,
				name: '访问'
			}, {
				value: 30,
				name: '咨询'
			}, {
				value: 10,
				name: '订单'
			}, {
				value: 80,
				name: '点击'
			}, {
				value: 100,
				name: '展现'
			}]
		}, {
			name: '漏斗图',
			type: 'funnel',
			width: '40%',
			height: '45%',
			left: '55%',
			top: '5%',
			label: {
				normal: {
					position: 'left'
				}
			},
			data: [{
				value: 60,
				name: '访问'
			}, {
				value: 30,
				name: '咨询'
			}, {
				value: 10,
				name: '订单'
			}, {
				value: 80,
				name: '点击'
			}, {
				value: 100,
				name: '展现'
			}]
		}, {
			name: '金字塔',
			type: 'funnel',
			width: '40%',
			height: '45%',
			left: '55%',
			top: '50%',
			sort: 'ascending',
			label: {
				normal: {
					position: 'left'
				}
			},
			data: [{
				value: 60,
				name: '访问'
			}, {
				value: 30,
				name: '咨询'
			}, {
				value: 10,
				name: '订单'
			}, {
				value: 80,
				name: '点击'
			}, {
				value: 100,
				name: '展现'
			}]
		}]
	};

	funnel2.setOption(option);

})

.controller('dashboardCtrl', function($scope) {
	var dashboard1 = echarts.init(document.getElementById('dashboard1'));
	var dashboard2 = echarts.init(document.getElementById('dashboard2'));

	option = {
		backgroundColor: '#1b1b1b',
		tooltip: {
			formatter: "{a} <br/>{c} {b}"
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		series: [{
			name: '速度',
			type: 'gauge',
			min: 0,
			max: 220,
			splitNumber: 11,
			radius: '70%',
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					color: [
						[0.09, 'lime'],
						[0.82, '#1e90ff'],
						[1, '#ff4500']
					],
					width: 3,
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			axisLabel: { // 坐标轴小标记
				textStyle: { // 属性lineStyle控制线条样式
					fontWeight: 'bolder',
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			axisTick: { // 坐标轴小标记
				length: 15, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			splitLine: { // 分隔线
				length: 25, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					width: 3,
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			pointer: { // 分隔线
				shadowColor: '#fff', //默认透明
				shadowBlur: 5
			},
			title: {
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					fontSize: 20,
					fontStyle: 'italic',
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			detail: {
				backgroundColor: 'rgba(30,144,255,0.8)',
				borderWidth: 1,
				borderColor: '#fff',
				shadowColor: '#fff', //默认透明
				shadowBlur: 5,
				offsetCenter: [0, '50%'], // x, y，单位px
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					color: '#fff'
				}
			},
			data: [{
				value: 40,
				name: 'km/h'
			}]
		}, {
			name: '转速',
			type: 'gauge',
			center: ['15%', '55%'], // 默认全局居中
			radius: '40%',
			min: 0,
			max: 7,
			endAngle: 45,
			splitNumber: 7,
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					color: [
						[0.29, 'lime'],
						[0.86, '#1e90ff'],
						[1, '#ff4500']
					],
					width: 2,
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			axisLabel: { // 坐标轴小标记
				textStyle: { // 属性lineStyle控制线条样式
					fontWeight: 'bolder',
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			axisTick: { // 坐标轴小标记
				length: 12, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			splitLine: { // 分隔线
				length: 20, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					width: 3,
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			pointer: {
				width: 5,
				shadowColor: '#fff', //默认透明
				shadowBlur: 5
			},
			title: {
				offsetCenter: [0, '-30%'], // x, y，单位px
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					fontStyle: 'italic',
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			detail: {
				//backgroundColor: 'rgba(30,144,255,0.8)',
				// borderWidth: 1,
				borderColor: '#fff',
				shadowColor: '#fff', //默认透明
				shadowBlur: 5,
				width: 80,
				height: 30,
				offsetCenter: [25, '20%'], // x, y，单位px
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					color: '#fff'
				}
			},
			data: [{
				value: 1.5,
				name: 'x1000 r/min'
			}]
		}, {
			name: '油表',
			type: 'gauge',
			center: ['85%', '50%'], // 默认全局居中
			radius: '40%',
			min: 0,
			max: 2,
			startAngle: 135,
			endAngle: 45,
			splitNumber: 2,
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					color: [
						[0.2, 'lime'],
						[0.8, '#1e90ff'],
						[1, '#ff4500']
					],
					width: 2,
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			axisTick: { // 坐标轴小标记
				length: 12, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			axisLabel: {
				textStyle: { // 属性lineStyle控制线条样式
					fontWeight: 'bolder',
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				},
				formatter: function(v) {
					switch(v + '') {
						case '0':
							return 'E';
						case '1':
							return 'Gas';
						case '2':
							return 'F';
					}
				}
			},
			splitLine: { // 分隔线
				length: 15, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					width: 3,
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			pointer: {
				width: 2,
				shadowColor: '#fff', //默认透明
				shadowBlur: 5
			},
			title: {
				show: false
			},
			detail: {
				show: false
			},
			data: [{
				value: 0.5,
				name: 'gas'
			}]
		}, {
			name: '水表',
			type: 'gauge',
			center: ['85%', '50%'], // 默认全局居中
			radius: '40%',
			min: 0,
			max: 2,
			startAngle: 315,
			endAngle: 225,
			splitNumber: 2,
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					color: [
						[0.2, 'lime'],
						[0.8, '#1e90ff'],
						[1, '#ff4500']
					],
					width: 2,
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			axisTick: { // 坐标轴小标记
				show: false
			},
			axisLabel: {
				textStyle: { // 属性lineStyle控制线条样式
					fontWeight: 'bolder',
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				},
				formatter: function(v) {
					switch(v + '') {
						case '0':
							return 'H';
						case '1':
							return 'Water';
						case '2':
							return 'C';
					}
				}
			},
			splitLine: { // 分隔线
				length: 15, // 属性length控制线长
				lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
					width: 3,
					color: '#fff',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			pointer: {
				width: 2,
				shadowColor: '#fff', //默认透明
				shadowBlur: 5
			},
			title: {
				show: false
			},
			detail: {
				show: false
			},
			data: [{
				value: 0.5,
				name: 'gas'
			}]
		}]
	};

	//	setInterval(function() {
	option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	option.series[1].data[0].value = (Math.random() * 7).toFixed(2) - 0;
	option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
	option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
	dashboard1.setOption(option);
	//	}, 2000);

	option = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {
			feature: {
				restore: {},
				saveAsImage: {}
			}
		},
		series: [{
			name: '业务指标',
			type: 'gauge',
			detail: {
				formatter: '{value}%'
			},
			data: [{
				value: 50,
				name: '完成率'
			}]
		}]
	};

	//	setInterval(function() {
	option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
	dashboard2.setOption(option, true);
	//	}, 2000);

})