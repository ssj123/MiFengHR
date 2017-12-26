"use strict";

function login() {

   var name = $("#name").val();
   var pwd = $("#pwd").val();
   

   postJSON('/api/systemlogin', { "username": name, "password": pwd }, function (result) {
      var page_table = hex_md5(result.thisid) ;
      console.log(page_table)
      alert("登录成功");
      location.href = 'article-list.html?page_table='+page_table;
     _page_table(page_table);
     console.log(judeg)
     alert(judeg)
   }, function (result) {
     
      alert("连接失败");
   });
}

$(document).keyup(function(event){
     if(event.keyCode ==13){
        login()
     
     }
   });

// function closenone() {
//     document.getElementById('nonesu').style.display = 'none';
//     document.getElementById('nonedl').style.display = 'none';
// }