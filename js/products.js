/**
 * Created by hzc on 2017-7-4.
 */
$(function(){
    FastClick.attach(document.body);
    $(".goldPrice").text(window.sessionStorage.goldPrice);
    $(".goBackBtn").click(function(){
        if(window.sessionStorage.backMark == "index" ){
            window.location.href = "index.html";
        }else if(window.sessionStorage.backMark == "hqj"){
            window.location.href = "hqjAsset.html";
        }else if(window.sessionStorage.backMark == "wzj"){
            window.location.href = "wzjAsset.html";
        }else if(window.sessionStorage.backMark == "record"){
            window.location.href = "records.html";
        }else if(window.sessionStorage.backMark == "authentication"){
            window.location.href = "authentication.html";
        }
        else{
            window.location.href = "index.html";
        }
    });
    //收益发放日
    //function profitGiveDay(day){
    //    var dayTime=day*24*60*60*1000; //参数天数的时间戳
    //    var nowTime=new Date().getTime(); //当天的时间戳
    //    var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
    //    var timeStr = t.substr(0,9);
    //    var arr=timeStr.split("/");
    //    var year = arr[0];
    //    var month = arr[1];
    //    var day2 = arr[2];
    //    var interestTime = year + "年" + month + "月" + day2 + "日" + "00:00:00";
    //    $(".profitGiveDay").text(interestTime);
    //}
    //profitGiveDay(2);
    //收益发放日60天
    function profitGiveDay60(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日"+ "00:00:00";
        $(".profitGiveDay60").text(interestTime);
    }
    profitGiveDay60(61);
    //收益发放日90天
    function profitGiveDay90(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        //console.log(arr);console.log(t);
        var interestTime = year + "年" + month + "月" + day2 + "日"+ "00:00:00";
        $(".profitGiveDay90").text(interestTime);
    }
    profitGiveDay90(91);
    //收益发放日180天
    function profitGiveDay180(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日"+ "00:00:00";
        $(".profitGiveDay180").text(interestTime);
    }
    profitGiveDay180(181);
    //收益发放日360天
    function profitGiveDay360(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日"+ "00:00:00";
        $(".profitGiveDay360").text(interestTime);
    }
    profitGiveDay360(361);
    //计息起始日
    function showTime(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日";
        $(".jiXiDay").text(interestTime);
    }
    showTime(1); //当前时间添加1天

    //计息结束日60天
    function interestEndTime60(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日";
        $(".jixiEndDay60").text(interestTime);
    }
    interestEndTime60(60);
    //计息结束日90天
    function interestEndTime90(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日";
        $(".jixiEndDay90").text(interestTime);
    }
    interestEndTime90(90);
    //计息结束日180天
    function interestEndTime180(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日";
        $(".jixiEndDay180").text(interestTime);
    }
    interestEndTime180(180);
    //计息结束日360天
    function interestEndTime360(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,10).replace(/[\u4E00-\u9FA5]/g,'');
        var arr=timeStr.split("/");
        var year = arr[0];
        var month = arr[1];
        var day2 = arr[2];
        var interestTime = year + "年" + month + "月" + day2 + "日";
        $(".jixiEndDay360").text(interestTime);
    }
    interestEndTime360(360);
    //点击购买活期金产品
    $(".iWantbuyBtn").click(function(){
        window.sessionStorage.convertIntoNum = undefined;
        window.sessionStorage.expectProfitNum = undefined;
        window.sessionStorage.amount = "";
        if(window.sessionStorage.buyProductMark == "buyHqjBtn"){
            if(window.localStorage.token == undefined){
                window.sessionStorage.buyProductMark = "hqj";
                window.location.href = "ready.html";
            }else{
                window.sessionStorage.certificationSign = "buyHqjCertification";
                window.sessionStorage.productsType = "活期金购买";
                $.ajax({
                    url: 'http://47.74.133.222:1111/authQuery',
                    type: "GET",
                    headers: {
                        "token": window.localStorage.token
                    },
                    data: {
                        "phone": window.localStorage.phoneNumber
                    },
                    success: function (res) {
                        //console.log(res);
                        if (res.code == -1) {
                            window.sessionStorage.buyProductType = "buyHqjMark";
                            window.location.href = "unbindbuyHQJ.html";
                        } else if (res.code == -2) {
                            $(".popup").show().text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -3) {
                            $(".popup").show().text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -4) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else {
                            window.location.href = "buyHqj.html";
                        }
                    },
                    error: function (res) {
                        //console.log(res);
                    }
                });
            }
        }else if(window.sessionStorage.buyProductMark == "buyWzj60Btn"){
            if(window.localStorage.token == undefined){
                window.sessionStorage.buyProductMark = "wzj60";
                window.location.href = "ready.html";
            }else {
                window.sessionStorage.certificationSign = "buyWzj60Certification";
                window.sessionStorage.productsType = "购买稳赚金60天";
                window.sessionStorage.wzjName = "稳赚金60天";
                window.sessionStorage.wzjNianHuaRate = "8%";
                window.sessionStorage.period = "60";
                window.sessionStorage.rate = "8";
                $.ajax({
                    url: 'http://47.74.133.222:1111/authQuery',
                    type: "GET",
                    headers: {
                        "token": window.localStorage.token
                    },
                    data: {
                        "phone": window.localStorage.phoneNumber
                    },
                    success: function (res) {
                        //console.log(res);
                        if (res.code == -1) {
                            window.sessionStorage.buyProductType = "buyWzj60Mark";
                            window.location.href = "unbindbuyWZJ.html";
                        } else if (res.code == -2) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -3) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -4) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else {
                            window.location.href = "buyWzj.html";
                        }
                    },
                    error: function (res) {
                        //console.log(res);
                    }
                });
            }
        }else if(window.sessionStorage.buyProductMark == "buyWzj90Btn"){
            if(window.localStorage.token == undefined){
                window.sessionStorage.buyProductMark = "wzj90";
                window.location.href = "ready.html";
            }else {
                window.sessionStorage.certificationSign = "buyWzj90Certification";
                window.sessionStorage.productsType = "购买稳赚金90天";
                window.sessionStorage.wzjName = "稳赚金90天";
                window.sessionStorage.wzjNianHuaRate = "10%";
                window.sessionStorage.period = "90";
                window.sessionStorage.rate = "10";
                $.ajax({
                    url: 'http://47.74.133.222:1111/authQuery',
                    type: "GET",
                    headers: {
                        "token": window.localStorage.token
                    },
                    data: {
                        "phone": window.localStorage.phoneNumber
                    },
                    success: function (res) {
                        //console.log(res);
                        if (res.code == -1) {
                            window.sessionStorage.buyProductType = "buyWzj90Mark";
                            window.location.href = "unbindbuyWZJ.html";
                        } else if (res.code == -2) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -3) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -4) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else {
                            window.location.href = "buyWzj.html";
                        }
                    },
                    error: function (res) {
                        //console.log(res);
                    }
                });
            }
        }else if(window.sessionStorage.buyProductMark == "buyWzj180Btn"){
            if(window.localStorage.token == undefined){
                window.sessionStorage.buyProductMark = "wzj180";
                window.location.href = "ready.html";
            }else {
                window.sessionStorage.certificationSign = "buyWzj180Certification";
                window.sessionStorage.productsType = "购买稳赚金180天";
                window.sessionStorage.wzjName = "稳赚金180天";
                window.sessionStorage.wzjNianHuaRate = "12%";
                window.sessionStorage.period = "180";
                window.sessionStorage.rate = "12";
                $.ajax({
                    url: 'http://47.74.133.222:1111/authQuery',
                    type: "GET",
                    headers: {
                        "token": window.localStorage.token
                    },
                    data: {
                        "phone": window.localStorage.phoneNumber
                    },
                    success: function (res) {
                        //console.log(res);
                        if (res.code == -1) {
                            window.sessionStorage.buyProductType = "buyWzj180Mark";
                            window.location.href = "unbindbuyWZJ.html";
                        } else if (res.code == -2) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -3) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -4) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else {
                            window.location.href = "buyWzj.html";
                        }
                    },
                    error: function (res) {
                        //console.log(res);
                    }
                });
            }
        }else if(window.sessionStorage.buyProductMark == "buyWzj360Btn"){
            if(window.localStorage.token == undefined){
                window.sessionStorage.buyProductMark = "wzj360";
                window.location.href = "ready.html";
            }else {
                window.sessionStorage.certificationSign = "buyWzj360Certification";
                window.sessionStorage.productsType = "购买稳赚金360天";
                window.sessionStorage.wzjName = "稳赚金360天";
                window.sessionStorage.wzjNianHuaRate = "14%";
                window.sessionStorage.period = "360";
                window.sessionStorage.rate = "14";
                $.ajax({
                    url: 'http://47.74.133.222:1111/authQuery',
                    type: "GET",
                    headers: {
                        "token": window.localStorage.token
                    },
                    data: {
                        "phone": window.localStorage.phoneNumber
                    },
                    success: function (res) {
                        //console.log(res);
                        if (res.code == -1) {
                            window.sessionStorage.buyProductType = "buyWzj360Mark";
                            window.location.href = "unbindbuyWZJ.html";
                        } else if (res.code == -2) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -3) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else if (res.code == -4) {
                            $(".popup").show();
                            $(".popup").text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                        } else {
                            window.location.href = "buyWzj.html";
                        }
                    },
                    error: function (res) {
                        //console.log(res);
                    }
                });
            }
        }else if(window.sessionStorage.buyProductMark == "buyJsj"){
            alert("金生金");
        }else if(window.sessionStorage.buyProductMark == "buyQdj"){
            alert("钱袋金");
        }
    });
    //购买稳赚金
    setTimeout('$(".loading").css("display","none")',1000);
    $(".productBtn ").on('click',function(){
        $(this).addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
        $("body").scrollTop(0);
    });

    //默认展示稳赚金60
    if(window.sessionStorage.buyProductMark == "assetsWzj60Btn" || window.sessionStorage.buyProductMark == "wzj60Btn") {
        $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
        window.sessionStorage.buyProductMark = "buyWzj60Btn";
        var mySwiper = new Swiper('#swiper-container4', {
            initialSlide: 0,
            autoHeight: true,
            nested: true,
            resistanceRatio: 0,
            onSlideChangeStart: function (swiper) {
                $("body").scrollTop(0);
                if (swiper.activeIndex == 0) {
                    //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");
                } else if (swiper.activeIndex == 1) {
                    //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");
                } else if (swiper.activeIndex == 2) {
                    //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");
                } else if (swiper.activeIndex == 3) {
                    //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");
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
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings();
                }
                else if(swiper.activeIndex == 2){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings();
                }else if(swiper.activeIndex == 3){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings();
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
    }
    //默认展示稳赚金90
    if(window.sessionStorage.buyProductMark == "wzj90") {
        $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
        window.sessionStorage.buyProductMark = "buyWzj90Btn";
        var mySwiper = new Swiper('#swiper-container4', {
            initialSlide: 1,
            autoHeight: true,
            nested: true,
            resistanceRatio: 0,
            onSlideChangeStart: function (swiper) {
                $("body").scrollTop(0);
                if (swiper.activeIndex == 0) {
                    //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");
                } else if (swiper.activeIndex == 1) {
                    //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");
                } else if (swiper.activeIndex == 2) {
                    //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");
                } else if (swiper.activeIndex == 3) {
                    //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");
                }
                // swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
        var mySwiper2 = new Swiper('#swiper-container2',{
            watchSlidesProgress : true,
            watchSlidesVisibility : true,
            allowSwipeToNext : false,
            allowSwipeToPrev : false,
            slidesPerView : 1,
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
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings();
                }
                else if(swiper.activeIndex == 2){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings();
                }else if(swiper.activeIndex == 3){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings();
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
    }
    //默认展示稳赚金180
    if(window.sessionStorage.buyProductMark == "wzj180") {
        $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
        window.sessionStorage.buyProductMark = "buyWzj90Btn";
        var mySwiper = new Swiper('#swiper-container4', {
            initialSlide: 2,
            autoHeight: true,
            nested: true,
            resistanceRatio: 0,
            onSlideChangeStart: function (swiper) {
                $("body").scrollTop(0);
                if (swiper.activeIndex == 0) {
                    //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");
                } else if (swiper.activeIndex == 1) {
                    //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");
                } else if (swiper.activeIndex == 2) {
                    //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");
                } else if (swiper.activeIndex == 3) {
                    //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");
                }
                // swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
        var mySwiper2 = new Swiper('#swiper-container2',{
            watchSlidesProgress : true,
            watchSlidesVisibility : true,
            allowSwipeToNext : false,
            allowSwipeToPrev : false,
            slidesPerView : 1,
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
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings();
                }
                else if(swiper.activeIndex == 2){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings();
                }else if(swiper.activeIndex == 3){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings();
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
    }
    //默认显示稳赚金360
    if(window.sessionStorage.buyProductMark == "assetsWzj360Btn" || window.sessionStorage.buyProductMark == "wzj360"){
        $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
        window.sessionStorage.buyProductMark = "buyWzj360Btn";
        var mySwiper = new Swiper('#swiper-container4',{
            initialSlide :3,
            autoHeight: true,
            nested:true,
            resistanceRatio: 0,
            onSlideChangeStart:function(swiper){
                $("body").scrollTop(0);
                if(swiper.activeIndex == 0){
                    //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");
                }else if(swiper.activeIndex == 1){
                    //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");
                }else if(swiper.activeIndex == 2){
                    //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");
                }else if(swiper.activeIndex == 3){
                    //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");
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
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings();
                }
                else if(swiper.activeIndex == 2){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings();
                }else if(swiper.activeIndex == 3){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings();
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
    }
    //默认显示活期金
    if(window.sessionStorage.buyProductMark == "hqj"){
        window.sessionStorage.buyProductMark = "buyHqjBtn";
        $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
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
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        //window.sessionStorage.buyProductMark = "buyWzj360Btn";
                        //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj360Btn");

                    }
                    $(".productBtn1").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }
                else if(swiper.activeIndex == 2){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyJsj60Btn");
                    $(".productBtn2").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 3){
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyQdj60Btn");
                    $(".productBtn3").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
            }
        });
    }
    //    默认显示活期金
    if(window.sessionStorage.buyProductMark == "assetsHqj"){
        window.sessionStorage.buyProductMark = "buyHqjBtn";
        $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
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
                    //$(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyHqjBtn");
                    $(".productBtn0").addClass("bottomColor footBtnOrange").siblings().removeClass("bottomColor footBtnOrange");
                }else if(swiper.activeIndex == 1){
                    if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金60天"){
                        //window.sessionStorage.buyProductMark = "buyWzj60Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj60Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金90天"){
                        //window.sessionStorage.buyProductMark = "buyWzj90Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj90Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金180天"){
                        //window.sessionStorage.buyProductMark = "buyWzj180Btn";
                        $(".iWantbuyBtn").attr('class'," ").addClass("iWantbuyBtn buyWzj180Btn");

                    }else if($(".WZJWrap").find(".swiper-slide-active").find(".productTitleCenter").text()  == "稳赚金360天"){
                        //window.sessionStorage.buyProductMark = "buyWzj360Btn";
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

