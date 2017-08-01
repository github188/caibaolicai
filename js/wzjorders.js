/**
 * Created by hzc on 2017-7-19.
 */
$(function(){
    if(window.sessionStorage.buyType = "buyUseMoney"){
        $(".buyWZJMoney").val(window.sessionStorage.amount);
        $(".convertIntoNum ").text(window.sessionStorage.convertIntoNum);
        $(".expectProfitNum").text(window.sessionStorage.expectProfitNum);
    }else if(window.sessionStorage.buyType = "buyUseGrammage"){
        $(".inputBuyMethodTitle").text("克数");
        $(".changeBuyMethodBtn").text("切换为按金额购买");
        $(".convertIntoName ").text("折合人民币（元）");
        $(".buyWZJMoney").val(window.sessionStorage.amount);
        $(".convertIntoNum ").text(window.sessionStorage.convertIntoNum);
        $(".expectProfitNum").text(window.sessionStorage.expectProfitNum);
    }
    $("#goBack").click(function(){
        if(window.sessionStorage.buyProductMark == "buyHqjBtn" ||　window.sessionStorage.buyProductMark == "buyWzj60Btn" || window.sessionStorage.buyProductMark == "buyWzj90Btn" || window.sessionStorage.buyProductMark == "buyWzj180Btn" || window.sessionStorage.buyProductMark == "buyWzj360Btn"){
            window.sessionStorage.buyProductMark = "buyHqjBtn";
            window.location.href = "productCollection.html";
        }else{
            window.history.back(-1);
        }
    });
    $(".choosePayBank").click(function(){
        $(".choosePayBalance").removeClass("payActive");
        $(".choosePayBank").addClass("payActive");
    });
    $(".choosePayBalance").click(function(){
        $(".choosePayBank").removeClass("payActive");
        $(".choosePayBalance").addClass("payActive");
    });
    $(".wzjName").text(window.sessionStorage.wzjName);
    $(".wzjNianHuaRate").text(window.sessionStorage.wzjNianHuaRate);
    //获取金价
    $.ajax({
        url:"http://106.14.165.194:8000/history-price",
        type:"GET",
        success:function(res){
            var goldPrice = JSON.parse(res);
            $(".headTopRight span").text(goldPrice.week[0].price);
            window.sessionStorage.goldPriceBuy = goldPrice.week[0].price;
        },
        error:function(res){
            console.log(res);
        }
    });
    //    实名绑卡信息查询
    function bindInfoQuery(){
        $.ajax({
            url:'http://10.0.92.198:1111/bindInfo',
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                console.log(res);
                if(res.result.IDcard !== null){
                    $(".banksName").text(res.result.bank);
                    var bankCard = res.result.bankCard.substr(0,4) + "****" + res.result.bankCard.substr(res.result.bankCard.length-3,3);
                    console.log(bankCard);
                    $(".banksNum").text(bankCard);
                    window.sessionStorage.bindBankPhone = res.result.bankPhone;//绑定的手机号
                    window.sessionStorage.bindBankName = res.result.name;//用户姓名
                    window.sessionStorage.IDcard = res.result.IDcard;//身份证号
                    window.sessionStorage.bankCardNum = res.result.bankCard;//银行卡号
                    window.sessionStorage.authToken = res.result.authToken;//授权码
                    window.sessionStorage.bankName = res.result.bank;//银行名称
                    window.sessionStorage.bankPhone = res.result.bankPhone.substr(0,3) + "****" + res.result.bankPhone.substr(res.result.bankPhone.length-4,4);
                    window.sessionStorage.BankCardTailNumber = res.result.bankCard.substr(res.result.bankCard.length-4,4);
                    $(".accountBalance").text(window.sessionStorage.accountBalance);
                }
                if(res.result.bank == "交通银行"){

                    $(".bankImgWrap").find("img").attr('src','images/jiaotongbank.png');

                }else if(res.result.bank == "中国银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhongguobank.png');

                }else if(res.result.bank == "工商银行"){

                    $(".bankImgWrap").find("img").attr('src','images/gongshangbank.png');

                }else if(res.result.bank == "建设银行"){

                    $(".bankImgWrap").find("img").attr('src','images/jianshebank.png');

                }else if(res.result.bank == "平安银行"){

                    $(".bankImgWrap").find("img").attr('src','images/pinganbank.png');

                }else if(res.result.bank == "中信银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhongxinbank.png');

                }else if(res.result.bank == "广大银行"){

                    $(".bankImgWrap").find("img").attr('src','images/guangdabank.png');

                }else if(res.result.bank == "浦发银行"){

                    $(".bankImgWrap").find("img").attr('src','images/pufabank.png');

                }else if(res.result.bank == "兴业银行"){

                    $(".bankImgWrap").find("img").attr('src','images/xingyebank.png');

                }else if(res.result.bank == "农业银行"){

                    $(".bankImgWrap").find("img").attr('src','images/nongyebank.png');

                }else if(res.result.bank == "邮政银行"){

                    $(".bankImgWrap").find("img").attr('src','images/youzhengbank.png');

                }else if(res.result.bank == "招商银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhaoshangbank.png');

                }else if(res.result.bank == "华夏银行"){

                    $(".bankImgWrap").find("img").attr('src','images/huaxiabank.png');

                }else if(res.result.bank == "广发银行"){

                    $(".bankImgWrap").find("img").attr('src','images/guangfabank.png');

                }else if(res.result.bank == "民生银行"){

                    $(".bankImgWrap").find("img").attr('src','images/minshengbank.png');

                }
            },
            error:function(res){
                console.log(res);
            }
        })
    }
    bindInfoQuery();
//获取数字签名
    function getMac(){
        //用户编号
        var customerIdName = 'customerId';
        var customerIdNum = window.localStorage.phoneNumber;
        var customerIdArr = [];
        customerIdArr.push(customerIdName,customerIdNum);
        var customerId = customerIdArr.join("=");
        //授权码
        var tokenName = 'token';
        var tokenNum = window.sessionStorage.authToken;
        var tokenArr = [];
        tokenArr.push(tokenName,tokenNum);
        var token = tokenArr.join("=");
        //订单号
        var orderIdName = 'orderId';
        var orderIdNum = window.sessionStorage.orderId;
        var orderIdArr = [];
        orderIdArr.push(orderIdName,orderIdNum);
        var orderId = orderIdArr.join("=");
        //目的
        var purposeName = 'purpose';
        var purposeNum = window.sessionStorage.productsType;
        var purposeArr = [];
        purposeArr.push(purposeName,purposeNum);
        var purpose = purposeArr.join("=");
        //金额
        var amountName = 'amount';
        var amountNum = window.sessionStorage.amount;
        var amountArr = [];
        amountArr.push(amountName,amountNum);
        var amount = amountArr.join("=");

        var accountId = "accountId=2120170306142335001";
        //var customerId = "customerId=window.localStorage.phoneNumber";
        var payType = "payType=1";
        var responseUrl = "responseUrl=http://106.14.165.194:1111/payResult";
        //var name = 'name=$(".accountHolderName").val()';
        //var phoneNo = 'phoneNo=$(".accountHolderPhoneNum").val()';
        //var cardNo ='cardNo=$(".personBankNum").val()';
        //var idCardNo = 'idCardNo=$("personIdCardNum").val()';
        //var orderId = 'orderId=window.sessionStorage.orderId';
        //var purpose = 'purpose=window.sessionStorage.productsType';
        //var amount = 'amount=window.sessionStorage.amount';
        var key = 'key=caibao1314';
        var macArr = [];
        macArr.push(accountId,customerId,payType,token,orderId,purpose,amount,responseUrl,key);
        var mac=macArr.join("&");
        console.log(mac);
        window.sessionStorage.mac = md5(mac).toUpperCase();
        console.log(window.sessionStorage.mac);
    }
    //预支付接口（再次）
    function prePaymentAgain(){
        getMac();
        $.ajax({
            url:"http://106.14.165.194:3333/authPay-front/authPay/pay",
            type:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            data:JSON.stringify({
                "accountId":"2120170306142335001",                           //商户编号
                "customerId":window.localStorage.phoneNumber,              //用户编号
                "orderId":window.sessionStorage.orderId,                   //订单号
                "payType":"1",                                                 //支付类型
                "purpose":window.sessionStorage.productsType,             //目的
                "amount":window.sessionStorage.amount,                     //金额
                "responseUrl":"http://106.14.165.194:1111/payResult",   //响应地址
                "token":window.sessionStorage.authToken,                  //授权码
                "mac":window.sessionStorage.mac                             //数字签名
            }),
            success:function(res){
                console.log(res);
                countDown();
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    //倒计时
    function countDown(){
        //alert("111");
        var timer=setTimeout(function(){//按验证按钮后60秒按钮禁用
            clearInterval(timer2);
            $(".sendAgin").val("重发").css({
                //"border":"1px solid #DDD",
                //"background":"#fff",
                "color":"#000"
            }).removeAttr("disabled");
            //$(".sendAgin").val("重新发").css({
            //    //"border":"1px solid #DDD",
            //    //"background":"#fff",
            //    "color":"#000"
            //}).removeAttr("disabled");
        },60000);
        var i = 60;
        $(".sendAgin").text(i+'s').css({
            //"border":"1px solid #DDD",
            //"background":"#e1e1e1",
            "color":"#000"
        }).attr("disabled","disabled");
        timer2=setInterval(function(){
            i--;
            $(".sendAgin").val(i+'s');
            //$(".sendAgin").val(i+'s');
        },1000);
    }
    //短信数字签名
    function messageMac(){
        //用户编号
        var customerIdName = 'customerId';
        var customerIdNum = window.localStorage.phoneNumber;
        var customerIdArr = [];
        customerIdArr.push(customerIdName,customerIdNum);
        var customerId = customerIdArr.join("=");
        //商户编号
        var accountId = "accountId=2120170306142335001";
        //key
        var key = 'key=caibao1314';
        //手机号
        var phoneNoName = 'phoneNo';
        var phoneNoNum = window.sessionStorage.bindBankPhone;
        var phoneNoArr = [];
        phoneNoArr.push(phoneNoName,phoneNoNum);
        var phoneNo = phoneNoArr.join("=");
        //订单号
        var orderIdName = 'orderId';
        var orderIdNum = window.sessionStorage.orderId;
        var orderIdArr = [];
        orderIdArr.push(orderIdName,orderIdNum);
        var orderId = orderIdArr.join("=");
        //授权码
        var tokenName = 'token';
        var tokenNum = window.sessionStorage.authToken;
        var tokenArr = [];
        tokenArr.push(tokenName,tokenNum);
        var token = tokenArr.join("=");

        var messageMacArr = [];
        messageMacArr.push(accountId,customerId,token,orderId,phoneNo,key);
        var messagemac=messageMacArr.join("&");
        console.log(messagemac);
        window.sessionStorage.messagemac = md5(messagemac).toUpperCase();
    }
    //重发验证码
    $(".sendAgin").click(function(){
        messageMac();
        $.ajax({
            url:"http://106.14.165.194:3333/authPay-front/authPay/sendVercode",
            type:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            data:JSON.stringify({
                "accountId":"2120170306142335001",                 //商户编号
                "customerId":window.localStorage.phoneNumber,    //用户编号
                "orderId":window.sessionStorage.orderId,         //订单号
                "phoneNo":window.sessionStorage.bindBankPhone,  //绑定的手机号
                "token":window.sessionStorage.authToken,          //授权码
                "mac":window.sessionStorage.messagemac          //数字签名
            }),
            success:function(res){
                countDown();
                console.log(res);
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    //确认支付数字签名
    function payMac(){
        //用户编号
        var customerIdName = 'customerId';
        var customerIdNum = window.localStorage.phoneNumber;
        var customerIdArr = [];
        customerIdArr.push(customerIdName,customerIdNum);
        var customerId = customerIdArr.join("=");
        //商户编号
        var accountId = "accountId=2120170306142335001";
        //key
        var key = 'key=caibao1314';
        //验证码
        var vericodeName = 'vericode';
        var vericodeNum = $(".verificationCodeNum").val();
        var vericodeArr = [];
        vericodeArr.push(vericodeName,vericodeNum);
        var vericode = vericodeArr.join("=");
        //订单号
        var orderIdName = 'orderId';
        var orderIdNum = window.sessionStorage.orderId;
        var orderIdArr = [];
        orderIdArr.push(orderIdName,orderIdNum);
        var orderId = orderIdArr.join("=");
        //授权码
        var tokenName = 'token';
        var tokenNum = window.sessionStorage.authToken;
        var tokenArr = [];
        tokenArr.push(tokenName,tokenNum);
        var token = tokenArr.join("=");

        var payMacArr = [];
        payMacArr.push(accountId,customerId,token,orderId,vericode,key);
        var paymac=payMacArr.join("&");
        console.log(paymac);
        window.sessionStorage.paymac = md5(paymac).toUpperCase();
    }
    //确认支付(在线)
    $(".rechargeConfirmBtn").click(function(){
        payMac();
        $.ajax({
            url:"http://106.14.165.194:3333/authPay-front/authPay/confirm",
            type:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            data:JSON.stringify({
                "accountId":"2120170306142335001",                 //商户编号
                "customerId":window.localStorage.phoneNumber,    //用户编号
                "orderId":window.sessionStorage.orderId,         //订单号
                "vericode":$(".verificationCodeNum").val(),      //验证码
                "token":window.sessionStorage.authToken,        //授权码
                "mac":window.sessionStorage.paymac               //数字签名
            }),
            success:function(res){
                console.log(res);
                if(res.result_code == "0000"){
                    if(res.desc == "卡上的余额不足[1000051]"){
                        $(".popup").show();
                        $(".popup").text("卡上余额不足");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',3000);
                        setTimeout('$(".userRechargeNum").text(""),$(".phoneName").text(""),$(".rechargeBankName").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide()',3500);
                    }else{
                        //alert("成功");
                        $(".popup").show();
                        $(".popup").text("交易成功");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',3000);
                        setTimeout('$(".userRechargeNum").text(""),$(".phoneName").text(""),$(".rechargeBankName").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide()',3500);
                    }
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    //活期金买入接口（余额）
    //function buyWzjBalanceYuE(){
    //    $.ajax({
    //        url:"http://10.0.92.198:1111/wenzhuanGold/buyIn",
    //        type:"POST",
    //        headers:{
    //            "Content-Type":"application/x-www-form-urlencoded ",
    //            "token":window.localStorage.token
    //        },
    //        data:{
    //            "phone":window.localStorage.phoneNumber,
    //            "orderId":window.sessionStorage.orderId,
    //            "amount":window.sessionStorage.amount,
    //            "period":window.sessionStorage.period,
    //            "rate":window.sessionStorage.rate,
    //            ".goldPriceBuy":window.sessionStorage.goldPriceBuy,
    //            "payWay":"0"
    //        },
    //        success:function(res){
    //            if(res.code == 0){
    //                prePayment();
    //            }else{
    //                $(".popup").show();
    //                $(".popup").text(res.msg);
    //                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
    //            }
    //            console.log(res);
    //        },
    //        error:function(res){
    //            console.log(res);
    //        }
    //    });
        //$.ajax({
        //    url:"http://10.0.92.198:1111/currentGold/buyIn",
        //    type:"POST",
        //    headers:{
        //        "Content-Type":"application/x-www-form-urlencoded ",
        //        "token":window.localStorage.token
        //    },
        //    data:{
        //        "phone":window.localStorage.phoneNumber,
        //        "orderId":window.sessionStorage.orderId,
        //        "amount":window.sessionStorage.amount,
        //        "payWay":"1"
        //    },
        //    success:function(res){
        //        console.log(res);
        //        if(res.code == 0){
        //
        //        }else{
        //            $(".popup").show();
        //            $(".popup").text(res.msg);
        //            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //        }
        //    },
        //    error:function(res){
        //        console.log(res);
        //    }
        //});
    //}
    $(".payPwdVal").on('input porpertychange',function(){
        if($(".payPwdVal").val().length >= 6){
            $(".rechargeConfirmBalanceBtn").css("background","rgb(242, 182, 67)").removeAttr("disabled");
        }else {
            $(".rechargeConfirmBalanceBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
    //稳赚金买入（银行卡）
    function buyWzjBalance(){
        $.ajax({
            url:"http://10.0.92.198:1111/wenzhuanGold/buyIn",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "amount":window.sessionStorage.amount,
                "period":window.sessionStorage.period,
                "rate":window.sessionStorage.rate,
                "goldPriceBuy":window.sessionStorage.goldPriceBuy,
                "payWay":"0"
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                    setTimeout('$(".userRechargeNum").text(""),$(".payPwdVal").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),$(".buyWZJMoney").text(""),window.location.href = "hqjAsset.html"',2500);
                }else{
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
                //if(res.code == 0){
                //    prePayment();
                //}else{
                //    $(".popup").show();
                //    $(".popup").text(res.msg);
                //    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                //}
                //console.log(res);
            },
            error:function(res){
                console.log(res);
            }
        });
        //$.ajax({
        //    url:"http://10.0.92.198:1111/currentGold/buyIn",
        //    type:"POST",
        //    headers:{
        //        "Content-Type":"application/x-www-form-urlencoded ",
        //        "token":window.localStorage.token
        //    },
        //    data:{
        //        "phone":window.localStorage.phoneNumber,
        //        "orderId":window.sessionStorage.orderId,
        //        "amount":window.sessionStorage.amount,
        //        "payWay":"1"
        //    },
        //    success:function(res){
        //        console.log(res);
        //        if(res.code == 0){
        //            $(".popup").show();
        //            $(".popup").text(res.msg);
        //            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //            setTimeout('$(".userRechargeNum").text(""),$(".payPwdVal").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),$(".buyWZJMoney").text(""),window.location.href = "hqjAsset.html"',2500);
        //        }else{
        //            $(".popup").show();
        //            $(".popup").text(res.msg);
        //            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //        }
        //    },
        //    error:function(res){
        //        console.log(res);
        //    }
        //});
    }
    //确认支付（余额）
    $(".rechargeConfirmBalanceBtn").click(function(){
        var paypwd = sha256_digest($(".payPwdVal").val());
        $.ajax({
            url:"http://10.0.92.198:1111/paypwd-check",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "paypwd":paypwd
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    buyWzjBalance();
                }else{
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    $(".closePopupWrap").click(function(){
        clearInterval(timer2);
        $(".userRechargeNum").text("");
        $(".phoneName").text("");
        $(".sendAgin").val("");
        $(".popupBg").hide();
        $(".popupWrap").hide();
    });
    $(".closePopupWrapBalance").click(function(){
        $(".userRechargeNum").text("");
        $(".payPwdVal").val("");
        $(".popupBg").hide();
        $(".popupWrapBalance ").hide();
    });
    if(parseFloat(window.sessionStorage.accountBalance) < $(".buyWZJMoney").val()){
        $(".noFinds").text("余额不足");
        $(".choosePayBalance").off("click");
    }
    $(".submitOrder").click(function(){
        window.sessionStorage.amount = parseFloat($(".buyWZJMoney").val()).toFixed(2);//购买金额
        window.sessionStorage.orderId = window.localStorage.phoneNumber + new Date().getTime();//订单号
        if($(".choosePayBank ").hasClass("payActive")){
            $.ajax({
                url:"http://10.0.92.198:1111/wenzhuanGold/buyIn",
                type:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded ",
                    "token":window.localStorage.token
                },
                data:{
                    "phone":window.localStorage.phoneNumber,
                    "orderId":window.sessionStorage.orderId,
                    "amount":window.sessionStorage.amount,
                    "period":window.sessionStorage.period,
                    "rate":window.sessionStorage.rate,
                    "goldPriceBuy":window.sessionStorage.goldPriceBuy,
                    "payWay":"1"
                },
                success:function(res){
                    console.log(res);
                    if(res.code == 0){
                        $(".popupBg").show();
                        $(".popupWrap").show();
                        $(".verificationCodeNum").focus();
                        $(".userRechargeNum").text("￥" + $('.buyWZJMoney').val());
                        $(".phoneName").text(window.sessionStorage.bankPhone);
                        $(".rechargeBankName").text(window.sessionStorage.bankName);
                        $(".BankCardTailNumber").text( '('+ window.sessionStorage.BankCardTailNumber + ')');
                        prePaymentAgain();
                    }else{
                        $(".popup").show();
                        $(".popup").text(res.msg);
                        setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                    }
                },
                error:function(res){
                    console.log(res);
                }
            });
            //$.ajax({
            //    url:"http://10.0.92.198:1111/currentGold/buyIn",
            //    type:"POST",
            //    headers:{
            //        "Content-Type":"application/x-www-form-urlencoded ",
            //        "token":window.localStorage.token
            //    },
            //    data:{
            //        "phone":window.localStorage.phoneNumber,
            //        "orderId":window.sessionStorage.orderId,
            //        "amount":window.sessionStorage.amount,
            //        "payWay":"1"
            //    },
            //    success:function(res){
            //        console.log(res);
            //        if(res.code == 0){
            //            $(".popupBg").show();
            //            $(".popupWrap").show();
            //            $(".verificationCodeNum").focus();
            //            $(".userRechargeNum").text("￥" + $('.buyWZJMoney').val());
            //            $(".phoneName").text(window.sessionStorage.bankPhone);
            //            $(".rechargeBankName").text(window.sessionStorage.bankName);
            //            $(".BankCardTailNumber").text( '('+ window.sessionStorage.BankCardTailNumber + ')');
            //            prePaymentAgain();
            //        }else{
            //            $(".popup").show();
            //            $(".popup").text(res.msg);
            //            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            //        }
            //    },
            //    error:function(res){
            //        console.log(res);
            //    }
            //});
        }else{
            $(".popupBg").show();
            $(".popupWrapBalance").show();
            $(".payPwdVal").focus();
            $(".userRechargeNum").text("￥" + $('.buyWZJMoney').val());
        }
    });
    $(".buyWZJMoney").on('input',function(){
        if($(".buyWZJMoney").val().length >0){
            $(".placeOrderBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else{
            $(".placeOrderBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
    //监金额输入框
    $(".inputBuyInt").on('input porpertychange',function(){
         if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
             var convertGramNum = (parseFloat($(".inputBuyInt").val())/parseFloat($(".headTopRight").find("span").text())).toFixed(2);
             $(".convertIntoNum ").text(convertGramNum);
             if($(".convertIntoNum ").text() == 'NaN'){
                 $(".convertIntoNum ").text("");
             }
             if($(".wzjNianHuaRate").text() == "6%"){
                 var cycleDay = 60;
                 var rateNum = 0.06;
                 var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 60 * 0.06)/360;
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                 console.log(expectedRevenue)
             }else if($(".wzjNianHuaRate").text() == "7%"){
                 var cycleDay = 90;
                 var rateNum = 0.07;
                 var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 90 * 0.07)/360;
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                 console.log(expectedRevenue)
             }
             else if($(".wzjNianHuaRate").text() == "12%"){
                 var cycleDay = 180;
                 var rateNum = 0.12;
                 var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 180 * 0.12)/360;
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                 console.log(expectedRevenue)
             }else if($(".wzjNianHuaRate").text() == "14%"){
                 var cycleDay = 360;
                 var rateNum = 0.14;
                 var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 360 * 0.14)/360;
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                 console.log(expectedRevenue)
             }
             //$(".expectProfitNum").text(expectedRevenue.toFixed(2));
         }else{
             var convertMoney = (parseFloat($(".inputBuyInt").val())*parseFloat($(".headTopRight").find("span").text())).toFixed(2);
             $(".convertIntoNum ").text(convertMoney);
             if($(".convertIntoNum ").text() == 'NaN'){
                 $(".convertIntoNum ").text("");
             }
             if($(".wzjNianHuaRate").text() == "6%"){
                 var cycleDay = 60;
                 var rateNum = 0.06;
                 var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 60 * 0.06)/360;
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                 console.log(expectedRevenue)
             }else if($(".wzjNianHuaRate").val() == "7%"){
                 var cycleDay = 90;
                 var rateNum = 0.07;
                 var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 90 * 0.07)/360;
                 console.log(expectedRevenue)
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
             }
             else if($(".wzjNianHuaRate").val() == "12%"){
                 var cycleDay = 180;
                 var rateNum = 0.12;
                 var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 180 * 0.12)/360;
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                 console.log(expectedRevenue)
             }else if($(".wzjNianHuaRate").val() == "14%"){
                 var cycleDay = 360;
                 var rateNum = 0.14;
                 var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 360 * 0.14)/360;
                 $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                 console.log(expectedRevenue)
             }
             console.log($(".expectProfitNum").text());
             //var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * cycleDay * rateNum)/360;
             if($(".expectProfitNum").text() == 'NaN'){
                 $(".expectProfitNum").text("");
             }
         }
        $(".waitPayNum").text($(".inputBuyInt").val());
    });
    //点击切换按钮
    $(".changeBuyMethodBtn").click(function(){
        $(".inputBuyInt").val("");
        $(".waitPayNum").text("");
        $(".convertIntoNum ").text("");
        $(".expectProfitNum").text("");
        if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
            $(".inputBuyMethodTitle").text("克数");
            $(".inputBuyInt").attr('placeholder','请输入购买克数');
            $(".convertIntoName ").text("折合人民币（元）");
            $(".changeBuyMethodBtn").text("切换为按金额购买");
        }else{
            $(".inputBuyMethodTitle").text("金额");
            $(".inputBuyInt").attr('placeholder','50元起够');
            $(".convertIntoName ").text("折合黄金（克）");
            $(".changeBuyMethodBtn").text("切换为按克数购买")
        }
    });
    //去认证
    $(".goAuthentication").click(function(){
        if($(".wzjNianHuaRate").val() == "6%"){
            window.sessionStorage.certificationSign = "buyWzj60Certification";
        }else if($(".wzjNianHuaRate").val() == "7%"){
            window.sessionStorage.certificationSign = "buyWzj90Certification";
        }else if($(".wzjNianHuaRate").val() == "12%"){
            window.sessionStorage.certificationSign = "buyWzj180Certification";
        }else if($(".wzjNianHuaRate").val() == "14%"){
            window.sessionStorage.certificationSign = "buyWzj360Certification";
        }
        if($(".inputBuyInt").val().length == 0){
            if($(".changeBuyMethodBtn").text() == "切换为按金额购买"){
                $(".popup").show();
                $(".popup").text("请输入购买克数");
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            }else{
                $(".popup").show();
                $(".popup").text("请输入购买金额");
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            }
        }else{
            window.sessionStorage.orderId = window.localStorage.phoneNumber + Date.parse(new Date());
            console.log(window.sessionStorage.orderId);
            if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
                if(parseFloat($(".inputBuyInt").val()) < 50){
                    $(".popup").show();
                    $(".popup").text("购买金额不足50元");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else {
                    window.sessionStorage.buyType = "buyUseMoney";
                    window.sessionStorage.convertIntoNum = $(".convertIntoNum").text();
                    window.sessionStorage.expectProfitNum = $(".expectProfitNum").text();
                    window.sessionStorage.amount = $(".inputBuyInt").val();
                    window.location.href = "certification.html";
                }
            }else{
                if(parseFloat($(".convertIntoNum").text()) < 50){
                    $(".popup").show();
                    $(".popup").text("购买金额不足50元");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else {
                    window.sessionStorage.buyType = "buyUseGrammage";
                    window.sessionStorage.convertIntoNum = $(".convertIntoNum").text();
                    window.sessionStorage.expectProfitNum = $(".expectProfitNum").text();
                    window.sessionStorage.amount = $(".convertIntoNum").text();
                    window.location.href = "certification.html";
                }
            }
        }
    });
});
