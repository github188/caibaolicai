/**
 * Created by hzc on 2017-7-20.
 */
$(function(){
    if(window.sessionStorage.amount == undefined){
        $(".czMoney ").focus();
    }else{
        $(".czMoney ").val(window.sessionStorage.amount);
    }
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
                if(res.result.bank == "交通银行"){

                    $(".bankImgWrap").find("img").attr('src','images/jiaotongbank.png');
                    $(".rechargeExplain").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "中国银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhongguobank.png');
                    $(".rechargeExplain").text("单笔1万" + " " + "单日2万");

                }else if(res.result.bank == "工商银行"){

                    $(".bankImgWrap").find("img").attr('src','images/gongshangbank.png');
                    $(".rechargeExplain").text("单笔1万" + " " + "单日2万");

                }else if(res.result.bank == "建设银行"){

                    $(".bankImgWrap").find("img").attr('src','images/jianshebank.png');
                    $(".rechargeExplain").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "平安银行"){

                    $(".bankImgWrap").find("img").attr('src','images/pinganbank.png');
                    $(".rechargeExplain").text("单笔0.5万" + " " + "单日0.5万");

                }else if(res.result.bank == "中信银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhongxinbank.png');
                    $(".rechargeExplain").text("单笔0.5万" + " " + "单日1万");

                }else if(res.result.bank == "广大银行"){

                    $(".bankImgWrap").find("img").attr('src','images/guangdabank.png');
                    $(".rechargeExplain").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "浦发银行"){

                    $(".bankImgWrap").find("img").attr('src','images/pufabank.png');
                    $(".rechargeExplain").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "兴业银行"){

                    $(".bankImgWrap").find("img").attr('src','images/xingyebank.png');
                    $(".rechargeExplain").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "农业银行"){

                    $(".bankImgWrap").find("img").attr('src','images/nongyebank.png');
                    $(".rechargeExplain").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "邮政银行"){

                    $(".bankImgWrap").find("img").attr('src','images/youzhengbank.png');
                    $(".rechargeExplain").text("单笔5万" + " " + "单日20万");

                }else if(res.result.bank == "招商银行"){

                    $(".bankImgWrap").find("img").attr('src','images/zhaoshangbank.png');
                    $(".rechargeExplain").text("单笔万" + " " + "单日万");

                }else if(res.result.bank == "华夏银行"){

                    $(".bankImgWrap").find("img").attr('src','images/huaxiabank.png');
                    $(".rechargeExplain").text("单笔万" + " " + "单日万");

                }else if(res.result.bank == "广发银行"){

                    $(".bankImgWrap").find("img").attr('src','images/guangfabank.png');
                    $(".rechargeExplain").text("单笔万" + " " + "单日万");

                }else if(res.result.bank == "民生银行"){

                    $(".bankImgWrap").find("img").attr('src','images/minshengbank.png');
                    $(".rechargeExplain").text("单笔万" + " " + "单日万");

                }
            },
            error:function(res){
                console.log(res);
            }
        })
    }
    bindInfoQuery();
    $(".goAuthentication").click(function(){
        window.sessionStorage.orderId = window.localStorage.phoneNumber + Date.parse(new Date());
        window.sessionStorage.certificationSign = "rechargeCertification";
        window.sessionStorage.productsType = "充值";
        window.sessionStorage.amount = $(".czMoney").val();
        if($(".czMoney").val().length == 0){
            $(".popup").show();
            $(".popup").text("请输入充值金额");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else if(parseFloat($(".czMoney").val()) < 100){
            $(".popup").show();
            $(".popup").text("充值金额不得低于100元");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else{
            window.location.href = "certification.html";
        }
    });
    //$(".czMoney").on('input onpropertychange',function(){
    //   if($(".czMoney").val() <= 100){
    //       $(".czMoney").val("100");
    //   }
    //});

    //后台获取授权码
    function getAuthToken(){
        $.ajax({
            url:"http://10.0.92.198:1111/authToken",
            "type":"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    window.sessionStorage.payToken = res.authToken.authToken;
                    console.log(res.authToken.authToken);
                    recharge();//后端充值接口
                }else {
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
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
        var tokenNum = window.sessionStorage.payToken;
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
        var purposeNum = "充值";
        var purposeArr = [];
        purposeArr.push(purposeName,purposeNum);
        var purpose = purposeArr.join("=");
        //金额
        var amountName = 'amount';
        var amountNum = parseFloat($(".bindCzMoney").val());
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
    //预支付接口（再次）.(银生宝)
    function paymentAgain(){
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
                "purpose":"充值",                                             //目的
                "amount":$(".bindCzMoney").val(),                           //金额
                "responseUrl":"http://106.14.165.194:1111/payResult",   //响应地址
                "token":window.sessionStorage.payToken,                  //授权码
                "mac":window.sessionStorage.mac                             //数字签名
            }),
            success:function(res){
                console.log(res);
                if(res.result_code == "0000"){
                    countDown();
                }else{
                    $(".popup").show();
                    $(".popup").text(res.result_msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }

    //后端充值接口
    function recharge(){
        $.ajax({
            url:"http://10.0.92.198:1111/recharge",
            "type":"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "amount":$(".bindCzMoney").val()
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    paymentAgain();
                }else {
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
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
        var tokenNum = window.sessionStorage.payToken;
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
                "token":window.sessionStorage.payToken,          //授权码
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

    $(".bindCzMoney").on('input onpropertychange',function(){
       if(parseFloat($(".bindCzMoney").val()) >=1){//测试用
           $(".confirmBtn").css("background","rgb(242, 182, 67)").removeAttr("disabled");
       }else{
           $(".confirmBtn").css("background","#cccccc").attr("disabled",true);
       }
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
        var tokenNum = window.sessionStorage.payToken;
        var tokenArr = [];
        tokenArr.push(tokenName,tokenNum);
        var token = tokenArr.join("=");

        var payMacArr = [];
        payMacArr.push(accountId,customerId,token,orderId,vericode,key);
        var paymac=payMacArr.join("&");
        console.log(paymac);
        window.sessionStorage.paymac = md5(paymac).toUpperCase();
    }
    //确认支付
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
                "mac":window.sessionStorage.paymac              //数字签名
            }),
            success:function(res){
                console.log(res);
                if(res.result_code == "0000"){
                    if(res.desc == "卡上的余额不足[1000051]"){
                        $(".popup").show();
                        $(".popup").text("卡上余额不足");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',3000);
                        setTimeout('$(".userRechargeNum").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide()',3500);
                    }else{
                        //alert("成功");
                        $(".popup").show();
                        $(".popup").text("交易成功");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',3000);
                        setTimeout('$(".userRechargeNum").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),window.location.href = "asset.html"',3500);
                    }
                }
            },
            error:function(res){
                console.log(res);
            }
        })
    });

    $(".confirmBtn").click(function(){
        window.sessionStorage.orderId = window.localStorage.phoneNumber + new Date().getTime();//订单号
        getAuthToken();//获取授权码
        $(".popupBg").show();
        $(".popupWrap").show();
        $(".userRechargeNum").text("￥" + $(".bindCzMoney").val());
        $(".verificationCodeNum").focus();
        $(".rechargeBank").text(window.sessionStorage.bankName);
        $(".BankCardTailNumber").text( "(" + window.sessionStorage.BankCardTailNumber + ")");
    });
    $(".reset").click(function(){
       $(".czMoney").val("");
        $(".confirmBtn").css("background","#cccccc").attr("disabled",true);
    });
    $(".clossPopup").click(function() {
        $(".popupWrap").hide();
        $(".popupBg").hide();
    })
});