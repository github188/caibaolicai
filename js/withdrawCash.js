/**
 * Created by hzc on 2017-7-28.
 */
$(function(){
    FastClick.attach(document.body);
    $(".balanceNum").text(window.sessionStorage.userBalance);
    //开户银行是否录入
    function bankInfoWhetherInput(){
        $.ajax({
            url:'http://106.14.165.194:1111/bankInfo',
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    $(".kaiHuLocationWrap").hide();
                    $(".inputWithDrawNum").focus();
                }else if(res.code == -1){
                    window.sessionStorage.bankInput = "no";
                    $(".inputKaiHuName").focus();
                }else{
                    $(".submit").addClass("inputBank");
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    bankInfoWhetherInput();
    //    实名绑卡信息查询
    function bindInfoQuery(){
        $.ajax({
            url:'http://106.14.165.194:1111/bindInfo',
            type:"GET",
            headers:{
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber
            },
            success:function(res){
                console.log(res);
                $(".yhName").text(res.result.bank);
                var bankCardWeiHao = res.result.bankCard.substr(res.result.bankCard.length-4,4);
                console.log(bankCardWeiHao);
                $(".weiHao").text("尾号" + bankCardWeiHao);
                window.sessionStorage.bindBankPhone = res.result.bankPhone;//绑定的手机号
                window.sessionStorage.bindBankName = res.result.name;//用户姓名
                window.sessionStorage.IDcard = res.result.IDcard;//身份证号
                window.sessionStorage.bankCardNum = res.result.bankCard;//银行卡号
                window.sessionStorage.authToken = res.result.authToken;//授权码
                window.sessionStorage.bankName = res.result.bank;//银行名称
                window.sessionStorage.bankPhone = res.result.bankPhone.substr(0,3) + "****" + res.result.bankPhone.substr(res.result.bankPhone.length-4,4);
                window.sessionStorage.BankCardTailNumber = res.result.bankCard.substr(res.result.bankCard.length-4,4);
                console.log(res.result.bank);
                console.log($.trim(res.result.bank)== "交通银行");
                //$(".accountBalance").text(window.sessionStorage.accountBalance);
                if($.trim(res.result.bank) == "交通银行"){

                    $(".bankIcon").find("img").attr('src','images/jiaotongbank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result.bank) == "中国银行"){

                    $(".bankIcon").find("img").attr('src','images/zhongguobank.png');
                    $(".quotaDes").text("单笔1万" + " " + "单日2万");

                }else if($.trim(res.result.bank) == "工商银行"){

                    $(".bankIcon").find("img").attr('src','images/gongshangbank.png');
                    $(".quotaDes").text("单笔1万" + " " + "单日2万");

                }else if($.trim(res.result.bank) == "建设银行"){

                    $(".bankIcon").find("img").attr('src','images/jianshebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result.bank) == "平安银行"){

                    $(".bankIcon").find("img").attr('src','images/pinganbank.png');
                    $(".quotaDes").text("单笔0.5万" + " " + "单日0.5万");

                }else if($.trim(res.result.bank) == "中信银行"){

                    $(".bankIcon").find("img").attr('src','images/zhongxinbank.png');
                    $(".quotaDes").text("单笔0.5万" + " " + "单日1万");

                }else if($.trim(res.result.bank) == "广大银行"){

                    $(".bankIcon").find("img").attr('src','images/guangdabank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result.bank) == "浦发银行"){

                    $(".bankIcon").find("img").attr('src','images/pufabank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result.bank) == "兴业银行"){

                    $(".bankIcon").find("img").attr('src','images/xingyebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result.bank) == "农业银行"){

                    $(".bankIcon").find("img").attr('src','images/nongyebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result.bank) == "邮政银行"){

                    $(".bankIcon").find("img").attr('src','images/youzhengbank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日20万");

                }else if($.trim(res.result.bank) == "招商银行"){

                    $(".bankIcon").find("img").attr('src','images/zhaoshangbank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if($.trim(res.result.bank) == "华夏银行"){

                    $(".bankIcon").find("img").attr('src','images/huaxiabank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if($.trim(res.result.bank) == "广发银行"){

                    $(".bankIcon").find("img").attr('src','images/guangfabank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if($.trim(res.result.bank) == "民生银行"){

                    $(".bankIcon").find("img").attr('src','images/minshengbank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }
            },
            error:function(res){
                console.log(res);
            }
        })
    }
    bindInfoQuery();
    $(".withdrawAllBtn").click(function(){
        $(".inputWithDrawNum").val($(".balanceNum").text());
    });
    $(".inputWithDrawNum").on('input propertychange',function(){

        if($(".inputWithDrawNum").val().length > 0 && parseFloat($(".inputWithDrawNum").val()) <= parseFloat($(".balanceNum").text())){
            $(".submit").css("background","rgb(242,182,67)").removeAttr("disabled");
        }else {
            $(".submit").css("background","rgb(181,181,181)").attr("disabled","disabled");
        }
    });
    //银行信息录入
    function inputBank(){
        $.ajax({
            url:'http://106.14.165.194:1111/bankInfo',
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "bankArea":$("#sel_city").text().replace(/(^\s+)|(\s+$)/g, ""),
                "bankName":$(".inputKaiHuName").val()
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
    }
    $(".submit").click(function(){
        if(!$(".kaiHuLocationWrap ").css("display") == "none"){
            if( $("#sel_city").text().replace(/(^\s+)|(\s+$)/g, "") == "请选择" ){
                $(".popup").show();
                $(".popup").text("请选择开户行地区");
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            }else if($(".inputKaiHuName").val().length == 0){
                $(".popup").show();
                $(".popup").text("开户支行名称");
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            }else if(parseFloat($(".inputWithDrawNum").val()) < 50){
                $(".popup").show();
                $(".popup").text("您提现的金额小于50元");
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            } else{
                if(window.sessionStorage.bankInput == "no"){
                    inputBank();
                    $(".sellTypeMoney").text("￥" + $(".inputWithDrawNum").val());
                    $(".popupBg").css("display","block");
                    $(".sellPopup").css("display","block");
                    $("#ipt").focus();
                }else {
                    $(".sellTypeMoney").text("￥" + $(".inputWithDrawNum").val());
                    $(".popupBg").css("display","block");
                    $(".sellPopup").css("display","block");
                    $("#ipt").focus();
                }
            }
        }else {
            if(parseFloat($(".inputWithDrawNum").val()) < 50){
                $(".popup").show();
                $(".popup").text("您提现的金额小于50元");
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            } else {
                if (window.sessionStorage.bankInput == "no") {
                    $(".sellTypeMoney").text("￥" + $(".inputWithDrawNum").val());
                    $(".popupBg").css("display", "block");
                    $(".sellPopup").css("display", "block");
                    $("#ipt").focus();
                } else {
                    $(".sellTypeMoney").text("￥" + $(".inputWithDrawNum").val());
                    $(".popupBg").css("display", "block");
                    $(".sellPopup").css("display", "block");
                    $("#ipt").focus();
                }

            }
        }

    });
    $(".closePopup").click(function(){
        $('#ipt').val("");
        $(".inputPwdWrap").find("li").text("");
        $(".popupBg").hide();
        $(".sellPopup").hide();
        $(".sellTypeMoney").text("");
    });

    //提现接口
    function withdraw(){
        var orderId = window.localStorage.phoneNumber + Date.parse(new Date());
        $.ajax({
            url:"http://106.14.165.194:1111/withdraw",
            type:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded ",
                "token":window.localStorage.token
            },
            data:{
                "phone":window.localStorage.phoneNumber,
                "orderId":orderId,
                "amount":$(".inputWithDrawNum").val()
            },
            success:function(res){
                console.log(res);
                if(res.code == 0){
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$("#ipt").val(""),window.location.href = "asset.html"',2000);
                }else {
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$("#ipt").val("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
    //支付密码验证
    function checkedPwd(){
        var checkedPayPwd = sha256_digest($("#ipt").val());
        $.ajax({
            url:"http://106.14.165.194:1111/paypwd-check",
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
                console.log(res);
                if(res.code == 0){
                    withdraw();
                }else {
                    $(".popup").show();
                    $(".popup").text(res.msg);
                    setTimeout('$(".popup").hide(),$(".popup").text(""),$("#ipt").val("")',2000);
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    }
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
            checkedPwd();
        }
    });
    //$("#ipt").on('input porpertychange',function(){
    //    if($("#ipt").val().length == 6){
    //        checkedPwd();
    //    }
    //});
});
