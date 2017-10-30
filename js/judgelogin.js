/**
 * Created by hzc on 2017-7-3.
 */
$(function(){
    FastClick.attach(document.body);
    if($(".phoneNum").val().length == 11){
        $(".nextOpt").removeAttr("disabled").css("background","rgb(242,182,67)");
        window.localStorage.phoneNumber = $(".phoneNum").val();
    }else {
        $(".nextOpt").attr("disabled","disabled").css("background","rgb(181,181,181)");
    }
    $(".close").click(function(){
        window.location.href = "index.html";
    });
    $(".phoneNum").focus();
    //只能入11位数字，输入完成、下一步按钮高亮
    $('.phoneNum').on('input onpropertychange', function() {
        if($(".phoneNum").val().length == 11){
            $(".nextOpt").removeAttr("disabled").css("background","rgb(242,182,67)");
            window.localStorage.phoneNumber = $(".phoneNum").val();
        }else {
            $(".nextOpt").attr("disabled","disabled").css("background","rgb(181,181,181)");
        }
    });
    //if($(".phoneNum").val().length == 11){
    //    $(".nextOpt").removeAttr("disabled").css("background","rgb(242,182,67)");
    //    window.localStorage.phoneNumber = $(".phoneNum").val();
    //}else {
    //    $(".nextOpt").attr("disabled","disabled").css("background","rgb(181,181,181)");
    //}
    //判断登录密码是否设置
    function judgeSetLofinPwd(){
        $.ajax({
            url:"http://47.74.133.222:1111/loginpwd",
            type:"GET",
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                //console.log(res);
                if(res.code == 0){
                    window.location.href = "pwdlogin.html";
                }else if(res.code == -1){
                    window.location.href = "codelogin.html";
                }
            },
            error:function (res){
                //console.log(res);
            }
        });
    }
    $(".nextOpt").click(function(){
        if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test($(".phoneNum").val()))){//判断是否为11位中国手机号码
            $(".popup").show();
            $(".popup").text("号码格式错误");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else{
            //console.log($(".phoneNum").val());
            $.ajax({
                url:"http://47.74.133.222:1111/registQuery",
                method:"GET",
                data:{"phone": $.trim($(".phoneNum").val())},
                success:function(res){
                    //window.sessionStorage.code = res.code;
                    if(res.code == 0){
                        judgeSetLofinPwd();
                        //window.sessionStorage.usage = "1";
                        //window.location.href = "codelogin.html";
                    }else if(res.code == -1){
                        window.sessionStorage.usage = "0";
                        window.location.href = "register.html";
                    }
                },
                error:function(res){
                    //console.log(res);
                }
            })
        }
    });

});
