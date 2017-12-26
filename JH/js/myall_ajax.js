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
        resumename: '',
        educational: '',
        workyears: '',
        company: '',
        city: '',
        industry: '',
        position: '',
        phone: '',
        username: '',
        age: '',
        sex: '',
        accountid: '',
        hopeindustry: '',
        hopeposition: '',
        hopecity: '',
        hopesalary: '',
        companyname: '',
        companyindustry: '',
        positionname: '',
        workstarttime: '',
        workendtime: '',
        performance: '',
        school: '',
        majors: '',
        studystarttime: '',
        studyendtime: '',
        SchoolExperience: '',
        abilityname: '',
        abiltycontent: '',
        salary: '',
        positionstate : '',
        schoolexperience : '',
        jibenurl: '',
        zhiweiyixiangurl: '',
        addgongzuourl: '',
        addjiaoyuurl: '',
        addnengliurl: '',
        labels: [],
    },

    mounted: function mounted() {
        $('.fabuactive').css('display','block');
        positionid = GetQueryString("id");
         var b = new Base64(); //加密
         query = ''+GetQueryString("userid");
        console.log(query)
        accountid = parseInt(b.decode(query)); //解密urlid
        console.log("用户id："+accountid)
        console.log("职位id："+positionid)
        var myDate = new Date();
         date = _dateFormat(myDate, 'yyyy-MM-dd');
         if (query == "zero0" || query == "undefined") {
               alert("账户过期，请重新登录");
               localStorage.clear();
               window.location.href="JHdenglu.html";
             }
             
         if (positionid != null) {
            
               $('.resumeLd').css('display','block');
             }
        var _this = this;
        
        postJSON('/api/perfectyourresume', { "id": parseInt(accountid), }, function(result) {

            if ( result.data.companyname != "" ) {
                result.data.companyname = '/'+result.data.companyname;
            }
            if ( result.data.workstarttime != "" ) {
                result.data.workstarttime = result.data.workstarttime + '~';
            }
            if ( result.data.studystarttime != "" ) {
                result.data.studystarttime = result.data.studystarttime + '~';
            }

            _this.resumename = result.data.resumename;
            _this.educational = result.data.educational;
            _this.workyears = result.data.workyears;
            _this.company = result.data.company;
            _this.city = result.data.city;
            _this.industry = result.data.industry;
            _this.position = result.data.position;
            _this.phone = result.data.phone;
            _this.username = result.data.username;
            _this.age = result.data.age;
            _this.sex = result.data.sex;
            _this.accountid = result.data.accountid;
            _this.hopeindustry = result.data.hopeindustry;
            _this.hopeposition = result.data.hopeposition;
            _this.hopecity = result.data.hopecity;
            _this.hopesalary = result.data.hopesalary;
            _this.companyname = result.data.companyname;
            _this.companyindustry = result.data.companyindustry;
            _this.positionname = result.data.positionname;
            _this.workstarttime = result.data.workstarttime;
            _this.workendtime = result.data.workendtime;
            _this.performance = result.data.performance;
            _this.school = result.data.school;
            _this.majors = result.data.majors;
            _this.studystarttime = result.data.studystarttime;
            _this.studyendtime = result.data.studyendtime;
            _this.SchoolExperience = result.data.SchoolExperience;
            _this.abilityname = result.data.abilityname;
            _this.abiltycontent = result.data.abiltycontent;
            _this.salary = result.data.salary;
            _this.positionstate  = result.data.positionstate;
            _this.schoolexperience  = result.data.schoolexperience;
            _this.jibenurl = "myjiben.html?userid="+query+"&resumeid="+result.data.id;
            _this.zhiweiyixiangurl = "zhiweiyixiang.html?userid="+query+"&resumeid="+result.data.id;
            _this.addgongzuourl = "addgongzuo.html?userid="+query+"&resumeid="+result.data.id;
            _this.addjiaoyuurl = "addjiaoyu.html?userid="+query+"&resumeid="+result.data.id;
            _this.addnengliurl = "addnengli.html?userid="+query+"&resumeid="+result.data.id;

            $('.fabuactive').css('display','none');
            
        }, function(result) {

        });

       

    },
    methods: {
        

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
                "positionid": parseInt(positionid),
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
                "positionid": parseInt(positionid),
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