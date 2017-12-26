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

            $('.hopeindustry').val(result.data.hopeindustry);
            $('.hopeposition').val(result.data.hopeposition) ;
            $('.hopecity').val(result.data.hopecity) ;
            
            //薪资
            if ( result.data.salary == "3K以下") {
                
                document.getElementById("salary").options[1].selected=true;
            }
            if ( result.data.salary == "3K-5k") {
                
                document.getElementById("salary").options[2].selected=true;
            }
            if ( result.data.salary == "5k-10k") {
                
                document.getElementById("salary").options[3].selected=true;
            }
            if ( result.data.salary == "10k以上") {
                
                document.getElementById("salary").options[4].selected=true;
            }
            console.log($('#salary').val())
            
        }, function(result) {

        });

       

    },
    methods: {
        //上传基本信息
        updateyourresume: function () {
            $('.fabuactive').css('display','block');
          var hopeindustry = $('.hopeindustry').val();
          var hopeposition = $('.hopeposition').val() ;
          var hopecity = $('.hopecity').val() ;
          var salary = $('.salary').val() ;

          if (salary == 0) {
            salary = "3K以下";
          }else if (salary == 1) {
            salary = "3K-5k";
          }else if (salary == 2) {
            salary = "5k-10k";
          }else if (salary == 3) {
            salary = "10k以上";
          }

          postJSON('/api/updateyourresumehope', {
                "id": parseInt(positionid),
                "accountid": accountid,
                "hopeindustry": hopeindustry,
                "hopeposition": hopeposition,
                "hopecity": hopecity,
                "hopesalary": salary,
                
            }, function(result) {
                // $('.fabuactive').css('display','none');
                alert("编辑成功")
                window.history.go( -1 );  

            }, function(result) {
                console.log("失败", result);
                
                    alert(result.msg)
                
            });


        }


    }
});
