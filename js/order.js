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
        var year = arr[0];
        var month = $.trim(arr[1]);
        var day = $.trim(arr[2]) ;
        if(month.length == 1){
            var month = 0 + month;
        }
        if(day.length == 1){
            var day = 0 + day;
        }
        var interestTime = year + "-" + month + "-" + day ;
        $(".interestDay").text(interestTime);
        alert(interestTime)
    }
    interestDay(1); //当前时间添加1天
    //默认到期日
    function expireDay(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");
        var year = parseInt($.trim(arr[0]));
        var month = parseInt($.trim(arr[1]));
        var day = parseInt($.trim(arr[2]));
        console.log(typeof (month));
        console.log(month.length);
        //时间选择
        var start_time_picker = new mui.DtPicker({"type":"date","beginYear":year,"beginMonth":month,"beginDay":day, "endYear":2050});
        $("#useData").on("tap", function(){
            setTimeout(function(){
                start_time_picker.show(function(items){
                    $("#useData").text(items.text);
                });
            },200);
        });
        console.log(day);
        var month = String(month);
        var day = String(day);
        if(month.length == 1){
            var month = 0 + month;
        }
        if(day.length == 1){
            var day = 0 + day;
        }
        var interestTime = year + "-" + month + "-" + day ;
        $(".expireDay").text(interestTime);
        alert(interestTime)
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
});