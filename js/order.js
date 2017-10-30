/**
 * Created by hzc on 2017-7-6.
 */
$(function(){
    FastClick.attach(document.body);
    $(".buyMoney").val(window.sessionStorage.setPayPwdMoney);//(0.5版本添加)
    function queryAsset(){
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
                window.sessionStorage.accountBalance = parseFloat(res.asset.balance).toFixed(2);
            },
            error:function(res){
                //console.log(res);
            }
        });
    }
    queryAsset();
    //    认证查询
    function authenticationQuery(){
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
                    $(".buyMoney").focus().val(window.sessionStorage.amount);
                    $(".waitPayNum").text(window.sessionStorage.amount);
                } else if(res.code == 0){
                    $(".buyMoney").focus().val("");
                    $(".waitPayNum").text("元");
                }
            },
            error: function (res) {
                //console.log(res);
            }
        });
    }
    authenticationQuery();
    //实名绑卡信息查询
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
                //console.log(res);
            }
        })
    }
    bindInfoQuery();
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
    $(".buyMoney").keyup(function(){
        clearNoNum(this);
    }).blur(function(){
        clearNoNum(this);
    });
    //$(".buyMoney").blur(function(){
    //    clearNoNum(this);
    //});

    if($(".buyMoney").val().length > 0){
        $(".submitOrder").css("background","rgb(242,182,67)").removeAttr("disabled");
    }
    //$(".buyMoney");
    $(".buyMoney").on('input',function(){
        calculateExpectProfit();
        //if($(".buyMoney").val() == ""){
        //    $(".waitPayMoney").text(" ");
        //}else{
        if($(".buyMoney").val() == ""){
            $(".waitPayMoney").text(" ");
        }else{
            $(".waitPayMoney").text(Math.floor(parseFloat($(".buyMoney").val()) * 100) / 100);
        }
        //}
        if(parseFloat(window.sessionStorage.accountBalance) < $(".buyMoney").val()){
            $(".yeWaitPay").css("color","#ccc");
            $(".yeWaitPayMoney").css("color","#ccc");
            $(".icon-yuezhifu").css("color","#ccc");
            $(".yuETitle").css("color","#ccc");
            $(".choosePayBalance").removeClass("payActive").off("click");
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
        //if(parseFloat($(".buyMoney").val()) < 5){
        //    $(".buyMoney").val(5);
        //}
        if($(".buyMoney").val().length > 0){
            $(".submitOrder").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else{
            $(".submitOrder").css("background","rgb(181,181,181)").attr("disabled","disabled");
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
    //计息起始日
    function interestDay(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");
        var year = parseInt($.trim(arr[0]));
        var month = parseInt($.trim(arr[1]));
        var day = parseInt($.trim(arr[2]));
        if(month < 10){
            var month = "0"+ month;
        }
        if(day<10){
            var day = '0' + day;
        }
        var interestTime = year + "-" + month + "-" + day ;
        $(".interestDay").text(interestTime);
        //alert(interestTime)
    }
    interestDay(1); //当前时间添加1天
    //默认到期日
    function expireDay(day){
        var dayTime=day*24*60*60*1000; //参数天数的时间戳
        var nowTime=new Date().getTime(); //当天的时间戳
        var t = new Date(nowTime+dayTime).toLocaleString(); //把两个时间戳转换成普通时间
        var timeStr = t.substr(0,9);
        var arr=timeStr.split("/");
        var year = parseInt($.trim(arr[0]));
        var month = parseInt($.trim(arr[1]));
        var day = parseInt($.trim(arr[2]));
        //时间选择
        var start_time_picker = new mui.DtPicker({"type":"date","beginYear":year,"beginMonth":month,"beginDay":day, "endYear":2050});
        $("#useData").on("click", function(){
            if($(".buyMoney").val() == ""){
                $(".popup").show().text("请输入购买金额") ;
                setTimeout('$(".popup").hide(),$(".popup").text()',1500);
            }else{
                setTimeout(function(){
                    start_time_picker.show(function(items){
                        $("#useData").text(items.text);
                    });
                },200);
            }
        });
        //alert(day);
        var month = String(month);
        var day = String(day);
        if(month < 10){
            var month = "0" + month;
        }
        if(day < 10){
            var day = "0" + day;
        }
        var interestTime = year + "-" + month + "-" + day ;
        $(".expireDay").text(interestTime);
        //alert(interestTime);
    }
    expireDay(2); //当前时间添加2天
    //获取金价
    $.ajax({
        url:"http://47.74.133.222:8000/history-price",
        type:"GET",
        success:function(res){
            var goldPrice = JSON.parse(res);
            $(".headTopRight span").text(goldPrice.week[0].price);
        },
        error:function(res){
            //console.log(res);
        }
    });
    $(".headTopRight span").text(window.sessionStorage.goldPrice);
    //监听input的变化
    //$(".buyMoney").on('input porpertychange',function(){
    //
    ////});
    //$('.waitPayMoney').on('DOMNodeInserted',function(){
    //    if($(".waitPayMoney").text() == "NaN"){
    //        $(".waitPayMoney").text("元");
    //    }else {
    //        //if($(".buyMoney").val() == ""){
    //        //    //$(".waitPayMoney").text(" ");
    //        //}else{
    //        //    if($(".buyMoney").val() == ""){
    //        //        $(".waitPayMoney").text(" ");
    //        //    }else{
    //                $(".waitPayMoney").text(Math.floor(parseFloat($(".buyMoney").val()) * 100) / 100);
    //            }
    //        //}
    //    }
    //});
    //计算预期收益
    function calculateExpectProfit(){
        var principal = parseFloat($(".buyMoney").val());//本金
        var arr = $(".hqjNianHuaRate").text().split("%");
        var rateIncrease = 1+ parseFloat(arr[0]) * 0.01;//1 + 利息
        var powerNum = parseFloat(parseInt(window.sessionStorage.iDays) / 360);
        var expectedReturnMoney =(parseFloat(principal * Math.pow(rateIncrease,powerNum)) - principal).toFixed(2);
        if($(".expectedReturnMoney").text() == "NaN"){
            $(".expectedReturnMoney").text("0.00");
        }else {
            $(".expectedReturnMoney").text(expectedReturnMoney);
        }
    }
    function  btnCount_Click(){
        newDay  =  $(".interestDay").text();
        futureDay  =  $(".expireDay").text();
        DateDiff(newDay,futureDay);
        //alert("第一个日期；"+s1+"/n第二个日期："+s2+"/n相差"+DateDiff(s1,s2)+"天")
    }
    btnCount_Click();
    //计算天数差的函数，通用
    function  DateDiff(sDate1,sDate2){    //sDate1和sDate2是2006-12-18格式
        var  aDate,  oDate1,  oDate2,  iDays;
        aDate  =  sDate1.split("-");
        oDate1  =  new  Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]);   //转换为12-18-2006格式
        aDate  =  sDate2.split("-");
        oDate2  =  new  Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]);
        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
        window.sessionStorage.iDays = parseInt(iDays);
    }
    //监听 expireDay  div内容变化
    $(".expireDay").on('DOMNodeInserted',function(e){
        //alert('element now contains: ' + $(e.target).text());
        btnCount_Click();
        calculateExpectProfit();
    });
    //监听expectedReturnMoney内容变化
    $(".expectedReturnMoney").on('DOMNodeInserted',function(){
        if($(".expectedReturnMoney").text() == "NaN"){
            $(".expectedReturnMoney").text("0.00");
        }
    });
    //    去认证
    $(".goAuthentication").click(function(){
        if($(".buyMoney").val() < 5){
            $(".popup").show().text("请输入购买金额") ;
            setTimeout('$(".popup").text(),$(".popup").hide()',1500);
        }else {
            window.sessionStorage.amount = parseFloat($(".buyMoney").val()).toFixed(2);//购买金额
            window.sessionStorage.orderId = window.localStorage.phoneNumber + new Date().getTime();//订单号
            window.location.href = "certification.html";
        }
    });
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
                //console.log(res);
            }
        });
    }
    getAssset();

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
                //console.log(res);
                countDown();
            },
            error:function(res){
                //console.log(res);
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
    if(parseFloat(window.sessionStorage.accountBalance) < $(".buyMoney").val()){
        $(".noFinds").text("余额不足");
        $(".choosePayBalance").off("click");
    }
    $(".closePopup").click(function(){
        $('#ipt').val("");
        $(".inputPwdWrap").find("span").text("");
        $(".sellTypeMoney").text("");
        $(".popupBg").css("display","none");
        $(".sellPopup").css("display","none");

    });
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
                console.log(res);
                if(res.code == -1){
                    window.sessionStorage.setPayPwd = "hqj";
                    window.sessionStorage.setPayPwdMoney =$(".buyHqjMoney").val();
                    window.location.href = "setpaypwd.html";
                }else if(res.code == 0){
                    $(".popupBg").css("display","block");
                    $(".sellPopup").css("display","block");
                    $(".sellTypeMoney").text("￥" + $(".buyMoney").val());
                    $("#ipt").focus();
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    $(".submitOrder").click(function(){
        if(parseFloat($(".buyMoney").val()) < 5){
            $(".popup").show().text("购买金额小于5元");
            setTimeout('$(".popup").hide().text("")',1500);
        }else{
            window.sessionStorage.amount = parseFloat($(".buyMoney").val()).toFixed(2);//购买金额
            window.sessionStorage.orderId = window.localStorage.phoneNumber + new Date().getTime();//订单号
            if($(".choosePayBank").hasClass("payActive")){
                $.ajax({
                    url:"http://47.74.133.222:1111/currentGold/buyIn",
                    type:"POST",
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded ",
                        "token":window.localStorage.token
                    },
                    data:{
                        "phone":window.localStorage.phoneNumber,
                        "orderId":window.sessionStorage.orderId,
                        "amount":window.sessionStorage.amount,
                        "payWay":"1",
                        "bankCard":window.sessionStorage.bankCardNum
                    },
                    success:function(res){
                        if(res.code == 0){
                            $(".popupBg").show();
                            $(".popupWrap").show();
                            $(".verificationCodeNum").focus();
                            $(".userRechargeNum").text("￥" + $('.buyMoney').val());
                            $(".phoneName").text(window.sessionStorage.bankPhone);
                            $(".rechargeBankName").text(window.sessionStorage.bankName);
                            $(".BankCardTailNumber").text( '('+ window.sessionStorage.BankCardTailNumber + ')');
                            prePaymentAgain();
                        }else{
                            $(".popup").show().text(res.msg) ;
                            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                        }
                    },
                    error:function(res){
                        //console.log(res);
                    }
                });
            }else{
                judgeSetPayPwd();
            }
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
        var list = $('.pwdContainer span');
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
                //console.log(res);
                if(res.code == 0){
                    rechargeConfirmBalance();
                }else {
                    $(".loaded").hide();
                    $(".popup").show().text(res.msg) ;
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$("#ipt").val("").focus(),$(".inputPwdWrap").find("span").text("")',2000);
                }
            },
            error:function(res){
                //console.log(res);
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
        var tokenNum = window.sessionStorage.authToken;
        var tokenArr = [];
        tokenArr.push(tokenName,tokenNum);
        var token = tokenArr.join("=");

        var messageMacArr = [];
        messageMacArr.push(accountId,customerId,token,orderId,phoneNo,key);
        var messagemac=messageMacArr.join("&");
        //console.log(messagemac);
        window.sessionStorage.messagemac = md5(messagemac).toUpperCase();
    }
    //重发验证码
    $(".sendAgin").click(function(){
        $(".sendAgin").attr("disabled","disabled");
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
                //console.log(res);
            },
            error:function(res){
                //console.log(res);
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
        //console.log(paymac);
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
                //console.log(res);
                if(res.result_code == "0000"){
                    $(".loaded").hide();
                    if(res.desc == "卡上的余额不足[1000051]"){
                        $(".popup").show().text("卡上余额不足") ;
                        setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                        setTimeout('$(".userRechargeNum").text(""),$(".phoneName").text(""),$(".rechargeBankName").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide()',2100);
                    }else{
                        $(".popup").show().text("交易成功") ;
                        setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                        setTimeout('$(".userRechargeNum").text(""),$(".phoneName").text(""),$(".rechargeBankName").text(""),$(".verificationCodeNum").val(""),$(".BankCardTailNumber").text( ""),clearInterval(timer2), $(".sendAgin").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),window.location.href = "hqjAsset.html"',2100);
                    }
                }
            },
            error:function(res){
                //console.log(res);
            }
        });
    });
    //活期金买入接口（银行卡支付）
    /*function buyHqjBalanceYuE(){
     $.ajax({
     url:"http://47.74.133.222:1111/currentGold/buyIn",
     type:"POST",
     headers:{
     "Content-Type":"application/x-www-form-urlencoded ",
     "token":window.localStorage.token
     },
     data:{
     "phone":window.localStorage.phoneNumber,
     "orderId":window.sessionStorage.orderId,
     "amount":window.sessionStorage.amount,
     "payWay":"1"
     },
     success:function(res){
     console.log(res);
     if(res.code == 0){

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
     }*/
    $(".payPwdVal").on('input porpertychange',function(){
        if($(".payPwdVal").val().length >= 6){
            $(".rechargeConfirmBalanceBtn").css("background","rgb(242, 182, 67)").removeAttr("disabled");
        }else {
            $(".rechargeConfirmBalanceBtn").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
    //活期金买入（余额支付）
    function buyHqjBalance(){
        $.ajax({
            url:"http://47.74.133.222:1111/currentGold/buyIn",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":window.sessionStorage.orderId,
                "amount":window.sessionStorage.amount,
                "payWay":"0"
            },
            success:function(res){
                //console.log(res);
                window.sessionStorage.setPayPwdMoney = "";//0.5版本
                if(res.code == 0){
                    $(".loaded").hide();
                    $(".popup").show().text(res.msg) ;
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                    setTimeout('$(".userRechargeNum").text(""),$(".payPwdVal").val(""),$(".popupBg").hide(),$(".popupWrap").hide(),$(".buyMoney").text(""),window.location.href = "hqjAsset.html"',2500);
                }else{
                    $(".loaded").hide();
                    $(".popup").show().text(res.msg) ;
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                //console.log(res);
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
                //console.log(res);
                if(res.code == 0){
                    buyHqjBalance()
                }else{
                    $(".popup").show().text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                //console.log(res);
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
});