/**
 * @authors Rock Legend
 * @date    2017-04-05 11:07:46
 */
 //解析上一页生成的乱序总人数角色数组
var totalNum = sessionStorage.totalNum;
var roleNum = JSON.parse(totalNum);
//设置本页变量
var number = document.getElementById("identifier");
var circle1 = document.getElementById("circle1");
var part =  document.getElementById("part");
var role = document.getElementById("role");
var roleWord = document.getElementById("role-word");
var thumb = document.getElementById("thumb");
var i = 0;
    i++;
var j = 0;
    j++;
var n = 0;
//按钮关联事件
thumb.onclick=function look() {
    if(i/2 == roleNum.length){
        window.location.href="4-1.html";
    }else if (i >= 1 && i/2 < roleNum.length) {
        if (i%2 === 0) {
            check();  
        } else if (i%2 === 1) {
            transmit(); 
            n++;
            if(roleNum[n-1] == "杀手") {
                role.innerHTML = "角色：杀手";
                // roleWord.innerHTML = "词组：killer";
            }  
            if(roleNum[n-1] == "水民") {
                role.innerHTML = "角色：水民";
                // roleWord.innerHTML = "词组：citizen";
            } 
            if(i == 2*roleNum.length){
                thumb.innerHTML = "查看法官日志";
            }
        }
    } 
};
//查看身份下的动态变化设置
function check() {
    thumb.innerHTML = "查看"+(Math.floor((i++)/2+1.5))+"号身份";
    number.innerHTML = ""+(Math.ceil(j++)+1)+"";
    circle1.style.display = "inline-block";
    part.style.display = "none";
}
//隐藏身份下的动态变化设置
function transmit(){
    thumb.innerHTML = "隐藏并传递给"+(Math.floor((i++)/2+1.5))+"号";
    circle1.style.display = "none";
    part.style.display = "block";
}

