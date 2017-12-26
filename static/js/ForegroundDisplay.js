'use strict';

var number = 1;
var numpage = 0;
var numbi = 5;
var myDate = new Date();
var month = _dateFormat(myDate, "MM");
var monnum = 12 - month;
// setBaseUrl("http://192.168.1.114:8093");
var Openid = '';
var uId = '';
var returnr = 0;
new Vue({
    el: '.box',
    data: {
        url: "",
        name: "",
        ID: "",
        money: "",
        labels: [{
            // userid: '2',
            // nickname: '1234',
            // sex: '女',
            // ago: '20',
            // cannal: '北京',

            // cardtotal: '9999999', //刷卡总额
            // WageTotal: '999999', //工资总额
            // wechat: '123456', //微信号
            // telphone: '1234567890',
            // time: '2017-11-11',
        }],
        labels1: [{
            // userid: '2',
            // nickname: '1234',
            // sex: '女',
            // ago: '20',
            // cannal: '北京',

            // cardtotal: '9999999', //刷卡总额
            // WageTotal: '999999', //工资总额
            // wechat: '123456', //微信号
            // telphone: '1234567890',
            // time: '2017-11-11',
        }],
        labels2: [{

        }],
    },

    mounted: function mounted() {

        var _this = this;


        //  for (var i = 0; i <10; i++) {
        //      _this.labels.push({
        //          ranking: i+1,
        //      })
        // }
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

        var Accesstoken = '';

        var code = getQueryString("code");

        var numpage = 0;

        postJSON('/api/httpget', { "Appid": "wxf6ac1720e8ae567d", "Secret": "66376efe4201df4038b04d64b20e77d7", "code": code }, function(result) {


            Accesstoken = result.msg[0].access_token;
            Openid = result.msg[0].openid;

            if (Openid == '') {
                alert("请在微信客户端上查询");
                return;
            }
            postJSON('/api/httpgetmsg', { "accesstoken": Accesstoken, "openid": Openid }, function(result) {


                _this.url = result.msg[0].Headimgurl;
                _this.name = result.msg[0].Nickname;

                // 给数据库插入openid
                postJSON('/api/ishaveopenid', { "openid": Openid }, function(result) {


                    if (result.msg == 3) {
                        $('#tel').css('display', 'block');
                    }
                    if (result.msg == 4) {
                        alert("账户异常，请联系管理员");
                    }
                    if (result.msg == 1) {

                        var myDate = new Date();
                        var date1 = _dateFormat(myDate, 'yyyy')
                        var data2 = parseInt(date1 - 1);
                        // 本人账单
                        postJSON('/api/openidmsg', { "openid": Openid, "Date": '' + date1, "LastDate": data2 + '-12', }, function(result) {
                            if (result.data === null) {
                                $('.ts3').html("暂时还没有您的数据哦，请稍后再查看。");
                                $('.ts2').css('display', 'none');
                                return;
                            }
                            uId = result.data[0].UserId;
                            _this.ID = result.data[0].UserId;


                            result.data2.push({ "Blastmonth": result.data3 });
                            var listuse = [];

                            for (var i = 0; i < 1; i++) {

                                 listuse.push({
                        username: result.data[monnum + i].UserName,
                        Blastmonth: result.data[monnum + i].Blastmonth,
                        BlastmonthWages: result.data[monnum + i].BlastmonthWages,
                        Blastmonth1: result.data2[monnum + i + 1].Blastmonth,
                        Bpos: result.data[monnum + i].Bpos,
                        BposNumber: result.data[monnum + i].BposNumber,
                        Date: result.data[monnum + i].GenerationDate,

                        UserId: result.data[monnum + i].UserId,

                    });


                            }
                            _this.labels = listuse;

                            // 下线账单

                            postJSON('/api/wcteam', { "id": '' + uId }, function(result) {


                                if (numbi > result.data.length) {
                                    numbi = result.data.length;
                                }
                                var listuse2 = [];

                                for (var i = 0; i < numbi; i++) {

                                    listuse2.push({
                                        username: result.data[i].UserName,
                                        billid: result.data[i].Billid,
                                        Blastmonth: result.data[i].Blastmonth,
                                        BlastmonthWages: result.data[i].BlastmonthWages,
                                        Bpos: result.data[i].Bpos,
                                        Id: result.data[i].Id,
                                        Mpos: result.data[i].Mpos,
                                        Slastmonth: result.data[i].Slastmonth,
                                        SlastmonthWages: result.data[i].SlastmonthWages,

                                        Date: result.data[i].GenerationDate,
                                    });

                                }
                                _this.labels2 = listuse2;
                                chart1();

                            }, function(result) {

                            });

                        }, function(result) {

                        });


                    }
                }, function(result) {

                });
            }, function(result) {

            });
        }, function(result) {

        });

        // 图表显示：
        function chart1() {

            var myDate = new Date();
            var year = _dateFormat(myDate, 'yyyy');


            postJSON('/api/thisyearteam', {
                "id": '' + uId,
                "date": year,
            }, function(result) {


                // if (result.data == null) {
                //     $('#mouthnotea').css('color', '#333')
                //     alert("这一年无数据，请查看其他年份");
                // } else {



                // var name = [];
                var weges = [];
                var total = [];
                var resultdata = [];
                var fate = [];
                var wegesarr = [];
                var series1 = [];
                var series2 = [];

                var rea = 0;
                var datas = 0;

                // 每个人的数据
                // 有数据的名字
                var namenew = [];

                for (var j = 0; j < result.data.length; j++) {
                    namenew[j] = result.data[j].UserName;
                }

                var names = _unique(namenew)



                // 截取二维数组
                for (var i = 0; i < names.length; i++) {
                    resultdata[i] = [];

                    for (var j = 0; j < result.data.length; j++) {


                        if (names[i] == result.data[j].UserName) {


                            resultdata[i][j - i * 12] = result.data[j].Wages;
                            fate[j] = result.data[j].GenerationDate;

                        }

                    }


                }
                var fate1 = _unique(fate)

                for (var i = 0; i < names.length; i++) {
                    series2.push({
                        name: names[i],
                        type: 'bar',
                        data: resultdata[i]
                    })

                    series1.push({
                        name: names[i],
                        type: 'line',
                        stack: names[i],
                        data: resultdata[i]
                    })
                }

                $('.main').css({ 'display': 'block', 'background': '#fff' });
                // 柱状图
                var myChart = echarts.init(document.getElementById('main'));
                //填入数据

                var option = {



                    title: {
                        text: year + '数据柱状图'
                    },
                    tooltip: {},
                    legend: {
                        data: names
                    },
                    xAxis: {
                        data: fate1
                    },
                    yAxis: {},
                    series: series2
                    // [{
                    //     name: '工资额/元',
                    //     type: 'bar',
                    //     data: weges
                    // }]
                };

                myChart.setOption(option);


                // 折线图


                var myChart = echarts.init(document.getElementById('main1'));
                option = {
                    title: {
                        text: year + '数据折线图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: names //['总数排名','个人业绩排名','收入排名','团队排名']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: fate1 //日期
                    },
                    yAxis: {
                        type: 'value'
                    },

                    series: series1


                };
                myChart.setOption(option);


                // }



            }, function(result) {

            });
        }


    },
    methods: {
        // 绑定手机号
        bdtel: function() {



            var _this = this;

            var name = $('#namebtn').val();
            var tel = $('#telbtn').val();
            if (name == '') {
                alert("请输入用户名！");
                return;
            }
            if (tel == '') {
                alert("请输入您要绑定的手机号！");
                return;
            }
            postJSON('/api/haveopenid', { "openid": Openid, "UserName": name, "TelPhone": tel }, function(result) {


                if (result.data === null || result.data[0].Openid === '') {
                    postJSON('/api/insertopenid', { "openid": Openid, "UserName": name, "TelPhone": tel }, function(result) {

                        if (result.data == 1) {
                            alert("绑定成功！");
                            $('.tel').css('display', 'none');

                            var myDate = new Date();
                            var date1 = _dateFormat(myDate, 'yyyy')
                            var data2 = parseInt(date1 - 1);
                            // 本人账单
                            postJSON('/api/openidmsg', { "openid": Openid, "Date": '' + date1, "LastDate": data2 + '-12', }, function(result) {
                                if (result.data === null) {
                                    $('.ts3').html("暂时还没有您的数据哦，请稍后再查看。");
                                    $('.ts2').css('display', 'none');
                                    return;
                                }
                                uId = result.data[0].UserId;
                                _this.ID = result.data[0].UserId;


                                result.data2.push({ "Blastmonth": result.data3 });
                                var listuse = [];

                                for (var i = 0; i < 1; i++) {

                                     listuse.push({
                        username: result.data[monnum + i].UserName,
                        Blastmonth: result.data[monnum + i].Blastmonth,
                        BlastmonthWages: result.data[monnum + i].BlastmonthWages,
                        Blastmonth1: result.data2[monnum + i + 1].Blastmonth,
                        Bpos: result.data[monnum + i].Bpos,
                        BposNumber: result.data[monnum + i].BposNumber,
                        Date: result.data[monnum + i].GenerationDate,

                        UserId: result.data[monnum + i].UserId,

                    });


                                }
                                _this.labels = listuse;

                                // 下线账单

                                postJSON('/api/wcteam', { "id": '' + uId }, function(result) {

                                    var numbi = 10;
                                    if (numbi > result.data.length) {
                                        numbi = result.data.length;
                                    }
                                    var listuse2 = [];

                                    for (var i = 0; i < numbi; i++) {

                                        listuse2.push({
                                            username: result.data[i].UserName,
                                            billid: result.data[i].Billid,
                                            Blastmonth: result.data[i].Blastmonth,
                                            BlastmonthWages: result.data[i].BlastmonthWages,
                                            Bpos: result.data[i].Bpos,
                                            Id: result.data[i].Id,
                                            Mpos: result.data[i].Mpos,
                                            Slastmonth: result.data[i].Slastmonth,
                                            SlastmonthWages: result.data[i].SlastmonthWages,

                                            Date: result.data[i].Date,
                                        });

                                    }
                                    _this.labels2 = listuse2;
                                    chart1();

                                }, function(result) {

                                });

                            }, function(result) {

                            });


                        } else if (result.data == 3) {
                            alert("没有此用户，请检查您的输入！")

                        }
                    }, function(result) {


                    });
                } else {

                    alert("此手机号已被绑定！");
                }
            }, function(result) {

            });

        },

        // 注册
        register: function() {
            var UserName = $('.name').val();
            var Sex = $('.sex').val();
            var Age = $('.Age').val();
            var Channel = $('.Channel').val();
            var WeChat = $('.WeChat').val();
            var TelPhone = $('.TelPhone').val();
            var myDate = new Date();
            var date = _dateFormat(myDate, 'yyyy-MM-dd H:mm:ss');
            if (UserName == '') {
                alert("请输入用户名！");
                return;
            }
            if (TelPhone == '') {
                alert("请输入手机号码！");
                return;
            }
            if (Age == '') {
                alert("年龄不能为空！");
                return;
            }
            postJSON('/api/insertusermsg', {
                "username": UserName,
                "sex": Sex,
                "age": Age,
                "channel": Channel,

                "wechat": WeChat,
                "telphone": TelPhone,
                "TransactionStatus": "否",
                "date": date,
            }, function(result) {


                alert("注册成功！");
                $('#register').css('display', 'none');

                $('#tel').css('display', 'block');


            }, function(result) {
                if (result.status == 500) {
                    alert("请输入年龄！")
                } else {
                    alert("网络连接失败，请稍后再试！")
                }

            });
        },

        // 注册按钮
        regbtn: function() {
            $('#tel').css('display', 'none');
            $('#register').css('display', 'block');

        },

        // 本人历史月工资
        his: function() {



            var _this = this;
            var myDate = new Date();
            var date1 = _dateFormat(myDate, 'yyyy')
            var data2 = parseInt(date1 - 1);
            // 本人账单
            postJSON('/api/openidmsg', { "openid": Openid, "Date": '' + date1, "LastDate": data2 + '-12', }, function(result) {
                if (result.data === null) {
                    $('.ts3').html("暂时还没有您的数据哦，请稍后再查看。");
                    $('.ts2').css('display', 'none');
                    return;
                }
                if (returnr == 0) {
                    var releng = result.data.length - monnum;
                    returnr = 1;
                } else if (returnr == 1) {
                    var releng = 1;
                    returnr = 0
                }
                uId = result.data[0].UserId;
                _this.ID = result.data[0].UserId;


                result.data2.push({ "Blastmonth": result.data3 });
                var listuse = [];
                for (var i = 0; i < releng; i++) {

                    listuse.push({

                        username: result.data[monnum + i].UserName,
                        Blastmonth: result.data[monnum + i].Blastmonth,
                        BlastmonthWages: result.data[monnum + i].BlastmonthWages,
                        Blastmonth1: result.data2[monnum + i + 1].Blastmonth,
                        Bpos: result.data[monnum + i].Bpos,
                        BposNumber: result.data[monnum + i].BposNumber,
                        Date: result.data[monnum + i].GenerationDate,

                        UserId: result.data[monnum + i].UserId,

                    });

                }
                _this.labels = listuse;

            }, function(result) {

            });


        },


        // 返回
        revert: function() {
            $('.bigpos').css('display', 'block');
            $('.mpos').css('display', 'none');
        },
        // 注册返回
        revert1: function() {
            $('#tel').css('display', 'block');
            $('#register').css('display', 'none');
        },



        // 下线更多账单
        morezd: function() {
            var _this = this;

            numbi = numbi + 5;
            postJSON('/api/wcteam', { "id": '' + uId }, function(result) {


                if (numbi > result.data.length) {
                    numbi = result.data.length;
                    alert("没有更多账单啦！")
                }
                var listuse2 = [];

                for (var i = 0; i < numbi; i++) {

                    listuse2.push({
                        username: result.data[i].UserName,
                        billid: result.data[i].Billid,
                        Blastmonth: result.data[i].Blastmonth,
                        BlastmonthWages: result.data[i].BlastmonthWages,
                        Bpos: result.data[i].Bpos,
                        Id: result.data[i].Id,
                        Mpos: result.data[i].Mpos,
                        Slastmonth: result.data[i].Slastmonth,
                        SlastmonthWages: result.data[i].SlastmonthWages,

                        Date: result.data[i].GenerationDate,
                    });

                }
                _this.labels2 = listuse2;


            }, function(result) {

            });

        },

        // 查看MPOS销售情况
        mpos: function function_name(argument) {
            $('.bigpos').css('display', 'none');
            $('.mpos').css('display', 'block');
            var _this = this;

            var myDate = new Date();
            var date1 = _dateFormat(myDate, 'yyyy')
            var data2 = parseInt(date1 - 1);
            // 本人账单
            postJSON('/api/sopenidmsg', { "openid": Openid, "Date": '' + date1, "LastDate": data2 + '-12', }, function(result) {

                if (result.data === null) {
                    $('.ts3').html("暂时还没有您的数据哦，请稍后再查看。");
                    $('.ts2').css('display', 'none');
                    return;
                }


                result.data2.push({ "Slastmonth": result.data3 });
                var listuse1 = [];

               for (var i = 0; i < result.data.length - monnum; i++) {

                    listuse1.push({
                        username: result.data[monnum + i].UserName,
                        Slastmonth: result.data[monnum + i].Slastmonth,
                        SlastmonthWages: result.data[monnum + i].SlastmonthWages,
                        Slastmonth1: result.data2[monnum + i + 1].Slastmonth,
                        Mpos: result.data[monnum + i].Mpos,
                        SposNumber: result.data[monnum + i].SposNumber,
                        Date: result.data[monnum + i].GenerationDate,
                        UserId: result.data[monnum + i].UserId,

                    });

                }
                _this.labels1 = listuse1;



            }, function(result) {

            });

        }


    }
});