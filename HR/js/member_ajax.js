'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var page = 1;
var pagesize = 10;
var numtotal = 0;
var accountid ; //用户id
var positionid ;
var date ;
var fphone ;
var query ;
var picurl ; //头像地址
var username ; //姓名
var sex ; 
var phone ;
var age ;

new Vue({
    el: '.vuebox',
    data: {
        jibenxinxi: '',
        educational: '',
        myqiuzhijilugeren: '',
        myzichangeren : '',
        tixian : '',
        tousu : '',
        position: '',
        phone: '',
        username: '',
        age: '',
        sex: '',
        picurl: '',
        phone: '',
        hallurladdid:'',
        userid: '',
        myzichan : '',
        mytuandui : '',
        shenfenyanzheng : '',
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
        mytuijian : '',
        labels: [],
    },

    mounted: function mounted() {
        $('.fabuactive').css('display','block');
         //获取地址栏id
            
            
             var b = new Base64(); //加密
             query = ''+GetQueryString("userid");
                   
            accountid = parseInt(b.decode(query)); //解密urlid
            console.log("用户id："+accountid)
            console.log("职位id："+positionid)
            
            if (query == "zero0" || query == "undefined") {
              alert("账户过期，请重新登录");
              localStorage.clear();
              window.location.href="JHdenglu.html";
            }
        
        var _this = this;
        

        _this.hallurladdid = "index.html?id="+query;
        _this.jibenxinxi = "jibenxinxi.html?userid="+query;
        _this.mytuijian = "mytuijian.html?userid="+query;
        _this.mytuandui = "mytoudui.html?userid="+query;
        _this.myzichan = "myzichan.html?userid="+query;
        _this.tixian = "tixian.html?userid="+query;
        _this.tousu = "tousu.html?userid="+query;
        _this.shenfenyanzheng = "openMember.html?userid="+query;
        
        postJSON('/api/getoneaccountheadhunters', { "id": parseInt(accountid), }, function(result) {

           
            _this.userid = result.data[0].id ;

            if (result.data[0].picurl == "") {
                _this.picurl = "../img/t1.jpg" ;
            }else{
                 _this.picurl = result.data[0].picurl;
            }

            _this.username = result.data[0].username;
            _this.phone = result.data[0].phone;

            username = result.data[0].username;
            sex = result.data[0].sex;
            phone = result.data[0].phone;
            age = result.data[0].age;

            
            $('.fabuactive').css('display','none');
        }, function(result) {

        });

        
       var myDate = new Date();
        date = _dateFormat(myDate, 'yyyy-MM-dd');
       
            
        if (positionid != null && positionid.toString().length > 0 ) {
              $('.resumeLd').css('display','block');
            }

    },
    methods: {
        

        
            
        }

    
});

$('#inputImage').live('change',function(file){ 
                if ( phone == "" ) {
                    return ;
                }
               // 更换头像
                var fd = new FormData();
                var myDate = new Date();
                var headImgurl ;
                var date1 = _dateFormat(myDate, 'yyyyMMddHmmssS');
                fd.append("time", '' + date1);
                fd.append("file", $("#inputImage").get(0).files[0]);
                
                console.log(fd)
                postFormData('/api/uploadimg', fd, function(result) {
                        headImgurl = result.msg;

                        $('.touxiangimg').src = headImgurl;

                        postJSON('/api/uploadaccountmsg', { 
                                            "id": parseInt(accountid), 
                                            "picurl": headImgurl ,
                                            "username": username ,
                                            "sex": sex ,
                                            "phone": phone ,
                                            "age": age ,
                                            "atype": 1 ,
                    }, function(result) {
                        alert("更换头像成功！")
                         location.reload() ;
                        }, function(result) {

                        });



                          console.log("成功", result);
                           
                }, function(result) {
                    console.log(result);
                    alert("上传失败");
                });
        
        });


        //退出登录
        $(".exit").click(function(){
                     localStorage.clear();
                     $('.fabuactive').css('display','block');
                     window.location.href="HRdenglu.html";
                })