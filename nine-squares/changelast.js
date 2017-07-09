
	var box = document.getElementsByClassName("box1");
    var total = box.length;
//确定原始背景色值
function  pristineColor() {
	var i;
	for (i = 0; i < total; i++) {
		box[i].style.backgroundColor = "#f60";
    }
}
//随机生成颜色
function getColor() {
	//方法1
	// var colorNum = Math.random()*16777215;
	// var optionalColor = Math.round(colorNum).toString(16);
	// while(optionalColor.length < 6){
	// 	optionalColor = '0' + optionalColor;
	// }
	// return '#' + optionalColor;
	//方法2
	// var colorNum = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	// var colorVal = "#";
	// var i;
	// for (i = 0; i < 6; i++) {
	// 	colorVal += colorNum[Math.floor(Math.random()*16)];
	// }
	// return colorVal;
	//方法3，此方法有问题，会出现undefined，目前没有找到问题，暂时禁用
	var colorNum = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
	var colorNumChoose = colorNum.split(",");
	var colorVal = "#";
	for ( i = 0; i < 6; i++) {
		colorVal += colorNumChoose[Math.floor(Math.random()*16)];
	}
	return colorVal;   
}   
//随机选择1个盒子值
function chooseBox() {
	var x = Math.floor(Math.random()*total);
    return x;
}
//随机选择盒子颜色
function changeBoxColor() {
	pristineColor();
	var A;
	var B;
	var C;
	do{
	    A = chooseBox();
	    B = chooseBox();
	    C = chooseBox(); 	
	} while (A == B || B == C || A == C);	
	box[A].style.backgroundColor = getColor();
	box[B].style.backgroundColor = getColor();
	box[C].style.backgroundColor = getColor();
}
var run;
var btnStart = document.getElementById('start');
var btnStop = document.getElementById('stop');
function start(){ 
    run = setInterval(changeBoxColor,1000);		
    btnStart.disabled = true;
}
function stop(){
    pristineColor();
    clearInterval(run);
    btnStart.disabled = false;
}    
