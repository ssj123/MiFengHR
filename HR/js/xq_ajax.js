'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var page = 1;
var pagesize = 10;
var numtotal = 0;
var positionid ;

new Vue({
    el: '.container',
    data: {
        position: '',
        company: '',
        area:'',
        workdaytime: '',
        welfare: '',
        content: '',
        industry: '',
        worktime:'',
        edueational:'',
        sex: '',
        agerange: '',
        createtime: '',
        wages:'',
        commission: '',
        fyurl: '',
        huiyuanurl: '',
        labels:[],
    },

    mounted: function mounted() {
        $('.fabuactive').css('display','block');
        var query = getUrlQuery().id;//职位id
        positionid = query ;
        var b = new Base64(); //加密
        var urlUserid = ''+GetQueryString("userid"); //用户id
        console.log(urlUserid)
        if(urlUserid == null && urlUserid.toString().length == 0 )
        {
           urlUserid = "zero0";
        }
        var userid = b.decode(urlUserid); //用户id
        console.log(urlUserid)
        console.log(userid);
        var _this = this;
        postJSON('/api/getoneposition', { "id": parseInt(query), }, function (result) {
             
            numtotal = result.total   ;
            _this.tote = numtotal;

                    _this.positioncontent= result.data[0].positioncontent;
                    _this.position= result.data[0].position;
                    _this.company= result.data[0].company;
                    _this.area= result.data[0].area;
                    _this.worktime= result.data[0].worktime;
                    _this.edueational= result.data[0].edueational;
                    _this.wages= result.data[0].wages;
                    _this.createtime = result.data[0].createtime;
                    _this.workdaytime = result.data[0].workdaytime;
                    _this.welfare = result.data[0].welfare;
                    _this.content = result.data[0].content;
                    _this.sex = result.data[0].sex;
                    _this.agerange = result.data[0].agerange;
                    _this.industry = result.data[0].industry;
                    _this.commission = result.data[0].commission;
                    _this.fyurl = "fanyongguize.html?userid="+urlUserid;
                    // _this.huiyuanurl = "fanyongguize.html?userid="+urlUserid; 开通会员
            $('.fabuactive').css('display','none');
        }, function (result) {

        });

        $(function () {

        $(".zqyj").click(function(){
          
            $(".yongjin").show();
            $(".yongjina").show();
          })
          
          $(".yongjin").click(function(){
            $(".yongjin").hide();
            $(".yongjina").hide();
          })
})

    },
    methods: {
        //加载更多
        moredata: function () {
            page++;
            pagesize = pagesize+10 ;
            var maxpage = Math.ceil(numtotal/10);
            console.log(page,maxpage)
            if (maxpage+1 == page ) {
                alert("没有更多数据啦！");
                return ;
            }
            var _this = this;
            postJSON('/api/getposition', { "page": 1,  "pagesize": pagesize ,}, function (result) {
                 
                numtotal = result.total   ;
                _this.tote = numtotal;
                if ( numtotal < pagesize ) {
                    $('.btn1dis').addClass('disabled');
                }

                var listuse1 = [];

                for (var j = 0; j < result.data.length; j++) {
                    
                    listuse1.push({
                        positioncontent: result.data[j].positioncontent,
                        position: result.data[j].position,
                        company: result.data[j].company,
                        area: result.data[j].area,
                        worktime: result.data[j].worktime,
                        edueational: result.data[j].edueational,
                        wages: result.data[j].wages,
                        
                        xqurl: "zhiweixaingqing.html?id="+result.data[j].id,
                    });
                }

                _this.labels = listuse1;
                
            }, function (result) {

            });
        }

    }
});

if ( document.referrer == "" ) {
    window.location.href="share.html?id="+positionid;
}