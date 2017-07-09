/**
 * @authors Rock Legend
 * @date    2017-04-07 16:38:09
 */

 //控制背景音乐的开关
var audio_btn = document.getElementById("audio_btn");
var music = document.getElementById('music');
var music_btn = document.getElementById('music_btn');
function playPause() {
    if (music.paused){
       music.play();
       music_btn.src = 'images/play.png';
    }
    else{
       music.pause();
       music_btn.src = 'images/play.png'; 
    }
}
//玩家生成
 //解析上一页生成的乱序总人数角色数组
var totalNum = sessionStorage.totalNum;
var roleNum = JSON.parse(totalNum);
//分析死亡数组是否有内容
var notFirst = typeof(sessionStorage.dead);


//设置本页变量
var i;
var part = document.getElementsByClassName("part");
var role = document.getElementsByClassName("role");
var num = document.getElementsByClassName("number");    
//网页DOM结构绘制完成后执行函数
$(function clone(){
    for(i = 0;i < roleNum.length -1; i++){
        $("#main-part").clone(true).appendTo(".main");  
    } 
    for (i = 0;i < role.length;i++) {
        role[i].innerHTML = roleNum[i];
        num[i].innerHTML = i +1 + "号";
        // if (role[i].innerHTML == "killer") {
        //     role[i].innerHTML = "杀手";
        // } else if (role[i].innerHTML == "citizen"){
        //     role[i].innerHTML = "平民";
        // }
    }
    //不是首次跳转至本页时运行
	if(notFirst !== undefined){
		// 获得死亡数组
		if(sessionStorage.dead !== undefined){
			dead = sessionStorage.dead;
			deadMan = JSON.parse(dead);
			console.log(dead);
			console.log(deadMan);
		}
		
		// 标记历史中已死玩家
		for(i = 0; i < deadMan.length; i++){
		    document.getElementsByClassName("part")[deadMan[i]].style.borderColor = "#999";
	    }
	}
  
});

//玩家的选中状态
var boxes = $(".part");
boxes.click(function(){
	var rolePer = $(this).find(".role").text();//判断角色内容
    var boxNum = $("#main-part .part").index(this);//判断
		if(notFirst !== undefined){
			if($.inArray(boxNum,deadMan) != -1){
			alert("该角色已死亡，不可再选！");
			} else if(kM === 1 && rolePer == "杀手"){
				alert("不能杀同伴，请选择其他玩家");
			}else{
				$(".part").css("borderColor","#fff");
				this.setAttribute("style","border-color:#999");
				console.log("选中了" + boxNum);
				for(i = 0; i < deadMan.length; i++){
				    document.getElementsByClassName("part")[deadMan[i]].style.borderColor = "#999";
			    }
			}
		}	
});	
		// $(".part").css("borderColor","#fff");
		// this.setAttribute("style","border-color:#999");
// });

//投死按钮
var deadMan = [];
var dead;
var daily = [];
var j = 0;
	j++;
$("#vote").click(function() {
	var deadPerson = $(".part").index($("div[style='border-color:#999']"));
	console.log(deadPerson);
	if(deadPerson == -1) {
		alert("请选择一个玩家");
	}else{
		if(notFirst === undefined){
			deadMan.push(parseInt(deadPerson));//生成本次死亡角色数组
			dead = JSON.stringify(deadMan);
			sessionStorage.dead = dead;
		}else {
			deadMan.push(parseInt(deadPerson));//生成本次死亡角色数组
			dead = JSON.stringify(deadMan);
			sessionStorage.dead = dead;
		}
	//生成天数
    daily.push(Math.ceil(j++)+1);
    var dailyD = JSON.stringify(daily);
    sessionStorage.dailyD = dailyD;
	window.location.href="4-2.html";
	}
});
//页面间数据处理
//传递到下一页，判别点击事件的状态，在本页无用
function one(){
	var xxx = 1;
	var xO = JSON.stringify(xxx);
	sessionStorage.setItem("xxx", xO);
}
function two(){
	var yyy = 1;
	var yO = JSON.stringify(yyy);
	sessionStorage.setItem("yyy", yO);
}
//分析上一页面的参数
//杀手按钮要修改的信息
if(sessionStorage.kkk !== undefined){
	var kkk = sessionStorage.kkk;
	var kM = JSON.parse(kkk);
	console.log(kM);
	if(kM === 1){
		sessionStorage.removeItem("kkk");
		//修改主体文字
		$("header > span").text("杀手杀人");
		$(".hint > span").text("杀手请睁眼，杀手请选择要杀的对象");
		$(".hintway > p").text("点击下方玩家头像，对被杀的玩家进行标记");
		$("#vote").text("确定");
		//运行往下一页发送的判别变量
		one();
	}
}
//全民投票按钮要修改的信息
if(sessionStorage.vvv !== undefined){
	var vvv = sessionStorage.vvv;
	var vM = JSON.parse(vvv);
	console.log(vM);
	if(vM === 1){
		sessionStorage.removeItem("vvv");
		// $("header > span").text("投票");
		// $(".hint > span").text("发言讨论结束，大家请投票");
		// $(".hintway > p").text("点击得票数最多的玩家头像");
		// $("#vote").text("投死");
		two();
	}
}
// else {
//     $(".check").html(function(){if (dead.length % 2 === 0){$(this).html("第&thinsp;" + (Math.ceil(dead.length / 2) + 1) +"&thinsp;天");}})
//     .click(function () {
//         if(dead.length % 2 == 1) {
//             location = "task4-5.html";
//         }
//         else {
//             location = "task4-2.html";
//             // 确认进入下一天的时间
//             TimeArr.push(duration);
//             timeStr = JSON.stringify(TimeArr);
//             sessionStorage.timesArr = timeStr;
//         }
//     }
// );}