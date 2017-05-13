(function() {

    // 出口选择器引擎定义
    var $$ = window.geekyu||null;
    
    // 移动端click事件延迟300处理，请在引用本脚本之前先引入fastclick.js
    var FastClick = window.FastClick||null; 
    if(FastClick){
        window.onload = function() {
            FastClick.attach(document.body);
        }
    }

    //返回当前地址?后面的参数的json格式(用于submit提交的str='1'&str1='2'格式)
    function strToJson(){
        var str=window.location.search;
        var reg=/&+/g;
        var reg1=/=+/g;
        
        str=decodeURI(str);
        str=str.replace('?','');
        str=str.replace(reg,'","');
        str=str.replace(reg1,'":"');
        str='{"'+str+'"}';
        str=JSON.parse(str);    
        return str;
    };

    //返回当前地址?后面的参数的json格式(用于自己拼接的str={}&str1={}格式)
    function strToJson1(){
        var str=window.location.search;
        var reg=/&+/g;
        var reg1=/=+/g;
        
        str=decodeURI(str);
        str=str.replace('?','"');
        str=str.replace(reg,',"');
        str=str.replace(reg1,'":');
        str='{'+str+'}';
        str=JSON.parse(str);    
        return str;
    };
    
    //格式化方法，给date追加属性
    Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
    var Guid=0;
    if(window.location.search.match('Guid')){
        Guid = strToJson().Guid;   
    }
    var URL = "https://www.muyouche.com/action/getChaBaoYangOrderNoByGuid.ashx?Guid="+ Guid;
    
    //车辆检测报告详情
    var mtnce_report = function(){
            
            // 基本信息
            var basic = new Vue({
                el: '#basic-info',
                data: {
                    data: {},
                    cvin: "",
                    Guid: Guid,
                },
                methods: {
                	copyVIN: function(){
                		var vin = this.data.vin;
                		var copyInput = $("#copyInput");
                		this.cvin = vin;
//              		js执行顺序的问题
                		setTimeout(function(){
                			copyInput.select(); // 选择对象
                			var execCommand = document.execCommand||null;
                			if(execCommand){
			                    document.execCommand("Copy"); // 执行浏览器复制命令
			                    alert("成功复制,可粘贴使用!");
			                }else{
			                    alert("您的设备不支持自动复制，请手动复制!");
			                }
                		})
                	}
                },
                mounted: function(){
                    var _this = this;
                    $.ajax({
                        url: URL,
                        type:'GET',
                        dataType: "json",
                        success:function(res){
                            _this.data = res.data;
                        }
                    });
                },
                //vue的过滤器
	            filters: {
	                //日期格式化
	                dateFormat: function (date) {
	                	if(!date) return false;
	                	var date = new Date(date).Format("yyyy-MM-dd hh:mm:ss");
	                    return date
	                },
	                //时间戳格式化
	                timestampFormat: function(timestamp) {
	                	if(!timestamp) return false;
	                	var date = new Date(timestamp*1000).Format("yyyy-MM-dd hh:mm:ss");
	                    return date
	                }
	            }
            })
            // 报告概要
            var listGroup = new Vue({
                el: '#listGroup',
                data: {
                    resultList: {},
                    Guid: Guid,
                },
                mounted: function(){
                    var _this = this;
                    $.ajax({
                        url: URL,
                        type:'GET',
                        dataType: "json",
                        success:function(res){
                            _this.resultList = res.data.result_outline;
                        }
                    });
                }
            })
            // 养护记录
            var record = new Vue({
                el: '#record-list',
                data: {
                    recordItem: [],
                    total_mileage: "",
                    Guid: Guid,
                },
                mounted: function(){
                    var _this = this;
                    $.ajax({
                        url: URL,
                        type:'GET',
                        dataType: "json",
                        success:function(res){
                            _this.recordItem = res.data.all_records;
                            _this.total_mileage = res.data.result_outline[1].content;
                        }
                    });
                },
                //vue的过滤器
                filters: {
                	//进度条计算
				    scheduleFn: function (mile,total) {
				    	var schedule = (mile/total*100).toFixed(2) + "%";
				    	var style = {
				    		width: schedule.toString(),
				    	}
				        return style;
				    },
				    //时间格式转换
				    dateFn: function (date) {
				    	var date = date.substr(0,4)+'年'+date.substr(5,2)+'月';
				        return date.toString();
				    },
				    //万公里格式转换
				    mileFn: function (mile) {
				    	var mile = (mile/10000).toFixed(2)+"万公里"
				        return mile.toString();
				    },
				}
            })
            
    }
    window.mtnce_report = mtnce_report;
    
    //校验配置
    var check_config = function(){
        
        // 概要配置信息
        var config = new Vue({
            el: '#configBox',
            data: {
                data: {},
            },
            methods: {
                lookMore: function(){
                    //校验配置的DOM
                    var $config = $("section.config");
                    //详细配置的DOM
                    var $moreconfig = $("section.moreconfig");
                    $config.hide();
                    $moreconfig.show();
                }
            },
            mounted: function(){
                var _this = this;
                $.ajax({
                    url: URL,
                    type:'GET',
                    dataType: "json",
                    success:function(res){
                        _this.data = res.data;
                    }
                });
            }
        })
        // 详细配置信息
        var moreconfig = new Vue({
            el: '#moreconfig',
            data: {
                data: {},
            },
            mounted: function(){
                var _this = this;
                $.ajax({
                    url: URL,
                    type:'GET',
                    dataType: "json",
                    success:function(res){
                        _this.data = res.data;
                    }
                });
            }
        })
    }
    window.check_config = check_config;

    //检测详情--完整报告
    var full_mtnce_report = function(){

        // 车辆信息
        var carInfo = new Vue({
            el: '#car-info',
            data: {
                data: {},
            },
            mounted: function(){
                var _this = this;
                $.ajax({
                    url: URL,
                    type:'GET',
                    dataType: "json",
                    success:function(res){
                        _this.data = res.data;
                    }
                });
            }
        })
        //维修保养记录
        var reportlist = new Vue({
            el: '#reportlist',
            data: {
                listItem: {},
            },
            mounted: function(){
                var _this = this;
                $.ajax({
                    url: URL,
                    type:'GET',
                    dataType: "json",
                    success:function(res){
                        _this.listItem = res.data.all_records;
                    }
                });
            }
        })   
    }
    window.full_mtnce_report = full_mtnce_report;


}).call(this);