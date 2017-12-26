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
        grade: function grade(gradeid, jilustatus, accountid, positionid, fphone) {
            // $('.upid').html(gradeid);
            gradeid = gradeid;
            accountid = accountid;
            positionid = positionid;
            fphone = fphone;
            jilustatus = jilustatus ;

            arrayte = transferParameters(gradeid, accountid, positionid, fphone,jilustatus);

            if ( jilustatus == 8 ) {
                alert("此用户已成功上岗！");
                return ;
            }

            $('.dialog').css({ 'z-index': '19891015', 'left': '553px' });
            document.getElementById("jilustatus").options[jilustatus].selected = true;

        },


        // 检索
        search: function search() {}

    }

});

//修改求职状态
function dialog() {

    if ( arrayte[0].jilustatus == 8 ) {
        $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
        alert("此用户已成功上岗！");
        return ;
    }

    var status = $('.stsselect').val();
    var remark = $('.schoolexperience').val();
    transferParameters();

    if (status == 8) {
        var r = confirm("成功上岗推荐猎头佣金会累加 ！")
        if (r == true) {

            postJSON('/api/updateuesumelogstatus', {
                        "id": arrayte[0].gradeid,
                        "status": parseInt(status),
                        "remark": remark,
                    }, function(result) {

                        postJSON('/api/addcommission', {
                            "id": arrayte[0].accountid,
                            "positionid": arrayte[0].positionid,
                            "fphone": '' + arrayte[0].fphone,
                                                }, function(result) {

                                    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
                                    alert(" 修改成功 ， 推荐猎头佣金已累加！ ")

                                    return;

                            location.href = 'product-resumeApplication.html';
                            }, function(result) {

                        });


                    alert("修改成功！")

                    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
                    location.href = 'product-resumeApplication.html';
                },
                function(result) {

                });

    }
}else{

    postJSON('/api/updateuesumelogstatus', {
        "id": arrayte[0].gradeid,
        "status": parseInt(status),
        "remark": remark,
    }, function(result) {

            alert("修改成功！")

        

        $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
        location.href = 'product-resumeApplication.html';
    }, function(result) {

    });
}
};

// 传参函数
function transferParameters(gradeid, accountid, positionid, fphone,jilustatus) {

    var gradeid1 = gradeid;
    var accountid1 = accountid;
    var positionid1 = positionid;
    var fphone1 = fphone;
    var jilustatus1 = jilustatus ;
    var array = [];
    array = [{ 'gradeid': gradeid1, 'accountid': accountid1, 'positionid': positionid1, 'fphone': fphone1 , 'jilustatus': jilustatus1 }];
    return array;

}

// 修改简历状态框关闭
function dialogclose() {
    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
    $('.subid').val('');
};

// 年龄排序
function paixuage() {
    var $tr = $(".tbody").find('tr');

    var array = []; //[{index:0,age:12},{index:1,age:15}~~~]  
    $tr.each(function() {
        var obj = {};

        obj["index"] = $(this).index();
        obj["ID"] = $(this).children('td').eq(1).html();
        obj["age"] = $(this).children('td').eq(4).html();
        obj["cardtotal"] = $(this).children('td').eq(6).html();
        obj["WageTotal"] = $(this).children('td').eq(7).html();
        obj["wechat"] = $(this).children('td').eq(8).html();
        obj["telphone"] = $(this).children('td').eq(9).html();
        obj["time"] = $(this).children('td').eq(11).html();
        array.push(obj);
    });

    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
    $.each(array, function(i, elem) {
        console.log(array[i].age);
    });
    //排序  
    var judge = 0;
    if (judge == 0) {
        var sortBy = function sortBy(a, b) {

            return a.age - b.age;
        };

        array.sort(sortBy);

        judge = 1;
    } else {
        var _sortBy = function _sortBy(a, b) {

            return b.age - a.age;
        };

        array.sort(_sortBy);

        judge = 0;
    }

    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
    //删除旧数组生成新数组  
    // $('.tbody').empty().append($tr);  
    for (var i = 0; i < array.length; i++) {
        $('.tbody').append($tr.eq(array[i].index));
        console.log(array[i].index);
    }
}


//请求数据
function ajax() {


    var pagesize = parseInt($(".selectnum option:selected").text());
    var page = parseInt($('.pagessto').html());

    postJSON('/api/getresumelog', { "page": page, "pagesize": pagesize, }, function(result) {
        numtotal = result.total;

        _this.tote = numtotal;

        if (numtotal < pagesize) {
            $('.btn1dis').addClass('disabled');
        }

        var listuse1 = [];
        var qiuzhistatus = "";

        for (var j = 0; j < result.msg.length; j++) {
            if (result.msg[j].status == 0) {
                qiuzhistatus = "应聘中";
            } else if (result.msg[j].status == 1) {
                qiuzhistatus = "拒绝应聘";
            } else if (result.msg[j].status == 2) {
                qiuzhistatus = "初试中";
            } else if (result.msg[j].status == 3) {
                qiuzhistatus = "初试失败";
            } else if (result.msg[j].status == 4) {
                qiuzhistatus = "复试中";
            } else if (result.msg[j].status == 5) {
                qiuzhistatus = "复试失败";
            } else if (result.msg[j].status == 6) {
                qiuzhistatus = "实习中";
            } else if (result.msg[j].status == 7) {
                qiuzhistatus = "实习失败";
            } else if (result.msg[j].status == 8) {
                qiuzhistatus = "成功上岗";
            } else if (result.msg[j].status == 9) {
                qiuzhistatus = "上岗失败";
            }

            if (result.msg[j].fphone == "") {
                result.msg[j].fphone = "无";
            }
            if (result.msg[j].remark == "") {
                result.msg[j].remark = "无";
            }

            listuse1.push({
                accountid: result.msg[j].accountid,

                positionid: result.msg[j].positionid,
                id: result.msg[j].id,
                username: result.msg[j].username,
                phone: result.msg[j].phone,
                sex: result.msg[j].sex,
                age: result.msg[j].age,
                status: qiuzhistatus,
                jilustatus: result.msg[j].status,
                company: result.msg[j].company,
                fphone: result.msg[j].fphone,
                position: result.msg[j].position,

                remark: result.msg[j].remark,
                date: result.msg[j].date,
                team: 'myall.html?userid=' + result.msg[j].accountid,
                // editurl: 'product-brand-1.html?userid=' + result.msg[j].accountid,
            });
        }

        _this.labels = listuse1;
    }, function(result) {
        console.log("失败：" + result);
    });
}