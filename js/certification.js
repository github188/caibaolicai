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
    //function
    //$(".nextBtn").click(function(){
    //
    //});
});
