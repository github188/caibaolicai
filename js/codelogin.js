/**
 * Created by hzc on 2017-7-4.
 */
$(function(){
    $(".verifyCode").focus();
    $(".phoneNumber").text(window.localStorage.phoneNumber);
    $(".verifyCode").on('input porpertychange',function(){
        if($(".verifyCode").val().length == 6){
            $(".loginBtn").css("background","rgb(242, 182, 67)").removeAttr("disabled");
        }else {
            $(".loginBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
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
            url:"http://10.0.92.198:1111/smsVeri",
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
    //语音验证
    $(".voiceVerifyBtn").click(function(){
        $.ajax({
            url:"http://10.0.92.198:1111/voiceVeri",
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
    //判断是否设置支付密码
    function judgeSetPayPwd(){
        $.ajax({
            url:"http://10.0.92.198:1111/paypwd",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                console.log(res);
                if(res.code == -1){
                    window.location.href = "setpaypwd.html";
                }else if(res.code == 0){
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
        });
    }
    //点击登录
    $(".loginBtn").click(function(){
       $.ajax({
           url:"http://10.0.92.198:1111/login",
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
                   judgeSetPayPwd();
               }
           },
           error:function(res){
               console.log(res);
           }
       })
    });
    $(".goPwdLoginBtn").click(function(){
        window.location.href = "pwdlogin.html";
    });
});