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
        
        
        positionid = GetQueryString("resumeid"); //简历id
         var b = new Base64(); //加密
         query = ''+GetQueryString("userid");
               
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
             
         if (positionid != null && positionid.toString().length > 0 ) {
               $('.resumeLd').css('display','block');
             }
        var _this = this;
        
        postJSON('/api/perfectyourresume', { "id": parseInt(accountid), }, function(result) {

            $('.companyname').val(result.data.companyname);
            $('.companyindustry').val(result.data.companyindustry) ;
            $('.positionname').val(result.data.positionname) ;
            $('.workstarttime').val(result.data.workstarttime) ;
            $('.workendtime').val(result.data.workendtime) ;
            $('.performance').val(result.data.performance) ;
            
            
            
        }, function(result) {

        });

       

    },
    methods: {
        //上传基本信息
        updateyourresume: function () {
            $('.fabuactive').css('display','block');
          var companyname = $('.companyname').val();
          var companyindustry = $('.companyindustry').val() ;
          var positionname = $('.positionname').val() ;
          var workstarttime = $('.workstarttime').val() ;
          var workendtime = $('.workendtime').val() ;
          var performance = $('.performance').val() ;

          postJSON('/api/updateyourresumeexperence', {
                "id": parseInt(positionid),
                "accountid": accountid,
                "companyname": companyname,
                "companyindustry": companyindustry,
                "positionname": positionname,
                "workstarttime": workstarttime,
                "workendtime": workendtime,
                "performance": performance,
                
            }, function(result) {
                $('.fabuactive').css('display','none');
                alert("编辑成功")
                window.history.go( -1 );  

            }, function(result) {
                console.log("失败", result);
                
                    alert(result.msg)
                
            });


        }


    }
});
