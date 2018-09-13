/**
 * Created by wjf on 2017/6/26.
 */

/**
 * 访问路径url
 * @type {string}
 */
var url = {};
url.crm = 'http://esb.xmjyjt.net:8015/PORTAL/CRM/crm/services/appService';
url.ecif = 'http://esb.xmjyjt.net:8015/PORTAL/ECIF/ecif/services/appService';
url.cpc = 'http://esb.xmjyjt.net:8015/PORTAL/CPC/cpc/services/appService';
url.wf = 'http://esb.xmjyjt.net:8015/PORTAL/WF/workflow/services/appService';
url.portal = 'http://esb.xmjyjt.net:8015/PORTAL/WF/workflow/services/appService';

url.cpcDownload ='http://172.16.199.127:7002/cpc/appDownLoadFile';

var pathname = window.location.pathname;
var endIndex = pathname.indexOf("/", 1);
var pathUrl = pathname.substring(0, endIndex);
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//"
        + window.location.hostname
        + (window.location.port ? ':' + window.location.port : '');
}
var localUrl = window.location.origin + pathname;


/**
 * 积分明细查询中的‘通讯录’
 */
var userList;

/**
 * 权限信息保存
 */
var person;

/**
 * 系统服务报文数据组装
 * @param sys 调用的系统 --大写
 * @param service 系统的接口服务 --与接口名称一致
 * @param data 数据，为数组类型
 * @returns {string}
 */
function SysServiceData(sys, service, data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        if (data[i] instanceof Array) {
            for (var j = 0; j < data[i].length; j++) {
                str += '<arg' + i + '>' + data[i][j] + '</arg' + i + '>';
            }
        } else {
            str += '<arg' + i + '>' + data[i] + '</arg' + i + '>';
        }
    }
    console.log('<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://api.sys.jfast.jeedev.com">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>')
    return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://api.sys.jfast.jeedev.com">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>';
    // return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://webService.app.com/">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>';
}


function SysServiceDataWf(sys, service, data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        if (data[i] instanceof Array) {
            for (var j = 0; j < data[i].length; j++) {
                str += '<arg' + i + '>' + data[i][j] + '</arg' + i + '>';
            }
        } else {
            str += '<arg' + i + '>' + data[i] + '</arg' + i + '>';
        }
    }
    return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://api.workflow.tansun.com/">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>';
}

function persons(data) {
    //person = data;
    console.log(person);
};

function getPerson(id) {
    var person = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>PORTAL_getPerson</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:getPerson xmlns:ns2="http://api.sys.jfast.jeedev.com/"><arg0>' + id + '</arg0></ns2:getPerson></soap:Body></soap:Envelope>';
    var url = 'http://esb.xmjyjt.net:8015/PORTAL/PORTAL/portal/services/portalWS';
    AjaxJsonp(person, url, persons);
}

function test(){
    var test ='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>ECIF_findOrgCstByArea</TX_NO><TX_TM>2017-11-07 09:03:00:</TX_TM><TRC_NO>PROTAL201711070903002445</TRC_NO><ORG_CODE>集团高管</ORG_CODE><EMPE_NM>吴韵源</EMPE_NM></RequestSOAPHeader></soap:Header><soap:Body><ns0:findOrgCstByArea xmlns:ns0="http://webservice.ecif.crms.com/"><arg0>01</arg0></ns0:findOrgCstByArea></soap:Body></soap:Envelope>';
    var url = 'http://esb.xmjyjt.net:8015/PORTAL/ECIF/ecif/services/cstNumService';
    console.log(test);
    console.log(url);
    AjaxJsonp(person, url, persons);
}

function getPerson1(id, success) {
    var person = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>PORTAL_getPerson</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:getPerson xmlns:ns2="http://api.sys.jfast.jeedev.com/"><arg0>' + id + '</arg0></ns2:getPerson></soap:Body></soap:Envelope>';
    var url = 'http://esb.xmjyjt.net:8015/PORTAL/PORTAL/portal/services/portalWS';
    console.log(person);
    AjaxJsonp(person, url, success);
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    console.log('It is not a string!')
}

/**
 * ajax的jsonp调用方法
 * @param date 传输的报文
 * @param url 地址路径
 * @param success 成功后调用的方法
 * @constructor
 */
function AjaxJsonp(date, url, success) {
    /*    $.ajax({
     url: url,
     dataType: 'text',
     type: 'post',
     data: date,
     success: function (data) {

     var msg = getJson(data);
     success(msg);
     },
     error: function (rt) {
     alert("网络连接失败，请检查网络连接");
     }
     });*/
     
    $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'post',
        data: date,
        success: function (data) {
            var msg = getJson(data.msg);
            success(msg);
        },
        error: function (rt) {
            alert("网络连接失败，请检查网络连接");
        }
    });
}

/**
 * 数据字典获取
 * @param type 字典类型
 * @param value 字典数据
 * @constructor
 */
function ListTypeValue(typeList, value) {
    for (var i = 0; i < typeList.length; i++) {
        if (value == typeList[i].codeValue) {
            return typeList[i].codeName;
        }
    }
}

/**
 * 数据字典列表获取
 * @param type
 * @param value
 * @constructor
 */
function TypeValueList(type, success) {
    AjaxJsonp(SysServiceData('ECIF', 'findDataByTypeAndValue', [type]), url.ecif, function (data) {
        /**
         * 因为请求后的参数结果，有时间差，无法直接返回，
         * 所以，只能写方法传递参数
         */
        success(data);
    });
}

function selectUser(num, size, orgCode, roleCode, success,realname) {

    var aprv = {
        realname: realname,
        loginName: "",
        orgCode: orgCode,
        roleCode: roleCode,
    }

    var aprv = angular.fromJson(aprv);
    var xotree = new XML.ObjTree();

    var xml = xotree.writeXML(aprv);
    var xmlText = formatXml(xml);

    AjaxJsonp(SysServiceData('CRM', 'findUserListByVo', [num, size, xmlText]), url.crm, success);
}

function goSelectUser(selectUser) {
    sessionStorage.setItem("selectUser", angular.toJson(selectUser));
    window.location.href = localUrl + '#/synergyselect'
    console.log(localUrl);
    console.log(pathUrl);

}

function jsonToXml(jsonObj) {
    var jsonStr = angular.fromJson(jsonObj);
    var xotree = new XML.ObjTree();

    var xml = xotree.writeXML(jsonStr);
    var xmlText = formatXml(xml);
    return xmlText;
}


/**
 * 获取Json对象
 * @param value 返回的XML报文内容
 * @returns {*}
 */
function getJson(value) {
    var s = value.split('<return>');
    if (s.length != 1) {
        s[1] = s[1].replace(/\&quot;/g, "\"");
        var ss = s[1].split('</return>');

        try {
            var val = JSON.parse(ss[0]);
        } catch (e) {
            console.log(e);
            var val = ss[0];
        }


        /*var val = eval('(' + ss[0] + ')');*/

        return val;
    }
}

function formatAprvOpns(aprvOpns, attachNmStr, attachIdStr) {


    if (!attachNmStr) {
        return aprvOpns;
    }
    var rtValue = "";
    if (aprvOpns) {
        rtValue = "<label class='labelopns'>意见：</label> " + aprvOpns + "<br>";
    }

    var attachNms = attachNmStr.split(",");
    var attachIds = attachIdStr.split(",");
    for (var i = 0; i < attachNms.length; i++) {
        var attachNm = attachNms[i];
        var attachId = attachIds[i];
        var item = i + 1;
        rtValue = rtValue + "<label class='docli' onclick='downloadAttach(" + parseInt(attachId) + ")'>" + item + "." + attachNm + "</label><br>"
    }

    return rtValue;
}


Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

Array.prototype.removeObjByBsnTpcd = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].bsnTpcd == val.bsnTpcd) {
            this.splice(i, 1);
            break;
        }
    }
}

function show(obj) {
    $(".backdrop").css("background-color", '#f0f0f0');
    $(".backdrop").css("top", '44px');
    var agent = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(agent)) {
        $(".backdrop").css("top", '66px');
    }

    obj.show({
        template: '<img src="img/common/loading.gif" alt=""/><span>加载中...</span>'
    });
}

function hide(obj) {
    $(".backdrop").css("background-color", 'rgba(0,0,0,.4)');
    $(".backdrop").css("top", '0px');
    obj.hide();
}

function showCommon(obj) {
    obj.show({
        template: '<img src="img/common/loading.gif" alt=""/><span>加载中...</span>'
    });
}

function hideCommon(obj) {
    obj.hide();
}

// 获取url参数
function getQueryString(name) {
    //获取url参数
    var after = window.location.hash.split("?")[1];
    if (after) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = after.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return null;
        }
    }
}


/*
/!* 暂无数据 *!/
function showdata(){
    $(".zanwu").html('<div style="width: 100%;background-color: #f0f0f0;height: 100%;"><div class="empty"><p>暂无数据 ...</p></div></div>');
}

function hidedata(){
    $(".zanwu").empty();
}*/


/* 侧滑 */
function huago(){
    $(".cehua").show();
    $(".cehua .kuang").animate({"right": "0"}, 300);
};

function guanbi(){
    $(".cehua .kuang").animate({"right": "-72%"}, 300);
    $(".cehua").fadeOut(600);
};

function goBackByNum(num){
    try {

        MXWebui.showWebViewTitle();
        MXWebui.setWebViewTitle(
            "待办事宜" //这里可以设置title名称
        );
        MXWebui.showOptionMenu();
    } catch (e) {
        javascript:history.go(-num);
        return;
    }
    javascript:history.go(-num);
}