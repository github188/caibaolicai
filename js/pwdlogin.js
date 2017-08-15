/**
 * Created by hzc on 2017-7-25.
 */
$(function(){
    FastClick.attach(document.body);
    $(".pwdNum").focus();
    $(".pwdNum").on('input porpertychange',function(){
        if($(".pwdNum").val().length >= 6){
            $(".loginBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else {
            $(".loginBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
    $(".phoneNumber").text(window.localStorage.phoneNumber);
    $(".goCodeLoginBtn").click(function(){
        window.location.href = "codelogin.html";
    });
    //判断是否设置支付密码
    function judgeSetPayPwd(){
        $.ajax({
            url:"http://106.14.165.194:1111/paypwd",
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
                    if(window.sessionStorage.buyProductMark == "hqj"){
                        window.location.href = "productCollection.html";
                    }else if(window.sessionStorage.checkedLoginCode == "ziChan"){
                        window.location.href = "asset.html";
                    }else if(window.sessionStorage.checkedLoginCode == "faXian"){
                        window.location.href = "find.html";
                    }else if(window.sessionStorage.buyProductMark ==  "wzj360"){
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

    $(".loginBtn").click(function(){
        var payPwd = sha256_digest($(".pwdNum").val());
        $.ajax({
            url:"http://106.14.165.194:1111/login/pwd",
            type:"POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "pwd":payPwd
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    window.localStorage.token = res.token;
                    judgeSetPayPwd();
                }else {
                    $(".loginBtn").attr("disabled","disabled");
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$(".loginBtn").removeAttr("disabled");',1500);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    });
});