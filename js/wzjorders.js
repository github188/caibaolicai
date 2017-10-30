/**
 * Created by hzc on 2017-7-19.
 */
$(function(){
    FastClick.attach(document.body);
    $(".buyWZJMoney").val(window.sessionStorage.setPayPwdMoney);//(0.5版本添加)
    function queryAsset(){
        $.ajax({
            url:"http://106.14.165.194:1111/assetQuery",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                window.sessionStorage.accountBalance = parseFloat(res.asset.balance).toFixed(2);
            },
            error:function(res){
                //console.log(res);
            }
        });
    }
    queryAsset();
    $(".buyWZJMoney").focus();
    $(".goBack").click(function(){
        if(window.sessionStorage.buyProductMark == "buyHqjBtn"){
            window.sessionStorage.buyProductMark  = "hqj";
            setTimeout('window.location.href = "productCollection.html"',100);
        }else if(window.sessionStorage.buyProductMark == "buyWzj60Btn"){
            window.sessionStorage.buyProductMark = "assetsWzj60Btn";
            setTimeout('window.location.href = "productCollection.html"',100);
        }else if(window.sessionStorage.buyProductMark == "buyWzj90Btn"){
            window.sessionStorage.buyProductMark = "wzj90";
            setTimeout('window.location.href = "productCollection.html"',100);
        }else if(window.sessionStorage.buyProductMark == "buyWzj180Btn"){
            window.sessionStorage.buyProductMark = "wzj180";
            setTimeout('window.location.href = "productCollection.html"',100);
        }else if(window.sessionStorage.buyProductMark == "buyWzj360Btn"){
            window.sessionStorage.buyProductMark = "wzj360";
            setTimeout('window.location.href = "productCollection.html"',100);
        }
    });

    function clearNoNum(obj) {
        //先把非数字的都替换掉，除了数字和.
        obj.value = obj.value.replace(/[^\d.]/g,"");
        //保证只有出现一个.而没有多个.
        obj.value = obj.value.replace(/\.{2,}/g,".");
        //必须保证第一个为数字而不是.
        obj.value = obj.value.replace(/^\./g,"");
        //保证.只出现一次，而不能出现两次以上
        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        //只能输入两个小数
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    }
    $(".buyWZJMoney").keyup(function(){
        clearNoNum(this);
    });
    $(".buyWZJMoney").blur(function(){
        clearNoNum(this);
    });
    function inputBuyIntLength(){
        if($(".inputBuyInt").val().length > 0){
            $(".placeOrderBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else {
            $(".placeOrderBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    }
    inputBuyIntLength();
    function getAssset(){
        $.ajax({
            url:"http://47.74.133.222:1111/assetQuery",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                window.sessionStorage.userBalance = parseFloat(res.asset.balance).toFixed(2);   //账户余额
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    getAssset();
    function buyType(){
        if(window.sessionStorage.buyType = "buyUseMoney"){
            //认证查询
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
                    if(res.code == -1 ){
                        $(".buyWZJMoney").val(window.sessionStorage.amount);
                        if(window.sessionStorage.convertIntoNum == "undefined"){
                            $(".convertIntoNum").text("0.00");
                        }else{
                            //$(".convertIntoNum ").text("0.00克");
                            $(".convertIntoNum").text(window.sessionStorage.convertIntoNum);
                        }
                        if(window.sessionStorage.expectProfitNum == "undefined"){
                            $(".expectProfitNum").text("0.00");
                        }else{
                            //$(".expectProfitNum").text("0.00元");
                            $(".expectProfitNum").text(window.sessionStorage.expectProfitNum);
                        }
                    }else if(res.code == 0){
                        $(".convertIntoNum ").text("0.00");
                        $(".expectProfitNum").text("0.00");
                        $(".buyWZJMoney").val("").focus();
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            });

        }else if(window.sessionStorage.buyType = "buyUseGrammage"){
            //认证查询
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
                    if(res.code == -1 ){
                        $(".buyWZJMoney").val(window.sessionStorage.amount);
                        if(window.sessionStorage.convertIntoNum == "undefined"){
                            $(".convertIntoNum ").text("0.00");
                        }else{
                            $(".convertIntoNum ").text(window.sessionStorage.convertIntoNum);
                        }
                        if(window.sessionStorage.expectProfitNum == "undefined"){
                            $(".expectProfitNum").text("0.00");
                        }else{
                            $(".expectProfitNum").text(window.sessionStorage.expectProfitNum);
                        }
                    }else if(res.code == 0){
                        $(".convertIntoNum ").text("0.00");
                        $(".expectProfitNum").text("0.00");
                        $(".buyWZJMoney").val("").focus();
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            });
            $(".inputBuyMethodTitle").text("克数");
            $(".changeBuyMethodBtn").text("切换为按金额购买");
            $(".convertIntoName ").text("折合人民币（元）");

        }
    }
    buyType();

    $("#goBack").click(function(){
        if(window.sessionStorage.buyProductMark == "buyHqjBtn"){
            window.sessionStorage.buyProductMark = "buyHqjBtn";
            window.location.href = "productCollection.html";
        }else if(window.sessionStorage.buyProductMark == "buyWzj60Btn"){
            window.sessionStorage.buyProductMark = "wzj60Btn";
            window.location.href = "productCollection.html";
        }else if(window.sessionStorage.buyProductMark == "buyWzj90Btn"){
            window.sessionStorage.buyProductMark = "wzj90";
            window.location.href = "productCollection.html";
        } else if(window.sessionStorage.buyProductMark == "buyWzj180Btn"){
            window.sessionStorage.buyProductMark = "wzj180";
            window.location.href = "productCollection.html";
        } else if(window.sessionStorage.buyProductMark == "buyWzj360Btn"){
            window.sessionStorage.buyProductMark = "wzj360";
            window.location.href = "productCollection.html";
        } else{
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
        url:"http://47.74.133.222:8000/history-price",
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
            url:'http://47.74.133.222:1111/bankCards',
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                if(res.result[0].IDcard !== null){
                    $(".banksName").text(res.result[0].bank);
                    var bankCard = res.result[0].bankCard.substr(0,4) + "****" + res.result[0].bankCard.substr(res.result[0].bankCard.length-3,3);
                    $(".banksNum").text(bankCard);
                    window.sessionStorage.bindBankPhone = res.result[0].bankPhone;//绑定的手机号
                    window.sessionStorage.bindBankName = res.result[0].name;//用户姓名
                    window.sessionStorage.IDcard = res.result[0].IDcard;//身份证号
                    window.sessionStorage.bankCardNum = res.result[0].bankCard;//银行卡号
                    window.sessionStorage.authToken = res.result[0].authToken;//授权码
                    window.sessionStorage.bankName = res.result[0].bank;//银行名称
                    window.sessionStorage.bankPhone = res.result[0].bankPhone.substr(0,3) + "****" + res.result[0].bankPhone.substr(res.result[0].bankPhone.length-4,4);
                    window.sessionStorage.BankCardTailNumber = res.result[0].bankCard.substr(res.result[0].bankCard.length-4,4);
                    $(".accountBalance").text(window.sessionStorage.accountBalance);
                }
                if($.trim(res.result[0].bank) == "交通银行"){

                    $(".bankImgWrap").find("img").attr('src','images/jiaotongbank.png');

                }else if($.trim(res.result[0].bank) == "中国银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhongguobank.png');

                }else if($.trim(res.result[0].bank) == "工商银行"){

                    $(".bankImgWrap").find("img").attr('src','images/gongshangbank.png');

                }else if($.trim(res.result[0].bank) == "建设银行"){

                    $(".bankImgWrap").find("img").attr('src','images/jianshebank.png');

                }else if($.trim(res.result[0].bank) == "平安银行"){

                    $(".bankImgWrap").find("img").attr('src','images/pinganbank.png');

                }else if($.trim(res.result[0].bank) == "中信银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhongxinbank.png');

                }else if($.trim(res.result[0].bank) == "广大银行"){

                    $(".bankImgWrap").find("img").attr('src','images/guangdabank.png');

                }else if($.trim(res.result[0].bank) == "浦发银行"){

                    $(".bankImgWrap").find("img").attr('src','images/pufabank.png');

                }else if($.trim(res.result[0].bank) == "兴业银行"){

                    $(".bankImgWrap").find("img").attr('src','images/xingyebank.png');

                }else if($.trim(res.result[0].bank) == "农业银行"){

                    $(".bankImgWrap").find("img").attr('src','images/nongyebank.png');

                }else if($.trim(res.result[0].bank) == "邮政银行"){

                    $(".bankImgWrap").find("img").attr('src','images/youzhengbank.png');

                }else if($.trim(res.result[0].bank) == "招商银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhaoshangbank.png');

                }else if($.trim(res.result[0].bank) == "华夏银行"){

                    $(".bankImgWrap").find("img").attr('src','images/huaxiabank.png');

                }else if($.trim(res.result[0].bank) == "广发银行"){

                    $(".bankImgWrap").find("img").attr('src','images/guangfabank.png');

                }else if($.trim(res.result[0].bank) == "民生银行"){

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
        var responseUrl = "responseUrl=http://47.74.133.222:1111/payResult";
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
        window.sessionStorage.mac = md5(mac).toUpperCase();
    }
    //预支付接口（再次）
    function prePaymentAgain(){
        getMac();
        $.ajax({
            url:"http://47.74.133.222:3333/authPay-front/authPay/pay",
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
                "responseUrl":"http://47.74.133.222:1111/payResult",   //响应地址
                "token":window.sessionStorage.authToken,                  //授权码
                "mac":window.sessionStorage.mac                             //数字签名
            }),
            success:function(res){
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
        window.sessionStorage.messagemac = md5(messagemac).toUpperCase();
    }
    //重发验证码
    $(".sendAgin").click(function(){
        messageMac();
        $.ajax({
            url:"http://47.74.133.222:3333/authPay-front/authPay/sendVercode",
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
        window.sessionStorage.paymac = md5(paymac).toUpperCase();
    }
    //确认支付(在线)
    $(".rechargeConfirmBtn").click(function(){
        $(".loaded").show();
        payMac();
        $.ajax({
            url:"http://47.74.133.222:3333/authPay-front/authPay/confirm",
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
                if(res.result_code == "0000"){
                    $(".loaded").hide();
                    if(res.desc == "卡上的余额不足[1000051]"){
                        $(".popup").show().text("卡上余额不足");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',3000);
                        setTimeout('$(".userRechargeNum").text(""),$(".phoneName").text(""),$(".rechargeBankName").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide()',3500);
                    }else{
                        //alert("成功");
                        $(".popup").show().text("交易成功");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',3000);
                        setTimeout('$(".userRechargeNum").text(""),$(".phoneName").text(""),$(".rechargeBankName").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),window.location.href = "wzjAsset.html"',3500);
                    }
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    //$(".payPwdVal").on('input porpertychange',function(){
    //    if($(".payPwdVal").val().length >= 6){
    //        $(".rechargeConfirmBalanceBtn").css("background","rgb(242, 182, 67)").removeAttr("disabled");
    //    }else {
    //        $(".rechargeConfirmBalanceBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
    //    }
    //});
    //稳赚金买入
    function buyWzjBalance(){
        $.ajax({
            url:"http://47.74.133.222:1111/wenzhuanGold/buyIn",
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
                "payWay":"0",
                "bankCard":window.sessionStorage.bankCardNum
            },
            success:function(res){
                $(".loaded").hide();
                window.sessionStorage.setPayPwdMoney = "";//0.5版本
                if(res.code == 0){
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                    setTimeout('$(".userRechargeNum").text(""),$(".payPwdVal").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),$(".buyWZJMoney").text(""),window.location.href = "wzjAsset.html"',2500);
                }else{
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                    setTimeout('$(".userRechargeNum").text(""),$(".payPwdVal").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),$(".buyWZJMoney").text(""),$(".sellPopup").hide(),$("#ipt").find("li").text("")',2500);
                }
            },
            error:function(res){
                console.log(res);
            }
        });

    }
    //确认支付（余额）
    //$(".rechargeConfirmBalanceBtn").click(function(){
    function rechargeConfirmBalance(){
        var paypwd = sha256_digest($("#ipt").val());
        $.ajax({
            url:"http://47.74.133.222:1111/paypwd-check",
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
                if(res.code == 0){
                    buyWzjBalance();
                }else{
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    //});
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
    //判断是否设置支付密码（0.5版本添加）
    function judgeSetPayPwd(){
        $.ajax({
            url:"http://47.74.133.222:1111/paypwd",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                if(res.code == -1){
                    window.sessionStorage.setPayPwd = "wzj";
                    window.sessionStorage.setPayPwdMoney =$(".buyWZJMoney").val();
                    window.location.href = "setpaypwd.html";
                }else if(res.code == 0){
                    $(".sellTypeMoney").text("￥" + $(".waitPayMoneyBank").text());
                    $(".popupBg").css("display","block");
                    $(".sellPopup").css("display","block");
                    $("#ipt").focus();
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    $(".submitOrder").click(function(){
        window.sessionStorage.amount = parseFloat($(".buyWZJMoney").val()).toFixed(2);//购买金额
        window.sessionStorage.orderId = window.localStorage.phoneNumber + new Date().getTime();//订单号
        if($(".choosePayBank ").hasClass("payActive")){
            if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
                if(parseFloat($(".buyWZJMoney").val()) < 50){
                    $(".popup").show().text("购买金额不得小于50元");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else {
                    buy();
                }
            }else {
                if (parseFloat($(".convertIntoNum").text()) < 50) {
                    $(".popup").show().text("购买金额不得小于50元");
                    setTimeout('$(".popup").hide(),$(".popup").text("")', 2000);
                }else {
                    buy();
                }
            }
            function buy(){
                $.ajax({
                    url:"http://47.74.133.222:1111/wenzhuanGold/buyIn",
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
                        "payWay":"1",
                        "bankCard": window.sessionStorage.bankCardNum
                    },
                    success:function(res){
                        if(res.code == 0){
                            $(".popupBg").show();
                            $(".popupWrap").show();
                            $(".verificationCodeNum").focus();
                            $(".userRechargeNum").text("￥" + $('.waitPayMoneyBank').text());
                            $(".phoneName").text(window.sessionStorage.bankPhone);
                            $(".rechargeBankName").text(window.sessionStorage.bankName);
                            $(".BankCardTailNumber").text( '('+ window.sessionStorage.BankCardTailNumber + ')');
                            prePaymentAgain();
                        }else{
                            $(".popup").show().text(res.msg);
                            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                        }
                    },
                    error:function(res){
                        console.log(res);
                    }
                });
            }
        }else{
            if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
                if(parseFloat($(".buyWZJMoney").val()) < 50){
                    $(".popup").show().text("购买金额不得小于50元");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else {
                    judgeSetPayPwd();
                }
            }else{
                if(parseFloat($(".convertIntoNum").text()) < 50){
                    $(".popup").show().text("购买金额不得小于50元");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }else {
                    judgeSetPayPwd();
                }
            }
        }
    });
    $(".closePopup").click(function(){
        $('#ipt').val("");
        $(".inputPwdWrap").find("li").text("");
        $(".popupBg").css("display","none");
        $(".sellPopup").css("display","none");
        $(".sellTypeMoney").text("");
    });

    //监听金额输入框
    $(".inputBuyInt").on('input porpertychange',function(){
        if($(".buyWZJMoney").val().length >0){
            $(".placeOrderBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else{
            $(".placeOrderBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
        if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
            if(parseFloat($(".buyWZJMoney").val())>parseFloat($(".accountBalance").text())){
                $(".yeWaitPay").css("color","#ccc");
                $(".yeWaitPayMoney").css("color","#ccc");
                $(".icon-yuezhifu").css("color","#ccc");
                $(".yuETitle").css("color","#ccc");
                $(".choosePayBalance").unbind("click").removeClass("payActive");
                $(".choosePayBank").addClass("payActive");
            }else{
                $(".yeWaitPay").css("color","#000");
                $(".yeWaitPayMoney").css("color","#f6a34e");
                $(".icon-yuezhifu").css("color","#000");
                $(".yuETitle").css("color","#000");
                $(".choosePayBalance").click(function(){
                    $(".choosePayBank").removeClass("payActive");
                    $(".choosePayBalance").addClass("payActive");
                });
            }
            var convertGramNum = (parseFloat($(".inputBuyInt").val())/parseFloat($(".headTopRight").find("span").text())).toFixed(2);
            $(".convertIntoNum ").text(convertGramNum );
            if($(".wzjNianHuaRate").text() == "8%"){
                var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 60 * 0.08)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }else if($(".wzjNianHuaRate").text() == "10%"){
                var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 90 * 0.1)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }
            else if($(".wzjNianHuaRate").text() == "12%"){
                var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 180 * 0.12)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }else if($(".wzjNianHuaRate").text() == "14%"){
                var expectedRevenue = (parseFloat($(".inputBuyInt").val()) * 360 * 0.14)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }
            if($(".inputBuyInt").val().length == 0){
                $(".waitPayMoney").text("0.00");
            }else{
                $(".waitPayNum").text(Math.floor(parseFloat($(".inputBuyInt").val()) * 100) / 100 );
            }
        }else if($(".changeBuyMethodBtn").text() == "切换为按金额购买"){
            $(".buyWZJMoney").attr("maxlength","7");
            var convertMoney = (parseFloat($(".inputBuyInt").val())*parseFloat($(".headTopRight").find("span").text())).toFixed(2);
            $(".convertIntoNum").text(convertMoney);
            $(".waitPayNum").text(convertMoney);
            //if($(".waitPayNum").text() == 'NaN'){
            //    $(".waitPayNum").text("0.00");
            //}
            if($(".wzjNianHuaRate").text() == "8%"){
                var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 60 * 0.08)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }else if($(".wzjNianHuaRate").text() == "10%"){
                var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 90 * 0.1)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }
            else if($(".wzjNianHuaRate").text() == "12%"){
                var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 180 * 0.12)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }else if($(".wzjNianHuaRate").text() == "14%"){
                var expectedRevenue = (parseFloat($(".convertIntoNum ").text()) * 360 * 0.14)/360;
                if($(".inputBuyInt").val().length == 0){
                    $(".expectProfitNum").text("0.00");
                    $(".convertIntoNum").text("0.00");
                    $(".waitPayMoney").text("0.00");
                }else{
                    $(".expectProfitNum").text(expectedRevenue.toFixed(2));
                }
            }
            if(parseFloat($(".convertIntoNum").text()) > parseFloat($(".accountBalance").text())){
                $(".yeWaitPay").css("color","#ccc");
                $(".yeWaitPayMoney").css("color","#ccc");
                $(".icon-yuezhifu").css("color","#ccc");
                $(".yuETitle").css("color","#ccc");
                $(".choosePayBalance").unbind("click").removeClass("payActive");
                $(".choosePayBank").addClass("payActive");
            }else{
                $(".yeWaitPay").css("color","#000");
                $(".yeWaitPayMoney").css("color","#f6a34e");
                $(".icon-yuezhifu").css("color","#000");
                $(".yuETitle").css("color","#000");
                $(".choosePayBalance").click(function(){
                    $(".choosePayBank").removeClass("payActive");
                    $(".choosePayBalance").addClass("payActive");
                });
            }
        }

    });
    //点击切换按钮
    $(".changeBuyMethodBtn").click(function(){
        $(".inputBuyInt").val("").focus();
        $(".waitPayNum").text("元");
        if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
            $(".inputBuyMethodTitle").text("克数");
            $(".inputBuyInt").attr('placeholder','请输入购买克数');
            $(".convertIntoName ").text("折合人民币（元）");
            $(".changeBuyMethodBtn").text("切换为按金额购买");
            $(".convertIntoTitle").text("折合人民币");
            $(".convertIntoNum ").text("0.00");
            $(".expectProfitNum").text("0.00");
        }else{
            $(".inputBuyMethodTitle").text("金额");
            $(".inputBuyInt").attr('placeholder','50元起购');
            $(".convertIntoName ").text("折合黄金（克）");
            $(".changeBuyMethodBtn").text("切换为按克数购买");
            $(".convertIntoTitle").text("折合黄金");
            $(".convertIntoNum ").text("0.00");
            $(".expectProfitNum").text("0.00");
        }
    });
    //去认证
    $(".goAuthentication").click(function(){
        if($(".wzjNianHuaRate").text() == "8%"){
            window.sessionStorage.certificationSign = "buyWzj60Certification";
        }else if($(".wzjNianHuaRate").text() == "10%"){
            window.sessionStorage.certificationSign = "buyWzj90Certification";
        }else if($(".wzjNianHuaRate").text() == "12%"){
            window.sessionStorage.certificationSign = "buyWzj180Certification";
        }else if($(".wzjNianHuaRate").text() == "14%"){
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
            if($(".changeBuyMethodBtn").text() == "切换为按克数购买"){
                if(parseFloat($(".inputBuyInt").val()) < 50){
                    $(".popup").show().text("购买金额不足50元");
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
    $(".verificationCodeNum").on('input',function(){
        if($(".verificationCodeNum").val().length == 6){
            $(".rechargeConfirmBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else{
            $(".rechargeConfirmBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
    //支付密码
    $('#ipt').focus(function(){
        $(".sellPopup").css({
            'top':'1.366666667rem'
        });
    });
    $('#ipt').on('input',function (e){
        var numLen = 6;
        var pw = $('#ipt').val();
        var list = $('li');
        for(var i=0; i<=numLen; i++){
            if(pw[i]){
                $(list[i]).text('*');
            }else{
                $(list[i]).text('');
            }
        }
        if(pw.length == 6){
            $('#ipt').blur();
            $(".hideKeyboard").focus();
            $(".loaded").show();
            checkedPwd();
        }
    });
    //支付密码验证
    function checkedPwd(){
        var checkedPayPwd = sha256_digest($("#ipt").val());
        $.ajax({
            url:"http://47.74.133.222:1111/paypwd-check",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "paypwd":checkedPayPwd
            },
            success:function(res){
                if(res.code == 0){
                    rechargeConfirmBalance();
                }else {
                    $(".loaded").hide();
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$("#ipt").val("").focus(),$(".inputPwdWrap").find("li").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
});
