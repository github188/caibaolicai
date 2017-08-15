/**
 * Created by hzc on 2017-6-21.
 */
$(function(){
    FastClick.attach(document.body);
    var item = $(".chooseBankWrap li");
    for(var i=0;i<item.length;i++){
        if(i%2 ==0){
            item[i].style.backgroundColor="rgb(247,247,247)";
            item[i].style.borderBottom = "1px solid #ccc";
            item[i].style.borderTop = "1px solid #ccc";
        }
    }
    $("ul").on('click','li',function(argument) {
        window.sessionStorage.chooseBankName = $(this).find(".bankTitle").text();
        window.sessionStorage.bankExplain = $(this).find(".chooseBankExplain span").first().text() + ' ' + $(this).find(".chooseBankExplain span").last().text();
        //window.history.go(-1);
        setTimeout('window.history.go(-1)',100);
    });
    //setTimeout($(".none").css("display","none"),0);
});
