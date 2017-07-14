/**
 * Created by hzc on 2017-7-4.
 */
$(function(){
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
    $(".buyHqjBtn").click(function(){
        $.ajax({
            url:'http://106.14.165.194:1111/authQuery',
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
    }


});

