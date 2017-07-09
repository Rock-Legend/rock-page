/**
 * @authors Rock Legend
 * @date    2017-03-31 10:32:32
 */
    var allocation = document.getElementsByName("allocation");
    // var killer = document.getElementsByName("killer");
    //  killer.value = "killer";
    // var citizen = document.getElementsByName("citizen");
   	// 	citizen.value = "citizen";	
    var total = document.getElementById("total");
    var go = document.getElementById("go");
    //页面加载时设置职业人数不可输入
	window.onload=function(){
		//设置职业人数不能输入值
		for (var j = 0;j < allocation.length; j++) {
			allocation[j].disabled = true;	
		}
		// sessionStorage.clear();
	};
	// 限制总人数的最大值和最小值，阶梯分配杀手和水民人数
	//使用onchange方法，会在输入框失焦后改变相关的数值
	total.onchange=function setNum(){
		if (total.value < 4 || total.value > 18) {
		    alert ("请在4~18之间取值！"); 
		} else if (total.value >=4 && total.value < 8) {
			allocation[0].value = 1;
			allocation[1].value = total.value - 1;
		} else if (total.value >=8 && total.value < 12) {
			allocation[0].value = 2;
			allocation[1].value = total.value - 2;
		} else if (total.value >=12 && total.value < 16) {
			allocation[0].value = 3;
			allocation[1].value = total.value - 3;
		} else if (total.value >=16 && total.value <= 18) {
			allocation[0].value = 4;
			allocation[1].value = total.value - 4;
		}
	};
    //建立杀手数组
    var killerNum = [];
	//建立水民数组
	var citizenNum = [];
	//总玩家人数数组
	var roleNum = [];
    var totalNum;
    // var totalNum = JSON.stringify(roleNum);
    function shuffle(){
   	    //定义杀手数组
		killerNum.length = parseInt(allocation[0].value);
		for (var n = 0; n < killerNum.length; n++) {
			killerNum[n] = '杀手';
	    }
	    killerTol = JSON.stringify(killerNum);
	    sessionStorage.killerNum = killerTol;
		//定义水民数组
		citizenNum.length = parseInt(allocation[1].value);
  		for (var x = 0; x < citizenNum.length; x++) {
	    	citizenNum[x] = '水民';
	    }
	    citizenTol = JSON.stringify(citizenNum);
	    sessionStorage.citizenNum = citizenTol;
	    //定义总玩家人数数组
        roleNum = killerNum.concat(citizenNum);
        //随机打乱总玩家数组的项目排列
        var m = roleNum.length, temp, r;
        while (0 !== m) {
	        r = parseInt(Math.random() * m--);
	        temp = roleNum[m];
	        roleNum[m] = roleNum[r];
	        roleNum[r] = temp; 
    	}
        totalNum = JSON.stringify(roleNum);
    	sessionStorage.setItem("totalNum", totalNum);
	}
	
    go.onclick=function () {
    	shuffle();
    	window.location.href="3-1.html";
// 
    };
	// //点击按钮可自定义设置职业人数
 //    set.onclick=function() {
 //    	if (total.disabled===false) {
 //    		set.innerHTML="设置完成";
 //    		//职业人数输入可编辑
 //    		for (var i = 0;i < allocation.length; i++) {
	// 			allocation[i].disabled=false;
	// 		}
	// 		total.disabled=true;
 //    	} else if(true){
 //    		//职业人数输入不可编辑
 //    		set.innerHTML="点击设置 <img src='images/pencil.png' alt='点击设置'>";
 //    		for (var j=0; j< allocation.length; j++) {
	// 			allocation[j].disabled=true;
	// 		}
	// 		total.disabled=false;
 //    	}
 //    };
   //自定义设置职业人数
   //提示职业人数不能为0
 //    allocation.onchange=function() {
	//     for(var i=0;i<allocation.length;i++){
	//     	if (allocation[i].value === 0) {
	//     		alert("人数不能为0！请重新设置");
	//     	} 
	//     }
	// };





