/**
 * @authors Rock Legend
 * @date    2017-04-16 16:43:47
 * @version $Id$
 */
 //解析上一页生成的乱序总人数角色数组
var totalNum = sessionStorage.totalNum;
var roleNum = JSON.parse(totalNum);
var citizenNum = sessionStorage.citizenNum;
var citizenTol = JSON.parse(citizenNum);
var killerNum = sessionStorage.killerNum;
var killerTol = JSON.parse(killerNum);
//获得死亡数组
var dead = sessionStorage.dead;
var deadMan = JSON.parse(dead);
console.log(deadMan);
console.log(deadMan.length);
//获得胜利信息
var one = sessionStorage.wininfo;
//获得天数
var day = sessionStorage.day;
var d;
var i;
var dayTime = document.getElementsByClassName("detail");
//修改胜利玩家
$(".part span").text(one);
$("#killnum").text( killerTol.length );
$("#citizennum").text( citizenTol.length );
$("#one").text(one.substring(2, 0));
$(function clone(){
	//按死亡人数复制天数列表信息
    for(d = 1; d < Math.ceil(deadMan.length/2); d++){
    	console.log(d);
        $(".detail").last().clone(true).insertAfter($(".detail").last()); 
    } 
    //修改天数
    for(var c = 0;c < Math.ceil(deadMan.length/2); c++){
    	document.getElementsByClassName("daily")[c].innerHTML = "第  " +(c + 1)+ " 天";
    }
	//添加杀手杀人信息
	for (i = 0;i < deadMan.length;i++) {
		// if (roleNum[deadMan[i]] == "killer") {
		//     roleNum[deadMan[i]] = "杀手";
  //       } else if (roleNum[deadMan[i]] == "citizen"){
  //           roleNum[deadMan[i]] = "平民";
  //       }
	    if (i % 2 === 0) {
	        document.getElementsByClassName("event")[i].innerHTML = "晚上：" + (deadMan[i] + 1) + "号被杀手杀死了，真实身份是" + roleNum[deadMan[i]]; 
	    } 
	    if(i % 2 === 1) {
	    	document.getElementsByClassName("event")[i].innerHTML = "白天：" + (deadMan[i] + 1) + "号被大家投死了，真实身份是" + roleNum[deadMan[i]];
	    }      
	}
});
//返回首页
function back(){
	sessionStorage.clear();
	window.location = "index.html";
}