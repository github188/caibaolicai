/**
 * Created by hzc on 2017-7-5.
 */
$(function(){
    $(".pleaseInputsSellMoney").focus();
    $(".goSellHqjBtn").click(function(){
       window.location.href = "sellHqj.html";
    });
    $(".goBuyHqjBtn").click(function(){
        window.sessionStorage.pageMark  = "hqj";
        window.location.href = "productCollection.html";
    });
    function productsAssets(){
        //活期金资产查询
        $.ajax({
            url:"http://10.0.92.198:1111/cgQuery",
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
                window.sessionStorage.hqjAllAsset =  res.asset.huoqiGoldSum;
                $(".hqjYstProfit").text(res.asset.huoqiEarnYtd);//活期金昨日收益
                $(".hqjAllAsset").text(res.asset.huoqiGoldSum);//活期金资产
                $(".hqjEarningsSum").text(res.asset.huoqiEarnSum);//活期金累计收益
            },
            error:function(res){
                console.log(res);
            }
        });
        //稳赚金资产查询
        $.ajax({
            url:"http://10.0.92.198:1111/wenzhuanGold",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                $(".wenzhuanEarnSum").text(res.asset.wenzhuanGoldSum);
                $(".wenzhuanBuySum").text(res.asset.wenzhuanBuySum);
                $(".wenZhuanEarnProfit").text(res.asset.wenzhuanEarnSum);
            },
            error:function(res){
                console.log(res);
            }
        });
        //稳赚金预期总收益
        $.ajax({
            url:"http://10.0.92.198:1111/wenzhuanGold/earnSum",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                //console.log(res);
                //console.log(res.earnSum);
                //console.log(typeof (res.earnSum));
                if(res.earnSum == null){
                    $(".wenzhuanGoldSum").text("0");
                }else{
                    $(".wenzhuanGoldSum").text(res.earnSum);
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
            'top':'0.266666667rem'
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
    });
    $(".salableMoney").text(window.sessionStorage.hqjAllAsset);
    $(".sellAllHqj").click(function(){
       $(".pleaseInputsSellMoney").val(parseFloat($(".salableMoney").text()));
    });
    $(".pleaseInputsSellMoney").on('input onpropertychange',function(){
        $(".sellBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        if ($(".pleaseInputsSellMoney").val() >= $(".salableMoney").text()){
            $(".pleaseInputsSellMoney").val(window.sessionStorage.hqjAllAsset);
        }
        //if($(".pleaseInputsSellMoney").val() >0 && $(".pleaseInputsSellMoney").val()<=window.sessionStorage.hqjAllAsset){
        //    $(".sellBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        //}else{
        //    $(".sellBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        //}
    });
    $(".sellBtn").click(function(){
        $(".sellTypeMoney").text("￥" + $(".pleaseInputsSellMoney").val());
        $(".popupBg").css("display","block");
        $(".sellPopup").css("display","block");
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
    function checkedPwd(){
        var checkedPayPwd = sha256_digest($("#ipt").val());
        $.ajax({
            url:"10.0.92.198:1111/paypwd-check",
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
                console.log(res);
                $(".sellPopup ").hide();
                $(".popupBg").hide();
                //if(res.)
            },
            error:function(res){
                console.log(res);
            }
        });
    }
   //监听密码输入框的变化
    $("#ipt").on('input onpropertychange',function(){
        if($("#ipt").val().length == 6){
            checkedPwd();
        }
    });
});
