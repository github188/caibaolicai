/**
 * Created by hzc on 2017-7-6.
 */
$(function(){
    //计息起始日
    function interestDay(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");
        var year = parseInt($.trim(arr[0]));
        var month = parseInt($.trim(arr[1]));
        var day = parseInt($.trim(arr[2]));
        if(month < 10){
            var month = "0"+ month;
        }
        if(day<10){
            var day = '0' + day;
        }
        var interestTime = year + "-" + month + "-" + day ;
        $(".interestDay").text(interestTime);
        //alert(interestTime)
    }
    interestDay(1); //当前时间添加1天
    //默认到期日
    function expireDay(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        //console.log(typeof (timeStr));
        var arr=timeStr.split("/");
        var year = parseInt($.trim(arr[0]));
        var month = parseInt($.trim(arr[1]));
        var day = parseInt($.trim(arr[2]));
        //alert(typeof (month));
        //时间选择
        var start_time_picker = new mui.DtPicker({"type":"date","beginYear":year,"beginMonth":month,"beginDay":day, "endYear":2050});
        $("#useData").on("tap", function(){
            if($(".buyMoney").val() == ""){
                $(".popup").show();
                $(".popup").text("请输入购买金额");
                setTimeout('$(".popup").hide(),$(".popup").text()',1500);
            }else{
                setTimeout(function(){
                    start_time_picker.show(function(items){
                        $("#useData").text(items.text);
                    });
                },200);
            }
        });
        //alert(day);
        var month = String(month);
        var day = String(day);
        if(month < 10){
            var month = "0" + month;
        }
        if(day < 10){
            var day = "0" + day;
        }
        var interestTime = year + "-" + month + "-" + day ;
        $(".expireDay").text(interestTime);
        //alert(interestTime);
    }
    expireDay(2); //当前时间添加2天
    //获取金价
    $.ajax({
        url:"http://106.14.165.194:8000/history-price",
        type:"GET",
        success:function(res){
            var goldPrice = JSON.parse(res);
            $(".headTopRight span").text(goldPrice.week[6].every_day_price);
        },
        error:function(res){
            console.log(res);
        }
    });
    //监听input的变化
    $(".buyMoney").on('input porpertychange',function(){
        if($(".buyMoney").val() < 1){
            $(".buyMoney").val(1);
        }
        calculateExpectProfit();
        $(".waitPayMoney").text($(".buyMoney").val());
    });
    //计算预期收益
    function calculateExpectProfit(){
        var principal = parseFloat($(".buyMoney").val());//本金
        var arr = $(".hqjNianHuaRate").text().split("%");
        var rateIncrease = 1+ parseFloat(arr[0]) * 0.01;//1 + 利息
        var powerNum = parseFloat(parseInt(window.sessionStorage.iDays) / 360);
        var expectedReturnMoney =(parseFloat(principal * Math.pow(rateIncrease,powerNum)) - principal).toFixed(2);
        //console.log(principal);
        //console.log(rateIncrease);
        //console.log(powerNum);
        //console.log(Math.pow(rateIncrease,powerNum));
        $(".expectedReturnMoney").text(expectedReturnMoney + "元");
    }
    function  btnCount_Click(){
        newDay  =  $(".interestDay").text();
        futureDay  =  $(".expireDay").text();
        DateDiff(newDay,futureDay);
        //alert("第一个日期；"+s1+"/n第二个日期："+s2+"/n相差"+DateDiff(s1,s2)+"天")
    }
    btnCount_Click();
    //计算天数差的函数，通用
    function  DateDiff(sDate1,sDate2){    //sDate1和sDate2是2006-12-18格式
        var  aDate,  oDate1,  oDate2,  iDays;
        aDate  =  sDate1.split("-");
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);   //转换为12-18-2006格式
        aDate  =  sDate2.split("-");
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数

        window.sessionStorage.iDays = parseInt(iDays);
        //console.
        //return  iDays
    }
    //监听 expireDay  div内容变化
    $(".expireDay").on('DOMNodeInserted',function(e){
        //alert('element now contains: ' + $(e.target).text());
        btnCount_Click();
        calculateExpectProfit();
    });
    //    去认证
    $(".goAuthentication").click(function(){
        if($(".buyMoney").val() < 1){
            $(".popup").show();
            $(".popup").text("请输入购买金额");
            setTimeout('$(".popup").text(),$(".popup").hide()',1500);
        }else {
            window.sessionStorage.amount = $(".buyMoney").val();
            window.sessionStorage.orderId = window.localStorage.phoneNumber + new Date().getTime();
            window.location.href = "certification.html";
        }
    });
});