'use strict';

// setBaseUrl('http://192.168.1.114:8092');


var number = 1;
var numpage = 0;
var numtotal = 0;
var positionid ;
var _this ;

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

        $(".selectnum").change(function () {
            // $("#tabone  tr:not(:first)").html("");
            ajax(); 
        });

        // 下拉框检索

        $("#searchbtn").change(function () {
            $('#searchtxt').addClass('ac_loading');
            var searchtxt = $('#searchtxt').val();
            var searchval = $('#searchbtn').val();

            if (searchtxt == '') {
                $('#searchtxt').removeClass('ac_loading');
                return;
            }

            
        });

        // 工资范围查询
        $(".moneysearch").change(function () {
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

            var maxnumber = Math.ceil(numtotal/jishupagesize);
            
            if (number == 1 ) {
                $('.btnupdis').addClass('disabled');
            }

            ajax();

        },
        // 下一页

        downpages: function downpages() {
            number++;
            $('.pagessto').html(number) ;
            $('.btnupdis').removeClass('disabled');

            _this = this;

            var jishupagesize = parseInt($(".selectnum option:selected").text());
            

            var maxnumber = Math.ceil(numtotal/jishupagesize);

            if ( number == maxnumber ) {
                $('.btn1dis').addClass('disabled');
            }

           ajax()
        },

        // 编辑用户
        edit: function edit(id) {


            postJSON('/api/getoneuser', { "id": '' + id }, function (result) {
      
                // location.href = 'article-list.html';
            }, function (result) {

            });
        },


        // 删除用户
        remove: function remove(id) {
           
            var r = confirm("确定删除？");
            if (r == true) {

                postJSON('/api/deluser', { "id": '' + id }, function (result) {
                    
                    location.href = 'article-list.html';
                }, function (result) {
             
                });
            }
        },


        // 插入级别表
        // 显示
        grade: function grade(gradeid,jilustatus) {
            // $('.upid').html(gradeid);
            positionid = gradeid ;
            $('.dialog').css({ 'z-index': '19891015', 'left': '553px' });
            document.getElementById("jilustatus").options[jilustatus].selected=true;
            
        },


        // 检索
        search: function search() {}

    }

});

//修改求职状态
function dialog() {
    var status = $('.stsselect').val();
    var remark = $('.subid').val();
    console.log(positionid)
    console.log(status)
    console.log(remark)
    
    postJSON('/api/updateenrollogstatus', { 
                        "id": positionid , 
                        "status": parseInt(status) , 
                        "remark": remark , 
                    }, function (result) {
        alert("修改成功")
           $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
           location.href = 'product-resumeApplication.html';
    }, function (result) {
     
    });
};

// 修改简历状态框关闭
function dialogclose() {
    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
    $('.subid').val('');
};



//请求数据
function ajax() {
            
            
            var pagesize = parseInt($(".selectnum option:selected").text());
            var page = parseInt($('.pagessto').html());
            
            postJSON('/api/getenrollog', {"page": page, "pagesize":pagesize,}, function (result) {
                numtotal = result.total   ;

                _this.tote = numtotal;

                if ( numtotal < pagesize ) {
                    $('.btn1dis').addClass('disabled');
                }

                var listuse1 = [];
                var qiuzhistatus = "";

                for (var j = 0; j < result.msg.length; j++) {
                    if (result.msg[j].status == 0 ) {
                        qiuzhistatus= "应聘中";         
                    }else if (result.msg[j].status == 1) {
                        qiuzhistatus= "拒绝应聘";  
                    }
                    else if (result.msg[j].status == 2) {
                        qiuzhistatus= "初试中";  
                    }
                    else if (result.msg[j].status == 3) {
                        qiuzhistatus= "初试失败";  
                    }
                    else if (result.msg[j].status == 4) {
                        qiuzhistatus= "复试中";  
                    }
                    else if (result.msg[j].status == 5) {
                        qiuzhistatus= "复试失败";  
                    }
                    else if (result.msg[j].status == 6) {
                        qiuzhistatus= "实习中";  
                    }
                    else if (result.msg[j].status == 7) {
                        qiuzhistatus= "实习失败";  
                    }
                    else if (result.msg[j].status == 8) {
                        qiuzhistatus= "成功上岗";  
                    }
                    else if (result.msg[j].status == 9) {
                        qiuzhistatus= "上岗失败";  
                    }

                    if ( result.msg[j].fphone == "" ) {
                        result.msg[j].fphone = "无" ;
                    }
                    if ( result.msg[j].remark == "" ) {
                        result.msg[j].remark = "无" ;
                    }
                    
                    listuse1.push({
                        positionid: result.msg[j].positionid ,
                        id: result.msg[j].id,
                        username: result.msg[j].username,
                        phone: result.msg[j].phone,
                        sex: result.msg[j].sex,
                        age: result.msg[j].age,
                        status: qiuzhistatus ,
                        jilustatus: result.msg[j].status,
                        company: result.msg[j].company,
                        fphone: result.msg[j].fphone,
                        position: result.msg[j].position,
                        accountid: result.msg[j].accountid ,
                        remark: result.msg[j].remark,
                        date: result.msg[j].date,
                        team: 'myall.html?userid=' + result.msg[j].accountid,
                        // editurl: 'product-brand-1.html?userid=' + result.msg[j].accountid,
                    });
                }

                _this.labels = listuse1;
            }, function (result) {
                console.log("失败："+result);
            });
        }