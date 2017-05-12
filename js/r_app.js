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


    //车辆检测报告详情
    var mtnce_report = function(){
            var Guid=0;
            if(window.location.search.match('Guid')){
                Guid = strToJson().Guid;   
            }
            var URL = "https://www.muyouche.com/action/getChaBaoYangRltByGuid.ashx?Guid="+ Guid;
            // 基本信息
            var basic = new Vue({
                el: '#basic-info',
                data: {
                    data: {},
                    cvin: "",
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
                    
                    
                }
            })
            // 报告概要
            var listGroup = new Vue({
                el: '#listGroup',
                data: {
                    infoList: {},
                },
                mounted: function(){
                    var _this = this;
                    $.ajax({
                        url: URL,
                        type:'GET',
                        dataType: "json",
                        success:function(res){
                            _this.$data.infoList = res.data;
                        }
                    });
                }
            })
            // 养护记录
            var record = new Vue({
                el: '#record-list',
                data: {
                    recordItem: [],
                },
                mounted: function(){
                    var _this = this;
                    $.ajax({
                        url: URL,
                        type:'GET',
                        dataType: "json",
                        success:function(res){
                            _this.$data.recordItem = res.data.result;
                        }
                    });
                }
            })
            
    }
    window.mtnce_report = mtnce_report;
    
    //校验配置
    var check_config = function(){
        console.log("呵呵哒")
        //校验配置的DOM
        var $config = $("section.config");
        //详细配置的DOM
        var $moreconfig = $("section.moreconfig");
        //查看更多的按钮
        var $lockConfig_btn = $config.find("a#lockConfig");

        $lockConfig_btn.on("click",function(){
            $config.hide();
            $moreconfig.show();
        })
    }
    window.check_config = check_config;

    //检测详情--完整报告
    var full_mtnce_report = function(){
        console.log("this is full_mtnce_report page!")
    }
    window.full_mtnce_report = full_mtnce_report;


}).call(this);