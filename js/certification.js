/**
 * Created by hzc on 2017-7-13.
 */
$(function(){
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
        var cardNoNum = $.trim($(".personBankNum").val());
        var cardNoArr = [];
        cardNoArr.push(cardNoName,cardNoNum);
        var cardNo = cardNoArr.join("=");
        //身份证号
        var idCardNoName = 'idCardNo';
        var idCardNoNum = $.trim($(".personIdCardNum").val());
        var idCardNoArr = [];
        idCardNoArr.push(idCardNoName,idCardNoNum);
        var idCardNo = idCardNoArr.join("=");
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
        //var name = 'name=$(".accountHolderName").val()';
        //var phoneNo = 'phoneNo=$(".accountHolderPhoneNum").val()';
        //var cardNo ='cardNo=$(".personBankNum").val()';
        //var idCardNo = 'idCardNo=$("personIdCardNum").val()';
        //var orderId = 'orderId=window.sessionStorage.orderId';
        //var purpose = 'purpose=window.sessionStorage.productsType';
        //var amount = 'amount=window.sessionStorage.amount';
        var key = 'key=caibao1314';
        var macArr = [];
        macArr.push(accountId,customerId,payType,name,phoneNo,cardNo,idCardNo,orderId,purpose,amount,key);
        var mac=macArr.join("$");
        window.sessionStorage.mac = mac.toUpperCase();
        console.log(window.sessionStorage.mac);
    }
    $(".ysbPayBtn").click(function(){
        if($(".personBankNum").val() == "" && $(".accountHolderName").val()=="" && $(".personIdCardNum").val() == "" && $(".accountHolderPhoneNum").val() == "" ){
            $(this).
        }else{
            function countDown(){
                var timer=setTimeout(function(){//按验证按钮后60秒按钮禁用
                    clearInterval(timer2);
                    $(".ysbVerifyCode").text("重新获取").css({
                        //"border":"1px solid #DDD",
                        //"background":"#fff",
                        "color":"#edeeee"
                    }).removeAttr("disabled");
                },60000);
                var i = 60;
                $(".getCode").text(i+'s').css({
                    //"border":"1px solid #DDD",
                    //"background":"#e1e1e1",
                    "color":"#edeeee"
                }).attr("disabled","disabled");
                var timer2=setInterval(function(){
                    i--;
                    $(".ysbVerifyCode").text(i+'s');
                },1000);
            }
            getMac();
            //银生宝预支付接口
            $.ajax({
                url:"http://114.80.54.75/authPay-front/authPay/pay",
                type:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                data:{
                    "accountId":"2120170306142335001",//商户编号
                    "customerId":window.localStorage.phoneNumber,//用户编号
                    "payType":"0",//支付类型
                    "name":$(".accountHolderName").val(),//用户姓名
                    "phoneNo":$(".accountHolderPhoneNum").val(),//手机号
                    "cardNo":$(".personBankNum").val(),//银行卡号
                    "idCardNo":$(".personIdCardNum").val(),//身份证号
                    "orderId":window.sessionStorage.orderId,//订单号
                    "purpose":window.sessionStorage.productsType,//目的
                    "amount":window.sessionStorage.amount,//金额
                    "responseUrl":"http://106.14.165.194:1111/payResult",//响应地址
                    "mac":window.sessionStorage.mac//数字签名
                },
                success:function(res){
                    console.log(res);
                },
                error:function(res){
                    console.log(res);
                }
            });
            //买入接口
            if( window.sessionStorage.buyProductType == "buyHqjMark" ){
                $.ajax({
                    url:"http://106.14.165.194:1111/currentGold/buyIn",
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
                    },
                    error:function(res){
                        console.log(res);
                    }
                });
            }
        }
    });
    $(".ysbVerifyCode").click(function(){
        getMac();
        $.ajax({
           url:"http://114.80.54.75/authPay-front/authPay/sendVercode " ,
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
                console.log(res);
           },
           error:function(res){
                console.log(res);
           }
       });
    });
});
