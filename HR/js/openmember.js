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
        amount: '',
        way: '',
        accountname: '',
        qrcodeurl: '',
        wayurl : '',
        sex: '',
        agerange: '',
        createtime: '',
        wages: '',
        workdaytime: '',
        welfare: '',
        content: '',
        industry: '',
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
        var b = new Base64(); //加密
        query = ''+GetQueryString("userid");
              
       accountid = parseInt(b.decode(query)); //解密urlid
       
       // var myDate = new Date();
       //  date = _dateFormat(myDate, 'yyyy-MM-dd');
       //  if (query == "zero0" || query == "undefined") {
       //        alert("账户过期，请重新登录");
       //        localStorage.clear();
       //        window.location.href="JHdenglu.html";
       //      }
        _this = this ;

         

       ahhgradefirst() ;

       

    },
    methods: {
        

    }
});
    


function  ahhgradefirst() {
   
       postJSON('/api/gettransfer', { 
                                 
     }, function (result) {

         
        
        _this.amount = result.data.amount ;
        _this.accountname = result.data.accountname ;
        _this.qrcodeurl = result.data.qrcodeurl ;

        if (result.data.way == 0 ) {
            _this.way = "支付宝" ;
            _this.wayurl = "img/zhifubaoioc.jpg";
        }else if( result.data.way == 1 ){
            _this.way = "微信" ;
            _this.wayurl = "img/weixinico.jpg" ;
        }

         // var listuse1 = [];
         //     console.log(result.data.firstorder)
                
         //     for (var j = 0; j < result.data.firstorder.length; j++) {
         //        if ( result.data.firstorder[j].picurl == "" ) {
         //            result.data.firstorder[j].picurl = "../img/t1.jpg" ;
         //        }
         //          result.data.firstorder[j].phone = result.data.firstorder[j].phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
         //         listuse1.push({
         //             username: result.data.firstorder[j].username,
         //             city: result.data.firstorder[j].city,
         //             phone: result.data.firstorder[j].phone,
         //             picurl: result.data.firstorder[j].picurl,
         //             createtime: result.data.firstorder[j].createtime,
                     
         //             // xqurl: "zhiweixaingqing.html?id=" + result.data[j].id,
         //         });
         //     }

         //     _this.labels1 = listuse1;
         $('.fabuactive').css('display','none');
     }, function (result) {

     });

}

