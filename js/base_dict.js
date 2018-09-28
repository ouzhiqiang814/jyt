/**
 * Created by wjf on 2017/6/26.
 */

/**
 * 访问路径url
 * @type {string}
 */
var url = {};
/*url.crm = 'http://esb.xmjyjt.net:8015/PORTAL/CRM/crm/services/appService';
url.ecif = 'http://esb.xmjyjt.net:8015/PORTAL/ECIF/ecif/services/appService';
url.cpc = 'http://esb.xmjyjt.net:8015/PORTAL/CPC/cpc/services/appService';
url.wf = 'http://esb.xmjyjt.net:8015/PORTAL/WF/workflow/services/appService';
url.portal = 'http://esb.xmjyjt.net:8015/PORTAL/WF/workflow/services/appService';*/

url.crm = '/PORTAL/CRM/crm/services/appService';
url.ecif = '/PORTAL/ECIF/ecif/services/appService';
url.cpc = '/PORTAL/CPC/cpc/services/appService';
url.wf = '/PORTAL/WF/workflow/services/appService';
url.portal = '/PORTAL/WF/workflow/services/appService';
url.cpc_wf = '/CPC/WF/workflow/services/appService'

url.adm = '/adm/api/queryUserTotal'
url.cpc_back_task = '/cpc/api/backSprvTask'
url.careList = '/adm/api/queryEmpeCareList'
url.adm_userList = '/adm/api/queryUserList'
url.cpc_tanform = '/cpc/api/tranTask'
url.adm_manageOrg = '/adm/api/queryUserManageOrg'
url.adm_queryFlowAmount = '/adm/api/queryFlowAmount'
url.adm_queryFlowstatNodeTimeAmount = '/adm/api/queryFlowstatNodeTimeAmount'
url.adm_queryFlowstatNodeTimeList = '/adm/api/queryFlowstatNodeTimeList'


url.potal_potal = '/PORTAL/PORTAL/portal/services/portalWS';

url.cpcDownload ='http://cpc.xmjyjt.net/cpc/appDownLoadFile';

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
    // return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://api.sys.jfast.jeedev.com">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>';
    return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://webService.app.com/">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>';
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

function SysServiceDataDtl(sys, service, data) {
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
    return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://api.sys.jfast.jeedev.com/">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>';
    // return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>' + sys + '_' + service + '</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:' + service + ' xmlns:ns2="http://webService.app.com/">' + str + '</ns2:' + service + '></soap:Body></soap:Envelope>';
}

function persons(data) {
    //person = data;
    console.log(person);
};

/*function getPerson(id) {
    var person = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>PORTAL_getPerson</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:getPerson xmlns:ns2="http://api.sys.jfast.jeedev.com/"><arg0>' + id + '</arg0></ns2:getPerson></soap:Body></soap:Envelope>';
    var url = 'http://172.16.199.129:8015/PORTAL/PORTAL/portal/services/portalWS';
    AjaxJsonp(person, url, persons);
}*/


function getPerson1(id, success) {
    var person = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header><RequestSOAPHeader xmlns="http://service.jinyuan.com"><TX_NO>PORTAL_getPerson</TX_NO></RequestSOAPHeader></soap:Header><soap:Body><ns2:getPerson xmlns:ns2="http://api.sys.jfast.jeedev.com/"><arg0>' + id + '</arg0></ns2:getPerson></soap:Body></soap:Envelope>';
    var url = '/PORTAL/PORTAL/portal/services/portalWS';
    AjaxJsonp(person, url, success);
    console.log(person)
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
    // console.log(date)   
    $.ajax({
     url: url,
     dataType: 'text',
     type: 'post',
     data: date,
     success: function (data) {
        // console.log(data)
     var msg = getJson(data);
     success(msg);
    //  console.log(msg)
     },
     error: function (rt) {
     // alert("网络连接失败，请检查网络连接");
    //  console.log(rt)
     }
     });
//    $.ajax({
//        url: url,
//        dataType: 'jsonp',
//        type: 'post',
//        data: date,
//        success: function (data) {
//            var msg = getJson(data.msg);
//            success(msg);
//        },
//        error: function (rt) {
//            alert("网络连接失败，请检查网络连接");
//        }
//    });
}

function fnAjaxJsonp(date,url,success){
    $.ajax({
        url: url,
        dataType: 'xml',
        type: 'post',
        data: date,
        success: function (data) {
            console.log(data)
            // console.log(data.split('<return>'))
        //    console.log(convertToJSON(data))
        // var msg = fnGetJson(data);
        success(xmltojson(data,'',true));
        // console.log(msg)
        // console.log(xmltojson(data,'',true));
        },
        error: function (rt) {
        // alert("网络连接失败，请检查网络连接");
       //  console.log(rt)
        }
        });
}


/**
*xml对象转json对象
*@param xmlObj:xml对象
*@param nodename:节点路径('ROOT/ITEM')
*@param isarray:true,强制返回数组对象
**/
function xmltojson(xmlObj,nodename,isarray){
    var obj=$(xmlObj);
    var itemobj={};
    var nodenames="";
    var getAllAttrs=function(node){//递归解析xml 转换成json对象
       var _itemobj={};
       var notNull=false;
       var nodechilds=node.childNodes;
       var childlenght=nodechilds.length;
       var _attrs=node.attributes;
       var firstnodeName="#text";
       try{
         firstnodeName=nodechilds[0].nodeName;
       }catch(e){}
       if((childlenght>0&&firstnodeName!="#text")||_attrs.length>0){
            var _childs=nodechilds;
            var _childslength=nodechilds.length;
            var _fileName_="";

            if(undefined!=_attrs){
                var _attrslength=_attrs.length;
                for(var i=0; i<_attrslength; i++){//解析xml节点属性
                var attrname=_attrs[i].nodeName;
                var attrvalue=_attrs[i].nodeValue;
                _itemobj[attrname]=attrvalue;
                }
            }
            
            for (var j = 0; j < _childslength; j++) {//解析xml子节点
                var _node = _childs[j];
                var _fildName = _node.nodeName;
                if("#text"==_fildName){break;};
                if(_itemobj[_fildName]!=undefined){//如果有重复的节点需要转为数组格式
                    if(!(_itemobj[_fildName] instanceof Array)){
                    var a=_itemobj[_fildName];
                    _itemobj[_fildName]=[a];//如果该节点出现大于一个的情况 把第一个的值存放到数组中
                    }
                }
                var _fildValue=getAllAttrs(_node);
                try{
                    _itemobj[_fildName].push(_fildValue);
                }catch(e){
                    _itemobj[_fildName]=_fildValue;
                    _itemobj["length"]=1;
                }
            }
       }else{
         _itemobj=(node.textContent==undefined)?node.text:node.textContent;
       }
       return _itemobj;
    };

    if(nodename){
     nodenames=nodename.split("/")
    }

    for(var i=0;i<nodenames.length;i++){
      obj=obj.find(nodenames[i]);
    }

    $(obj).each(function(key,item){
        if(itemobj[item.nodeName]!=undefined){
                if(!(itemobj[item.nodeName] instanceof Array)){
                    var a=itemobj[item.nodeName];
                    itemobj[item.nodeName]=[a];
                }
                itemobj[item.nodeName].push(getAllAttrs(item));
        }else{
                if(nodenames.length>0){
                    itemobj[item.nodeName]=getAllAttrs(item);
                }else{
                    itemobj[item.firstChild.nodeName]=getAllAttrs(item.firstChild);
                }
        }
    });
    if(nodenames.length>1){
        itemobj=itemobj[nodenames[nodenames.length-1]];
    }
    if(isarray&&!(itemobj instanceof Array)&&itemobj!=undefined){
        itemobj=[itemobj];
    }
    var arr = [];
    if(itemobj.length !=0){
        var xmlJson = itemobj['0']['soap:Envelope']['soap:Body']['ns0:getChildSysOrgVoResponse'].return
        if(xmlJson.length == 1){
            return xmlJson;
        }else{
            for(let p=0;p<xmlJson.length;p++){
                arr.push(xmlJson[p])
            }
        }
        return arr;
        
    }
    else{
        return itemobj;
    }
 
 };





/**
 * ajax的json调用方法
 * @param date 传输的报文
 * @param url 地址路径
 * @param fnReturnData 成功后调用的方法
 * @param itemName 传递成功后表格数组名称
 * @param hasCharts 是否包含图表标志
 * @param chartId 图表ID
 * @param nextFn 下一步操作函数
 * @constructor
 */
    function fnAjaxJson (data,url,fnReturnData,itemName,hasCharts,chartId,nextFn){
        $.ajax({
            url:url,
            type:'POST',
            // data:data,
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            dataType:'json',
            // jsonp:'callback',
            // jsonCallback:'callback',
            success: function(ret){
                fnReturnData(ret,itemName,hasCharts,chartId,nextFn)
            },
            error: function(err){
                
            }
        })
        // function callback(ret){
        //     fnReturnData(ret,itemName,hasCharts,chartId,nextFn)
        // }
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

function fnGetJson(value){
    var s = value.split('<return>');
    console.log(s);
}


function convertToJSON(xmlDoc) {
    //准备JSON字符串和缓存（提升性能）
    var jsonStr = "";
    var buffer = new Array();
 
    buffer.push("{");
    //获取xml文档的所有子节点
    var nodeList = xmlDoc.childNodes;
 
    generate(nodeList);
 
    /**
     * 中间函数，用于递归解析xml文档对象，并附加到json字符串中
     * @param node_list xml文档的的nodeList
     */
    function generate(node_list) {
 console.log(node_list.length)
        for (var i = 0; i < node_list.length; i++) {
            var curr_node = node_list[i];
            //忽略子节点中的换行和空格
            if (curr_node.nodeType == 3) {
                continue;
            }
            //如果子节点还包括子节点，则继续进行遍历
            if (curr_node.childNodes.length > 1) {
                buffer.push("\"" + curr_node.nodeName + "\": {");
                generate(curr_node.childNodes);
            } else {
                var firstChild = curr_node.childNodes[0];
 
                if (firstChild != null) {
                    //nodeValue不为null
                    buffer.push("\"" + curr_node.nodeName + "\":\"" + firstChild.nodeValue + "\"");
                } else {
                    //nodeValue为null
                    buffer.push("\"" + curr_node.nodeName + "\":\"\"");
                }
 
            }
            if (i < (node_list.length - 2)) {
                buffer.push(",");
            } else {
                break;
            }
        }
        //添加末尾的"}"
        buffer.push("}");
    }
 
    jsonStr = buffer.join("");
    return jsonStr;
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


  /*  obj.show({
        template: '<img src="img/common/loading.gif" alt=""/><span>加载中...</span>'
    });*/


    obj.show({
        template: '<img src="img/foot/logo.png" style="width: 32px; height: 32px;-webkit-animation: circle 2s infinite linear;"><span>正在加载</span>'
    });
}

function hide(obj) {
    $(".backdrop").css("background-color", 'rgba(0,0,0,.4)');
    $(".backdrop").css("top", '0px');
    obj.hide();
}

function showCommon(obj) {
    obj.show({
        template: '<img src="img/foot/logo.png" style="width: 32px; height: 32px;-webkit-animation: circle 2s infinite linear;"><span>正在加载</span>'
    });
   /* obj.show({
        template: '<img src="img/common/loading.gif" alt=""/><span>加载中...</span>'
    });*/
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
        if(!angular.fromJson(sessionStorage.getItem("approveItem"))){
            MXWebui.showWebViewTitle();
            MXWebui.setWebViewTitle(
                "待办事宜" //这里可以设置title名称
            );
            MXWebui.showOptionMenu();
        }
    } catch (e) {
        javascript:history.go(-num);
        return;
    }
    javascript:history.go(-num);
}
