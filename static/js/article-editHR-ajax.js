'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var PassWord = "";

new Vue({
    el: '#editpage',
    data: {},

    mounted: function mounted() {
        
        var query = parseInt(getUrlQuery().id);
        
        var _this = this;
        postJSON('/api/getoneaccountheadhunters', { Id: query }, function (result) {
            PassWord = result.data[0].password ;
            $('#tsname').val(result.data[0].username);
            $('#tssex').val(result.data[0].sex);
            $('#tsago').val(result.data[0].age);
            
            $('#tstelphone').val(result.data[0].phone);
            $('#fphone').val(result.data[0].fphone);
            $('#fid').val(result.data[0].commission);
            
            
            if ( result.data[0].headname == 0) {
                
                document.getElementById("headname").options[0].selected=true;
            }
            if ( result.data[0].headname == 1) {
                
                document.getElementById("headname").options[1].selected=true;
            }
            if ( result.data[0].headname == 2) {
                
                document.getElementById("headname").options[2].selected=true;
            }
            if ( result.data[0].headname == 3) {
                
                document.getElementById("headname").options[3].selected=true;
            }
            if ( result.data[0].headname == 4) {
                
                document.getElementById("headname").options[4].selected=true;
            }
            if ( result.data[0].headname == 5) {
                
                document.getElementById("headname").options[5].selected=true;6
            }

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
    var headname = parseInt($('#headname').val());
    var TelPhone = $('#tstelphone').val();
    
    var fphone = $('#fphone').val();
    var commission = parseInt($('#fid').val());


    postJSON('/api/updateaccountheadhunters', {
        "id": query,
        "username": UserName,
        "password": PassWord,
        "headname": headname ,
        "sex": Sex,
        "age": Age,
        "phone": TelPhone,
        "commission": commission,
        "fphone": fphone,

    }, function (result) {
        alert("修改信息成功成功");
        location.href = 'article-listHR.html';
       
    }, function (result) {
    
    });
}

function layer_close() {
    location.href = 'article-listHR.html';
}