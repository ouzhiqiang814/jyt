//定义页面字体大小
var deviceWidth = $(window).width();
var dRate = window.devicePixelRatio;
var a = 500/80; 
if(deviceWidth > 500) {deviceWidth = 500;}
if(deviceWidth < 320) {deviceWidth = 320;}
$('html').css('font-size',deviceWidth / a + 'px');  
$('html').attr('data-dpr',dRate);
/* 以上是 刷新屏幕可以看到的最终变化 */

$(window).resize(function(){  // 当调整屏幕的宽时，触发resize 事件
	var deviceWidth = $(window).width();
	var dRate = window.devicePixelRatio;
	var a = 500/80; 
	if(deviceWidth > 500) {deviceWidth = 500;}
	if(deviceWidth < 320) {deviceWidth = 320;}
	$('html').css('font-size',deviceWidth / a + 'px');  
	$('html').attr('data-dpr',dRate);
});



/* 闪现 */
var a;
var judge = true;

function shanxian(a){
    if(!judge){return;}
    judge = false;
    errorBox = $('<div id="errorBox"><p></p></div>');

    errorBox.appendTo(".shanxian");
    $("#errorBox p").html(a);

    setTimeout(function(){
        $(".shanxian").empty();
        judge = true;
    },2500)

}












