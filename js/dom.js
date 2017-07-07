/**
 * Created by hzc on 2017-6-21.
 */
$(function(){
    var item = $(".chooseBankWrap li");
    for(var i=0;i<item.length;i++){
        if(i%2 !==0){
            item[i].style.backgroundColor="rgb(247,247,247)";
            item[i].style.borderBottom = "1px solid #ccc";
            item[i].style.borderTop = "1px solid #ccc";
        }
    }
    //setTimeout($(".none").css("display","none"),0);
});
