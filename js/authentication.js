/**
 * Created by hzc on 2017-8-16.
 */
$(function(){
    FastClick.attach(document.body);
    //认证查询
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
                    $(".noRecordWrap").show();
                    $(".authenticationWrap").hide();
                } else if(res.code == 0){
                    $(".noRecordWrap").hide();
                    $(".authenticationWrap").show();
                }
            },
            error: function (res) {
                //console.log(res);
            }
        });
    }
    authenticationQuery();
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
                $(".yhName").text(res.result[0].bank);
                var bankCardWeiHao = res.result[0].bankCard.substr(res.result[0].bankCard.length-4,4);
                $(".weiHao").text("尾号" + bankCardWeiHao);
                //console.log(res.result[0]);
                $(".name").text(res.result[0].name.substr(0,1) + "**");
                $(".idCard").text(res.result[0].IDcard.substr(0,6) + "******" + res.result[0].IDcard.substr(res.result[0].IDcard.length-4));
                window.sessionStorage.bindBankName = res.result[0].name;//用户姓名
                window.sessionStorage.IDcard = res.result[0].IDcard;//身份证号
                window.sessionStorage.bankCardNum = res.result[0].bankCard;//银行卡号
                window.sessionStorage.bankName = res.result[0].bank;//银行名称
                window.sessionStorage.bankPhone = res.result[0].bankPhone.substr(0,3) + "****" + res.result[0].bankPhone.substr(res.result[0].bankPhone.length-4,4);
                window.sessionStorage.BankCardTailNumber = res.result[0].bankCard.substr(res.result[0].bankCard.length-4,4);
                if($.trim(res.result[0].bank) == "交通银行"){

                    $(".bankIcon").find("img").attr('src','images/jiaotongbank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result[0].bank) == "中国银行"){

                    $(".bankIcon").find("img").attr('src','images/zhongguobank.png');
                    $(".quotaDes").text("单笔1万" + " " + "单日2万");

                }else if($.trim(res.result[0].bank) == "工商银行"){

                    $(".bankIcon").find("img").attr('src','images/gongshangbank.png');
                    $(".quotaDes").text("单笔1万" + " " + "单日2万");

                }else if($.trim(res.result[0].bank) == "建设银行"){

                    $(".bankIcon").find("img").attr('src','images/jianshebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result[0].bank) == "平安银行"){

                    $(".bankIcon").find("img").attr('src','images/pinganbank.png');
                    $(".quotaDes").text("单笔0.5万" + " " + "单日0.5万");

                }else if($.trim(res.result[0].bank) == "中信银行"){

                    $(".bankIcon").find("img").attr('src','images/zhongxinbank.png');
                    $(".quotaDes").text("单笔0.5万" + " " + "单日1万");

                }else if($.trim(res.result[0].bank) == "广大银行"){

                    $(".bankIcon").find("img").attr('src','images/guangdabank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result[0].bank) == "浦发银行"){

                    $(".bankIcon").find("img").attr('src','images/pufabank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result[0].bank) == "兴业银行"){

                    $(".bankIcon").find("img").attr('src','images/xingyebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result[0].bank) == "农业银行"){

                    $(".bankIcon").find("img").attr('src','images/nongyebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if($.trim(res.result[0].bank) == "邮政银行"){

                    $(".bankIcon").find("img").attr('src','images/youzhengbank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日20万");

                }else if($.trim(res.result[0].bank) == "招商银行"){

                    $(".bankIcon").find("img").attr('src','images/zhaoshangbank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if($.trim(res.result[0].bank) == "华夏银行"){

                    $(".bankIcon").find("img").attr('src','images/huaxiabank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if($.trim(res.result[0].bank) == "广发银行"){

                    $(".bankIcon").find("img").attr('src','images/guangfabank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if($.trim(res.result[0].bank) == "民生银行"){

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
    $(".goMakeMoneyBtn").click(function(){
        window.sessionStorage.backMark = "authentication";
        window.sessionStorage.buyProductMark = "hqj";
        window.location.href = "productCollection.html";
    });
});