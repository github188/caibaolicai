/**
 * Created by hzc on 2017-7-13.
 */
$(function(){
    $(".personBankNum").focus();
    $(".goChooseBank").click(function(){
        window.location.href = "choosebank.html";
    });
    if(window.sessionStorage.bankName !== undefined){
        $(".goChooseBank").text(window.sessionStorage.bankName);
        $(".bankExplain").text(window.sessionStorage.bankExplain);
    }
    //每隔4个数字空1格
    $('.personBankNum').on('keyup mouseout input', function () {
        var $this = $(this),
            v = $this.val();
        /\S{5}/.test(v) && $this.val(v.replace(/\s/g,'').replace(/(.{4})/g, "$1 "));
    });
    $(".personIdCardNum").on('keyup mouseout input',function(){
        var $this = $(this),
            v = $this.val();
        /\S{5}/.test(v) && $this.val(v.replace(/\s/g,'').replace(/(.{4})/g, "$1 "));
    });
    function whetherInput(){
        if($(".bankExplain").text() == ""){
            $(".popup").show();
            $(".popup").text("请选择开户银行");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else if($(".personBankNum").val() == ""){
            $(".popup").show();
            $(".popup").text("请输入开户卡号");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else if($(".accountHolderName").val()==""){
            $(".popup").show();
            $(".popup").text("请输入开户人姓名");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else if($(".personIdCardNum").val() == ""){
            $(".popup").show();
            $(".popup").text("请输入身份证号");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else if($(".personIdCardNum").val().length < 18){
            $(".popup").show();
            $(".popup").text("身份证号不足18位");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else if($(".accountHolderPhoneNum").val() == ""){
            $(".popup").show();
            $(".popup").text("请输入手机号");
            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        }else if($(".personBankNum").val().length >0 && $(".accountHolderName").val().length > 0 && $(".personIdCardNum").val().length > 0 ){
            $(".ysbPayBtn").css("background","none").removeAttr("disabled");
        }
    }
    $(".accountHolderPhoneNum").on('input porpertychange',function(){
        if($(".accountHolderPhoneNum").val().length == 11){
            //$(".ysbPayBtn").css("background","none").removeAttr("disabled");
            whetherInput();
        }
    });
    $(".ysbPayBtn").click(function(){
        //if($(".personBankNum").val() == ""){
        //    $(".popup").show();
        //    $(".popup").text("请输入开户卡号");
        //    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //}else if($(".accountHolderName").val()==""){
        //    $(".popup").show();
        //    $(".popup").text("请输入开户人姓名");
        //    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //}else if($(".personIdCardNum").val() == ""){
        //    $(".popup").show();
        //    $(".popup").text("请输入身份证号");
        //    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //}else if($(".accountHolderPhoneNum").val() == ""){
        //    $(".popup").show();
        //    $(".popup").text("请输入手机号");
        //    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
        //}else{
            uniquenessQuery();
            $("#ysbCode").removeAttr("readonly");
            //countDown();
        //}
    });
    //倒计时
    function countDown(){
        //alert("111");
        var timer=setTimeout(function(){//按验证按钮后60秒按钮禁用
            clearInterval(timer2);
            $(".ysbPayBtn").val("重新获取").css({
                //"border":"1px solid #DDD",
                //"background":"#fff",
                "color":"#000"
            }).removeAttr("disabled");
            $(".ysbVerifyCode").val("重新获取").css({
                //"border":"1px solid #DDD",
                //"background":"#fff",
                "color":"#000"
            }).removeAttr("disabled");
        },60000);
        var i = 60;
        $(".ysbPayBtn").text(i+'s').css({
            //"border":"1px solid #DDD",
            //"background":"#e1e1e1",
            "color":"#000"
        }).attr("disabled","disabled");
        var timer2=setInterval(function(){
            i--;
            $(".ysbPayBtn").val(i+'s');
            $(".ysbVerifyCode").val(i+'s');
        },1000);
    }
    //获取数字签名
    function getMac(){
        //用户编号
        var customerIdName = 'customerId';
        var customerIdNum = window.localStorage.phoneNumber;
        var customerIdArr = [];
        customerIdArr.push(customerIdName,customerIdNum);
        var customerId = customerIdArr.join("=");
        //用户姓名
        var nameName = 'name';
        var nameNum = $(".accountHolderName").val();
        var nameArr = [];
        nameArr.push(nameName,nameNum);
        var name = nameArr.join("=");
        //手机号
        var phoneNoName = 'phoneNo';
        var phoneNoNum = $(".accountHolderPhoneNum").val();
        var phoneNoArr = [];
        phoneNoArr.push(phoneNoName,phoneNoNum);
        var phoneNo = phoneNoArr.join("=");
        //银行卡号
        var cardNoName = 'cardNo';
        var cardNoNum = $(".personBankNum").val().replace(/\s/g, "");
        var cardNoArr = [];
        cardNoArr.push(cardNoName,cardNoNum);
        var cardNo = cardNoArr.join("=");
        //身份证号
        var idCardNoName = 'idCardNo';
        var idCardNoNum = $(".personIdCardNum").val().replace(/\s/g, "");
        var idCardNoArr = [];
        idCardNoArr.push(idCardNoName,idCardNoNum);
        var idCardNo = idCardNoArr.join("=");
        console.log(idCardNoNum);
        console.log(idCardNo);
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
        var payType = "payType=0";
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
        macArr.push(accountId,customerId,payType,name,phoneNo,cardNo,idCardNo,orderId,purpose,amount,responseUrl,key);
        var mac=macArr.join("&");
        console.log(mac);
        window.sessionStorage.mac = md5(mac).toUpperCase();
        console.log(window.sessionStorage.mac);
    }
    //实名绑卡唯一性查询
    function uniquenessQuery(){
        $.ajax({
            url:"http://10.0.92.198:1111/bindInfo/unique",
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "IDcard":$(".personIdCardNum").val().replace(/\s/g, "")
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    buyHQJ();
                }else {
                    $(".popup").show();
                    $(".popup").text("身份证号已被绑定");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    //买入接口
    function buyHQJ(){
        if( window.sessionStorage.buyProductType == "buyHqjMark" ){
            $.ajax({
                url:"http://10.0.92.198:1111/currentGold/buyIn",
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
                    if(res.code == 0){
                        prePayment();
                    }else{
                        $(".popup").show();
                        $(".popup").text(res.msg);
                        setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                    }
                    console.log(res);
                },
                error:function(res){
                    console.log(res);
                }
            });
        }
    }
    //实名绑卡
    function bindCard(){
        $.ajax({
            url:"http://10.0.92.198:1111/bindInfo",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,                //手机号
                "bankPhone":$(".accountHolderPhoneNum").val(),          //银行预留手机号
                "name":$(".accountHolderName").val(),                    //姓名
                "IDcard":$(".personIdCardNum").val().replace(/\s/g, ""),//身份证
                "bankCard":$(".personBankNum").val().replace(/\s/g, ""),//银行卡号
                "bank":$(".goChooseBank").text(),                        //所属银行
                "authToken":window.sessionStorage.payToken            //三方支付的授权码
            },
            success:function(res){
                console.log(res);
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    //银生宝预支付接口（首次）
    function prePayment(){
        getMac();
        $.ajax({
            url:"http://106.14.165.194:3333/authPay-front/authPay/pay",
            type:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            data:JSON.stringify({
                "accountId":"2120170306142335001",//商户编号
                "customerId":window.localStorage.phoneNumber,//用户编号
                "payType":"0",                                                  //支付类型
                "name":$(".accountHolderName").val(),                        //用户姓名
                "phoneNo":$(".accountHolderPhoneNum").val(),                //手机号
                "cardNo":$(".personBankNum").val().replace(/\s/g, ""),       //银行卡号
                "idCardNo":$(".personIdCardNum").val().replace(/\s/g, ""),  //身份证号
                "orderId":window.sessionStorage.orderId,                   //订单号
                "purpose":window.sessionStorage.productsType,             //目的
                "amount":window.sessionStorage.amount,                     //金额
                "responseUrl":"http://106.14.165.194:1111/payResult",   //响应地址
                "mac":window.sessionStorage.mac                             //数字签名
            }),
            dataType: "json",
            success:function(res){
                console.log(res);
                if(res.result_code == "0000"){
                    window.sessionStorage.payToken = res.token;
                    countDown();
                    bindCard();
                    $(".ysbPayBtn").attr("class","ysbVerifyCode");
                }else{
                    //$(".ysbPayBtn").addClass("ysbVerifyCode");
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
    //获取验证码（银生宝）
    $(".ysbVerifyCode").click(function(){
        getMac();
        $.ajax({
           url:"http://106.14.165.194:3333/authPay-front/authPay/sendVercode",
           type:'POST',
           headers:{
               'Content-Type': 'application/json'
           },
           data:{
               "accountId":"2120170306142335001",//商户编号
               "customerId":window.localStorage.phoneNumber,//用户编号
               "orderId":window.sessionStorage.orderId,//订单号
               "phoneNo":$(".accountHolderPhoneNum").val(),//手机号
               "token":"",
               "mac":window.sessionStorage.mac//数字签名
           },
           success:function(res){
               countDown();
                console.log(res);
           },
           error:function(res){
                console.log(res);
           }
       });
    });
    $("#ysbCode").on('input porpertychange',function(){
        if($("#ysbCode").val().length == 6){
            $(".nextBtn").css("background","rgb(242,182,67)").removeAttr("disabled");
        }
    });
    //    下一步
    $(".nextBtn").click(function(){
        window.location.href = "buyhqj.html";
    });
});
