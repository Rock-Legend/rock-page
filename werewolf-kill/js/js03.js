/**
 * @authors Rock Legend
 * @date    2017-04-07 16:38:09
 */
 //解析上一页生成的乱序总人数角色数组
var totalNum = sessionStorage.totalNum;
var roleNum = JSON.parse(totalNum);
//设置本页变量
var i;
var role = document.getElementsByClassName("role");
var num = document.getElementsByClassName("number");    
//网页DOM结构绘制完成后执行函数
$(function clone(){
    for(i = 0;i < roleNum.length -1; i++){
        $("#main-part").clone(true).appendTo(".main");  
    } 
    for (i = 0;i < role.length; i++) {
        role[i].innerHTML = roleNum[i];
        num[i].innerHTML = i + 1 + "号";
        // if (role[i].innerHTML == "killer") {
        //     role[i].innerHTML = "杀手";
        // } else if (role[i].innerHTML == "citizen"){
        //     role[i].innerHTML = "平民";
        // }
    }
});
//开始游戏，跳转至游戏页
$("#start").click(function(){
    window.location.href="4-2.html";
});