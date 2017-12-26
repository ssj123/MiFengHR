'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var number = 1;
var numpage = 0;
var numtotal = 0;
var _this ;
var positionid = 0 ;
var type = "" ;
var welfare = "" ;
var area = "" ;

new Vue({
    el: '#bill',
    data: {
        tote: "99",

        labels: [{
            billid: '2',
            userid: '201',
            area: '王小花',
            cannal: '北京',
            wages: '999999',
            time: '2017-11-11',
            BillStatus: '交易成功',
            remark: ''
        }],
        billid1: '',
        userid1: '',
        area1: '',
        ta1: '',
        ta2_1: '',
        ta2_2: '',
        ta3_1: '',
        ta3_2: '',
        ta4: '',
        ta5: '',
        ta6: '',
        Wages: '',
        Payment: '',
        SlastmonthWages: '',
        BlastmonthWages: '',
        Slastmonth: '',
        Blastmonth: '',
    },

    mounted: function mounted() {
        _this = this;

        
        ajax();

        $(".selectnum").change(function() {
            // $("#tabone  tr:not(:first)").html("");
            ajax();
        });

        // 下拉框检索

        $("#searchbtn").change(function() {
            $('#searchtxt').addClass('ac_loading');
            var searchtxt = $('#searchtxt').val();
            var searchval = $('#searchbtn').val();

            if (searchtxt == '') {
                $('#searchtxt').removeClass('ac_loading');
                return;
            }

            
        });

        // 工资范围查询
        $(".moneysearch").change(function() {
            $('.searchtxtup').addClass('ac_loading');
            $('.searchtxtdown').addClass('ac_loading');
            var searchtxt1 = $('.searchtxtup').val();
            var searchtxt2 = $('.searchtxtdown').val();
            var searchval = $('.moneysearch').val();

            if (searchtxt == '') {
                $('.searchtxtup').removeClass('ac_loading');
                $('.searchtxtdown').removeClass('ac_loading');
                return;
            }

           
        });
    },
    methods: {

        // 上一页
        uppages: function uppages() {

            number--;
            $('.pagessto').html(number);

            $('.btn1dis').removeClass('disabled');

            var _this = this;

            var jishupagesize = parseInt($(".selectnum option:selected").text());
            // var page = parseInt($('.pagessto').html());

            var maxnumber = Math.ceil(numtotal / jishupagesize);

            if (number == 1) {
                $('.btnupdis').addClass('disabled');
            }

            ajax();

        },
        // 下一页

        downpages: function downpages() {
            number++;
            $('.pagessto').html(number);
            $('.btnupdis').removeClass('disabled');

            _this = this;

            var jishupagesize = parseInt($(".selectnum option:selected").text());


            var maxnumber = Math.ceil(numtotal / jishupagesize);

            if (number == maxnumber) {
                $('.btn1dis').addClass('disabled');
            }

            ajax()
            


        },

        // 删除账单
        remove: function remove(id) {

            var r = confirm("确定删除？");
            if (r == true) {

                postJSON('/api/delposition', { "id": id }, function(result) {

                    location.href = 'picture-list.html';
                }, function(result) {

                });
            }
        },

        // 查找职位
        chazhaopostion: function () {
            
        },
        // id查找
        chahzaoid: function () {
            area = "";
            type = "" ;
            welfare = "";
           positionid = parseInt($('#idphoneval').val());
           ajax();
        },

        // 兼职全职
         chahzaotype: function () {
            area = "";
            type = $('#idphoneval').val() ;
            welfare = "";
           positionid = 0;
           ajax();
        },

        // 福利
         chahzaowelfare: function () {
            area = "";
            type = "" ;
            welfare = $('#idphoneval').val();
           positionid = 0 ;
           ajax();
        },

        // 地点
         chazhaoarea: function () {
            area = $('#idphoneval').val();
            type = "" ;
            welfare = "";
           positionid = 0 ;
           ajax();
        },



        // 插件详细账单
        see: function see(id) {
            $('.td1').css('display', 'none');
            $('#details').css('display', 'block');
            var _this = this;


           
        },


        returna: function returna() {
            $('.td1').css('display', '');
            $('#details').css('display', 'none');
        },

        // 日期查询账单
        searchdate: function searchdate() {
            var _this = this;

            var tateone = $('.dateone').val();
            var datetwo = $('.datetwo').val();
            // alert(tateone)
            // alert(datetwo)

            var reb = _duibi(tateone, datetwo);


            var listuse = [];

           
        }

    }

});

function ajax() {
    
    var pagesize = parseInt($(".selectnum option:selected").text());
    var page = parseInt($('.pagessto').html());

    postJSON('/api/getposition', { "page": page, "pagesize": pagesize, "type": type , "welfare": welfare, "area": area , "id": positionid , }, function(result) {
        numtotal = result.total;
        _this.tote = numtotal;
        console.log(numtotal, pagesize)
        if (numtotal < pagesize) {
            $('.btn1dis').addClass('disabled');
        }else{
            $('.btn1dis').removeClass('disabled');
        }

        var listuse1 = [];

        for (var j = 0; j < result.data.length; j++) {

            listuse1.push({
                id: result.data[j].id,
                area: result.data[j].area,
                agerange: result.data[j].agerange,
                commission: result.data[j].commission,
                interview: result.data[j].interview,
                sex: result.data[j].sex,
                edueational: result.data[j].edueational,
                worktime: result.data[j].worktime,
                createtime: result.data[j].createtime,
                positioncontent: result.data[j].positioncontent,
                position: result.data[j].position,
                company: result.data[j].company,
                // area: result.data[j].area,
                worktime: result.data[j].worktime,
                // edueational: result.data[j].edueational,
                wages: result.data[j].wages,
                xqurl: "zhiweixaingqing.html?id=" + result.data[j].id,
                alterjob: "qytjzw.html?jobid=" + result.data[j].id,
            });
        }

        _this.labels = listuse1;
    }, function(result) {
        console.log("失败：" + result);
    });
}