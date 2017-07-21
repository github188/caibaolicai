/**
 * Created by hzc on 2017-7-20.
 */
$(function(){
    $(".goAuthentication").click(function(){
        window.location.href = "certification.html";
    });
    $(".czMoney").on('input onpropertychange',function(){
       if($(".czMoney").val() <= 100){
           $(".czMoney").val("100");
       }
    });
    $(".bindCzMoney").on('input onpropertychange',function(){
       if($(".bindCzMoney").val().length > 0){
           $(".confirmBtn").css("background","rgb(242, 182, 67)").removeAttr("disabled");
       }else{
           $(".confirmBtn").css("background","#cccccc").attr("disabled",true);
       }
    });
    $(".confirmBtn").click(function(){
        $(".popupBg").show();
        $(".popupWrap").show();
        $(".userRechargeNum").text("￥" + $(".bindCzMoney").val());
    });
    $(".reset").click(function(){
       $(".czMoney").val("");
        $(".confirmBtn").css("background","#cccccc").attr("disabled",true);
    });
    $(".clossPopup").click(function() {
        $(".popupWrap").hide();
        $(".popupBg").hide();
    })
});