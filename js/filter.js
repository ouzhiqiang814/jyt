angular.module('filter', [])

    .filter('FormatDate', function () {
        return function (input) {
            var date = new Date(input);
            var formatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            return formatDate
        }
    })

    .filter("long", function () {
        return function (name) {
            var len = name.info;
            if (len.length > 20) {
                return true;
            } else {
                return false;
            }
        }
    })

    .filter("getActLink", function () {
        return function (value) {
            return getActLink(value);
        }
    })

    .filter("getStatus", function () {
        return function (value) {
            return getStatus(value);
        }
    })

    .filter("showAsterisk", function () {
        return function (value ,param1) {
            return showAsterisk(value,param1);
        }
    })
    .filter("getYesOrNo", function () {
        return function (value) {
            return getYesOrNo(value);
        }
    });


function getActLink(value) {
    if (value == 'ACT_2') {
        return '申请人直属领导审批';
    } else if (value == 'ACT_3') {
        return '集团客户信息管理岗审批';
    } else if (value == 'ACT_4') {
        return '客户信息权限审批分发岗审批';
    }
    else if (value == 'ACT_5') {
        return '数据归属方客户信息管理岗审批';
    }
    else if (value == 'ACT_6') {
        return '数据归属方部门负责人审批';
    }
    else if (value == 'ACT_1') {
        return '启动流程';
    } else {
        return '当前流程';
    }
}


function getStatus(value) {
    if (value == '0') {
        return '通过';
    } else if (value == '1') {
        return '不通过';
    } else if (value == '2') {
        return '待处理';
    }
}

function showAsterisk(value, test) {
    if (test == '*') {
        return '*';
    } else {
        return value;
    }
}

function getYesOrNo(value) {
    if (value == '1') {
        return '是';
    } else if (value == '2') {
        return '否';
    } else {
        return '';
    }
}