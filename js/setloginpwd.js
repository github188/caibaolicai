/**
 * Created by hzc on 2017-7-21.
 */
$(function(){
    $(".inputPwd").focus();
    $(".confirmPwd").on('input porpertychange',function() {
        if ($(".confirmPwd").val().length >= 6) {
            $(".setLoginPwdBtn").css("background", "rgb(242,182,67)").removeAttr("disabled");
        } else {
            $(".setLoginPwdBtn").css("background", "rgb(181,181,181)").attr("disabled", "disabled");
        }
    });
    $(".setLoginPwdBtn").click(function(){
        if($(".confirmPwd").val() !== $(".inputPwd").val()){
            $(".confirmPwd").val("");
            $(".inputPwd").val("");
            $(".popup").show();
            $(".popup").css({
                "top":"13.5rem",
                "width":"5rem",
                "left":"2.2rem"
            });
            $(".popup").text("两次密码不一致，请重新输入");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            $(".setLoginPwdBtn").css("background", "rgb(181,181,181)").attr("disabled", "disabled");
        }else{
            var loginPwd = sha256_digest($(".confirmPwd").val());
            console.log(loginPwd);
            $.ajax({
                url:"http://10.0.92.198:1111/loginpwd",
                type:"PUT",
                headers:{
                    "token":window.localStorage.token
                },
                data:{
                    "phone":window.localStorage.phoneNumber,
                    "pwd":loginPwd
                },
                success:function(res){
                    console.log(res);
                    if(res.code == 0){
                        window.location.href = "index.html";
                    }
                },
                error:function(res){
                    console.log(res);
                }
            });
        }
    })
});