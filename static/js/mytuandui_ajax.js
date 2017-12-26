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
        total: '',
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

         

       ahhgradefirst() ;

       ahhgradetwo()

       headname(); //获取职位

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
   
       postJSON('/api/ahhgrade', { 
                                    "id": accountid,  
     }, function (result) {

         if (result.data.firstorder == null ) {

            _this.firsttotal = "0" ;
            $('.fabuactive').css('display','none');
            // $('.firstorder').addClass("fabuactive");
            $('.firstorder').html("您还没有组建团队!");
            $('.firstorder').css('display','block');
            // $('.firstorder').show();
            _this.total = "0" ;
            return ;
        }
        
        _this.total = result.total ;
        _this.firsttotal = result.data.firstorder.length ;
        _this.twototal = result.data.secondorder.length ;
         var listuse1 = [];
             console.log(result.data.firstorder)
                
             for (var j = 0; j < result.data.firstorder.length; j++) {
                console.log(result.data.firstorder[j].username)
                  result.data.firstorder[j].phone = result.data.firstorder[j].phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                 listuse1.push({
                     username: result.data.firstorder[j].username,
                     city: result.data.firstorder[j].city,
                     phone: result.data.firstorder[j].phone,
                     picurl: result.data.firstorder[j].picurl,
                     createtime: result.data.firstorder[j].createtime,
                     
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
            if (result.data.secondorder == null ) {
                _this.twototal = "0" ;
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
                    result.data.secondorder[j].phone = result.data.secondorder[j].phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                   
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

function headname() {
    postJSON('/api/getoneaccountheadhunters', { id: accountid }, function (result) {
       
        
        
        if ( result.data[0].headname == 0) {
            
            $('.headname').html("兼职招聘");
        }
        if ( result.data[0].headname == 1) {
            
             $('.headname').html("招聘助理");
        }
        if ( result.data[0].headname == 2) {
            
             $('.headname').html("招聘主管");
        }
        if ( result.data[0].headname == 3) {
            
             $('.headname').html("招聘经理");
        }
        if ( result.data[0].headname == 4) {
            
             $('.headname').html("招聘总监");
        }
        if ( result.data[0].headname == 5) {
            
             $('.headname').html("合伙人");
        }

    }, function (result) {

    });
}