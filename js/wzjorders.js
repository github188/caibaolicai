/**
 * Created by hzc on 2017-7-19.
 */
$(function(){
    //获取金价
    $.ajax({
        url:"http://106.14.165.194:8000/history-price",
        type:"GET",
        success:function(res){
            var goldPrice = JSON.parse(res);
            $(".headTopRight span").text(goldPrice.week[0].price);
        },
        error:function(res){
            console.log(res);
        }
    });
    $(".inputBuyInt").on('input porpertychange',function(){
         if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
             var convertGramNum = (parseFloat($(".inputBuyInt").val())/parseFloat($(".headTopRight").find("span").text())).toFixed(2);
             $(".convertIntoNum ").text(convertGramNum);
             if($(".convertIntoNum ").text() == 'NaN'){
                 $(".convertIntoNum ").text("");
             }
             if(parseFloat($(".inputBuyInt").val())<50){
                 $(".inputBuyInt").val(50);
             }
             var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 360 * 0.14)/360;
             $(".expectProfitNum").text(expectedRevenue.toFixed(2));
         }else{
             var convertMoney = (parseFloat($(".inputBuyInt").val())*parseFloat($(".headTopRight").find("span").text())).toFixed(2);
             $(".convertIntoNum ").text(convertMoney);
             if($(".convertIntoNum ").text() == 'NaN'){
                 $(".convertIntoNum ").text("");
             }
             var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 360 * 0.14)/360;
             $(".expectProfitNum").text(expectedRevenue.toFixed(2));
             if($(".expectProfitNum").text() == 'NaN'){
                 $(".expectProfitNum").text("");
             }
         }
        $(".waitPayNum").text($(".inputBuyInt").val());
    });
    $(".changeBuyMethodBtn").click(function(){
        $(".inputBuyInt").val("");
        $(".waitPayNum").text("");
        $(".convertIntoNum ").text("");
        $(".expectProfitNum").text("");
        if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
            $(".inputBuyMethodTitle").text("克数");
            $(".inputBuyInt").attr('placeholder','请输入购买克数');
            $(".convertIntoName ").text("折合人民币");
            $(".changeBuyMethodBtn").text("切换为按金额购买");
        }else{
            $(".inputBuyMethodTitle").text("金额");
            $(".inputBuyInt").attr('placeholder','50元起够');
            $(".convertIntoName ").text("折合黄金克数");
            $(".changeBuyMethodBtn").text("切换为按克数购买")
        }
    });
});
