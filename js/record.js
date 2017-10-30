/**
 * Created by hzc on 2017-8-11.
 */
FastClick.attach(document.body);
window.sessionStorage.recordType = "all";
$(".allType").css({
    "background":"#f0ad4e",
    "color":"#fff"
});
$(".filters").click(function(){
    $(".filtersWrap").toggle();
    $(".popupBg").toggle();
});
$(".goMakeMoneyBtn").click(function(){
    window.sessionStorage.backMark = "record";
    window.sessionStorage.buyProductMark = "hqj";
    window.location.href = "productCollection.html";
});
$(".chooseBtn").click(function(){
    $(this).css({
        "background":"#f0ad4e",
        "color":"#fff"
    }).siblings().css({
        "background":"#fff",
        "color":"#f0ad4e"
    }).parent().siblings().find("span").css({
        "background":"#fff",
        "color":"#f0ad4e"
    });
    $(".filtersWrap").hide();
    $(".popupBg").hide();
});
$(".popupBg").click(function(){
    $(".filtersWrap").hide();
    $(".popupBg").hide();
});


// -----------------------------------------------------------------------------------------------------------------
/**
 * 初始化iScroll控件
 */
var myScroll,pullDownEl,
    pullDownOffset,pageNum = 1,
    pullUpEl,pullUpOffset;
function pullDownAction () {    //下拉
    if(window.sessionStorage.recordType == "all"){
        recordAllRefresh();
    }else {
        recordsRefresh();
    }
    myScroll.refresh();
}
function pullUpAction () {		//上拉
    pageNum ++ ;
    if(window.sessionStorage.recordType == "all"){
        recordAll();
    }else {
        records();
    }
    myScroll.refresh();
}
function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                pullDownAction();
            }
            else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction();
            }
        }
    });
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}
document.addEventListener('touchmove',function (event) {
    if (event.cancelable) {
//             判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
            event.preventDefault();
        }
    }
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);
//全部
function recordAll(){
//        $(".recordsWrapContent").empty();
    $.ajax({
        url:"http://47.74.133.222:1111/orders",
        type:"GET",
        headers:{
            "token":window.localStorage.token
        },
        data:{
            "phone":window.localStorage.phoneNumber,
            "page":pageNum,
            "limit":"20"
        },
        success:function(res){
            console.log(res.result);
            console.log(res.result.length);
            //if($("#wrapper").css("display") == "none"){
            //
            //}else{
            //
            //}
            if(res.result.length == 0 && pageNum == 1){
                $(".noRecordWrap").show();
                $(".noRecordImg").show();
                $(".noMore").hide();
                $(".goMakeMoney").hide();
                $('#pullUp').hide();
                $("#wrapper").hide();
                $(".toTransactionPromptFont").empty().text("您暂无此交易");
            }else {
                $("#wrapper").show();
                $(".noRecordWrap").hide();
                $(".noRecordImg").hide();
                $.each(res.result, function (ind, obj) {
                    $(".recordsWrapContent").append($("<li class='recordCard bgWhite'><div class='recordCardTop flex borderBottom'><div class='flex1'><span class='recordTime'>" + obj.createdAt + "</span><span class='recordWeek'>" + obj.dayOfWeek + "</span></div><div class='flex1 recordState'>" + obj.status + "</div></div><div class='recordCardMiddle flex'><div class='flex1 optionType'>" + obj.orderType + "</div><div class='flex1 textRight'><span class='optionMoney'>" + obj.amount + "元</span><i class='iconfont icon-jinru'></i></div></div><div class='recordBottom optionPayFont'>" + obj.payStatus + "</div><div class='none'>" + obj.orderId + "</div></li>"));
                });
                if (res.result.length < 20) {
                    $(".noMore").show();
                    $('#pullUp').hide();
                }else{
                    $(".noMore").hide();
                    $('#pullUp').show();
                }
            }
        },
        error:function(res){
            console.log(res);
        }
    });
}
recordAll();
function recordAllRefresh(){
    $(".pullUp").hide();
    $(".recordsWrapContent").empty();
    $.ajax({
        url:"http://47.74.133.222:1111/orders",
        type:"GET",
        headers:{
            "token":window.localStorage.token
        },
        data:{
            "phone":window.localStorage.phoneNumber,
            "page":1,
            "limit":"20"
        },
        success:function(res){
            if(res.result.length == 0  && pageNum == 1){
                $(".noRecordWrap").show();
                $(".noRecordImg").show();
                $(".noMore").hide();
                $(".goMakeMoney").hide();
                $('#pullUp').hide();
                $("#wrapper").hide();
                $(".toTransactionPromptFont").empty().text("您暂无此交易");
            }else {
                $("#wrapper").show();
                $(".noRecordWrap").hide();
                $(".noRecordImg").hide();
                $.each(res.result, function (ind, obj) {
                    console.log(obj);
                    $(".recordsWrapContent").append($("<li class='recordCard bgWhite'><div class='recordCardTop flex borderBottom'><div class='flex1'><span class='recordTime'>" + obj.createdAt + "</span><span class='recordWeek'>" + obj.dayOfWeek + "</span></div><div class='flex1 recordState'>" + obj.status + "</div></div><div class='recordCardMiddle flex'><div class='flex1 optionType'>" + obj.orderType + "</div><div class='flex1 textRight'><span class='optionMoney'>" + obj.amount + "元</span><i class='iconfont icon-jinru'></i></div></div><div class='recordBottom optionPayFont'>" + obj.payStatus + "</div><div class='none'>" + obj.orderId + "</div></li>"));
                });
            }
        },
        error:function(res){
            console.log(res);
        }
    });
}
// -----------------------------------------------------------------------------------------------------------------
function recordsRefresh(){
    pageNum = 1;
    $(".recordsWrapContent").empty();
    $.ajax({
        url:"http://47.74.133.222:1111/orders",
        type:"GET",
        headers:{
            "token":window.localStorage.token
        },
        data:{
            "phone":window.localStorage.phoneNumber,
            "page":1,
            "limit":"20",
            "type":window.sessionStorage.recordType
        },
        success:function(res){
            console.log(res.result.length);
            if(res.result.length == 0  && pageNum == 1){
                $(".noRecordWrap").show();
                $(".noRecordImg").show();
                $(".noMore").hide();
                $(".goMakeMoney").hide();
                $('#pullUp').hide();
                $("#wrapper").hide();
                $(".toTransactionPromptFont").empty().text("您暂无此交易");
            }else{
                $("#wrapper").show();
                $(".noRecordWrap").hide();
                $(".noRecordImg").hide();
                $.each(res.result,function(ind,obj){
                    var createdAt = obj.createdAt.substr(0,10);
                    console.log(obj);
                    $(".recordsWrapContent").append($("<li class='recordCard bgWhite'><div class='recordCardTop flex borderBottom'><div class='flex1'><span class='recordTime'>"+createdAt+"</span><span class='recordWeek'>"+obj.dayOfWeek+"</span></div><div class='flex1 recordState'>"+obj.status+"</div></div><div class='recordCardMiddle flex'><div class='flex1 optionType'>"+obj.orderType+"</div><div class='flex1 textRight'><span class='optionMoney'>"+obj.amount+"元</span><i class='iconfont icon-jinru'></i></div></div><div class='recordBottom optionPayFont'>"+obj.payStatus+"</div><div class='none'>"+obj.orderId+"</div></li>"));
                });
            }
        },
        error:function(res){
            console.log(res);
        }
    });
}
function records(){
    //$(".recordsWrapContent").empty();
    $.ajax({
        url:"http://47.74.133.222:1111/orders",
        type:"GET",
        headers:{
            "token":window.localStorage.token
        },
        data:{
            "phone":window.localStorage.phoneNumber,
            "page":pageNum,
            "limit":"20",
            "type":window.sessionStorage.recordType
        },
        success:function(res){
            if(res.result.length == 0  && pageNum == 1){
                $(".noRecordWrap").show();
                $(".noRecordImg").show();
                $(".noMore").hide();
                $(".goMakeMoney").hide();
                $('#pullUp').hide();
                $("#wrapper").hide();
                $(".toTransactionPromptFont").empty().text("您暂无此交易");
            }else{
                $("#wrapper").show();
                $(".noRecordWrap").hide();
                $(".noRecordImg").hide();
                $.each(res.result,function(ind,obj){
                    var createdAt = obj.createdAt.substr(0,10);
                    console.log(obj);
                    $(".recordsWrapContent").append($("<li class='recordCard bgWhite'><div class='recordCardTop flex borderBottom'><div class='flex1'><span class='recordTime'>"+createdAt+"</span><span class='recordWeek'>"+obj.dayOfWeek+"</span></div><div class='flex1 recordState'>"+obj.status+"</div></div><div class='recordCardMiddle flex'><div class='flex1 optionType'>"+obj.orderType+"</div><div class='flex1 textRight'><span class='optionMoney'>"+obj.amount+"元</span><i class='iconfont icon-jinru'></i></div></div><div class='recordBottom optionPayFont'>"+obj.payStatus+"</div><div class='none'>"+obj.orderId+"</div></li>"));
                });
                if(res.result.length<20){
                    $(".noMore").show();
                    $('#pullUp').hide()
                }else{
                    $(".noMore").hide();
                    $('#pullUp').show();
                }
            }
        },
        error:function(res){
            console.log(res);
        }
    });
}

$(".allType").click(function(){
    window.sessionStorage.recordType = "all";
    //$("#scroller").css("transform","translate(0px, -51px) scale(1) translateZ(0px)");
    //document.addEventListener('DOMContentLoaded', loaded, false);
    pullDownAction();
    $(".filtersWrap").hide();
    $(".popupBg").hide();
    //recordAllRefresh();
});

$(".rechargeType").click(function(){
    window.sessionStorage.recordType = "0";
    //$("#scroller").css("transform","translate(0px, -51px) scale(1) translateZ(0px)");
    //document.addEventListener('DOMContentLoaded', loaded, false);
    pullDownAction();
    $(".filtersWrap").hide();
    $(".popupBg").hide();
    //recordsRefresh();
});
$(".withdrawType").click(function(){
    window.sessionStorage.recordType = "1";
    //$("#scroller").css("transform","translate(0px, -51px) scale(1) translateZ(0px)");
    //document.addEventListener('DOMContentLoaded', loaded, false);
    pullDownAction();
    $(".filtersWrap").hide();
    $(".popupBg").hide();
    //recordsRefresh();
});
$(".hqjType").click(function(){
    window.sessionStorage.recordType = "2";
    //$("#scroller").css("transform","translate(0px, -51px) scale(1) translateZ(0px)");
    //document.addEventListener('DOMContentLoaded', loaded, false);
    pullDownAction();

    $(".filtersWrap").hide();
    $(".popupBg").hide();
    //recordsRefresh();
});
$(".wzjType").click(function(){
    window.sessionStorage.recordType = "3";
    //$("#scroller").css("transform","translate(0px, -51px) scale(1) translateZ(0px)");
    //document.addEventListener('DOMContentLoaded', loaded, false);
    pullDownAction();
    $(".filtersWrap").hide();
    $(".popupBg").hide();
    //recordsRefresh();
});

$("#thelist").on('click','li',function(argument) {
    window.sessionStorage.recordOptionType = $(this).find(".optionType").text();
    window.sessionStorage.orderId = $(this).find(".none").text();
    //window.history.go(-1);
    setTimeout('window.location.href = "recordDetails.html"',100);
});
