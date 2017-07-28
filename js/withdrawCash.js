/**
 * Created by hzc on 2017-7-28.
 */
$(function(){
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
                //$(".accountBalance").text(window.sessionStorage.accountBalance);
                if(res.result.bank == "交通银行"){

                    $(".bankIcon").find("img").attr('src','images/jiaotongbank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "中国银行"){

                    $(".bankIcon").find("img").attr('src','images/zhongguobank.png');
                    $(".quotaDes").text("单笔1万" + " " + "单日2万");

                }else if(res.result.bank == "工商银行"){

                    $(".bankIcon").find("img").attr('src','images/gongshangbank.png');
                    $(".quotaDes").text("单笔1万" + " " + "单日2万");

                }else if(res.result.bank == "建设银行"){

                    $(".bankIcon").find("img").attr('src','images/jianshebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "平安银行"){

                    $(".bankIcon").find("img").attr('src','images/pinganbank.png');
                    $(".quotaDes").text("单笔0.5万" + " " + "单日0.5万");

                }else if(res.result.bank == "中信银行"){

                    $(".bankIcon").find("img").attr('src','images/zhongxinbank.png');
                    $(".quotaDes").text("单笔0.5万" + " " + "单日1万");

                }else if(res.result.bank == "广大银行"){

                    $(".bankIcon").find("img").attr('src','images/guangdabank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "浦发银行"){

                    $(".bankIcon").find("img").attr('src','images/pufabank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "兴业银行"){

                    $(".bankIcon").find("img").attr('src','images/xingyebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "农业银行"){

                    $(".bankIcon").find("img").attr('src','images/nongyebank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日5万");

                }else if(res.result.bank == "邮政银行"){

                    $(".bankIcon").find("img").attr('src','images/youzhengbank.png');
                    $(".quotaDes").text("单笔5万" + " " + "单日20万");

                }else if(res.result.bank == "招商银行"){

                    $(".bankIcon").find("img").attr('src','images/zhaoshangbank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if(res.result.bank == "华夏银行"){

                    $(".bankIcon").find("img").attr('src','images/huaxiabank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if(res.result.bank == "广发银行"){

                    $(".bankIcon").find("img").attr('src','images/guangfabank.png');
                    $(".quotaDes").text("单笔万" + " " + "单日万");

                }else if(res.result.bank == "民生银行"){

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
});
