/**
 * Created by hzc on 2017-7-4.
 */
$(function(){
    $(".phoneNumber").text(window.localStorage.phoneNumber);
    function countDown(){
        var timer=setTimeout(function(){//按验证按钮后60秒按钮禁用
            clearInterval(timer2);
            $(".getVerifyCode").val("重新获取").css({
                //"border":"1px solid #DDD",
                "background":"#fff",
                "color":"#000"
            }).removeAttr("disabled");
        },60000);
        var i = 60;
        $(".getVerifyCode").val(i+'s').css({
            //"border":"1px solid #DDD",
            "background":"#fff",
            "color":"#000"
        }).attr("disabled","disabled");
        var timer2=setInterval(function(){
            i--;
            $(".getVerifyCode").val(i+'s');
        },1000);
    }
    countDown();
    $.ajax({
        url:"http://106.14.165.194:1111/smsVeri",
        type:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        data:{
            "phone":window.localStorage.phoneNumber,
            "usage":"0"
        },
        success:function(res){
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
    $(".getVerifyCode").click(function(){
        $.ajax({
            url:"http://106.14.165.194:1111/smsVeri",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "usage":"0"
            },
            success:function(res){
                console.log(res);
                countDown();
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    $(".loginBtn").click(function(){
       $.ajax({
           url:"http://106.14.165.194:1111/login",
           type:"POST",
           headers:{
               "Content-Type":"application/x-www-form-urlencoded"
           },
           data:{
               "phone":window.localStorage.phoneNumber,
               "veriCode":$.trim($(".verifyCode").val())
           },
           success:function(res){
               console.log(res);
               if(res.code == -1){
                   $(".popup").show();
                   $(".popup").text(res.msg);
                   setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
               }else if(res.code == 0){
                   window.localStorage.token = res.token;
                   if(window.sessionStorage.checkedLoginCode == "ziChan"){
                        window.location.href = "asset.html";
                   }else if(window.sessionStorage.checkedLoginCode == "faXian"){
                       window.location.href = "find.html";
                   }else if(window.sessionStorage.pageMark ==  "wzj360"){
                       window.location.href = "productCollection.html";
                   }else{
                       window.location.href = "index.html";
                   }
               }
           },
           error:function(res){
               console.log(res);
           }
       })

    });


});