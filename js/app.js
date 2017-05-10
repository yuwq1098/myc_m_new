(function() {

    // 出口选择器引擎定义
    var $$ = window.geekyu;

    //车辆检测报告详情
    var mtnce_report = function(){
        window.onload = function(){
            var copyBtn = document.getElementById("copyVIN");
            var clipboard = new Clipboard(copyBtn,{
                target: function(trigger){
                    return trigger.previousSibling;
                }
            });
            clipboard.on("success",function(e){
                alert("复制成功，可粘贴使用");
            })
            clipboard.on("error",function(e){
                alert("对不起，您的系统不支持自动复制，请手动复制");
            })

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
        console.log("this is check_config page!")
    }
    window.check_config = check_config;

    //检测详情--完整报告
    var full_mtnce_report = function(){
        console.log("this is full_mtnce_report page!")
    }
    window.full_mtnce_report = full_mtnce_report;


}).call(this);