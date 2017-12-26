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

            $('.school').val(result.data.school);
            $('.majors').val(result.data.majors) ;
            $('.studystarttime').val(result.data.studystarttime) ;
            $('.studyendtime').val(result.data.studyendtime);
            $('.schoolexperience').val(result.data.schoolexperience) ;
            $('.studyeducational').val(result.data.studyeducational) ;
            
            // //薪资
            // if ( result.data.edueational == "高中") {
                
            //     document.getElementById("edueational").options[1].selected=true;
            // }
            // if ( result.data.edueational == "大专") {
                
            //     document.getElementById("edueational").options[2].selected=true;
            // }
            // if ( result.data.edueational == "本科") {
            //     alert()
            //     document.getElementById("edueational").options[3].selected=true;
            // }
            // if ( result.data.edueational == "硕士") {
                
            //     document.getElementById("edueational").options[4].selected=true;
            // }
            // if ( result.data.edueational == "博士") {
                
            //     document.getElementById("edueational").options[5].selected=true;
            // }

            
        }, function(result) {

        });

       

    },
    methods: {
        //上传基本信息
        updateyourresume: function () {
            $('.fabuactive').css('display','block');
          var school = $('.school').val();
          var majors = $('.majors').val() ;
          var studystarttime = $('.studystarttime').val() ;
          var studyendtime = $('.studyendtime').val() ;
          var schoolexperience = $('.schoolexperience').val() ;
          var edueational = $('.studyeducational').val() ;

          // if (edueational == 0) {
          //   edueational = "3K以下";
          // }else if (edueational == 1) {
          //   edueational = "3K-5k";
          // }else if (edueational == 2) {
          //   edueational = "5k-10k";
          // }else if (edueational == 3) {
          //   edueational = "10k以上";
          // }

          postJSON('/api/updateyourresumeeducation', {
                "id": parseInt(positionid),
                "accountid": accountid,
                "school": school,
                "majors": majors,
                "edueational": edueational,
                "studystarttime": studystarttime,
                "studyendtime": studyendtime,
                "schoolexperience": schoolexperience,
                
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
