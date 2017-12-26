'use strict';

// setBaseUrl('http://192.168.1.114:8092');


var number = 1;
var numpage = 0;
var numtotal = 0;
var _this ;
var id = 0;
var phone;

new Vue({
    el: '.Hui-article-box',
    data: {
        tote: "99",

        labels: [{
            userid: '2',
            nickname: '1234',
            sex: '女',
            ago: '20',
            Fid: '1',
            Fphone: '',
            
            telphone: '1234567890',
            time: '2017-11-11',
            
            editurl: 'article-edit.html'
        }]
    },

    mounted: function mounted() {
        _this = this;

         $('.btnupdis').addClass('disabled');
        ajax();

        $(".selectnum").change(function () {
            // $("#tabone  tr:not(:first)").html("");
            ajax(); 
        });

      

      
    },
    methods: {

        // 上一页
        uppages: function uppages() {
            
            number--;
            $('.pagessto').html(number);

            $('.btn1dis').removeClass('disabled');

            if (number == 1) {
                $('.btnupdis').addClass('disabled');
            }
            _this = this ;

            ajax();
        },
        // 下一页

        downpages: function downpages() {

           number++;
            $('.pagessto').html(number);
            $('.btnupdis').removeClass('disabled');
            _this = this;

            var pagesize = parseInt($(".selectnum option:selected").text());
            var page = parseInt($('.pagessto').html());

            var maxnumber = Math.ceil(numtotal/pagesize);
            
            if (number == maxnumber ) {
                $('.btn1dis').addClass('disabled');
            }

            
            ajax();
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

        // id,手机号搜索
        huntForIdPhone: function () {
            _this = this ;
            
            var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;  
            var price = $('#idphoneval').val();
            
            if ( price == "") {
                id = 0 ;
                phone = "";
            }

            if (!phoneReg.test(price)) {  
                // alert('请输入有效的手机号码！');  
                phone = '';
                id = parseInt(price) ;
                
            } else {
                phone = ''+price ;
                id = 0;
            }
           
            ajax();
        },

        // 插入级别表
        // 显示
        grade: function grade(gradeid) {
            $('.upid').html(gradeid);
            $('.dialog').css({ 'z-index': '19891015', 'left': '553px' });
        },


        // 检索
        search: function search() {}

    }

});

//插入级别
function dialog() {
    var supid = $('.upid').html();
    var subid = $('.subid').val();
    // 判断是否有上级
    postJSON('/api/ishavesup', { "value": subid }, function (result) {
      
        if (result.msg == 2) {
            // 没有上级进行添加

            postJSON('/api/insertgrade', { "supid": supid, "subid": subid }, function (result) {

                var r = confirm("添加成功，是否继续添加？");
                if (r == true) {} else {

                    location.href = 'article-list.html';
                }
            }, function (result) {
                if ($('.subid').val() == '') {
                    alert("请输入下级ID");
                } else {
                    alert("网络连接失败，请稍后再试！");
                }

            });
        } else {
            alert("此用户已有上级，请勿重复添加！");
        }
    }, function (result) {
     
    });
};

// 级别表关闭
function dialogclose() {
    $('.dialog').css({ 'z-index': '0', 'left': '-500px' });
    $('.subid').val('');
};

function ajax() {
           console.log("传递"+id)
            numpage = 0;
            var pagesize = parseInt($(".selectnum option:selected").text());
            var page = parseInt($('.pagessto').html());
            
            postJSON('/api/getaccountapplyjob', {"page": page, "pagesize":pagesize, "id" : id , "phone": phone ,}, function (result) {
                numtotal = result.total   ;
                _this.tote = numtotal;
                if ( numtotal < pagesize ) {
                    $('.btn1dis').addClass('disabled');
                }

                var listuse1 = [];

                for (var j = 0; j < result.data.length; j++) {
                    
                    listuse1.push({
                        userid: result.data[j].id,
                        nickname: result.data[j].username,
                        time: result.data[j].time,
                        sex: result.data[j].sex,
                        ago: result.data[j].age,
                        
                        telphone: result.data[j].phone,
                        Fphone: result.data[j].fphone,
                        Fid: result.data[j].fid,
                        editurl: 'article-edit.html?id=' + result.data[j].id,
                        team: 'product-brand-1.html?id=' + result.data[j].id,
                    });
                }

                _this.labels = listuse1;
            }, function (result) {
                console.log("失败："+result);
            });
        }
