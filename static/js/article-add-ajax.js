
$('#tsWageTotal').val("0");
function adduser(){
        // alert()
        var username1 = $('#tsname').val(); //id
        var sex1 = $('#tssex').val();   //性別
        var ago1 = $('#tsago').val();     //年齡
        var tal1 = $('#tstal').val();       //地區
        var tsSposNumber = $('#tsSposNumber').val();  //累计MPOS交易总额
        var tsBposNumber = $('#tsBposNumber').val();    //累计大POS交易总额
        var cardtotal1 = $('#tscardtotal').val();  //刷卡总额
        var WageTotal1 = $('#tsWageTotal').val();    //工资总额
        var wechat1 = $('#tswechat').val();    //微信
        var telphone1 = $('#tstelphone').val();    //手机
        var deal1 = $('#tsdeal').val();    //是否交易
        var myDate = new Date();
        var date1 = _dateFormat(myDate,'yyyy-MM-dd H:mm:ss')
        

        postJSON('/api/insertusermsg', { 
                    "username": username1,
                    "sex": sex1,
                    "age": ago1,
                    "channel": tal1,
                    "cardtotal": cardtotal1,
                    "SposNumber": tsSposNumber,
                    "BposNumber": tsBposNumber,
                    "wagetotal": WageTotal1,
                    "wechat": wechat1,
                    "telphone": telphone1,
                    "transactionstatus": deal1,
                    "date": date1, 
                }, function(result) {

                    console.log(result)
                alert("添加成功");
                location.href = 'article-list.html';



            }, function(result) {
                if (result.status == 500) {
                    alert("请输入年龄！")
                }else{
                alert("网络连接失败，请稍后再试！")
            }

            });
}

function layer_close() {
    location.href = 'article-list.html';
}