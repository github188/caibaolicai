/**
 * Created by hzc on 2017-7-18.
 */
$(function(){
    $(".accountNumber").text(window.localStorage.phoneNumber);
    //获取用户信息
    function getUserInfo(){
        $.ajax({
           url:"http://106.14.165.194:1111/userInfo",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                console.log(res);
                $(".nicknameName").val(res.userInfo.nickName);
                $(".gender").val(res.userInfo.sex);
                $(".birthday").val(res.userInfo.birthday);
                $(".mailbox").val(res.userInfo.email);
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    getUserInfo();
    $(".saveInfoBtn").click(function(){
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(!myreg.test($(".email").val()))
        {
            $(".popup").show();
            $(".popup").text("邮箱格式错误");
            setTimeout('$(".popup").hide()',2000);
             return false;
        }else{
            $.ajax({
                url:"http://106.14.165.194:1111/userInfo",
                type:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded",
                    "token":window.localStorage.token
                },
                data:{
                    "phone":window.localStorage.phoneNumber,
                    "userPic":"",
                    "nickName":$(".nicknameName").val(),
                    "sex":$(".gender").val(),
                    "birthday":$(".birthday").val().replace(/[^0-9]/ig,""),
                    "email":$(".email").val()
                },
                success:function(res){
                    console.log(res);
                    if(res.code == 0){
                        $(".popup").show();
                        $(".popup").text(res.msg);
                        setTimeout('$(".popup").hide(),$(".popup").text(""),window.location.href = "asset.html"',2000);
                    }else {
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
