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

            $('.resumename').val(result.data.resumename);
            $('.educational').val(result.data.educational) ;
            $('.workyears').val(result.data.workyears) ;
            $('.company').val(result.data.company) ;
            $('.city').val(result.data.city) ;
            $('.industry').val(result.data.industry) ;
            $('.position').val(result.data.position) ;
            $('.phone').val(result.data.phone) ;
            $('.username').val(result.data.username) ;
            $('.age').val(result.data.age) ;
            // $('.sex').val(result.data.sex) ;
            // $('.salary').val(result.data.salary) ;
            // $('.positionstate').val(result.data.positionstate) ;

            //性别
            if ( result.data.sex == "男") {
               
                document.getElementById("sex").options[1].selected=true;
            }
            if ( result.data.sex == "女") {
                
                document.getElementById("sex").options[2].selected=true;
            }

            //在职
            
            if ( result.data.positionstate == "在职") {
               
                document.getElementById("positionstate").options[1].selected=true;
            }
            if ( result.data.positionstate == "离职") {
                
                document.getElementById("positionstate").options[2].selected=true;
            }

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
            $('.fabuactive').css('display','none');
            
        }, function(result) {

        });

       

    },
    methods: {
        //上传基本信息
        updateyourresume: function () {
            $('.fabuactive').css('display','block');
          var resumename = $('.resumename').val();
          var educational = $('.educational').val() ;
          var workyears = $('.workyears').val() ;
          var company = $('.company').val() ;
          var city = $('.city').val() ;
          var industry = $('.industry').val() ;
          var position = $('.position').val() ;
          var phone = $('.phone').val() ;
          var username = $('.username').val() ;
          var age = $('.age').val() ;
          var sex = $('#sex').val();
          var positionstate = $('#positionstate').val();
          var salary = $('#salary').val();

          // 性别
          if (sex == 0) {
            sex = "男";
          }else if (sex == 1) {
            sex = "女";
          }

          // 在职
          if (positionstate == 0) {
            positionstate = "在职";
          }else if (positionstate == 1) {
            positionstate = "离职";
          }

          if (salary == 0) {
            salary = "3K以下";
          }else if (salary == 1) {
            salary = "3K-5k";
          }else if (salary == 2) {
            salary = "5k-10k";
          }else if (salary == 3) {
            salary = "10k以上";
          }

          postJSON('/api/updateyourresume', {
                "id": parseInt(positionid),
                "accountid": accountid,
                "resumename": resumename,
                "educational": educational,
                "workyears": workyears,
                "company": company,
                "city": city,
                "industry": industry,
                "position": position,
                "positionstate": positionstate,
                "salary": salary,
                "phone": phone,
                "username": username,
                "age": parseInt(age),
                "sex": sex,
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
