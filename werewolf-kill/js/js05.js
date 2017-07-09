/**
 * @authors Your Name (you@example.org)
 * @date    2017-04-09 17:03:44
 * @version $Id$
 */
//控制下拉菜单的显示
$(".content > .content-head").on("click",function dropDown() {
	$(this).addClass("current")         //对当前元素添加“current”样式
	.next().show()                      //下一个元素显示
	.parent().siblings().children(".content-head").removeClass("current")
	.next().hide();                     //父元素的同辈元素的子元素移除“current”样式
	return false;                       //它们的下一个元素隐藏
});
//每天四个步骤的状态
$(".homicide").click(function(){
	kill();
	self.location.href="4-3.html";
});
$(".deceased").click(function(){
	alert("死者亮明了身份，且发表了遗言");	
});
$(".speak").click(function(){	
	alert("玩家依此发言讨论");
});
$(".ballot").click(function(){
	
	alert("玩家讨论结束，开始投票");
	self.location.href="4-3.html";
});
$(".content-part-main").click(function(){
	$(this).css("backgroundColor","#247777");
	$(this).prev("div").css("border-right-color","#247777");
});
//页面间数据处理
//玩家生成
 //解析上一页生成的乱序总人数角色数组
var totalNum = sessionStorage.totalNum;
var roleNum = JSON.parse(totalNum);
//获得死亡数组
var deadMan = [];
var dead;
// 非首次跳转至本页面时运行
var notFirst = typeof (sessionStorage.dead);
console.log(notFirst);
if (notFirst != "undefined") {
	//获得死亡数组
	    dead = sessionStorage.dead;
		deadMan = JSON.parse(dead);
		console.log(dead);
		console.log(deadMan);
		var daliy = ['一','二','三','四','五','六','七','八','九','十'];
        var d = Math.ceil(deadMan.length/2 +1);
        var b = Math.ceil(deadMan.length/2);
	if (deadMan.length%2 === 0) {
		$(function() {
            //更改天数
            $(".content-head span").text("第 "+daliy[d-1]+" 天");
        });
	}
	if(deadMan.length%2 === 1){
        //更改天数
        $(".content-head span").text("第 "+daliy[b-1]+" 天");
		$(".homicide").css("backgroundColor","#247777");
		$(".homicide").prev("div").css("border-right-color","#247777");
		$(".content-part-main").attr("disabled",false);
		$("<p></p>").insertAfter(".homicide");
		//添加杀手杀人信息
		for (i = 0;i < deadMan.length;i++) {
		    if (i % 2 === 0) {
		    	// if (roleNum[deadMan[i]] == "killer") {
			    //     roleNum[deadMan[i]] = "杀手";
		     //    } else if (roleNum[deadMan[i]] == "citizen"){
		     //        roleNum[deadMan[i]] = "平民";
		     //    }
		        $("p").text(deadMan[i] + 1 + "号被杀手杀死了,真实身份是" + roleNum[deadMan[i]]); 
		    }  
		       
		}
	}   
}
//分析跳转页面的变量，修改按钮背景色和禁用状态
// var notX = typeof(sessionStorage.xxx);
// if(notX !== undefined){
// 	var xxx = sessionStorage.xxx;
// 	var xM = JSON.parse(xxx);
// 	if (xM === 1) {
// 		sessionStorage.removeItem("xxx");
// 		$(".homicide").css("backgroundColor","#247777");
// 		$(".homicide").prev("div").css("border-right-color","#247777");
// 		$(".content-part-main").attr("disabled",false);
// 		$("<p></p>").insertAfter(".homicide");
// 		//添加杀手杀人信息
// 		for (i = 0;i < deadMan.length;i++) {
// 		    if (i % 2 === 0) {
// 		    	if (roleNum[deadMan[i]] == "killer") {
// 			        roleNum[deadMan[i]] = "杀手";
// 		        } else if (roleNum[deadMan[i]] == "citizen"){
// 		            roleNum[deadMan[i]] = "平民";
// 		        }
// 		        $("p").text(deadMan[i] + 1 + "号被杀手杀死了,真实身份是" + roleNum[deadMan[i]]);
		        
// 		    }  
		       
// 		}
// 	}
// }
//分析跳转页面的变量，增加天数
// var y = sessionStorage.y;
// var yM = JSON.parse(y);
// if (yM === 0) {
// 	sessionStorage.removeItem("y");
// 	$(".content").clone(true).insertBefore(".content");
// 	$(".content:last").siblings().children(".content-head").next().hide();
// 	$(".content-head:last > span").text("第天");
// }
//传递到下一页，判别点击事件的状态，在本页无用
//杀手按钮进入下一页面时调用的参数
function kill(){
	var kkk = 1;
	var kO = JSON.stringify(kkk);
	sessionStorage.setItem("kkk", kO);
}
// 全民投票按钮进入下一页面时调用的函数
/*function vote(){
	var vvv = 1;
	var vO = JSON.stringify(vvv);
	sessionStorage.setItem("vvv", vO);
}*/
//杀手玩家数组
var killAll = [];
for (i=0;i < roleNum.length;i++){
    if (roleNum[i] == "杀手") {
    	killAll.push(i);
    }
}
console.log(killAll);
console.log(deadMan);

// var deadKillerAll = $.grep(deadMan,function(val){
//     if(killAll.indexOf(val)>=0){
//         return val;
//     }
// },false);//获得死亡杀手数组

//水民胜利条件判断
var deadKillerAll =  deadMan.filter(function(val){ return killAll.indexOf(val) >= 0 ;});
console.log(deadKillerAll);

if (deadKillerAll.sort().toString() == killAll.sort().toString()) {
    console.log("水民胜利");
    sessionStorage.setItem('wininfo',"水民胜利");
}
//杀手胜利条件判断
if (roleNum.length - deadMan.length <= (killAll.length - deadKillerAll.length) *2 ) { //存活水民数不大于存活杀手数
    console.log("杀手胜利");
    sessionStorage.setItem('wininfo',"杀手胜利");
}
if (deadKillerAll.sort().toString() == killAll.sort().toString()||
    roleNum.length - deadMan.length <= (killAll.length - deadKillerAll.length) *2){
	alert("游戏结束！进入游戏结果统计页面！");
    sessionStorage.setItem('day', Math.ceil(deadMan.length / 2));
    location = "4-4.html";
    // 确认进入下一天的时间
    // var TimeArr = [];
    // // TimeArr.push();
    // timeStr = JSON.stringify(TimeArr);
    // sessionStorage.timesArr = timeStr;
}