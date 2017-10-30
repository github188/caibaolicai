/**
 * Created by hzc on 2017-8-22.
 */
$(function(){
    if(window.sessionStorage.recordOptionType.indexOf("充值") >= 0 ){
        $.ajax({
            url:"http://47.74.133.222:1111/order",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "type":"0"
            },
            success:function(res){
                console.log(res);
                $(".loaded").hide();
                //$(".createTimeWrap").show();
                $(".yearRate").hide();
                $(".jx").hide();
                $(".cardA").hide();
                $(".cardB").hide();
                $(".createTimeWrap").addClass("borderBottom");
                var creatTime = res.result.createdAt.substr(0,19).replace("T"," ");
                $(".orderState").text(res.result.status);
                $(".detailsType").text(res.result.orderType);
                $(".createTime").text(creatTime);
                $(".oderNum").text(res.result.orderId);
                $(".detailsNum").text(res.result.amount.toFixed(2));
                $(".detailsUnit").text("元");
                $(".payMethodTitle").text("付款方式");
                $(".createTimeTitle").text("创建时间");
                $(".orderName").text("订单号");
                var bankNum = res.result.bankCard.substr(0,3) + "****" + res.result.bankCard.substr(res.result.bankCard.length-4,4);
                $(".payMethod").text("使用("+bankNum+")支付");
                if(res.result.status == "进行中"){
                    var detailsState = "等待入账余额";
                    $(".detailsState").css("color","#33CC00");
                    $(".orderState").css("color","#33CC00");
                }else if(res.result.status == "成功"){
                    var detailsState = "已入账余额";
                    $(".detailsState").css("color","#FFCC66");
                    $(".orderState").css("color","#FFCC66");
                }else{
                    var detailsState = "已退还至支付银行";
                    $(".detailsState").css("color","#FF0000");
                    $(".orderState").css("color","#FF0000");
                }
                $(".detailsState").text(detailsState);
            },
            error:function(res){
                console.log(res);
            }
        });
    }else if(window.sessionStorage.recordOptionType.indexOf("提现") >= 0){
        $.ajax({
            url:"http://47.74.133.222:1111/order",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "type":"1"
            },
            success:function(res){
                console.log(res);
                $(".loaded").hide();
                //$(".createTimeWrap").show();
                $(".createTimeWrap").addClass("borderBottom");
                $(".yearRate").hide();
                $(".jx").hide();
                $(".cardA").hide();
                $(".cardB").hide();
                var creatTime = res.result.createdAt.substr(0,19).replace("T"," ");
                $(".detailsUnit").text("元");
                $(".payMethodTitle").text("付款方式");
                $(".createTimeTitle").text("创建时间");
                $(".orderName").text("订单号");
                $(".detailsType").text(res.result.orderType);
                $(".createTime").text(creatTime);
                $(".oderNum").text(res.result.orderId);
                $(".detailsNum").text(res.result.amount.toFixed(2));
                if(res.result.bankCard == null){
                    $(".payMethod").text(res.result.payWay);
                }else {
                    var bankNum = res.result.bankCard.substr(res.result.bankCard.length-4,4);
                    $(".payMethod").text(res.result.bank + "(" + bankNum +")");
                }
                if(res.result.status == "进行中"){
                    var detailsState = "财务处理中";
                    var status = "待确认";
                    $(".detailsState").css("color","#33CC00");
                    $(".orderState").css("color","#33CC00");
                }else if(res.result.status == "失败"){
                    var detailsState = "已退还至余额";
                    var status = "已失败";
                    $(".detailsState").css("color","#FF0000");
                    $(".orderState").css("color","#FF0000");
                }else{
                    var detailsState = "已到账银行卡";
                    var status = "已完成";
                    $(".detailsState").css("color","#FFCC66");
                    $(".orderState").css("color","#FFCC66");
                }
                $(".detailsState").text(detailsState);
                $(".orderState").text(status);
            },
            error:function(res){
                console.log(res);
            }
        });
    }else if(window.sessionStorage.recordOptionType.indexOf("活期金昨日收益") >= 0){
        $.ajax({
            url:"http://47.74.133.222:1111/order",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "type":"3"
            },
            success:function(res){
                console.log(res);
                var creatTime = res.result.createdAt.substr(0,19).replace("T"," ");
                $(".loaded").hide();
                $(".jx").hide();
                $(".cardA").hide();
                $(".cardB").hide();
                $(".createTimeWrap").addClass("borderBottom");
                $(".yearRate").css("marginTop","10px");
                $(".detailsUnit").text("元");
                $(".orderState").text(res.result.status);
                $(".payMethodTitle").text("到账方式");
                $(".payMethod").text("每日到账活期金资产");
                $(".createTimeTitle").text("创建时间");
                $(".orderName").text("计息时间");
                $(".shouYiLvTitle").text("复合年化收益率");
                $(".shouYiLv").text("6%");
                $(".detailsType").text(res.result.orderType);
                $(".createTime").text(creatTime);
                $(".oderNum").text(res.result.jxtime);
                $(".detailsNum").text(res.result.amount.toFixed(2));
                if(res.result.status == "进行中"){
                    var detailsState = "等待入账活期金资产";
                    $(".detailsState").css("color","#33CC00");
                    $(".orderState").css("color","#33CC00");
                }else if(res.result.status == "已完成"){
                    var detailsState = "已入账活期金资产";
                    $(".detailsState").css("color","#FFCC66");
                    $(".orderState").css("color","#FFCC66");
                }else{
                    var detailsState = "入账活期金资产失败";
                    $(".detailsState").css("color","#FF0000");
                    $(".orderState").css("color","#FF0000");
                }
                $(".detailsState").text(detailsState);
            },
            error:function(res){
                console.log(res);
            }
        });
    }else if(window.sessionStorage.recordOptionType.indexOf("活期金买入") >=0){
        $.ajax({
            url:"http://47.74.133.222:1111/order",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "type":"2"
            },
            success:function(res){
                console.log(res);
                $(".loaded").hide();
                $(".cardA").hide();
                $(".cardB").hide();
                $(".createTimeWrap").addClass("borderBottom");
                $(".shouYiLvTitle").text("复合年化收益率");
                $(".shouYiLv").text("6%");
                var creatTime = res.result.createdAt.substr(0,19).replace("T"," ");
                $(".detailsUnit").text("元");
                $(".jxTimeTitle").text("计息时间");
                $(".jxTime").text(res.result.jxtime);
                $(".payMethodTitle").text("付款方式");
                $(".createTimeTitle").text("创建时间");
                $(".orderName").text("订单号");
                $(".detailsType").text(res.result.orderType);
                $(".createTime").text(creatTime);
                $(".oderNum").text(res.result.orderId);
                $(".detailsNum").text(res.result.amount.toFixed(2));
                //var bankNum = res.result.bankCard.substr(res.result.bankCard.length-4,4);
                if(res.result.bankCard == null){
                    $(".payMethod").text(res.result.payWay);
                }else {
                    var bankNum = res.result.bankCard.substr(res.result.bankCard.length-4,4);
                    $(".payMethod").text(res.result.payWay + "(" + bankNum +")");
                }
                //$(".payMethod").text(res.result.payWay);
                if(res.result.status == "进行中"){
                    var detailsState = "财务处理中";
                    var status = "待确认";
                    $(".detailsState").css("color","#33CC00");
                    $(".orderState").css("color","#33CC00");
                }else if(res.result.status == "失败"){
                    var detailsState = "已退还至余额";
                    var status = "已失败";
                    $(".detailsState").css("color","#FF0000");
                    $(".orderState").css("color","#FF0000");
                }else{
                    var detailsState = "已到账银行卡";
                    var status = "已完成";
                    $(".detailsState").css("color","#FFCC66");
                    $(".orderState").css("color","#FFCC66");
                }
                $(".detailsState").text(detailsState);
                $(".orderState").text(status);
            },
            error:function(res){
                console.log(res);
            }
        });
    }else if(window.sessionStorage.recordOptionType.indexOf("活期金卖出") >=0){
        $.ajax({
            url:"http://47.74.133.222:1111/order",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "type":"2"
            },
            success:function(res){
                console.log(res);
                var creatTime = res.result.createdAt.substr(0,19).replace("T"," ");
                $(".loaded").hide();
                $(".jx").hide();
                $(".createTimeWrap").addClass("borderBottom");
                $(".cardA").hide();
                $(".cardB").hide();
                $(".yearRate").css("marginTop","10px");
                $(".detailsUnit").text("元");
                $(".orderState").text(res.result.status);
                $(".payMethodTitle").text("计息时间");
                $(".payMethod").text(res.result.jxtime);
                $(".createTimeTitle").text("卖出时间");
                $(".orderName").text("订单号");
                $(".shouYiLvTitle").text("复合年化收益率");
                $(".shouYiLv").text("6%");
                $(".detailsType").text(res.result.orderType);
                $(".createTime").text(creatTime);
                $(".oderNum").text(res.result.orderId);
                $(".detailsNum").text(res.result.amount.toFixed(2));
                if(res.result.status == "进行中"){
                    var detailsState = "等待入账活期金资产";
                    $(".detailsState").css("color","#33CC00");
                    $(".orderState").css("color","#33CC00");
                }else if(res.result.status == "已完成"){
                    var detailsState = "已入账活期金资产";
                    $(".detailsState").css("color","#FFCC66");
                    $(".orderState").css("color","#FFCC66");
                }else{
                    var detailsState = "入账活期金资产失败";
                    $(".detailsState").css("color","#FF0000");
                    $(".orderState").css("color","#FF0000");
                }
                $(".detailsState").text(detailsState);
            },
            error:function(res){
                console.log(res);
            }
        });
    }else if(window.sessionStorage.recordOptionType.indexOf("稳赚金买入") >=0){
        $.ajax({
            url:"http://47.74.133.222:1111/order",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "type":"2"
            },
            success:function(res){
                console.log(res);
                $(".loaded").hide();
                $(".createTimeWrap").addClass("borderBottom");
                var creatTime = res.result.createdAt.substr(0,19).replace("T"," ");
                var expireTime = res.result.expireAt.substr(0,19).replace("T"," ");
                $(".detailsUnit").text("元");
                $(".payMethodTitle").text("付款方式");
                $(".createTimeTitle").text("创建时间");
                $(".orderName").text("订单号");
                $(".shouYiLvTitle").text("到期时间");
                $(".shouYiLv").text(expireTime);
                $(".jxTimeTitle").text("预期年化收益率");
                $(".jxTime").text(res.result.rate + "%");
                $(".aaa1").text("预期收益");
                $(".aaa2").text(res.result.willEarnMoney);
                $(".bbb1").text("计息时间");
                $(".bbb2").text(res.result.jxtime);
                $(".cardB").addClass("borderTop");
                $(".detailsType").text(res.result.orderType);
                $(".createTime").text(creatTime);
                $(".oderNum").text(res.result.orderId);
                $(".detailsNum").text(res.result.amount.toFixed(2));
                if(res.result.bankCard == null){
                    $(".payMethod").text(res.result.payWay);
                }else {
                    var bankNum = res.result.bankCard.substr(res.result.bankCard.length-4,4);
                    $(".payMethod").text(res.result.payWay + "(" + bankNum +")");
                }
                if(res.result.status == "进行中"){
                    var detailsState = "等待入账稳赚金资产";
                    var status = "待确认";
                    $(".detailsState").css("color","#33CC00");
                    $(".orderState").css("color","#33CC00");
                }else if(res.result.status == "失败"){
                    var detailsState = "已退还至支付账号";
                    var status = "已失败";
                    $(".detailsState").css("color","#FF0000");
                    $(".orderState").css("color","#FF0000");
                }else{
                    var detailsState = "已入账稳赚金资产";
                    var status = "已完成";
                    $(".detailsState").css("color","#FFCC66");
                    $(".orderState").css("color","#FFCC66");
                }
                $(".detailsState").text(detailsState);
                $(".orderState").text(status);
            },
            error:function(res){
                console.log(res);
            }
        });
    }else if(window.sessionStorage.recordOptionType.indexOf("稳赚金360天到期") >=0){
        $.ajax({
            url:"http://47.74.133.222:1111/order",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "type":"2"
            },
            success:function(res){
                console.log(res);
                $(".loaded").hide();

            },
            error:function(res){
                console.log(res);
            }
        });
    }
});