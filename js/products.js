/**
 * Created by hzc on 2017-7-4.
 */
$(function(){
    $(".goBackBtn").click(function(){
        if( window.sessionStorage.pageMark == "wzj360" || window.sessionStorage.pageMark == "hqj"){
            window.location.href = "index.html";
        }
    });

    function swiperInit(){
        var swiper = new Swiper('#swiper-container4', {
            autoHeight: true,
            nested:true,
            resistanceRatio: 0,
//        onSlideChangeEnd: function(swiper){
//            $("body").scrollTop(0);
//        },
            onSlideChangeStart:function(swiper){
//            alert(swiper.activeIndex+'');
                $("body").scrollTop(0);
                if(swiper.activeIndex == 0){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");
                }else if(swiper.activeIndex == 1){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");
                }else if(swiper.activeIndex == 2){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");
                }else if(swiper.activeIndex == 3){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");
                }
                // swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
        var mySwiper2 = new Swiper('#swiper-container2',{
            watchSlidesProgress : true,
            watchSlidesVisibility : true,
            allowSwipeToNext : false,
            allowSwipeToPrev : false,
            slidesPerView : 3,
            touchRatio : 0.5,
            onTap: function(){
                mySwiper3.slideTo( mySwiper2.clickedIndex)
            }
        });
        var mySwiper3 = new Swiper('#swiper-container3',{
            autoHeight: true,
            onSlideChangeStart: function(){
                updateNavPosition();
                $("body").scrollTop(0);
            },
//        onSlideChangeStart: function(swiper){
//            $("body").scrollTop(0);
////            $("body").animate({scrollTop:0},700);
//        },

            onSlideChangeEnd:function(swiper){
                $("body").scrollTop(0);
                if(swiper.activeIndex == 0){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn").removeClass('buyWzj60Btn buyWzj90Btn buyWzj180Btn buyWzj360Btn');
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){

                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn").removeClass('buyHqjBtn buyWzj90Btn buyWzj180Btn buyWzj360Btn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){

                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn").removeClass('buyWzj60Btn buyHqjBtn buyWzj180Btn buyWzj360Btn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){

                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn").removeClass('buyWzj60Btn buyWzj90Btn buyHqjBtn buyWzj360Btn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){

                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn").removeClass('buyWzj60Btn buyWzj90Btn buyWzj180Btn buyHqjBtn');

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }
                else if(swiper.activeIndex == 2){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 3){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
        function updateNavPosition(){
            $('#swiper-container2 .active-nav').removeClass('active-nav');
            var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
            if (!activeNav.hasClass('swiper-slide-visible')) {
                console.log(1);
                if (activeNav.index()>mySwiper2.activeIndex) {
                    console.log(2);
                    var thumbsPerNav = Math.floor(mySwiper2.width/activeNav.width())-1;
                    mySwiper2.slideTo(activeNav.index()-thumbsPerNav)
                }
                else {
                    console.log(3);
                    mySwiper2.slideTo(activeNav.index())
                }
            }
        }
    }
    //swiperInit();
    //收益发放日
    function profitGiveDay(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var interestTime = year + "年" + month + "月" + day + "日" + "00:00:00";
        $(".profitGiveDay").text(interestTime);
    }
    profitGiveDay(2);
    //计息起始日
    function showTime(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        console.log(timeStr);
        var arr=timeStr.split("/");  
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var interestTime = year + "年" + month + "月" + day + "日";
        $(".jiXiDay").text(interestTime);
    }
    showTime(1); //当前时间添加1天
    //计息结束日60天
    function interestEndTime60(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");  
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var interestTime = year + "年" + month + "月" + day + "日";
        $(".jixiEndDay60").text(interestTime);
    }
    interestEndTime60(60);
    //计息结束日90天
    function interestEndTime90(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");  
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var interestTime = year + "年" + month + "月" + day + "日";
        $(".jixiEndDay90").text(interestTime);
    }
    interestEndTime90(90);
    //计息结束日180天
    function interestEndTime180(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");  
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var interestTime = year + "年" + month + "月" + day + "日";
        $(".jixiEndDay180").text(interestTime);
    }
    interestEndTime180(180);
    //计息结束日360天
    function interestEndTime360(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");  
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var interestTime = year + "年" + month + "月" + day + "日";
        $(".jixiEndDay360").text(interestTime);
    }
    interestEndTime360(360);
    //点击购买活期金产品
    if(window.sessionStorage.buyProductMark === "buyHqjBtn"){
        console.log("test");
        $(".buyHqjBtn").click(function(){
            alert("buyHqjBtn");
            window.sessionStorage.productsType = "活期金购买";
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
                        window.sessionStorage.buyProductType = "buyHqjMark";
                        window.location.href = "unbindbuyHQJ.html";
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
                        window.location.href = "buyHqj.html";
                    }
                },
                error:function(res){
                    console.log(res);
                }

            });
            //window.location.href = 'buyHqj.html';
        });
    }else if($(".iWantbuyBtn").hasClass("buyWzj60Btn")){
        alert("buyWzj60Btn")
    }

    //购买稳赚金

    setTimeout('$(".loading").css("display","none")',1000);
    $(".productBtn ").on('click',function(){
        $(this).addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
        $("body").scrollTop(0);
    });
    //默认显示稳赚金360
    if(window.sessionStorage.pageMark == "wzj360"){
        var mySwiper = new Swiper('#swiper-container4',{
            initialSlide :3,
            autoHeight: true,
            nested:true,
            resistanceRatio: 0,
            onSlideChangeStart:function(swiper){
            alert(swiper.activeIndex+'');
                $("body").scrollTop(0);
                if(swiper.activeIndex == 0){
                    window.sessionStorage.buyProductMark = "buyWzj60Btn";
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn").removeClass('buyWzj90Btn buyWzj180Btn buyWzj360Btn buyHqjBtn');
                }else if(swiper.activeIndex == 1){
                    window.sessionStorage.buyProductMark = "buyWzj90Btn";
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn").removeClass('buyWzj60Btn buyWzj180Btn buyWzj360Btn buyHqjBtn');
                }else if(swiper.activeIndex == 2){
                    window.sessionStorage.buyProductMark = "buyWzj180Btn";
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn").removeClass('buyWzj60Btn buyWzj90Btn buyWzj360Btn buyHqjBtn');
                }else if(swiper.activeIndex == 3){
                    window.sessionStorage.buyProductMark = "buyWzj360Btn";
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn").removeClass('buyWzj90Btn buyWzj180Btn buyWzj60Btn buyHqjBtn');
                }
                // swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
        var mySwiper2 = new Swiper('#swiper-container2',{
            watchSlidesProgress : true,
            watchSlidesVisibility : true,
            allowSwipeToNext : false,
            allowSwipeToPrev : false,
            slidesPerView : 3,
            touchRatio : 0.5,
            onTap: function(){
                mySwiper3.slideTo( mySwiper2.clickedIndex)
            }
        });
        var mySwiper3 = new Swiper('#swiper-container3',{
            initialSlide :1,
            autoHeight: true,
            onSlideChangeStart: function(){
                updateNavPosition();
                $("body").scrollTop(0);
            },
            onSlideChangeEnd:function(swiper){
                $("body").scrollTop(0);
                //alert(swiper.activeIndex);
                if(swiper.activeIndex == 0){
                    window.sessionStorage.buyProductMark = "buyHqjBtn";
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn").removeClass('buyWzj90Btn buyWzj180Btn buyWzj360Btn buyHqjBtn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn").removeClass('buyWzj60Btn buyWzj180Btn buyWzj360Btn buyHqjBtn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn").removeClass('buyWzj60Btn buyWzj90Btn buyWzj360Btn buyHqjBtn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        window.sessionStorage.buyProductMark = "buyWzj360Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn").removeClass('buyWzj90Btn buyWzj180Btn buyWzj60Btn buyHqjBtn');

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }
                else if(swiper.activeIndex == 2){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 3){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
    }
    //默认显示活期金
    if(window.sessionStorage.pageMark == "hqj"){
        var mySwiper3 = new Swiper('#swiper-container3',{
            initialSlide :0,
            autoHeight: true,
            onSlideChangeStart: function(){
                updateNavPosition();
                $("body").scrollTop(0);
            },
            onSlideChangeEnd:function(swiper){
                $("body").scrollTop(0);
                if(swiper.activeIndex == 0){
                    window.sessionStorage.buyProductMark = "buyHqjBtn";
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn").removeClass('buyWzj90Btn buyWzj180Btn buyWzj60Btn buyWzj360Btn');
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn").removeClass('buyWzj90Btn buyWzj180Btn buyWzj360Btn buyHqjBtn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn").removeClass('buyWzj360Btn buyWzj180Btn buyWzj60Btn buyHqjBtn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn").removeClass('buyWzj90Btn buyWzj360Btn buyWzj60Btn buyHqjBtn');

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        window.sessionStorage.buyProductMark = "buyWzj360Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn").removeClass('buyWzj90Btn buyWzj180Btn buyWzj60Btn buyHqjBtn');

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }
                else if(swiper.activeIndex == 2){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 3){
                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
    }
});

