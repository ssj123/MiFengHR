'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var page = 1;
var pagesize = 10;
var numtotal = 0;
var type;
var welfare;
var area;
var query;
var userid;
var _this;

new Vue({
    el: '.vuebox',
    data: {
        myurl: '',
        myjinzhanurl: '',
        labels: [],
    },

    mounted: function mounted() {
        $('.fabuactive').css('display', 'block');



        var b = new Base64(); //加密
        query = '' + getUrlQuery().id;
        if (query == "undefined") {
            query = "zero0";
        } else {
            userid = b.decode(query); //解密urlid
        }



        type = "";
        welfare = "";
        area = "";

        _this = this;
        console.log(_this)
        _this.myurl = "member.html?userid=" + query;
        _this.myjinzhanurl = "myqiuzhijilugeren.html?userid=" + query;
        postJSON('/api/getposition', { "page": page, "pagesize": pagesize, }, function(result) {

            numtotal = result.total;
            _this.tote = numtotal;

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
                    xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
                });
            }

            _this.labels = listuse1;
            $('.fabuactive').css('display', 'none');

        }, function(result) {

        });

        //我的中心点击跳转
        $('.myhome').click(function() {
            window.location.href = "member.html?id=" + query;
        })

    },
    methods: {
        //加载更多
        moredata: function() {
            page++;
            pagesize = pagesize + 10;
            var maxpage = Math.ceil(numtotal / 10);
            console.log(page, maxpage)
            if (maxpage + 1 == page) {
                alert("没有更多数据啦！");
                return;
            }
            _this = this;
            console.log(_this)
            postJSON('/api/getposition', { "page": 1, "pagesize": pagesize, "type": type, "welfare": welfare, "area": area, }, function(result) {

                numtotal = result.total;
                _this.tote = numtotal;
                if (numtotal < pagesize) {
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

                        xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
                    });
                }

                _this.labels = listuse1;

            }, function(result) {

            });
        }

    }
});

function edituser() {
    var query = parseInt(getUrlQuery().id);
    var UserName = $('#tsname').val();
    var Sex = $('#tssex').val();
    var Age = parseInt($('#tsago').val());

    var TelPhone = $('#tstelphone').val();

    var fphone = $('#fphone').val();
    var fid = parseInt($('#fid').val());

    postJSON('/api/updateaccountapplyjob', {
        "id": query,
        "username": UserName,
        "password": PassWord,

        "sex": Sex,
        "age": Age,
        "phone": TelPhone,
        "fid": fid,
        "fphone": fphone,

    }, function(result) {
        alert("修改信息成功成功");
        location.href = 'article-list.html';

    }, function(result) {

    });
}

function layer_close() {
    location.href = 'article-list.html';
}



// 分类
$(function() {
    /**
     * 联动的picker--添加修改后修改数据的效果
     * 两级
     */
    // $('.select-value1').mPicker({
    //     level: 2,
    //     dataJson: dataJson,
    //     Linkage: true,
    //     rows: 6,
    //     idDefault: true,
    //     splitStr: '-',
    //     header: '<div class="mPicker-header">两级联动选择插件</div>',
    //     confirm: function (json) {
    //         $('.fabuactive').css('display','block');
    //         console.info('当前选中json：', json);
    //         // _this= this;
    //         console.log(_this)
    //         console.info('【json里有带value的情况】');

    //          area = json.name ;
    //         postJSON('/api/getposition', { "page": page,  "pagesize": pagesize , "area": area }, function (result) {
    //             $('.guanjianci').hide()
    //             if (result.data.length == 0 ) {
    //                 $('.guanjianci').show() ;
    //                 $('.guanjianci').html("抱歉，暂时没有此类数据！");
    //                 $('.guanjianci').css({"margin":"2rem"},{"height":"5rem"});

    //             }

    //             numtotal = result.total   ;
    //             _this.tote = numtotal;

    //             var listuse1 = [];

    //             for (var j = 0; j < result.data.length; j++) {
    //                 console.log(result.data[j].company)
    //                 listuse1.push({
    //                     positioncontent: result.data[j].positioncontent,
    //                     position: result.data[j].position,
    //                     company: result.data[j].company,
    //                     area: result.data[j].area,
    //                     worktime: result.data[j].worktime,
    //                     edueational: result.data[j].edueational,
    //                     wages: result.data[j].wages,
    //                    xqurl: "zhiweixaingqing.html?id="+result.data[j].id+"&userid="+query,
    //                 });
    //             }

    //             _this.labels = listuse1;

    //              $('.fabuactive').css('display','none');

    //         }, function (result) {

    //         });

    //     },
    //     cancel: function (json) {
    //     }
    // })
    // //获取value
    // function getVal(){
    //     var value1 = $('.select-value1').data('value1');
    //     var value2 = $('.select-value1').data('value2');
    //     var result='';
    //     value1 = value1 || '';
    //     value2 = value2 || '';
    //     if(value1){
    //         result= value1;
    //     }
    //     if(value2){
    //         result = result+'-'+ value2;
    //     }
    //     return {
    //         value:[value1, value2],
    //         result: result
    //     };
    // }

    /**
     * 联动的picker
     * 三级
     */
    $('.select-value1').mPicker({
        level: 3,
        dataJson: city3,
        Linkage: true,
        rows: 6,
        idDefault: true,
        splitStr: '-',
        header: '<div class="mPicker-header">省市</div>',
        confirm: function(json) {

            console.info('选中的value为：', json.values);

            area = json.values;

            postJSON('/api/getposition', { "page": page, "pagesize": pagesize, "area": area }, function(result) {
                $('.guanjianci').hide()
                if (result.data.length == 0) {
                    var jiequ = [];
                    jiequ = area.split('-', 3);
                    area = jiequ[0] + "-" + jiequ[1];

                    postJSON('/api/getposition', { "page": page, "pagesize": pagesize, "area": area }, function(result) {
                        $('.guanjianci').hide()
                        if (result.data.length == 0) {
                            $('.guanjianci').show();
                            $('.guanjianci').html("抱歉，暂时没有此类数据！");
                            $('.guanjianci').css({ "margin": "2rem" }, { "height": "5rem" });

                        }

                        numtotal = result.total;
                        _this.tote = numtotal;

                        var listuse1 = [];

                        for (var j = 0; j < result.data.length; j++) {
                            console.log(result.data[j].company)
                            listuse1.push({
                                positioncontent: result.data[j].positioncontent,
                                position: result.data[j].position,
                                company: result.data[j].company,
                                area: result.data[j].area,
                                worktime: result.data[j].worktime,
                                edueational: result.data[j].edueational,
                                wages: result.data[j].wages,
                                xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
                            });
                        }

                        _this.labels = listuse1;

                        $('.fabuactive').css('display', 'none');

                    }, function(result) {

                    });

                }

                numtotal = result.total;
                _this.tote = numtotal;

                var listuse1 = [];

                for (var j = 0; j < result.data.length; j++) {
                    console.log(result.data[j].company)
                    listuse1.push({
                        positioncontent: result.data[j].positioncontent,
                        position: result.data[j].position,
                        company: result.data[j].company,
                        area: result.data[j].area,
                        worktime: result.data[j].worktime,
                        edueational: result.data[j].edueational,
                        wages: result.data[j].wages,
                        xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
                    });
                }

                _this.labels = listuse1;

                $('.fabuactive').css('display', 'none');

            }, function(result) {

            });


        },
        cancel: function(json) {

        }
    })
    // //获取mpicker实例
    // var method= $('.select-value').data('mPicker');
    // console.info('第一个mpicker的实例为：',method);




    // 一级分类
    var method3 = $('.select-value3').mPicker({
        level: 1,
        dataJson: level4,
        Linkage: false,
        rows: 6,
        idDefault: true,
        header: '<div class="mPicker-header">分类选择</div>',
        confirm: function(json) {
            $('.fabuactive').css('display', 'block');
            console.info('当前选中json：', json);
            welfare = json.name;

            if (welfare == "全部分类") {
                welfare = "";
                type = "全职";
                postJSON('/api/getposition', { "page": page, "pagesize": pagesize, type: "全职" ,}, function(result) {
                    $('.guanjianci').hide()
                    if (result.data.length == 0) {
                        $('.guanjianci').show();
                        $('.guanjianci').html("抱歉，暂时没有此类数据！");
                        $('.guanjianci').css({ "margin": "2rem" }, { "height": "5rem" });

                    }
                    numtotal = result.total;
                    _this.tote = numtotal;

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
                            xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
                        });
                    }

                    _this.labels = listuse1;

                    $('.fabuactive').css('display', 'none');

                }, function(result) {

                });
            }

            // if (welfare == "全职工作" || welfare == "兼职工作") {

            //     if (welfare == "全职工作") {
            //         type = "全职";
            //     } else {
            //         type = "兼职";
            //     }

            //     welfare = "";
            //     postJSON('/api/getposition', { "page": page, "pagesize": pagesize, "type": type }, function(result) {
            //         $('.guanjianci').hide()
            //         if (result.data.length == 0) {
            //             $('.guanjianci').show();
            //             $('.guanjianci').html("抱歉，暂时没有此类数据！");
            //             $('.guanjianci').css({ "margin": "2rem" }, { "height": "5rem" });

            //         }
            //         numtotal = result.total;
            //         _this.tote = numtotal;

            //         var listuse1 = [];

            //         for (var j = 0; j < result.data.length; j++) {

            //             listuse1.push({
            //                 positioncontent: result.data[j].positioncontent,
            //                 position: result.data[j].position,
            //                 company: result.data[j].company,
            //                 area: result.data[j].area,
            //                 worktime: result.data[j].worktime,
            //                 edueational: result.data[j].edueational,
            //                 wages: result.data[j].wages,
            //                 xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
            //             });
            //         }

            //         _this.labels = listuse1;

            //         $('.fabuactive').css('display', 'none');

            //     }, function(result) {

            //     });

            // } else {

            //     postJSON('/api/getposition', { "page": page, "pagesize": pagesize, "welfare": welfare }, function(result) {
            //         $('.guanjianci').hide()
            //         if (result.data.length == 0) {
            //             $('.guanjianci').show();
            //             $('.guanjianci').html("抱歉，暂时没有此类数据！");
            //             $('.guanjianci').css({ "margin": "2rem" }, { "height": "5rem" });

            //         }

            //         numtotal = result.total;
            //         _this.tote = numtotal;

            //         var listuse1 = [];

            //         for (var j = 0; j < result.data.length; j++) {
            //             console.log(result.data[j].company)
            //             listuse1.push({
            //                 positioncontent: result.data[j].positioncontent,
            //                 position: result.data[j].position,
            //                 company: result.data[j].company,
            //                 area: result.data[j].area,
            //                 worktime: result.data[j].worktime,
            //                 edueational: result.data[j].edueational,
            //                 wages: result.data[j].wages,
            //                 xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
            //             });
            //         }

            //         _this.labels = listuse1;

            //         $('.fabuactive').css('display', 'none');

            //     }, function(result) {

            //     });
            // }



        },
        cancel: function(json) {
            console.info('当前选中json：', json);
        }
    })

});

// 兼职区
$('.partTime').on('click', function() {
    $('.fabuactive').css('display', 'block');

    area = "";
    welfare = "";
    postJSON('/api/getposition', { "page": page, "pagesize": pagesize, "type": "兼职" }, function(result) {
        $('.guanjianci').hide()
        if (result.data.length == 0) {
            $('.guanjianci').show();
            $('.guanjianci').html("抱歉，暂时没有此类数据！");
            $('.guanjianci').css({ "margin": "2rem" }, { "height": "5rem" });

        }
        numtotal = result.total;
        _this.tote = numtotal;

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
                xqurl: "zhiweixaingqing.html?id=" + result.data[j].id + "&userid=" + query,
            });
        }

        _this.labels = listuse1;

        $('.fabuactive').css('display', 'none');

    }, function(result) {

    });
})