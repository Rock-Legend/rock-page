/**
 * 
 * @authors gaoxuefeng
 * @date    2017-06-05 10:53:09
 * @version $Id$
 */
// 职位详情页内容渲染过滤
// 学历
app.filter('education', function(){
	return function(education){
		if(education === '0'){
			return "大专";
		} else if (education == 1){
			return "本科";
		} else if (education == 2){
			return "硕士";
		} else if (education == 3){
			return "博士及以上";
		} else {
			// return "不限学历";
		} 
	};
});
// 工作经验
app.filter('experience', function(){
	return function(experience){
		if(experience === "0"){
			return "应届毕业生";
		} else if (experience == 1){
			return "1~3年";
		} else if (experience == 2){
			return "3~5年";
		} else if (experience == 3){
			return "6~9年";
		} else if (experience == 4){
			return "10年及以上";
		} else {
			return "不限";
		}
	};
});
// 薪资水平
app.filter('compensation', function(){
	return function(compensation){
		if(compensation === "0"){
			return "8K以内";
		} else if (compensation == 1){
			return "8K~15K";
		} else if (compensation == 2){
			return "16K~25K";
		} else if (compensation == 3){
			return "26K及以上";
		} else {
			return "薪资面议";
		}
	};
});
// 所在地区
app.filter('province', function(province){
	return function(input){
		if(input !== undefined && input !== ''){
			var provinceName;
			angular.forEach(province, function(data){
				if(data.ProID == input){
					provinceName = data.ProName;
				}
			});
			return provinceName;
		} 
	};
});
app.filter('city', function(city){
	return function(input){
		if(input !== undefined && input !== ''){
			var cityName;
			angular.forEach(city, function(data){
				if(data.CityID == input){
					cityName = data.CityName;
				}
			});
			return cityName;
		} 
	};
});
app.filter('county', function(county){
	return function(input){
		if(input !== undefined && input !== ''){
			var countyName;
			angular.forEach(county, function(data){
				if(data.CountyID == input){
					countyName = data.CountyName;
				}
			});
			return countyName;
		} 
	};
});
//公司所属行业
app.filter('industry', function(){
	return function(industry){
		if(industry === '0'){
			return "移动互联网";
		} else if(industry == 1){
			return "电子商务";
		} else if(industry == 2){
			return "企业服务";
		} else if(industry == 3){
			return "O2O";
		} else if(industry == 4){
			return "教育";
		} else if(industry == 5){
			return "金融";
		} else if(industry == 6){
			return "游戏";
		} 
	};
});
//融资规模过滤
app.filter('financing', function(){
	return function(financing){
		if (financing === '0') {
			return '无需融资';
		} else if (financing == 1){
			return '天使轮';
		} else if (financing == 2){
			return 'A轮';
		} else if (financing == 3){
			return 'B轮';
		} else if (financing == 4){
			return 'C轮';
		} else if (financing == 5){
			return 'D轮及以上';
		} else if (financing == 5){
			return '上市公司';
		}
	};
});
//在招职位过滤
app.filter('professions', function(){
	return function(professions){
		var c = [];	
			i = 0;
			i++;
		c = professions.split('1').join(' | ');
		console.log(c);
   		return c;
	};
});
//Tag过滤
app.filter('tag', function(){
	return function(companyTags){
		var c = [];	
		c = companyTags.split(',');
		return c ;
	};
});