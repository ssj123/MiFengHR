'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var page = 1;
var pagesize = 10;
var numtotal = 0;
var accountid ;
var positionid ;
var date ;
var fphone ;
var query ;

new Vue({
    el: '.container',
    data: {
        position: '',
        company: '',
        area: '',
        worktime: '',
        edueational: '',
        sex: '',
        agerange: '',
        createtime: '',
        wages: '',
        workdaytime: '',
        welfare: '',
        content: '',
        industry: '',
        labels: [],
    },

    mounted: function mounted() {
        $('.fabuactive').css('display','block');
        positionid = parseInt(GetQueryString("id"));
        
        var _this = this;
        postJSON('/api/getoneposition', { "id": positionid, }, function(result) {

            numtotal = result.total;
            _this.tote = numtotal;

            _this.positioncontent = result.data[0].positioncontent;
            _this.position = result.data[0].position;
            _this.company = result.data[0].company;
            _this.area = result.data[0].area;
            _this.worktime = result.data[0].worktime;
            _this.edueational = result.data[0].edueational;
            _this.wages = result.data[0].wages;
            _this.createtime = result.data[0].createtime;
            _this.workdaytime = result.data[0].workdaytime;
            _this.welfare = result.data[0].welfare;
            _this.content = result.data[0].content;
            _this.sex = result.data[0].sex;
            _this.agerange = result.data[0].agerange;
            _this.industry = result.data[0].industry;
            $('.fabuactive').css('display','none');
        }, function(result) {

        });

        var b = new Base64(); //加密
        query = ''+GetQueryString("userid");
              
       accountid = parseInt(b.decode(query)); //解密urlid
       
       var myDate = new Date();
        date = _dateFormat(myDate, 'yyyy-MM-dd');
        if (query == "zero0" || query == "undefined") {
              alert("账户过期，请重新登录");
              localStorage.clear();
              window.location.href="JHdenglu.html";
            }

    },
    methods: {
        //加载更多
        moredata: function() {
            page++;
            pagesize = pagesize + 10;
            var maxpage = Math.ceil(numtotal / 10);
            console.log(page, maxpage)
            if (maxpage + 1 == page) {
                alert("没有更多数据啦！");
                return;
            }
            var _this = this;
            postJSON('/api/getposition', { "page": 1, "pagesize": pagesize, }, function(result) {

                numtotal = result.total;
                _this.tote = numtotal;
                if (numtotal < pagesize) {
                    $('.btn1dis').addClass('disabled');
                }

                var listuse1 = [];

                for (var j = 0; j < result.data.length; j++) {

                    listuse1.push({
                        positioncontent: result.data[j].positioncontent,
                        position: result.data[j].position,
                        company: result.data[j].company,
                        area: result.data[j].area,
                        worktime: result.data[j].worktime,
                        edueational: result.data[j].edueational,
                        wages: result.data[j].wages,

                        xqurl: "zhiweixaingqing.html?id=" + result.data[j].id,
                    });
                }

                _this.labels = listuse1;

            }, function(result) {

            });
        },

        //投递简历
        handInResume: function() {
            console.log("用户id："+accountid)
            console.log("职位id:"+positionid)
             console.log("时间:"+date)
              $('.fabuactive').css('display','none');
              postJSON('/api/haveresume', {
                "id": accountid,
                
            }, function(result) {
              
               if ( result.msg == 1 ) {
                    $('.ok4').css('display','block');
               }else if ( result.msg == 2 ) {
                    $('.oktoujianli').css('display','block');
               }

               $('.fabuactive').css('display','none');
               

            }, function(result) {
                console.log("失败", result);
                
            });

            
            
        }

    }
});

// 填写推荐吗
// 跳过
$('.ok4tiaoguo').click(function () {
    fphone = '';
    $('.ok4').css('display','none');
    $('.fabuactive').css('display','block');
    $('.fabuactive').html('努力上传中，请稍后....');
    //查询今天是否投过简历
            postJSON('/api/deliverresume', {
                "accountid": accountid,
                "positionid": positionid,
                "fphone": fphone,
                "date": date,
            }, function(result) {
               if (result.msg == 2 ) {
                    $('.oktoujianli').css('display','block');
                    return ;
                }
               $('.fabuactive').css('display','none');
               $('.oksuccess').css('display','block');

            }, function(result) {
                console.log("失败", result);
                if (result.status == 403 ) {
                    $('.fabuactive').css('display','none');
                    alert("您今天已经投过该职位，可在求职记录中查看该职位进度！")
                }
            });
})
//确认
$('.ok4comfirm').click(function () {
    fphone = $('#tjrtel').val();
    if ( fphone == "") {
        alert("推荐码还没填吗，如果没有，点击跳过！");
        return ;
    }
    $('.ok4').css('display','none');
    $('.fabuactive').css('display','block');
    $('.fabuactive').html('努力上传中，请稍后....');
    //查询今天是否投过简历
            postJSON('/api/deliverresume', {
                "accountid": accountid,
                "positionid": positionid,
                "fphone": fphone,
                "date": date,
            }, function(result) {
                if (result.msg == 2 ) {
                    $('.oktoujianli').css('display','block');
                    return ;
                }
                $('.fabuactive').css('display','none');
               $('.oksuccess').css('display','block');

            }, function(result) {
                console.log("失败", result);
                if (result.status == 403 ) {
                    $('.fabuactive').css('display','none');
                    alert("您今天已经投过该职位，可在求职记录中查看该职位进度！")
                }
            });
})

//完善简历
$('.okonequxiao').click(function () {
    alert("简历未完善，投递不成功") ;
    $('.fabuactive').css('display','none');
    $('.oktoujianli').css('display','none');
})
$('.okonequeren').click(function () {
    $('.oktoujianli').css('display','none');
    window.location.href='myall.html?id='+positionid+"&userid="+query;
})

//投递成功确认取消
$('.quxiaoo').click(function () {
    $('.oksuccess').css('display','none');
})
$('.chakan').click(function () {
    window.location = "myqiuzhijilugeren.html?userid="+query;
})

//报名关闭按钮
$('.ok2close').click(function () {
    $('.okbaoming').css('display','none');
})
//报名弹框按钮
$('.wybm').click(function () {
    $('.okbaoming').css('display','block');

    postJSON('/api/perfectenrol', {
                "id": accountid,
                
            }, function(result) {
               $('.wsxzname').val(result.data.name);
               $('.wsxzphone').val(result.data.phone);
               $('.wsxzage').val(result.data.age);
               if ( result.data.sex == "男" ) {
                    $("#wsxzsexnan").attr("checked", "checked");
               }
               if ( result.data.sex == "女" ) {
                    $("#wsxzsexnv").attr("checked", "checked");
               }

            }, function(result) {
                console.log("失败", result);
                if (result.status == 403 ) {
                    alert(result.msg)
                }
            });


})

//取消报名
$('.quxiaobaoming').click(function () {
    alert("已取消报名！")
    $('.okbaoming').css('display','none');
})
//确认报名
$('.querenbaoming').click(function () {
    $('.okbaoming').css('display','none');
  var wsxzname =  $('.wsxzname').val();
  var wsxzphone = $('.wsxzphone').val();
  var wsxzage =  $('.wsxzage').val();
  var wsxzsexa =  $("input[name='wsxzsex']:checked").val();

    if ( wsxzsexa == 0 ) {
         wsxzsexa = "男"; 
    }
    if ( wsxzsexa == 1 ) {
         wsxzsexa = "女" ;
    }

     postJSON('/api/updaternrol', {
                "accountid": accountid,
                "name": wsxzname ,
                "sex": wsxzsexa ,
                "phone": wsxzphone ,
                "age": parseInt(wsxzage) ,
            }, function(result) {
                $('.okbaoming').css('display','none');
                // 跳推荐人
               $('.ok5').css('display','block');

            }, function(result) {
                console.log("失败", result);
                if (result.status == 403 ) {
                    alert(result.msg)
                }
            });


})

//推荐人 跳过
$('.ok5tiaoguo').click(function () {
     // 生成当前时间
    var myDate = new Date();
    var date = _dateFormat(myDate, 'yyyy-MM-dd');
    fphone = "";
    postJSON('/api/enrollog', {
               "accountid": accountid,
                "positionid": positionid ,
                "fphone": fphone ,
                "date": date ,
            }, function(result) {
               
               $('.ok5').css('display','none');
               alert("报名成功，可在求职进展中查看！")
            }, function(result) {
                console.log("失败", result);
                if (result.status == 403 ) {
                    alert("您今天已经投过该职位，可在求职记录中查看该职位进度！")
                }
            });
})

//确认
$('.ok5queren').click(function () {
    // 生成当前时间
    var myDate = new Date();
    var date = _dateFormat(myDate, 'yyyy-MM-dd');
    fphone = $('.ok5tjrtel').val() ;
     postJSON('/api/enrollog', {
                "accountid": accountid,
                "positionid": positionid ,
                "fphone": fphone ,
                "date": date ,
                
            }, function(result) {
                
               $('.ok5').css('display','none');
               alert("报名成功，可在求职进展中查看！")
            }, function(result) {
                console.log("失败", result);
                if (result.status == 403 ) {
                    alert("您今天已经投过该职位，可在求职记录中查看该职位进度！")
                }
            });
})