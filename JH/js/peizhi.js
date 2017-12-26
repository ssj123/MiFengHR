var Request = new Object(); 
	Request = GetRequest(); 
	var tjr; 
	tjr = Request['tjr']; 
	if(tjr!=""&&tjr!=undefined&&tjr!=null){localStorage.setItem("tel", tjr)}


var picurl = "http://47.92.123.196:10088/";
var jkurl = "http://47.92.123.196:10086/api/service";
var tokenid = localStorage.getItem("tokenid");
var CompanyID = localStorage.getItem("CompanyID");
var PortraitUrl = localStorage.getItem("PortraitUrl");
var UserID = localStorage.getItem("UserID");
var tel = localStorage.getItem("tel");
var Level = localStorage.getItem("Level");
var IsComplete = localStorage.getItem("IsComplete");
var CompanyStatus = localStorage.getItem("CompanyStatus");
var RegisterType = localStorage.getItem("RegisterType");



function GetRequest() { 
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	} 
	return theRequest; 
} 
$('body').on('click','.backone',function(){
	window.history.go(-1);
})

$('body').on('click','.refresh',function(){
	location.reload();
})

