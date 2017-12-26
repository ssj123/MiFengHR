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
        commission: '',
        firsttotal: '',
        twototal: '',
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
        tixianurl: '',
        chongzhi: '',
        labels1: [{
            username: '1',
            },
        
        ],
        labels2: [
                {
                    username: '1',
                },
        ] ,
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
        _this.tixianurl = "tixian.html?userid="+query;
        _this.chongzhi = "openMember.html?userid="+query;
         postJSON('/api/getahhmoney', { 
                                       "id": parseInt(accountid),  
                                       
                                       
        }, function (result) {
            _this.commission = result.commission ;
            
        }, function (result) {

        });

       ahhgradefirst();

    },
    methods: {
        

    }
});
    
    $('.firstorder').show();
    $('.secondorder').hide();

    $('.colorTab').click(function () {
       
        var index = $(this).index();
        if (index == 0) {
            $('.secondorder').hide();
            $('.firstorder').show();
        }else if (index == 1) {
            $('.firstorder').hide();
            $('.secondorder').show();
             _this = this ;
        }
    $(this).addClass("act").siblings().removeClass("act")
})

function  ahhgradefirst() {

       postJSON('/api/getrecordlog', { 
                                    "id": accountid,  
     }, function (result) {
        console.log(result.data)
         if (result.data == null ) {
           alert("没有提现记录！")
            return ;
        }
            
         var listuse1 = [];
             for (var j = 0; j < result.data.length; j++) {
                var jiluway ; 
                if ( result.data[j].state == 0 ) {
                    jiluway = "待提现" ;
                }else if ( result.data[j].state == 1 ) {
                    jiluway = "已提现" ;
                }else if ( result.data[j].state == 2 ) {
                    jiluway = "拒绝提现" ;
                }

                if (result.data[j].remark == "" ) {
                    result.data[j].remark = "无" ;
                }
                if ( result.data[j].accountnumber.length == 11 ) {
                   result.data[j].accountnumber = result.data[j].accountnumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                }else{
                    var reg = /^(\d{4})\d+(\d{4})$/;
                    result.data[j].accountnumber = result.data[j].accountnumber.replace(reg, "$1****$2");
                }
                console.log(result.data[j].accountnumber.length)
                  
                 listuse1.push({
                     withdrawalamount: result.data[j].withdrawalamount,
                     date: result.data[j].date,
                     state: jiluway,
                     accountnumber: result.data[j].accountnumber,
                     id: result.data[j].id ,
                     remark: result.data[j].remark ,
                     bank: result.data[j].bank ,
                     // id: result.data[j].id ,
                     
                     // xqurl: "zhiweixaingqing.html?id=" + result.data[j].id,
                 });
             }

             _this.labels1 = listuse1;
         $('.fabuactive').css('display','none');
     }, function (result) {

     });

}

function ahhgradetwo() {

           postJSON('/api/ahhgrade', { 
                                       "id": accountid,  
            }, function (result) {
                 if (result.data.enrlolog == null ) {
            $('.fabuactive').css('display','none');
            // $('.secondorder').addClass("fabuactive");
            $('.secondorder').html("您还没有组建团队!");
            // $('.secondorder').css('display','block');
            // $('.secondorder').show();
            return ;
        }
            var listuse1 = [];
            console.log(result.data.secondorder)
            
                for (var j = 0; j < result.data.secondorder.length; j++) {

                   
                    listuse1.push({
                        username: result.data.secondorder[j].username,
                        city: result.data.secondorder[j].city,
                        phone: result.data.secondorder[j].phone,
                        picurl: result.data.secondorder[j].picurl,
                        createtime: result.data.secondorder[j].createtime,

                        // xqurl: "zhiweixaingqing.html?id=" + result.data[j].id,
                    });
                }

                _this.labels2 = listuse1;
            
        }, function (result) {

        });

}

