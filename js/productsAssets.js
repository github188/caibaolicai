/**
 * Created by hzc on 2017-7-5.
 */
$(function(){
    $(".goSellHqjBtn").click(function(){
       window.location.href = "sellHqj.html";
    });
    $(".goBuyHqjBtn").click(function(){
        window.location.href = "buyHqj.html";
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
                window.sessionStorage.hqjAllAsset =  res.asset.currentGoldSum;
                $(".hqjYstProfit").text(res.asset.cgEarningsYtd);
                $(".hqjAllAsset").text(res.asset.currentGoldSum);
                $(".hqjEarningsSum").text(res.asset.cgEarningsSum);
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
                console.log(res);
                $(".wenzhuanGoldSum").text(res.earnSum);
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
        if($(".pleaseInputsSellMoney").val() >0 && $(".pleaseInputsSellMoney").val()<=window.sessionStorage.hqjAllAsset){
            $(".sellBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else{
            $(".sellBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
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

});
