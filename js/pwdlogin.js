/**
 * Created by hzc on 2017-7-25.
 */
$(function(){
    $(".pwdNum").focus();
    $(".pwdNum").on('input porpertychange',function(){
        if($(".pwdNum").val().length >= 6){
            $(".loginBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }
    });
    $(".phoneNumber").text(window.localStorage.phoneNumber);
    $(".goCodeLoginBtn").click(function(){
        window.location.href = "codelogin.html";
    });
    $(".loginBtn").click(function(){
        var payPwd = sha256_digest($(".pwdNum").val());
        $.ajax({
            url:"http://10.0.92.198:1111/login/pwd",
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
                    if(window.sessionStorage.checkedLoginCode == "ziChan"){
                        window.location.href = "asset.html";
                    }else if(window.sessionStorage.checkedLoginCode == "faXian"){
                        window.location.href = "find.html";
                    }else if(window.sessionStorage.pageMark ==  "wzj360"){
                        window.location.href = "productCollection.html";
                    }else{
                        window.location.href = "index.html";
                    }
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