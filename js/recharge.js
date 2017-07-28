/**
 * Created by hzc on 2017-7-20.
 */
$(function(){
    $(".czMoney ").focus();
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
        window.location.href = "certification.html";
    });
    $(".czMoney").on('input onpropertychange',function(){
       if($(".czMoney").val() <= 100){
           $(".czMoney").val("100");
       }
    });
    $(".bindCzMoney").on('input onpropertychange',function(){
       if($(".bindCzMoney").val().length > 0){
           $(".confirmBtn").css("background","rgb(242, 182, 67)").removeAttr("disabled");
       }else{
           $(".confirmBtn").css("background","#cccccc").attr("disabled",true);
       }
    });
    $(".confirmBtn").click(function(){
        $(".popupBg").show();
        $(".popupWrap").show();
        $(".userRechargeNum").text("￥" + $(".bindCzMoney").val());
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