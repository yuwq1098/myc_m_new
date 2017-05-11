(function() {

    // 出口选择器引擎定义
    var $$ = window.geekyu||null;
    
    // 移动端click事件延迟300处理，请在引用本脚本之前先引入fastclick.js
    var FastClick = window.FastClick||null; 
    if(FastClick){
        window.onload = function() {
            FastClick.attach(document.body);
            console.log("load this fastclick!");
        }
    }

    //车辆检测报告详情
    var mtnce_report = function(){
        window.onload = function(){
            var copyBtn = document.getElementById("copyVIN");
            var copyInput = document.getElementById("copyInput");
            copyBtn.onclick = function(){
                var vin = this.previousSibling.innerText;
                vin = vin.replace(/\w{3}\W{1}/, "");
                copyInput.value = vin;
                copyInput.select(); // 选择对象
                var execCommand = document.execCommand||null;
                if(execCommand){
                    document.execCommand("Copy"); // 执行浏览器复制命令
                    alert("成功复制,可粘贴使用!");
                }else{
                    alert("您的设备不支持自动复制，请手动复制!");
                }
            }


            console.dir($$.toCamelCase("HTML css"));
            console.log($$.unique([15,25,32,15,24,18])); 
            var yuwqarr = {op:"xxx",oc:"vvv",od:"ccc"}
            $$.each(yuwqarr, function(res){
                console.log(yuwqarr[res]);
            })       
            $$(".basic-info .infor p").each(function(){
                console.log($(this).text());
            })
            // var URL = window.location.protocol+'//www.muyouche.com';
            // var URL = 'https://www.muyouche.com';
            // $.ajax({
            //  url: URL+'/action/getChaBaoYangRltByGuid.ashx?Guid=4D008743-138C-4AC0-8F97-1DF6372AD07E',
      //           type:'GET',
      //           dataType: "json",
      //           success:function(res){
      //               console.log(res);
      //           }
      //       })
            $$.ajax({
                url: "report.json",
                type:'GET',
                dataType: "json",
                success:function(res){
                    console.log(res);
                }
            });
        }
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