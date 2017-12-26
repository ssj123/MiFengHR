'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var Wagesnum = '';
var cardwagesnum = '';
var oldBpos = '';
var oldMpos = '';
var userid = '';
new Vue({
    el: '#page-container',
    data: {
        // tote: "99",

        // labels: [
        // {
        //  billid: '2',
        //     userid: '201',
        //     area: '王小花',
        //     cannal: '北京',
        //     wages: '999999',
        //     time: '2017-11-11',
        // },
        // ],
    },

    mounted: function mounted() {

        var query = getUrlQuery();
       
        var _this = this;
        postJSON('/api/getonebill', { Id: query.id }, function (result) {
           
            $('#userid').html(result.msg.UserId);
            $('#UserName').html(result.msg.UserName);
            $('#Channel').html(result.msg.Channel);

            if (result.msg.Payment == "支付宝") {
                $(".select").val(0); //支付方式
            } else if (result.msg.Payment == "微信") {
                $(".select").val(1);
            } else if (result.msg.Payment == "银行卡") {
                $(".select").val(2);
            } else if (result.msg.Payment == "其他") {
                $(".select").val(3);
            }

            $('#ta1').val(result.msg.Bonus);
            $('#ta2-1').val(result.msg.Blastmonth);
            $('#ta3-1').val(result.msg.Slastmonth);
            $('#ta2-3').val(result.msg.Bpos);
            $('#ta3-3').val(result.msg.Mpos);
            $('#ta2-4').val(result.msg.BlastmonthWages);
            $('#ta3-4').val(result.msg.SlastmonthWages);
          

            $('#ta2-2').val('1'); //比例
            $('#ta3-2').val('1'); //比例

            $('#ta4').val(result.msg.Quantity);
            $('#ta5').val(result.msg.Rebates);
            $('#ta6').val(result.msg.Arrears);

            Wagesnum = result.msg.Wages;
            cardwagesnum = parseFloat(result.msg.Smoney) + parseFloat(result.msg.Omoney);
            oldBpos = result.msg.Bpos;
            oldMpos = result.msg.Mpos;
            
            $('#Wages').val(Wagesnum);
            $('#remark').val(result.msg.Remark); //备注
            $('#state').val(result.msg.BillStatus); //订单状态
            $('#timedata').val(result.msg.Date)
        }, function (result) {
            
        });
    },
    methods: {

        // 提交账单
        putin: function putin() {
            var query = getUrlQuery();
            userid = $('#userid').html();
            var UserName = $('#UserName').html();
            var Channel = $('#Channel').html();

            var payment = $(".select option:selected").text(); //支付方式


           var ta1 = $('#ta1').val();
           var ta2_1 = $('#ta2-1').val();  //大POS交易金额
           var ta3_1 = $('#ta3-1').val();  //MPOS交易金额
           var ta2_3 = $('#ta2-3').val();  //大POS交易量
           var ta3_3 = $('#ta3-3').val();  //MPOS交易量
           var ta2_4 = $('#ta2-4').val();  //大POS上月分润
           var ta3_4 = $('#ta3-4').val();  //MPOS上月分润
           var cardwages = eval(ta2_1) + eval(ta3_1);

           var ratio1 = $('#ta2-2').val(); //比例
           var ratio2 = $('#ta3-2').val(); //比例

           var ta4 = $('#ta4').val();
           var ta5 = $('#ta5').val();
           var ta6 = $('#ta6').val();
           var Wages = $('#Wages').val();
           var remark = $('#remark').val(); //备注
           var state = $('#state').val(); //订单状态

           var date = $('#timedata').val();
           //时间
            // 月账单查询时间
           var timemon = date.substring(0,7);
           
           if (date == '' ) {
               alert("请输入日期")
               return;
           }

           if ( ratio1 > 1 || ratio2 > 1) {
               alert("请输入小数比例")
           }

           if (isNaN(ta1) || ta1 == '' ) {
               ta1 = 0;
           }
           
           if (isNaN(ratio1) || ratio1 == '' ) {
               ratio1 = 0;
           }
           if (isNaN(ratio2) || ratio2 == '' ) {
               ratio2 = 0;
           }
           if (isNaN(ta2_1) || ta2_1 == '' ) {
               ta2_1 = "0";
           }
           if (isNaN(ta3_1) || ta3_1 == '' ) {
               ta3_1 = "0";
           }
           if (isNaN(ta2_3) || ta2_3 == '' ) {
               ta2_3 = "0";
           }
           if (isNaN(ta3_3) || ta3_3 == '' ) {
               ta3_3 = "0";
           }
           if (isNaN(ta2_4) || ta2_4 == '' ) {
               ta2_4 = "0";
           }
           if (isNaN(ta3_4) || ta3_4 == '' ) {
               ta3_4 = "0";
           }
            if (isNaN(ta4) || ta4 == '' ) {
               ta4 = 0;
           } 
           if (isNaN(ta5) || ta5 == '' ) {
               ta5 = 0;
           }
           if (isNaN(ta6) || ta6 == '' ) {
               ta6 = 0;
           }
           if (isNaN(Wages) || Wages == '' ) {
               Wages = '0';
           }

            postJSON('/api/updatebill', {
                "Id": query.id,
               "userid": userid,
                "date": date,
                "billstatus": state,
                "payment": payment, //支付方式
                "sproportion": '1', //比例
                "oproportion": '1',
                "Bonus": ta1,
                "Blastmonth": '' + ta2_1,
                "Slastmonth": '' + ta3_1,
                "Bpos": '' + ta2_3,
                "Mpos": '' + ta3_3,
                "BlastmonthWages": '' + ta2_4,
                "SlastmonthWages":  '' + ta3_4,
                "Quantity": ta4,
                "Rebates": ta5,
                "Arrears": ta6,
                "Wages": '' + Wages,
                "Remark": remark,
                "GenerationDate": timemon,
            }, function (result) {
                

                alert("编辑成功");
               

                // 总工资
                postJSON('/api/allusermsg', { "id": userid }, function (result) {
                   
                    var newwages = $('#Wages').val();
                    var total = newwages - Wagesnum;

                   
                    postJSON('/api/addwages', { "id": userid, "total": '' + total }, function (result) {
                        
                        // location.href = 'picture-list.html';
                    }, function (result) {
                       
                    });
                }, function (result) {
                   
                });

                // 累计POS机
                postJSON('/api/allusermsg', { "id": userid }, function (result) {
                    
                    // alert(Wages)
                    var newcardwagesnum = parseFloat($('#ta2-1').val()) + parseFloat($('#ta3-1').val());
                    var newBpos = parseFloat($('#ta2-3').val());
                    var newMpos = parseFloat($('#ta3-3').val());
                    var total = newcardwagesnum - cardwagesnum;
                    var Bpos = newBpos - oldBpos;
                    var Mpos = newMpos - oldMpos;
                    // alert(cardwagesnum)
                    // alert(newcardwagesnum);
                    // alert(total)
                    if ( Bpos == 0 && Mpos == 0 ) {
                      location.href = 'picture-list.html';
                      return;
                    }
                    postJSON('/api/addcardwages', { "id": userid, "Bpos": '' + Bpos, "Mpos": ''+Mpos, }, function (result) {
                        
                        location.href = 'picture-list.html';
                    }, function (result) {
                      
                    });
                }, function (result) {
                    
                });
            }, function (result) {
             
            });
        },

       // 计算月工资
        count: function count() {

            var ta1 = parseFloat($('#ta1').val());

            var taa1 = parseFloat($('#ta2-1').val());
            var taa2 = parseFloat($('#ta2-2').val());
            if (isNaN(taa2)) {
               taa2 = 1;
            }
            var ta2 = parseFloat(eval(taa1) * eval(taa2)).toFixed(2);

            var tab1 = parseFloat($('#ta3-1').val());
            var tab2 = parseFloat($('#ta3-2').val());
            if ( isNaN(tab2)) {
                            tab2 = 1;
                        }
            var ta3 = parseFloat(tab1 * tab2).toFixed(2);

            var ta4 = parseFloat($('#ta4').val());
            var ta5 = parseFloat($('#ta5').val());
            var ta6 = parseFloat($('#ta6').val());

            
            
            if ( taa2 > 1 || tab2 > 1) {
                alert("请输入小数比例")
            }

            if (isNaN(ta1)) {
                ta1 = 0;
            }
            if (isNaN(ta2)) {
                alert()
                ta2 = 0;
            }
            if (isNaN(ta3)) {
                ta3 = 0;
            }
            if (isNaN(ta4)) {
                ta4 = 0;
            }
            if (isNaN(ta5)) {
                ta5 = 0;
            }
            if (isNaN(ta6)) {
                ta6 = 0;
            }

            var num = parseFloat(eval(ta1) + eval(ta2) + eval(ta3) + eval(ta4) + eval(ta5) + eval(ta6)).toFixed(2);

            $('#Wages').val(num);
             
        },

        close: function close() {
            location.href = 'picture-list.html';
        }

    }
});