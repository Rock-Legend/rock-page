/**
 * 
 * @authors gaoxuefeng
 * @date    2017-06-22 03:20:11
 * @version $Id$
 */
 //首页控制
app.controller('HomeCtrl', ['$scope', '$rootScope', '$state', 'fromEndService', function($scope, $rootScope, $state, fromEndService){
	var vm = this;
	//轮播启动
	$('#carousel-home-1').carousel();
	//图片懒加载启动
	$("img.lazy").lazyload({
		effect:'fadeIn'
	});
	//首页轮播约定字段
	vm.type = 0;
	//调用工厂对象中的banner数据
	fromEndService.getBanner(vm.type).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.bParams = response.data.data;
	}, function error(response){
		console.log(response.data);
	});
	//首页轮播图链接跳转事件
	$scope.goToUrl = function (data){
		if(data.charAt(0) == 'w'){
			window.open('http://' + data, '_top');
		} else if (data.charAt(0) == 'h') {
			window.open(data, '_top');
		} else {
			window.open(data, '_blank');
		} 
	};
	//调用工厂对象中的最新职位列表的数据
	fromEndService.getNewJobBanner().then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.nJBParams = response.data.data;
		console.log(vm.nJBParams);
		var a = [];
			b = [];
			c = [];
			d = [];
			e = [];
			vm.nJParams = [];
		//判断数据是否足够每页的数量，如果不足，不再进行数据处理
		if(vm.nJBParams.length <= 4){
			a = vm.nJBParams.slice(0,4);
			vm.nJParams.push(a);
		} else
		if (vm.nJBParams.length <= 8 && vm.nJBParams.length > 4) {
			a = vm.nJBParams.slice(0,4);
			b = vm.nJBParams.slice(4,8);
			vm.nJParams.push(a);
			vm.nJParams.push(b);
		} else
		if (vm.nJBParams.length <= 12 && vm.nJBParams.length > 8) {
			a = vm.nJBParams.slice(0,4);
			b = vm.nJBParams.slice(4,8);
			c = vm.nJBParams.slice(8,12);
			vm.nJParams.push(a);
			vm.nJParams.push(b);
			vm.nJParams.push(c);
		} else
		if (vm.nJBParams.length <= 16 && vm.nJBParams.length > 12) {
			a = vm.nJBParams.slice(0,4);
			b = vm.nJBParams.slice(4,8);
			c = vm.nJBParams.slice(8,12);
			d = vm.nJBParams.slice(12,16);
			vm.nJParams.push(a);
			vm.nJParams.push(b);
			vm.nJParams.push(c);
			vm.nJParams.push(d);
		} else
		if (vm.nJBParams.length <= 20 && vm.nJBParams.length > 16) {
			a = vm.nJBParams.slice(0,4);
			b = vm.nJBParams.slice(4,8);
			c = vm.nJBParams.slice(8,12);
			d = vm.nJBParams.slice(12,16);
			e = vm.nJBParams.slice(16,20);
			vm.nJParams.push(a);
			vm.nJParams.push(b);
			vm.nJParams.push(c);
			vm.nJParams.push(d);
			vm.nJParams.push(e);
		}
		console.log(vm.nJParams);
		//轮播图启动
		$('#carousel-home-2').carousel();
	}, function error(response){
		console.log(response.data);
	});

}]);
