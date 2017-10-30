/**
 * Created by hzc on 2017-8-16.
 */

//0.5版本
$(function(){
    FastClick.attach(document.body);
    $(".oldPayPwd").focus();
    $(".oldLoginPwd").focus();
    //修改支付密码
    $(".confirmPayNewPwd").on('input',function(){
        if($(".confirmPayNewPwd").val().length == 6){
            if($(".oldPayPwd").val().length == 6 && $(".newPayPwd").val().length == 6 && $(".confirmPayNewPwd").val().length == 6){
                $(".revisePayBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
            }else{
                $(".revisePayBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
            }
        }
    });
    $(".revisePayBtn").click(function(){
        if($(".newPayPwd").val() == $(".confirmPayNewPwd").val()){
            revisePayPwd();
        }else {
            $(".popup").show().text("您2次输入密码不一致，请重新输入");
            setTimeout('$(".popup").hide().text(""),$(".newPayPwd").val("").focus(),$(".confirmPayNewPwd").val("")',2000);
        }
    });
    function revisePayPwd(){
        var payPwd = sha256_digest($(".oldPayPwd").val());
        var newPaypwd = sha256_digest($(".confirmPayNewPwd").val());
        $.ajax({
            url:"http://47.74.133.222:1111/paypwd",
            method:"PATCH",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "paypwd":payPwd,
                "newPaypwd":newPaypwd
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide().text(""),window.history.back(-1)',2000);
                }else{
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide().text("")',2000)
                }
            },
            error:function(res){
                console.log(res);
                $(".popup").show().text(res.msg);
                setTimeout('$(".popup").hide().text("")',2000)
            }
        });
    }


    //修改登录密码
    $(".confirmLoginNewPwd").on('input',function(){
        if($(".confirmLoginNewPwd").val().length > 0){
            if($(".oldLoginPwd").val().length > 0 && $(".newLoginPwd").val().length > 0 && $(".confirmLoginNewPwd").val().length > 0){
                $(".reviseLoginBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
            }else{
                $(".reviseLoginBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
            }
        }
    });
    function reviseLoginPwd(){
        var payPwd = sha256_digest($(".oldLoginPwd").val());
        var newPaypwd = sha256_digest($(".confirmLoginNewPwd").val());
        $.ajax({
            url:"http://47.74.133.222:1111/loginpwd",
            method:"PATCH",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "pwd":payPwd,
                "newPwd":newPaypwd
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide().text(""),window.history.back(-1)',2000);
                }else{
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide().text("")',2000)
                }
            },
            error:function(res){
                console.log(res);
                $(".popup").show().text(res.msg);
                setTimeout('$(".popup").hide().text("")',2000)
            }
        });
    }
    $(".reviseLoginBtn").click(function(){
        if($(".newLoginPwd").val() == $(".confirmLoginNewPwd").val()){
            reviseLoginPwd();
        }else {
            $(".popup").show().text("您2次输入密码不一致，请重新输入");
            setTimeout('$(".popup").hide().text(""),$(".newLoginPwd").val("").focus(),$(".confirmLoginNewPwd").val("")',2000);
        }
    });
});
