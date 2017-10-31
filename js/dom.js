/**
 * Created by hzc on 2017-6-21.
 */
$(function(){
    $(".cpys").click(function () {
        window.sessionStorage.tabMark = $(this).text();
    });
    $(".secNav").find("li").click(function () {
        window.sessionStorage.tabMark = $(this).find("a").text();
    });
    $(".footerUl").find("li").click(function () {
        window.sessionStorage.tabMark = $(this).find("a").text();
    });
    $("#aboutNav").find("li").click(function () {
        window.sessionStorage.tabMark = $(this).text();
    });
    $(".newsNav").on("click","li",function () {
        window.sessionStorage.tabMark = $(this).text();
        location.href = "../about.html"
    })
});
