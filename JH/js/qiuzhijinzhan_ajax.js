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
var _this ;

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
        labels2: [] ,
    },

    mounted: function mounted() {
        $('.fabuactive').css('display','block');
        positionid = parseInt(GetQueryString("id"));

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
        _this = this ;
         
        first();

        two();

        // $('.tabenroll').hide();
    },
    methods: {
        

    }
});
    $('.tabresume').show();
    $('.tabenroll').hide();
    $('.colorTab').click(function () {
        _this = this ;
        var index = $(this).index();
        if (index == 0) {
            $('.tabenroll').hide();
            $('.tabresume').show();
        }else if (index == 1) {
            $('.tabresume').hide();
            $('.tabenroll').show();
            
        }
    $(this).addClass("xzhover").siblings().removeClass("xzhover")
})

function first() {
      postJSON('/api/getaajresumelog', { 
                                   "id": accountid,  
    }, function (result) {
         if (result.data.resumelog == null ) {
            $('.fabuactive').css('display','none');
            $('.tabresume').addClass("fabuactive");
            $('.tabresume').html("暂无简历记录！");
            $('.tabresume').css('display','block');
            // $('.tabresume').show();
            
            return ;
        }
        var listuse1 = [];
            
        var qiuzhistatus = "" ;
            for (var j = 0; j < result.data.resumelog.length; j++) {

                 if (result.data.resumelog[j].status == 0 ) {
                    qiuzhistatus= "应聘中";         
                }else if (result.data.resumelog[j].status == 1) {
                    qiuzhistatus= "拒绝应聘";  
                }
                else if (result.data.resumelog[j].status == 2) {
                    qiuzhistatus= "初试中";  
                }
                else if (result.data.resumelog[j].status == 3) {
                    qiuzhistatus= "初试失败";  
                }
                else if (result.data.resumelog[j].status == 4) {
                    qiuzhistatus= "复试中";  
                }
                else if (result.data.resumelog[j].status == 5) {
                    qiuzhistatus= "复试失败";  
                }
                else if (result.data.resumelog[j].status == 6) {
                    qiuzhistatus= "实习中";  
                }
                else if (result.data.resumelog[j].status == 7) {
                    qiuzhistatus= "实习失败";  
                }
                else if (result.data.resumelog[j].status == 8) {
                    qiuzhistatus= "成功上岗";  
                }
                else if (result.data.resumelog[j].status == 9) {
                    qiuzhistatus= "上岗失败";  
                }

                if ( result.data.resumelog[j].remark == "" ) {
                    result.data.resumelog[j].remark = "无" ;
                }

                listuse1.push({
                    positioncontent: result.data.resumelog[j].positioncontent,
                    position: result.data.resumelog[j].position,
                    company: result.data.resumelog[j].company,
                    area: result.data.resumelog[j].area,
                    worktime: result.data.resumelog[j].worktime,
                    edueational: result.data.resumelog[j].edueational,
                    wages: result.data.resumelog[j].wages,
                    date: result.data.resumelog[j].date,
                    remark: result.data.resumelog[j].remark,
                    username: result.data.resumelog[j].username,
                    status: qiuzhistatus ,
                    // xqurl: "zhiweixaingqing.html?id=" + result.data[j].id,
                });
            }

            _this.labels = listuse1;
        $('.fabuactive').css('display','none');
    }, function (result) {

    });
}

function two() {
    
       postJSON('/api/getaajresumelog', { 
                                   "id": accountid,  
        }, function (result) {
             if (result.data.enrlolog == null ) {
            $('.fabuactive').css('display','none');
            $('.tabenroll').addClass("fabuactive");
            $('.tabenroll').html("暂无报名记录！");
            // $('.tabenroll').css('display','block');
            // $('.tabenroll').show();
            return ;
        }
        var listuse1 = [];
        console.log(result.data.enrlolog)
        var qiuzhistatus = "" ;
            for (var j = 0; j < result.data.enrlolog.length; j++) {

                 if (result.data.enrlolog[j].status == 0 ) {
                    qiuzhistatus= "应聘中";         
                }else if (result.data.enrlolog[j].status == 1) {
                    qiuzhistatus= "拒绝应聘";  
                }
                else if (result.data.enrlolog[j].status == 2) {
                    qiuzhistatus= "初试中";  
                }
                else if (result.data.enrlolog[j].status == 3) {
                    qiuzhistatus= "初试失败";  
                }
                else if (result.data.enrlolog[j].status == 4) {
                    qiuzhistatus= "复试中";  
                }
                else if (result.data.enrlolog[j].status == 5) {
                    qiuzhistatus= "复试失败";  
                }
                else if (result.data.enrlolog[j].status == 6) {
                    qiuzhistatus= "实习中";  
                }
                else if (result.data.enrlolog[j].status == 7) {
                    qiuzhistatus= "实习失败";  
                }
                else if (result.data.enrlolog[j].status == 8) {
                    qiuzhistatus= "成功上岗";  
                }
                else if (result.data.enrlolog[j].status == 9) {
                    qiuzhistatus= "上岗失败";  
                }

                if ( result.data.enrlolog[j].remark == "" ) {
                    result.data.enrlolog[j].remark = "无" ;
                }

                listuse1.push({
                    positioncontent: result.data.enrlolog[j].positioncontent,
                    position: result.data.enrlolog[j].position,
                    company: result.data.enrlolog[j].company,
                    area: result.data.enrlolog[j].area,
                    worktime: result.data.enrlolog[j].worktime,
                    edueational: result.data.enrlolog[j].edueational,
                    wages: result.data.enrlolog[j].wages,
                    date: result.data.enrlolog[j].date,
                    remark: result.data.enrlolog[j].remark,
                    username: result.data.enrlolog[j].username,
                    status: qiuzhistatus ,
                    // xqurl: "zhiweixaingqing.html?id=" + result.data[j].id,
                });
            }

            _this.labels2 = listuse1;
        
    }, function (result) {

    });
}