var edueational ;
var worktime ;
var wages ;
var type ; //兼职全职

	// $(".btn_record").click(function(){
	//    edueational = $(this).index();
	//    $(".btn_record").css({"background":"#fff","color":"#333"});
	//    $(this).css({"background":"red","color":"#fff"});
	//    console.log($(this))

	//  }); 

	// $(".btn_rworktime").click(function(){
	//    worktime = $(this).index();
	//    $(".btn_rworktime").css({"background":"#fff","color":"#333"});
	//    $(this).css({"background":"red","color":"#fff"});
	//  }); 

	// $(".btn_wages").click(function(){
	//    wages = $(this).index();
	//    $(".btn_wages").css({"background":"#fff","color":"#333"});
	//    $(this).css({"background":"red","color":"#fff"});
	//  }); 

	// $(".btn_type").click(function(){
	//    type = $(this).index();
	//    $(".btn_type").css({"background":"#fff","color":"#333"});
	//    $(this).css({"background":"red","color":"#fff"});
	//  }); 


	$(".btn_record").click(function(){

            	$(this).addClass("edueational").siblings().removeClass("edueational")
            })
	$(".btn_rworktime").click(function(){

            	$(this).addClass("worktime").siblings().removeClass("worktime")
            })
	$(".btn_wages").click(function(){

            	$(this).addClass("wages").siblings().removeClass("wages")
            })
	$(".btn_type").click(function(){

            	$(this).addClass("typecolor").siblings().removeClass("typecolor")
            })


	function publish(){
		// 生成当前时间
			var myDate = new Date();
        	var createtime = _dateFormat(myDate, 'yyyy-MM-dd');
		
		var positioncontent = $('.positioncontent').val();
		var position = $('.zhiweiming').val();
		var company = $('.company').val();
		var agerange = $('.agerange').val();
		var commission = parseInt($('.commission').val()); //佣金
		var estimatecommission = parseInt($('.estimatecommission').val());
		var workdaytime = $('.workdaytime').val(); //工作时间
		var welfare = $('.welfare').val(); //福利待遇
		var content = $('.content').val();// 上岗
		var industry = $('.industry').val(); //行业
		var area = $('.area').val();//工作地点
		var interview = $('.interview').val();//面试地点
		var edueational = $('.edueational').html();
		var worktime = $('.worktime').html();
		var wages = $('.wages').html();
		var type = $('.typecolor').html();

		// var save = $('#province1').val();//省
		// var City = $('#city1').val();//市
		// var District = $('#district1').val();//县
		// var area = save+'-'+City+'-'+District;//工作地点

		// if ( worktime == 0 ) {
		// 	worktime = "全部" ;
		// }else if ( worktime == 1 ) {
		// 	worktime = "应届生" ;
		// }else if ( worktime == 2 ) {
		// 	worktime = "1年以内" ;
		// }else if ( worktime == 3 ) {
		// 	worktime = "1-3年" ;
		// }else if ( worktime == 4 ) {
		// 	worktime = "3-5年" ;
		// }else if ( worktime == 5 ) {
		// 	worktime = "5年以上" ;
		// }

		// if ( edueational == 0 ) {
		// 	edueational = "全部" ;
		// }else if ( edueational == 1 ) {
		// 	edueational = "高中" ;
		// }else if ( edueational == 2 ) {
		// 	edueational = "大专" ;
		// }else if ( edueational == 3 ) {
		// 	edueational = "本科" ;
		// }else if ( edueational == 4 ) {
		// 	edueational = "硕士" ;
		// }else if ( edueational == 5 ) {
		// 	edueational = "博士" ;
		// }

		// if ( wages == 0 ) {
		// 	wages = "3k以下" ;
		// }else if ( wages == 1 ) {
		// 	wages = "3k-5k" ;
		// }else if ( wages == 2 ) {
		// 	wages = "5k-10k" ;
		// }else if ( wages == 3 ) {
		// 	wages = "10k以上" ;
		// }

		// if ( type == 0 ) {
		// 	type = "兼职" ;
		// }else if ( type == 1 ) {
		// 	type = "全职" ;
		// }

		var sex = $("input[name='sex']:checked").val();
		if ( sex == 0 ) {
			sex = "不限";
		}else if ( sex == 1 ) {
			sex = "男";
		}else if ( sex == 2 ) {
			sex = "女";
		}
		console.log("工作地区："+area);
		console.log("职位描述:"+positioncontent);
		console.log("职位名:"+position);
		console.log("公司名："+company)
		console.log("工作年限："+worktime)
		console.log("学历："+edueational)
		console.log("性别："+sex)
		console.log("年龄："+agerange)
		console.log("佣金："+commission)
		console.log("预估佣金："+estimatecommission)
		console.log("时间："+createtime)
		console.log("工作时长："+workdaytime)
		console.log("福利："+welfare)
		console.log("上岗："+content)
		console.log("行业"+industry)
		console.log("兼职："+type)
		console.log("工资："+wages)
		postJSON('/api/insertposition', {
					    		            "positioncontent": positioncontent,
					    		            "area": area,
					    		             "position": position,
					    		              "company": company,
					    		               "worktime": worktime,
					    		              "edueational": edueational,
					    		              "sex": sex,
					    		               "agerange": agerange,
					    		                "commission": commission,
					    		                 "estimatecommission": estimatecommission,
					    		               "createtime": createtime,
					    		               "workdaytime": workdaytime,
					    		               "welfare": welfare,
					    		               "content": content,
					    		               "industry": industry,
					    		               "type": type,
					    		               "wages": wages,
					    		               "interview": interview,
					    		               "companyid": 00000 ,
					    		        }, function(result) {
					    		            alert("发布成功！")
					    		        }, function(result) {
					    		            console.log("失败", result);
					    		        });




	}
						
						// $(function () {
						// 	$('#distpicker').distpicker();
						// 	$('#province1').val("安徽省");//省
						//     $('#city1').val("安庆市");//市
						//     $('#district1').val("太湖县");//县
						// })
	    		         
// var $distpicker = $('#distpicker');

// 	$distpicker.distpicker({
//     province: '福建省',
//     city: '厦门市',
//     district: '思明区'
//   });

	    		          
	$('#alterjob').hide();
	var jobid = ''+GetQueryString("jobid");
	console.log(jobid)
	// 如果有jobid代表从后台修改职位入口进来，则进行职位修改
	if ( jobid != "null" ) {
		
		$('#releasejob').hide();
		$('#alterjob').show();
		//将原来职位数据贴上
		
		postJSON('/api/getoneposition', {
					    		            "id": parseInt(jobid),
					    		            
					    		        }, function(result) {

					    		          $('.positioncontent').val(result.data[0].positioncontent);
					    		          $('.zhiweiming').val(result.data[0].position);
					    		          $('.company').val(result.data[0].company);
					    		          $('.agerange').val(result.data[0].agerange);
					    		          $('.commission').val(result.data[0].commission); //佣金
					    		          $('.estimatecommission').val(result.data[0].estimatecommission);
					    		          $('.workdaytime').val(result.data[0].workdaytime); //工作时间
					    		          $('.welfare').val(result.data[0].welfare); //福利待遇
					    		          $('.content').val(result.data[0].content);// 上岗
					    		          $('.industry').val(result.data[0].industry); //行业
					    		          $('.area').val(result.data[0].area);//工作地点
					    		          $('.interview').val(result.data[0].interview);//面试地点

					    		 //          var area = result.data[0].area;//工作地点
										  // var arraycity = area.split('-',3) ;
										  // console.log(arraycity[0]) ;

										  // var $distpicker = $('#distpicker');

										  // 	$distpicker.distpicker({
										  //     province: arraycity[0],
										  //     city: arraycity[1],
										  //     district: arraycity[2] ,
										  //   });
										    

										  // $('#distpicker').distpicker();
					    		          //$('#province1').val(arraycity[0]);//省
										  // $('#city1').val(arraycity[1]);//市
										  // $('#district1').val(arraycity[2]);//县

					    		          if ( result.data[0].worktime == "全部" ) {
					    		          	$('.btn_rworktime').eq(0).addClass("worktime").siblings().removeClass("worktime");
					    		          }else if ( result.data[0].worktime == "应届生" ) {
					    		          	$('.btn_rworktime').eq(1).addClass("worktime").siblings().removeClass("worktime");
					    		          }else if ( result.data[0].worktime == "1年以内" ) {
					    		          	$('.btn_rworktime').eq(2).addClass("worktime").siblings().removeClass("worktime");
					    		          }else if ( result.data[0].worktime == "1-3年" ) {
					    		          	$('.btn_rworktime').eq(3).addClass("worktime").siblings().removeClass("worktime");
					    		          }else if ( result.data[0].worktime == "3-5年"  ) {
					    		          	$('.btn_rworktime').eq(4).addClass("worktime").siblings().removeClass("worktime");
					    		          }else if ( result.data[0].worktime == "5年以上" ) {
					    		          	$('.btn_rworktime').eq(5).addClass("worktime").siblings().removeClass("worktime");
					    		          }

					    		          if ( result.data[0].edueational == "全部" ) {
					    		          	$('.btn_record').eq(0).addClass("edueational").siblings().removeClass("edueational");
					    		          }else if ( result.data[0].edueational == "高中" ) {
					    		          	$('.btn_record').eq(1).addClass("edueational").siblings().removeClass("edueational");
					    		          }else if ( result.data[0].edueational == "大专" ) {
					    		          	$('.btn_record').eq(2).addClass("edueational").siblings().removeClass("edueational");
					    		          }else if ( result.data[0].edueational == "本科" ) {
					    		          	$('.btn_record').eq(3).addClass("edueational").siblings().removeClass("edueational");
					    		          }else if ( result.data[0].edueational == "硕士" ) {
					    		          	
					    		          	$('.btn_record').eq(4).addClass("edueational").siblings().removeClass("edueational");
					    		          }else if ( result.data[0].edueational == "博士" ) {
					    		          	$('.btn_record').eq(5).addClass("edueational").siblings().removeClass("edueational");
					    		          }

					    		          if ( result.data[0].wages == "3k以下"  ) {
					    		          	$('.btn_wages').eq(0).addClass("wages").siblings().removeClass("wages");
					    		          }else if ( result.data[0].wages == "3k-5k" ) {
					    		          	$('.btn_wages').eq(1).addClass("wages").siblings().removeClass("wages");
					    		          }else if ( result.data[0].wages == "5k-10k" ) {
					    		          	$('.btn_wages').eq(2).addClass("wages").siblings().removeClass("wages");
					    		          }else if ( result.data[0].wages == "10k以上" ) {
					    		          	
					    		          	$('.btn_wages').eq(3).addClass("wages").siblings().removeClass("wages");
					    		          }

					    		          if ( result.data[0].type == "兼职" ) {
					    		          	$('.btn_type').eq(0).addClass("typecolor").siblings().removeClass("typecolor");
					    		          }else if ( result.data[0].type == "全职" ) {
					    		          	
					    		          	$('.btn_type').eq(1).addClass("typecolor").siblings().removeClass("typecolor");
					    		          }

					    		          
					    		          if ( result.data[0].sex == "不限" ) {
					    		          	
					    		          	$("#buxian").attr("checked", "checked");
					    		          }else if ( result.data[0].sex == "男" ) {
					    		          	
					    		          	$("#manradio").attr("checked", "checked");
					    		          }else if ( result.data[0].sex == "女" ) {
					    		          	$("#womanradio").attr("checked", "checked");
					    		          }

					    		            
					    		        }, function(result) {
					    		            console.log("失败", result);
					    		        });


	}








function alterjob(){
			// 生成当前时间
			var myDate = new Date();
        	var createtime = _dateFormat(myDate, 'yyyy-MM-dd');
		
		var positioncontent = $('.positioncontent').val();
		var position = $('.zhiweiming').val();
		var company = $('.company').val();
		var agerange = $('.agerange').val();
		var commission = parseInt($('.commission').val()); //佣金
		var estimatecommission = parseInt($('.estimatecommission').val());
		var workdaytime = $('.workdaytime').val(); //工作时间
		var welfare = $('.welfare').val(); //福利待遇
		var content = $('.content').val();// 上岗
		var industry = $('.industry').val(); //行业
		var area = $('.area').val();//工作地点
		var interview = $('.interview').val();//面试地点
		var edueational = $('.edueational').html();
		var worktime = $('.worktime').html();
		var wages = $('.wages').html();
		var type = $('.typecolor').html();

		if ( position == "" ) {
			alert("请输入完整信息！");
			return ;
		}



		// var save = $('#province1').val();//省
		// var City = $('#city1').val();//市
		// var District = $('#district1').val();//县
		// var area = save+'-'+City+'-'+District;//工作地点

		// if ( worktime == 0 ) {
		// 	worktime = "全部" ;
		// }else if ( worktime == 1 ) {
		// 	worktime = "应届生" ;
		// }else if ( worktime == 2 ) {
		// 	worktime = "1年以内" ;
		// }else if ( worktime == 3 ) {
		// 	worktime = "1-3年" ;
		// }else if ( worktime == 4 ) {
		// 	worktime = "3-5年" ;
		// }else if ( worktime == 5 ) {
		// 	worktime = "5年以上" ;
		// }

		// if ( edueational == 0 ) {
		// 	edueational = "全部" ;
		// }else if ( edueational == 1 ) {
		// 	edueational = "高中" ;
		// }else if ( edueational == 2 ) {
		// 	edueational = "大专" ;
		// }else if ( edueational == 3 ) {
		// 	edueational = "本科" ;
		// }else if ( edueational == 4 ) {
		// 	edueational = "硕士" ;
		// }else if ( edueational == 5 ) {
		// 	edueational = "博士" ;
		// }

		// if ( wages == 0 ) {
		// 	wages = "3k以下" ;
		// }else if ( wages == 1 ) {
		// 	wages = "3k-5k" ;
		// }else if ( wages == 2 ) {
		// 	wages = "5k-10k" ;
		// }else if ( wages == 3 ) {
		// 	wages = "10k以上" ;
		// }

		// if ( type == 0 ) {
		// 	type = "兼职" ;
		// }else if ( type == 1 ) {
		// 	type = "全职" ;
		// }

		var sex = $("input[name='sex']:checked").val();
		if ( sex == 0 ) {
			sex = "不限";
		}else if ( sex == 1 ) {
			sex = "男";
		}else if ( sex == 2 ) {
			sex = "女";
		}
		
		console.log("职位描述:"+positioncontent);
		console.log("职位名:"+position);
		console.log("公司名："+company)
		console.log("工作年限："+worktime)
		console.log("学历："+edueational)
		console.log("性别："+sex)
		console.log("年龄："+agerange)
		console.log("佣金："+commission)
		console.log("预估佣金："+estimatecommission)
		console.log("时间："+createtime)
		console.log("工作时长："+workdaytime)
		console.log("福利："+welfare)
		console.log("上岗："+content)
		console.log("行业"+industry)
		console.log("兼职："+type)
		console.log("工资："+wages)
		postJSON('/api/updateposition', {
											"id": parseInt(jobid),
					    		            "positioncontent": positioncontent,
					    		             "position": position,
					    		             "area": area,	
					    		             "interview": interview ,
					    		              "company": company,
					    		               "worktime": worktime,
					    		              "edueational": edueational,
					    		              "sex": sex,
					    		               "agerange": agerange,
					    		                "commission": commission,
					    		                 "estimatecommission": estimatecommission,
					    		               "createtime": createtime,
					    		               "workdaytime": workdaytime,
					    		               "welfare": welfare,
					    		               "content": content,
					    		               "industry": industry,
					    		               "type": type,
					    		               "wages": wages,
					    		               "companyid": 00000 ,
					    		        }, function(result) {
					    		            alert("修改成功！")
					    		        }, function(result) {
					    		            console.log("失败", result);
					    		        });




	}

