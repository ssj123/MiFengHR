'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var PassWord = "" ;

new Vue({
    el: '#editpage',
    data: {},

    mounted: function mounted() {

        var query = parseInt(getUrlQuery().id);
        
        var _this = this;
        postJSON('/api/getoneaccountapplyjob', { Id: query }, function (result) {
             PassWord = result.data[0].password ;
            $('#tsname').val(result.data[0].username);
            $('#tssex').val(result.data[0].sex);
            $('#tsago').val(result.data[0].age);
            
            $('#tstelphone').val(result.data[0].phone);
            $('#fphone').val(result.data[0].fphone);
            $('#fid').val(result.data[0].fid);
            

        }, function (result) {

        });
    },
    methods: {


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

    }, function (result) {
        alert("修改信息成功成功");
        location.href = 'article-list.html';
       
    }, function (result) {
    
    });
}

function layer_close() {
    location.href = 'article-list.html';
}