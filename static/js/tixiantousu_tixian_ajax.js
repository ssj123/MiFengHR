'use strict';

// setBaseUrl('http://192.168.1.114:8092');


var number = 1;
var numpage = 0;
var numtotal = 0;
var positionid;
var fphone;
var accountid;
let gradeid;
var _this;
var arrayte = [];

new Vue({
    el: '.Hui-article-box',
    data: {
        tote: "99",

        labels: [{
            userid: '2',
            nickname: '1234',
            sex: '',
            ago: '20',
            Fid: '1',
            Fphone: '',

            telphone: '1234567890',
            time: '2017-11-11',

            editurl: 'article-edit.html'
        }]
    },

    mounted: function mounted() {

        $('.btnupdis').addClass('disabled');
        numpage = 0;
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

        // 编辑用户
        edit: function edit(id) {


            postJSON('/api/getoneuser', { "id": '' + id }, function(result) {

                // location.href = 'article-list.html';
            }, function(result) {

            });
        },


        // 删除用户
        remove: function remove(id) {

            var r = confirm("确定删除？");
            if (r == true) {

                postJSON('/api/deluser', { "id": '' + id }, function(result) {

                    location.href = 'article-list.html';
                }, function(result) {

                });
            }
        },


        // 插入级别表
        // 显示
        grade: function grade(gradeid, accountid, withdrawalamount,) {
            $('.upid').html(gradeid);
            $('.subid').html(withdrawalamount);
            gradeid = gradeid;
            accountid = accountid;
            withdrawalamount = withdrawalamount;
            

            arrayte = transferParameters(gradeid, accountid, withdrawalamount);

            $('.dialog').css({ 'z-index': '19891015', 'left': '553px' });
            // document.getElementById("jilustatus").options[jilustatus].selected = true;

        },


        // 检索
        search: function search() {}

    }

});

//修改求职状态
function dialog() {

    
    var withdrawalamount = $('.subid').html();
    // var status = $('.stsselect').val();
    var remark = $('.schoolexperience').val();
    
    postJSON('/api/updaterecordlog', {
                            "id": arrayte[0].gradeid,
                            "accountid": arrayte[0].accountid,
                            "withdrawalamount": parseInt(withdrawalamount),
                            "state": 1 ,
                            "remark": remark ,
                                                }, function(result) {

                                    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
                                    alert(" 修改成功 !")

                                    return;

                            // location.href = 'product-resumeApplication.html';
                            }, function(result) {
                                if ( result.status == 403 ) {
                                    alert("修改失败！");
                                }
                        });

};

// 传参函数
function transferParameters(gradeid, accountid, withdrawalamount) {

    var gradeid1 = gradeid;
    var accountid1 = accountid;
    var withdrawalamount1 = withdrawalamount;
    
    var array = [];
    array = [{ 'gradeid': gradeid1, 'accountid': accountid1, 'withdrawalamount': withdrawalamount1, }];
    return array;

}

function dialogclose1(argument) {
    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
                                $('.subid').val('');
}

// 修改简历状态框关闭
function dialogclose() {
    var withdrawalamount = $('.subid').html();
     var remark = $('.schoolexperience').val();
     
    
    postJSON('/api/updaterecordlog', {
                            "id": arrayte[0].gradeid,
                            "accountid": arrayte[0].accountid,
                            "withdrawalamount": parseInt(withdrawalamount),
                            "state": 2 ,
                            "remark": remark ,
                                                }, function(result) {

                                    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
                                    alert(" 修改成功 !")
                     $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
                        $('.subid').val('');
                                    return;

                            // location.href = 'product-resumeApplication.html';
                            }, function(result) {
                                if ( result.status == 403 ) {
                                    alert("修改失败！");

                                }
                                 $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
                                $('.subid').val('');
                        });

   


};



//请求数据
function ajax() {

    var pagesize = parseInt($(".selectnum option:selected").text());
    var page = parseInt($('.pagessto').html());

    postJSON('/api/getallrecordlog', { "page": page, "pagesize": pagesize, }, function(result) {
        numtotal = result.total;

        _this.tote = numtotal;

        if (numtotal < pagesize) {
            $('.btn1dis').addClass('disabled');
        }

        var listuse1 = [];
        var qiuzhistatus = "";
        var state = "";

        for (var j = 0; j < result.data.length; j++) {

            if (result.data[j].way == 0) {
                qiuzhistatus = "银行卡";
            } else if (result.data[j].way == 1) {
                qiuzhistatus = "支付宝";
            } 
            if (result.data[j].state == 0) {
                state = "待提现";
            } else if (result.data[j].state == 1) {
                state = "已提现";
            } else if (result.data[j].state == 2) {
                state = "拒绝提现";
            }

            listuse1.push({
                accountid: result.data[j].accountid,

                bank: result.data[j].bank,
                id: result.data[j].id,
                username: result.data[j].username,
                phone: result.data[j].phone,
                accountnumber: result.data[j].accountnumber,
                withdrawalamount: result.data[j].withdrawalamount,
                way: qiuzhistatus,
                state: state,
                date: result.data[j].date,
                
                // date: result.data[j].date,
                team: 'myall.html?userid=' + result.data[j].accountid,
                // editurl: 'product-brand-1.html?userid=' + result.data[j].accountid,
            });
        }

        _this.labels = listuse1;

    }, function(result) {
        console.log("失败：" + result);
    });

    // for (var i = 0; i < pagesize; i++) {
    //        var colortixian = [];
    //        colortixian = $('.state').eq(i).html();
    //        console.log(colortixian)
    //        if (colortixian == "待提现") {
    //             $('.state').eq(i).css('color','orange');
    //        }
    //     }
}