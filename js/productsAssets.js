/**
 * Created by hzc on 2017-7-5.
 */
$(function(){
    FastClick.attach(document.body);
    //$(".goBack").click(function(){
    //    if(window.sessionStorage.indexMark == "index"){
    //        window.location.href = "index.html";
    //    }else{
    //        window.location.href = "asset.html";
    //    }
    //});
    $(".pleaseInputsSellMoney").focus().attr('placeholder','最多可卖出'+parseFloat(window.sessionStorage.hqjAllAsset).toFixed(2)+'元');
    $(".goSellHqjBtn").click(function(){
        window.location.href = "sellHqj.html";
    });
    $(".goBuyHqjBtn").click(function(){
        window.sessionStorage.backMark = "hqj";
        window.sessionStorage.buyProductMark  = "assetsHqj";
        window.location.href = "productCollection.html";
    });
    $(".goBuyWZJBtn").click(function(){
        window.sessionStorage.backMark = "wzj";
        window.sessionStorage.buyProductMark  = "assetsWzj360Btn";
        window.location.href = "productCollection.html";
    });
    function productsAssets(){
        //活期金资产查询
        $.ajax({
            url:"http://47.74.133.222:1111/cgQuery",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                //console.log(res);
                //console.log(res.asset.currentGoldSum);
                var huoqiEarnYtd = parseFloat(res.asset.huoqiEarnYtd).toFixed(2);
                var huoqiGoldSum = parseFloat(res.asset.huoqiGoldSum).toFixed(2);
                var huoqiEarnSum = parseFloat(res.asset.huoqiEarnSum).toFixed(2);
                window.sessionStorage.hqjAllAsset =  res.asset.huoqiGoldSum;
                $(".hqjYstProfit").text(huoqiEarnYtd);//活期金昨日收益
                $(".hqjAllAsset").text(huoqiGoldSum);//活期金资产
                $(".hqjEarningsSum").text(huoqiEarnSum);//活期金累计收益
            },
            error:function(res){
                //console.log(res);
            }
        });
        //稳赚金资产查询
        $.ajax({
            url:"http://47.74.133.222:1111/wenzhuanGold",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                $(".wenzhuanEarnSum").text(parseFloat(res.asset.wenzhuanGoldSum).toFixed(2));
                $(".wenzhuanBuySum").text(parseFloat(res.asset.wenzhuanBuySum).toFixed(2));
                $(".wenZhuanEarnProfit").text(parseFloat(res.asset.wenzhuanEarnSum).toFixed(2));
            },
            error:function(res){
                //console.log(res);
            }
        });
        //稳赚金预期总收益
        $.ajax({
            url:"http://47.74.133.222:1111/wenzhuanGold/earnSum",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                if(res.earnSum == null){
                    $(".wenzhuanGoldSum").text("0.00");
                }else{
                    $(".wenzhuanGoldSum").text(parseFloat(res.earnSum).toFixed(2));
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    productsAssets();
    //支付密码
    $('#ipt').focus(function(){
        $(".sellPopup").css({
            'top':'1.366666667rem'
        });
    });
    $('#ipt').on('input',function (e){
        var numLen = 6;
        var pw = $('#ipt').val();
        var list = $('li');
        for(var i=0; i<=numLen; i++){
            if(pw[i]){
                $(list[i]).text('*');
            }else{
                $(list[i]).text('');
            }
        }
        if(pw.length == 6){
            $(".hideKeyboard").focus();
            $(".loaded").show();
            checkedPwd();
        }
    });
    $(".salableMoney").text(parseFloat(window.sessionStorage.hqjAllAsset).toFixed(2));
    $(".sellAllHqj").click(function(){
        if(parseFloat($(".salableMoney").text()).toFixed(2) == 0.00){
            $(".sellBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
            $(".popup").show().text("您暂无可卖出金额");
            setTimeout('$(".popup").text(),$(".popup").hide()',2000);
        }else {
            $(".pleaseInputsSellMoney").val(parseFloat($(".salableMoney").text()));
            $(".sellBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }
    });
    $(".pleaseInputsSellMoney").on('input propertychange',function(){
        if($(".salableMoney").text() == "0.00"){
            $(".pleaseInputsSellMoney").val("");
            $(".sellBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
        //if(parseFloat($(".pleaseInputsSellMoney").val()) == 0.00){
        //    $(".pleaseInputsSellMoney").val("");
        //
        //    return;
        //}
        else if($(".pleaseInputsSellMoney").val().length > 0){
            $(".sellBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
            if (parseFloat($(".pleaseInputsSellMoney").val()) > parseFloat($(".salableMoney").text())){
                $(".pleaseInputsSellMoney").val($(".salableMoney").text());
            }
        } else{
            $(".sellBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
    $(".sellBtn").click(function(){
        $(".sellTypeMoney").text("￥" + $(".pleaseInputsSellMoney").val());
        $(".popupBg").css("display","block");
        $(".sellPopup").css("display","block");
        $("#ipt").focus();
    });
    $(".popupBg").click(function(){
        $('#ipt').val("");
        $(".inputPwdWrap").find("li").text("");
        $(".popupBg").css("display","none");
        $(".sellPopup").css("display","none");
        $(".sellTypeMoney").text("");
    });
    $(".closePopup").click(function(){
        $('#ipt').val("");
        $(".inputPwdWrap").find("li").text("");
        $(".popupBg").css("display","none");
        $(".sellPopup").css("display","none");
        $(".sellTypeMoney").text("");
    });
    //支付密码验证
    function checkedPwd(){
        var checkedPayPwd = sha256_digest($("#ipt").val());
        $.ajax({
            url:"http://47.74.133.222:1111/paypwd-check",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "paypwd":checkedPayPwd
            },
            success:function(res){
                if(res.code == 0){
                    sellHqj();
                }else {
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$("#ipt").val("").focus(),$(".loaded").hide(),$(".inputPwdWrap").find("li").text("")',1500);
                }
            },
            error:function(res){
                //console.log(res);
            }
        });
    }
    // 活期金卖出
    function sellHqj(){
        var orderId = window.localStorage.phoneNumber + Date.parse(new Date());
        $.ajax({
            url:"http://47.74.133.222:1111/currentGold/sellOut",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":orderId,
                "amount":$(".pleaseInputsSellMoney").val()
            },
            success:function(res){
                //console.log(res);
                if(res.code == 0){
                    $(".loaded").hide();
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$("#ipt").val("")',2000);
                    setTimeout('$(".sellPopup ").hide(),$(".popupBg").hide(),window.location.href = "hqjAsset.html" ',2100);
                }else {
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$(".sellPopup ").hide(),$(".popupBg").hide()',2100);
                }
            },
            error:function(res){
                //console.log(res);
            }
        });
    }
    //监听密码输入框的变化
    // $("#ipt").on('input onpropertychange',function(){
    //     if($("#ipt").val().length == 6){
    //         checkedPwd();
    //     }
    // });
});
