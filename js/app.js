(function() {

    // ����ѡ�������涨��
    var $$ = window.geekyu;

    //������ⱨ������
    var mtnce_report = function(){
        window.onload = function(){
            var copyBtn = document.getElementById("copyVIN");
            var clipboard = new Clipboard(copyBtn,{
                target: function(trigger){
                    return trigger.previousSibling;
                }
            });
            clipboard.on("success",function(e){
                alert("���Ƴɹ�����ճ��ʹ��");
            })
            clipboard.on("error",function(e){
                alert("�Բ�������ϵͳ��֧���Զ����ƣ����ֶ�����");
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
    
    //У������
    var check_config = function(){
        console.log("this is check_config page!")
    }
    window.check_config = check_config;

    //�������--��������
    var full_mtnce_report = function(){
        console.log("this is full_mtnce_report page!")
    }
    window.full_mtnce_report = full_mtnce_report;


}).call(this);