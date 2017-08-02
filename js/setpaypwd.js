/**
 * Created by hzc on 2017-7-13.
 */
$(function(){
    $(".inputPwd").focus();
    $(".inputPwd").on('input',function(){
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
            console.log(payPwd);
            $.ajax({
                url:"http://106.14.165.194:1111/paypwd",
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
                    console.log(res);
                    if(res.code == 0){
                        if(window.sessionStorage.pageMark == "hqj"){
                            window.location.href = "productCollection.html";
                        }else if(window.sessionStorage.checkedLoginCode == "ziChan"){
                            window.location.href = "asset.html";
                        }else if(window.sessionStorage.checkedLoginCode == "faXian"){
                            window.location.href = "find.html";
                        }else if(window.sessionStorage.pageMark ==  "wzj360"){
                            window.location.href = "productCollection.html";
                        }else{
                            window.location.href = "index.html";
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
