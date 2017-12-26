// 
/**
 * 修复浏览器sort方法不兼容问题
 */
!function (window) {
    var ua = window.navigator.userAgent.toLowerCase(),
        reg = /msie|applewebkit.+safari/;
    if (reg.test(ua)) {
        var _sort = Array.prototype.sort;
        Array.prototype.sort = function (fn) {
            if (!!fn && typeof fn === 'function') {
                if (this.length < 2) return this;
                var i = 0,
                    j = i + 1,
                    l = this.length,
                    tmp,
                    r = false,
                    t = 0;
                for (; i < l; i++) {
                    for (j = i + 1; j < l; j++) {
                        t = fn.call(this, this[i], this[j]);
                        r = (typeof t === 'number' ? t : !!t ? 1 : 0) > 0 ? true : false;
                        if (r) {
                            tmp = this[i];
                            this[i] = this[j];
                            this[j] = tmp;
                        }
                    }
                }
                return this;
            } else {
                return _sort.call(this);
            }
        };
    }
}(window);

/**
 * 获取url参数
 */
function getUrlQuery() {
    //首先获取到当前页面的地址栏信息
    var url = window.location.href;
    //console.log(url);

    var obj = {};
    var reg = /\?/;
    if (url.match(reg)) {
        //判断传入参数，以问号截取，问号后是参数
        var chars = url.split('?')[1];

        //再截&号
        var arr = chars.split('&');

        //获得截取后的数组为键值对字符串
        for (var i = 0; i < arr.length; i++) {

            //保守一点确定看是否为 name=value形式
            var num = arr[i].indexOf("=");

            if (num > 0) {
                //拼接字符串
                var name = arr[i].substring(0, num);
                var value = arr[i].substr(num + 1);

                //拼接对象，并转码
                obj[decodeURIComponent(name)] = decodeURIComponent(value);
            }
        }
    }
    obj.has = function (key) {
        return this[key] !== undefined;
    };
    //console.log(obj);
    return obj;
}

/**
 * 获取多个url参数
 * 示例：abc.html?id=123&url=http://www.maidq.com
 * alert(GetQueryString("参数名1"));
 * alert(GetQueryString("参数名2"));
 */
function GetQueryString(name)
{
     var reg
 = new RegExp("(^|&)"+
 name +"=([^&]*)(&|$)");
     var r
 = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]);
return null;
}

/**
 * 时间格式化
 */
function _dateFormat(date, fmt) {
    //author: meizz 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "H+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return fmt;
};

function TimeNow() {
    var date = new Date();
    var format = function format(fmt) {
        return _dateFormat(date, fmt);
    };
    return {
        Unix: function Unix() {
            var timestamp = Date.parse(date);
            return timestamp / 1000;
        },
        Format: format
    };
};

var _baseUrl = 'http://localhost:8081';
var _headers = {};

// js日期比较(yyyy-mm-dd)

function _duibi(a, b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes >= lktimes) {

        // alert('开始时间大于离开时间，请检查');
        return false;
    } else return true;
}
//时间比较（yyyy-MM-dd HH:mm:ss）
function _compareTime(startTime,endTime) {
  var startTimes = startTime.substring(0, 10).split('-');
  var endTimes = endTime.substring(0, 10).split('-');
  startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19);
  endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
  var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
  if (thisResult < 0) {
    alert("endTime小于tartTime！");
  } else if (thisResult > 0) {
    alert("endTime大于tartTime！");
  } else if (thisResult == 0) {
    alert("endTime等于tartTime！");
  } else {
    return '异常';
  }
}

/**
 * post请求
 */
function postJSON(api, params, success, fail) {
    $.ajax({
        type: 'post',
        data: JSON.stringify(params),
        url: _baseUrl + api,
        cache: false,
        dataType: 'json',
        success: success,
        error: function error(result) {
            fail({
                status: result.status,
                msg: result.statusText
            });
        },
        beforeSend: function beforeSend(request) {
            for (var key in _headers) {
                request.setRequestHeader(key, _headers[key]);
            }
            request.setRequestHeader("content-type", "application/json");
        }
    });
}

function getJSON(api, success, fail) {
    $.ajax({
        type: 'get',
        url: _baseUrl + api,
        cache: false,
        success: success,
        error: function error(result) {
            fail({
                status: result.status,
                msg: result.statusText
            });
        }
    });
}

//上传图片
function postFormData(api, formdata, success, fail) {
    $.ajax({
        async: false, //取消异步
        url: _baseUrl + api,
        type: "post",
        processData: false,
        contentType: false,
        data: formdata,
        success: success,
        error: function(result) {
            fail({
                status: result.status,
                msg: result.statusText,
            });
        },
        beforeSend: function(request) {
            for (var key in _headers) {
                request.setRequestHeader(key, _headers[key]);
            }
        },
    });
}

function setBaseUrl(url) {
    _baseUrl = url;
}

function setHeader(key, value) {
    _headers[key] = value;
}

function hasHeader(key) {
    if (_headers[key] === undefined) {
        return false;
    };
    return _headers[key].length > 0;
}

// 数组去重
var ns = 0;
function _unique(arr) {

    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

// a返回历史记录-1
$('.returna').click(function () {
   
     window.history.go( -1 );  
})

// setBaseUrl("http://192.168.1.2:11250");
setBaseUrl("http://mifenghr.mm419.com");