(function() {

    // ����ѡ�������涨��
    var $$ = window.geekyu||null;
    
    // �ƶ���click�¼��ӳ�300�����������ñ��ű�֮ǰ������fastclick.js
    var FastClick = window.FastClick||null; 
    if(FastClick){
        window.onload = function() {
            FastClick.attach(document.body);
        }
    }

    //���ص�ǰ��ַ?����Ĳ�����json��ʽ(����submit�ύ��str='1'&str1='2'��ʽ)
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

    //��ʽ����������date׷������
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //�·� 
            "d+": this.getDate(), //�� 
            "h+": this.getHours(), //Сʱ 
            "m+": this.getMinutes(), //�� 
            "s+": this.getSeconds(), //�� 
            "q+": Math.floor((this.getMonth() + 3) / 3), //���� 
            "S": this.getMilliseconds() //���� 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //������ⱨ������
    var mtnce_report = function(){
        var copyBtn = document.getElementById("copyVIN");
        var copyInput = document.getElementById("copyInput");
        var Guid=0;
        if(window.location.search.match('Guid')){
            Guid = strToJson().Guid;   
        }
       
        var URL = "https://www.muyouche.com/action/getChaBaoYangRltByGuid.ashx?Guid="+ Guid;
        // ������Ϣ
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
                    //jsִ��˳�������
                    setTimeout(function(){
                        copyInput.select(); // ѡ�����
                        var execCommand = document.execCommand||null;
                        if(execCommand){
                            document.execCommand("Copy"); // ִ���������������
                            alert("�ɹ�����,��ճ��ʹ��!");
                        }else{
                            alert("�����豸��֧���Զ����ƣ����ֶ�����!");
                        }
                    })
                }
            },
            mounted: function(){
                var _this = this;
                $.ajax({
                    url: "report.json",
                    type:'GET',
                    dataType: "json",
                    success:function(res){
                        _this.data = res.data;
                    }
                });
            },
            //vue�Ĺ�����
            filters: {
                //����������
                dateFormat: function (date) {
                    if(!date) return false;
                    var date = new Date(date).Format("yyyy-MM-dd hh:mm:ss");
                    return date
                },
            }
        })
        // �����Ҫ
        var listGroup = new Vue({
            el: '#listGroup',
            data: {
                infoList: {},
            },
            mounted: function(){
                var _this = this;
                $.ajax({
                    url: "report.json",
                    type:'GET',
                    dataType: "json",
                    success:function(res){
                        _this.$data.infoList = res.data;
                    }
                });
            }
        })
        // ������¼
        var record = new Vue({
            el: '#record-list',
            data: {
                recordItem: [],
                total_mileage: "",
            },
            mounted: function(){
                var _this = this;
                $.ajax({
                    url: "report.json",
                    type:'GET',
                    dataType: "json",
                    success:function(res){
                        _this.$data.recordItem = res.data.result;
                        _this.total_mileage = res.data.total_mileage;
                    }
                });
            },
            //vue�Ĺ�����
            filters: {
                //����������
                scheduleFn: function (mile,total) {
                    var schedule = (mile/total*100).toFixed(2) + "%";
                    var style = {
                        width: schedule.toString(),
                    }
                    return style;
                },
                //ʱ���ʽת��
                dateFn: function (date) {
                    var date = date.substr(0,4)+'��'+date.substr(5,2)+'��';
                    return date.toString();
                },
                //�����ʽת��
                mileFn: function (mile) {
                    var mile = (mile/10000).toFixed(2)+"����"
                    return mile.toString();
                },
            }
        })
    }
    window.mtnce_report = mtnce_report;
    
    //У������
    var check_config = function(){
        console.log("�Ǻ���")
        //У�����õ�DOM
        var $config = $("section.config");
        //��ϸ���õ�DOM
        var $moreconfig = $("section.moreconfig");
        //�鿴����İ�ť
        var $lockConfig_btn = $config.find("a#lockConfig");

        $lockConfig_btn.on("click",function(){
            $config.hide();
            $moreconfig.show();
        })
    }
    window.check_config = check_config;

    //�������--��������
    var full_mtnce_report = function(){
        console.log("this is full_mtnce_report page!")
    }
    window.full_mtnce_report = full_mtnce_report;


}).call(this);