/**
 * Created by hzc on 2017-7-18.
 */
$(function(){
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
                $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
            }else if(swiper.activeIndex == 1){
                if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){

                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");

                }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){

                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");

                }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){

                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");

                }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){

                    $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");

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
});
