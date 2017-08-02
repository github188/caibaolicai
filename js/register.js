/**
 * Created by guojing on 2017-7-4.
 */
$(function(){
    $(".verifyCode").focus();
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
        $(".verifyCode").val("");
        $.ajax({
            url:"http://106.14.165.194:1111/smsVeri",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data:{
                "phone":window.localStorage.phoneNumber,
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
    //语音验证
    $(".voiceVerifyBtn").click(function(){
        $.ajax({
            url:"http://106.14.165.194:1111/voiceVeri",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "usage":"1"
            },
            success:function(res){
                console.log(res);
                $(".popup").show();
                $(".popup").css({
                    'top': '14rem',
                    'width': '3rem',
                    'left': '3.4rem'
                });
                $(".popup").text("请留意来电");
                setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    $(".registerBtn").click(function(){
        $.ajax({
            url:"http://106.14.165.194:1111/regist",
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
                if(res.code == 0){
                    window.localStorage.token = res.token;
                    window.location.href = "setpwdlogin.html";
                }else{
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".poup").text()',1500);
                }
            },
            error:function(res){
                console.log(res);
            }
        })
    })
});