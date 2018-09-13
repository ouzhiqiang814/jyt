angular.module('directives', [])

.directive('appMap', function() {
	return {
		restrict: "E",
		replace: true,
		template: "<div id='allMap'></div>",
		scope: {
			center: "=", // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
			markers: "=", // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
			width: "@", // Map width in pixels.
			height: "@", // Map height in pixels.
			zoom: "@", // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
			zoomControl: "@", // Whether to show a zoom control on the map.
			scaleControl: "@", // Whether to show scale control on the map.
			address: "@",
			lan: "@",
			lon: "@"
		},
		link: function(scope, element, attrs) {
			var map;
			var rel;
			//			 百度地图API功能
			map = new BMap.Map("allMap");
			//			 创建地址解析器实例
			var myGeo = new BMap.Geocoder();
			//			 将地址解析结果显示在地图上,并调整地图视野
			//			myGeo.getPoint(scope.address, function(point) {
			//				if(point) {
			//					map.centerAndZoom(point, 16);
			//					map.addOverlay(new BMap.Marker(point));
			//				}
			//			}, "");
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r) {
				if(this.getStatus() == BMAP_STATUS_SUCCESS) {

					var marker = new BMap.Marker(r.point);
					marker.setIcon("img/home/marker.png");
					marker.addEventListener("click", function(e) {
						showInfoWindow(rel);
					});

					map.addOverlay(marker);
					map.centerAndZoom(r.point, 16);
					map.addControl(new BMap.NavigationControl());
					map.addControl(new BMap.MapTypeControl());

					// 根据坐标得到地址描述 
					myGeo.getLocation(r.point, function(result) {
						if(result) {
							rel = result;
							showInfoWindow(result);
						}
					});
				} else {
					alert('failed' + this.getStatus());
				}

				function showInfoWindow(result) {
					var infowindow = new BMap.InfoWindow(result.address, {
						width: 200,
						height: 70,
						title: "位置"
					});
					map.openInfoWindow(infowindow, r.point);
				}

			}, {
				enableHighAccuracy: true
			})
		}
	}
})