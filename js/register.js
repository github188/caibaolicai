/**
 * Created by guojing on 2017-7-4.
 */
$(function(){
    $(".phoneNumber").text(window.sessionStorage.phoneNumber);
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
        url:"http://10.0.92.198:1111/smsVeri",
        type:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        data:{
            "phone":window.sessionStorage.phoneNumber,
            "usage":"1"
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
            url:"http://10.0.92.198:1111/smsVeri",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data:{
                "phone":window.sessionStorage.phoneNumber,
                "usage":"1"
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
    $(".registerBtn").click(function(){
        $.ajax({
            url:"http://10.0.92.198:1111/regist",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data:{
                "phone":window.sessionStorage.phoneNumber,
                "veriCode":$(".verifyCode").val()
            },
            success:function(res){
                console.log(res);
                window.localStorage.token = res.token;
                window.location.href = "setpaypwd.html";
            },
            error:function(res){
                console.log(res);
            }
        })
    })
});