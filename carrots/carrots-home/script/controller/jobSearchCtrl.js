/**
 * 
 * @authors gaoxuefeng
 * @date    2017-06-22 03:25:42
 * @version $Id$
 */
//找职位页控制
app.controller('JobHuntingCtrl', ['$scope', '$stateParams', 'fromEndService', function($scope, $stateParams, fromEndService){
	//图片懒加载启动
	$("img.lazy").lazyload({
		effect:'fadeIn',
	});
	//轮播图启动
	$('#carousel-3').carousel();
	var vm = this;
	vm.formData = new FormData();
	$scope.recommend = $stateParams.recommend;
	vm.formData.recommend = $stateParams.recommend;
	vm.formData.page = '1';
	vm.formData.size = '8';
	//调用工厂对象中的找职位中最新职位/推荐职位的数据
	fromEndService.getProfessionList(vm.formData).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.pLParams = response.data.data;
	}, function error(response){
		console.log(response.data);
	});
	//找职位banner字段
	vm.type = 1;
	//调用工厂对象中找职位的banner数据
	fromEndService.getBanner(vm.type).then(function success(response){
		console.log(response.data.message);
		console.log(response.data.code);
		vm.bParams = response.data.data;
		//找职位轮播图链接跳转事件
		$scope.goToUrl = function (data){
			if(data.charAt(0) == 'w'){
				window.open('http://' + data, '_top');
			} else if (data.charAt(0) == 'h') {
				window.open(data, '_top');
			} else {
				window.open(data, '_blank');
			} 
		};
	}, function error(response){
		console.log(response.data);
	});
	
	//普通未认证的公司数据请求
	vm.approved = '0';
	//调用工厂对象中的找职位中8个普通公司logo的数据
	fromEndService.getCompanyLogo(vm.approved).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.cLParams = response.data.data;
	}, function error(response){
		console.log(response.data);
	});
	// 行业大图数据处理
	fromEndService.getIndustryArticle().then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.iParams = response.data;
		vm.iAParams = response.data.data;
		//渲染为背景图片
		$('.findwork-content3-cont1').css({'background':'url('+ vm.iAParams.img +') no-repeat 50%','background-size':'cover'});
	}, function error(response){
		console.log(response.data);
	});
	//最新4个认证公司轮播数据
	fromEndService.getHotCompanyList().then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.hCParams = response.data.data;
		console.log(vm.hCParams);
		//轮播图启动
		$('#carousel-4').carousel();
	}, function error(response){
		console.log(response.data);
	});
}]);
