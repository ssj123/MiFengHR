'use strict';

// setBaseUrl('http://192.168.1.114:8092');
var page = 1;
var pagesize = 10;
var numtotal = 0;
var accountid ;
var positionid ;
var date ;
var fphone ;
var query ;

new Vue({
    el: '.container',
    data: {
        resumename: '',
        educational: '',
        workyears: '',
        company: '',
        city: '',
        industry: '',
        position: '',
        phone: '',
        username: '',
        age: '',
        sex: '',
        accountid: '',
        hopeindustry: '',
        hopeposition: '',
        hopecity: '',
        hopesalary: '',
        companyname: '',
        companyindustry: '',
        positionname: '',
        workstarttime: '',
        workendtime: '',
        performance: '',
        school: '',
        majors: '',
        studystarttime: '',
        studyendtime: '',
        SchoolExperience: '',
        abilityname: '',
        abiltycontent: '',
        salary: '',
        positionstate : '',
        schoolexperience : '',
        jibenurl: '',
        zhiweiyixiangurl: '',
        addgongzuourl: '',
        addjiaoyuurl: '',
        addnengliurl: '',
        labels: [],
    },

    mounted: function mounted() {
        $('.fabuactive').css('display','block');
       
         query = GetQueryString("userid");  
        var _this = this;
        
        postJSON('/api/perfectyourresume', { "id": parseInt(query), }, function(result) {

            _this.resumename = result.data.resumename;
            _this.educational = result.data.educational;
            _this.workyears = result.data.workyears;
            _this.company = result.data.company;
            _this.city = result.data.city;
            _this.industry = result.data.industry;
            _this.position = result.data.position;
            _this.phone = result.data.phone;
            _this.username = result.data.username;
            _this.age = result.data.age;
            _this.sex = result.data.sex;
            _this.accountid = result.data.accountid;
            _this.hopeindustry = result.data.hopeindustry;
            _this.hopeposition = result.data.hopeposition;
            _this.hopecity = result.data.hopecity;
            _this.hopesalary = result.data.hopesalary;
            _this.companyname = result.data.companyname;
            _this.companyindustry = result.data.companyindustry;
            _this.positionname = result.data.positionname;
            _this.workstarttime = result.data.workstarttime;
            _this.workendtime = result.data.workendtime;
            _this.performance = result.data.performance;
            _this.school = result.data.school;
            _this.majors = result.data.majors;
            _this.studystarttime = result.data.studystarttime;
            _this.studyendtime = result.data.studyendtime;
            _this.SchoolExperience = result.data.SchoolExperience;
            _this.abilityname = result.data.abilityname;
            _this.abiltycontent = result.data.abiltycontent;
            _this.salary = result.data.salary;
            _this.positionstate  = result.data.positionstate;
            _this.schoolexperience  = result.data.schoolexperience;
            _this.jibenurl = "myjiben.html?userid="+query+"&resumeid="+result.data.id;
            _this.zhiweiyixiangurl = "zhiweiyixiang.html?userid="+query+"&resumeid="+result.data.id;
            _this.addgongzuourl = "addgongzuo.html?userid="+query+"&resumeid="+result.data.id;
            _this.addjiaoyuurl = "addjiaoyu.html?userid="+query+"&resumeid="+result.data.id;
            _this.addnengliurl = "addnengli.html?userid="+query+"&resumeid="+result.data.id;

            $('.fabuactive').css('display','none');
            
        }, function(result) {

        });

       

    },
    methods: {
        


    }
});
