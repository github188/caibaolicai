/**
 * Created by hzc on 2017-7-13.
 */

$(function(){
    FastClick.attach(document.body);
    $(".inputPwd").focus().on('input',function(){
        if($(".inputPwd").val().length == 6){
            $(".confirmPwd").focus();
        }
    });
    //设置支付密码
    $(".setPwdBtn").click(function(){
        if($(".inputPwd").val() !== $(".confirmPwd").val()){
            $(".popup").show();
            $(".popup").text("密码不一致");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else {
            var payPwd = sha256_digest($(".confirmPwd").val());
            $.ajax({
                url:"http://47.74.133.222:1111/paypwd",
                type:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded",
                    "token":window.localStorage.token
                },
                data:{
                    "phone":window.localStorage.phoneNumber,
                    "paypwd":payPwd
                },
                success:function(res){
                    if(res.code == 0){
                        if(window.sessionStorage.setPayPwd == "hqj"){
                            window.location.href = "buyHqj.html";
                        }else if(window.sessionStorage.setPayPwd == "wzj"){
                            window.location.href = "buyWzj.html";
                        }else if(window.sessionStorage.setPayPwd == "tiXian") {
                            window.location.href = "withdrawCash.html";
                        }
                    }else{
                        $(".popup").show();
                        $(".popup").text(res.msg);
                        setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                    }
                },
                error:function(res){
                    console.log(res);
                }
            })
        }
    });
});
