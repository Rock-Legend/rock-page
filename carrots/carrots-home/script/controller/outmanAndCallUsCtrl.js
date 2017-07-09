/**
 * @authors gaoxuefeng
 * @date    2017-06-03 10:51:45
 * @version $Id$
 */
//找精英页面
app.controller('OutstandingCtrl', ['$scope', '$stateParams', 'fromEndService', function($scope, $stateParams, fromEndService){
	//图片懒加载启动
	$("img.lazy").lazyload({
		effect:'fadeIn'
	});
	var vm = this;
	//找精英banner字段
	vm.type = 2;
	//调用工厂对象中找精英的banner数据
	fromEndService.getBanner(vm.type).then(function success(response){
		console.log(response.data.message);
		console.log(response.data.code);
		vm.bParams = response.data.data;
		console.log(vm.bParams);
		//找精英轮播图链接跳转事件
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
	//认证公司数据约定
	vm.approved = '1';
	//调用工厂对象中的找精英中8个成功公司logo的数据
	fromEndService.getCompanyLogo(vm.approved).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.cLParams = response.data.data;
	}, function error(response){
		console.log(response.data);
	});
	//启动轮播图
	$('#carousel-6').carousel();
}]);
//合作公司页
app.controller('CompanyListCtrl', ['$scope', '$state', '$stateParams', 'fromEndService', '$window', '$location', '$rootScope', '$anchorScroll', function($scope, $state, $stateParams, fromEndService, $window, $location, $rootScope, $anchorScroll){
	var vm = this;
	//页面跳转置顶显示，使用以下两行代码
	$location.hash(''); 
	$anchorScroll();
	vm.formData = new FormData();
	vm.formData.approved = $stateParams.approved;
	vm.formData.province = $stateParams.province;
	vm.formData.industry = $stateParams.industry;
	vm.formData.finacing = $stateParams.financing;
	vm.formData.page = $stateParams.page;
	vm.formData.size = $stateParams.size;
	console.log($stateParams);
	//调用工厂对象中的成功公司列表的数据
	fromEndService.getCompanyList(vm.formData).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.total = response.data.total;
		vm.cLParams = response.data.data;
		//如果返回数据是空的，跳转到推荐公司页
		if (vm.cLParams.length === 0){
			$state.go('companyNotfind',{
				page: 1,
				size: 3,
			},{reload:true});
		}
		$scope.province = $stateParams.province || '';
		$scope.industry = $stateParams.industry || '';
		$scope.financing = $stateParams.financing || '';
	}, function error(response){
		console.log(response.data);
	});
	$('#carousel-6').carousel();
	//条件筛选点击处理
	$('input[name=province-choose]').click(function(){
		console.log(this.value);
		$state.go($state.current,{
			province:this.value
		},{reload:true});
	});
	$('input[name=financing-choose]').click(function(){
		console.log(this.value);
		$state.go($state.current,{
			financing:this.value
		},{reload:true});
	});
	$('input[name=industry-choose]').click(function(){
		console.log(this.value);
		$state.go($state.current,{
			industry:this.value
		},{reload:true});
	});
}]);
//关于我们页面跳转控制
app.controller('WithusCtrl', ['$scope', '$state', 'fromEndService', '$window', '$location', '$rootScope', '$anchorScroll', function($scope, $state, fromEndService, $window, $location, $rootScope, $anchorScroll){
	var vm = this;
	// //页面跳转置顶显示，使用以下两行代码
	// $location.hash(''); 
	// $anchorScroll();
	
}]);
