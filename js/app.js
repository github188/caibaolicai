$(function(){
    $("input").css("border","none");
    $(".goCertification").click(function(){
       window.location.href = "certification.html";
    });
    $(".goHqjAsset").click(function(){
        window.location.href = "hqjAsset.html";
    });
    $(".goWzjAsset").click(function(){
        window.location.href = "wzjAsset.html";
    });
    $(".shouYe").click(function(){
        window.location.href = "index.html";
    });
    $(".yueDu").click(function(){
        window.location.href = "read.html";
    });
    $(".ziChan").click(function(){
        window.location.href = "asset.html";
    });

    //var checkedLoginCode;
    $(".ziChan").click(function(){
        if(window.localStorage.token == undefined){
            window.sessionStorage.checkedLoginCode = "ziChan";
            window.location.href = "ready.html";
        }else{
            window.location.href = "asset.html";
        }
    });
    $(".faXian").click(function(){
        if(window.localStorage.token == undefined){
            window.sessionStorage.checkedLoginCode = "faXian";
            window.location.href = "ready.html";
        }else {
            window.location.href = "find.html";
        }
    });

    $(".goBuyWzj360").click(function(){
        if(window.localStorage.token == undefined){
            window.sessionStorage.pageMark = "wzj360";
            window.location.href = "ready.html";
        }else {
            window.sessionStorage.pageMark = "wzj360";
            window.location.href = "productCollection.html";
        }
    });
    $(".goBuyHqj").click(function(){
        if(window.localStorage.token == undefined){
            window.sessionStorage.pageMark = "hqj";
            window.location.href = "ready.html";
        }else {
            window.sessionStorage.pageMark = "hqj";
            window.location.href = "productCollection.html";
        }


    });
    if(window.localStorage.token == undefined){
        $(".dataLeftTop").text("昨日注册(人)");
        $(".dataRightTop").text("累计交易(吨)");
        //获取未登录首页的注册人数
        $.ajax({
            url:"http://10.0.92.198:1111/count",
            type:"GET",
            success:function(res){
                $(".dataLeftBottom").text(res.result.usersCountYtd);
                $(".dataRightBottom").text(res.result.goldSum);
            },
            error:function(res){
                console.log(res);
            }
        });
        //获取金价
        $.ajax({
            url:"http://106.14.165.194:8000/history-price",
            type:"GET",
            success:function(res){
                var goldPrice = JSON.parse(res);
                $(".goldPrice").text(goldPrice.week[0].price + "元/克");
            },
            error:function(res){
                console.log(res);
            }
        });
    }else{
        $(".dataLeftTop").text("昨日收益(元)");
        $(".dataRightTop").text("昨日收益克数(克)");
        //资产查询接口
        $.ajax({
            url:"http://10.0.92.198:1111/assetQuery",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                console.log(res);
                console.log(res.asset);
                var goldPrice = window.sessionStorage.goldPrice;
                var assetNum = res.asset.balance + res.asset.huoqiGoldSum + (res.asset.qiandaiGoldSum * goldPrice) + (res.asset.jinshengGoldSum * goldPrice) + res.asset.wenzhuanGoldSum;
                console.log(assetNum);
                $(".asset").text(assetNum);
                $(".balance").text(res.asset.balance);
                $(".dataLeftBottom").text(res.asset.earnYtdSum);
                $(".dataRightBottom").text(res.asset.goldEarnYtdSum);
                $(".hqjNum").text(res.asset.huoqiGoldSum);
                $(".jsjNum").text(res.asset.jinshengGoldSum);
                $(".wzjNum").text(res.asset.wenzhuanGoldSum);
                $(".qdjNum").text(res.asset.qiandaiGoldSum);
            },
            error:function(res){
                console.log(res);
            }
        });
        //获取金价接口
        $.ajax({
            url:"http://106.14.165.194:8000/history-price",
            type:"GET",
            success:function(res){
                var goldPrice = JSON.parse(res);
                $(".goldPrice").text(goldPrice.week[0].price + "元/克");
                window.sessionStorage.goldPrice = goldPrice.week[0].price;
            },
            error:function(res){
                console.log(res);
            }
        });
    }

    //$(".footBtn").click(function(){
    //    $("body").scrollTop(0);
    //    $(this).css("color","orange").siblings().css("color","#beb8b8");
    //    $(".swiper-wrapper").find(".page").css("display","none");
    //    $(".swiper-wrapper").find(".page").eq($(this).index()).css("display","block");
    //});

    //资产
    $(".goMyInfoBTn").click(function(){
       window.location.href = "personalInfo.html"
    });
    $(".goRechargeBtn").click(function(){
        $.ajax({
            url:'http://10.0.92.198:1111/authQuery',
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
                    window.location.href = "unbindrecharge.html";
                }else if(res.code == -2){
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else if(res.code == -3){
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else if(res.code == -4){
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else{
                    window.location.href = "recharge.html";
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    $(".goWithdrawBtn").click(function(){
        //$.ajax({
        //    url:'http://10.0.92.198:1111/authQuery',
        //    type:"GET",
        //    headers:{
        //        "token":window.localStorage.token
        //    },
        //    data:{
        //        "phone":window.localStorage.phoneNumber
        //    },
        //    success:function(res){
        //        console.log(res);
        //        if(res.code == -1){
        //            window.location.href = "unbindwithdrawal.html";
        //        }else if(res.code == -2){
        //            $(".popup").show();
        //            $(".popup").text(res.msg);
        //            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //        }else if(res.code == -3){
        //            $(".popup").show();
        //            $(".popup").text(res.msg);
        //            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //        }else if(res.code == -4){
        //            $(".popup").show();
        //            $(".popup").text(res.msg);
        //            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //        }else{
        //            window.location.href = "withdrawCash.html";
        //        }
        //    },
        //    error:function(res){
        //        console.log(res);
        //    }
        //});
    });
    //    退出登录
    $(".quitLoginBtn").click(function(){
        localStorage.clear();
        window.location.href = "index.html";
    });

});