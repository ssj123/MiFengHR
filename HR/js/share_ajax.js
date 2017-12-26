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
    },

    mounted: function mounted() {
        $('.fabuactive').css('display','block');
        positionid = parseInt(GetQueryString("id"));
        console.log(positionid)
        var _this = this;
        postJSON('/api/getoneposition', { "id": positionid, }, function(result) {

            numtotal = result.total;
            _this.tote = numtotal;

            _this.positioncontent = result.data[0].positioncontent;
            _this.position = result.data[0].position;
            _this.company = result.data[0].company;
            _this.area = result.data[0].area;
            _this.worktime = result.data[0].worktime;
            _this.edueational = result.data[0].edueational;
            _this.wages = result.data[0].wages;
            _this.createtime = result.data[0].createtime;
            _this.workdaytime = result.data[0].workdaytime;
            _this.welfare = result.data[0].welfare;
            _this.content = result.data[0].content;
            _this.sex = result.data[0].sex;
            _this.agerange = result.data[0].agerange;
            _this.industry = result.data[0].industry;
            $('.fabuactive').css('display','none');
        }, function(result) {

        });

        var b = new Base64(); //加密
        query = ''+GetQueryString("userid");
              
       accountid = parseInt(b.decode(query)); //解密urlid
       
       var myDate = new Date();
       
        

    },
    methods: {
        //加载更多
        moredata: function() {
            
        },

        //投递简历
        handInResume: function() {
            
            window.location.href="../JH/JHdenglu.html?id=";
            
        }

    }
});
