/**
 * 
 * @authors gaoxuefeng
 * @date    2017-06-22 03:27:41
 * @version $Id$
 */
//找职位跳转-公司搜索页控制
app.controller('SearchCompanyCtrl', ['$scope', '$state', '$stateParams', 'fromEndService', '$window', '$location', '$rootScope', '$anchorScroll', function($scope, $state, $stateParams, fromEndService, $window, $location, $rootScope, $anchorScroll){
	var vm = this;
	//页面跳转置顶显示，使用以下两行代码
	$location.hash(''); 
	$anchorScroll();
	vm.formData = new FormData();
	vm.formData.name = $stateParams.name;
	vm.formData.province = $stateParams.province;
	vm.formData.approved = $stateParams.approved;
	vm.formData.finacing = $stateParams.financing;
	vm.formData.industry = $stateParams.industry;
	vm.formData.page = $stateParams.page;
	vm.formData.size = $stateParams.size;
	console.log(vm.formData);
	//调用工厂对象中的公司列表的数据
	fromEndService.getCompanyList(vm.formData).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.total = response.data.total;
		vm.cSParams = response.data.data;
		//如果返回数据是空的，跳转到推荐公司页
		if (vm.cSParams.length === 0){
			$state.go('companyNotfind',{
				page: 1,
				size: 3,
			},{reload:true});
		}
		$scope.name = $stateParams.name;
		$scope.province = $stateParams.province || '';
		$scope.industry = $stateParams.industry || '';
		$scope.financing = $stateParams.financing || '';
	}, function error(response){
		console.log(response.data);
	});
	$scope.reset= function(){
		$state.go($state.current,{
			name: '',
			province: '',
			industry: '',
			financing: '',
			page: '1',
			size: '9',
		},{reload:true});
	};
}]);
//无公司搜索信息页的显示控制
app.controller('CompanyNotCtrl', ['$scope', '$state', '$stateParams', 'fromEndService', function($scope, $state, $stateParams, fromEndService){
	var vm = this;
	vm.formData = new FormData();
	vm.formData.page = $stateParams.page;
	vm.formData.size = $stateParams.size;
	console.log(vm.formData);
	//调用工厂对象中的公司详情的数据
	fromEndService.getCompanyList(vm.formData).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.notCParams = response.data.data;
	}, function error(response){
		console.log(response.data);
	});
}]);
//公司详情页控制
app.controller('CompanyDetailsCtrl', ['$scope', '$rootScope', '$stateParams', 'fromEndService', function($scope, $rootScope, $stateParams, fromEndService){
	var vm = this;
	//显示从顶部开始
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	vm.comId = $stateParams.comId;
	//调用工厂对象中的公司详情的数据
	fromEndService.getCompanyOne(vm.comId).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.cDParams = response.data.data;
		console.log(vm.cDParams);
		vm.cDParams.proSum = vm.cDParams.productSummary.split('\n');
		vm.cDParams.sum = vm.cDParams.summary.split('\n');
		//向在招职位列表传递省的代码
		$rootScope.province = vm.cDParams.province;
		console.log($rootScope.province);
	}, function error(response){
		console.log(response.data);
	});
}]);
//公司详情页控制-在招职位信息获取 由于在上边控制器中请求是会出现公司信息和在招职位信息请求
//为了点击在招职位按钮才触发在招职位的请求因此又添加了一个控制器
app.controller('CompanyDetailsPositionCtrl', ['$scope', '$state', '$stateParams', 'fromEndService', '$window', '$location', '$rootScope', '$anchorScroll', function($scope, $state, $stateParams, fromEndService, $window, $location, $rootScope, $anchorScroll){
	var vm = this;
	//页面跳转置顶显示，使用以下两行代码
	$location.hash(''); 
	$anchorScroll();
	vm.formData = new FormData();
	vm.formData.companyName = $stateParams.companyName;
	vm.formData.category= $stateParams.category;
	vm.formData.page = $stateParams.page;
	vm.formData.size = $stateParams.size;
	console.log(vm.formData);
	//调用工厂对象中的公司详情在招职位的数据
	fromEndService.getProfessionList(vm.formData).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.total = response.data.total;
		vm.cDLParams = response.data.data;
		console.log(vm.cDLParams);
		console.log($rootScope.province);
		$scope.$on('add', function(event, data){
		console.log(data);
		console.log(event);
        $stateParams.province = data;
        console.log($stateParams.province);
	});
		$scope.category = $stateParams.category || '';
	}, function error(response){
		console.log(response.data);
	});
	//在招职位按职业类别进行搜查的功能
	$('input[name=category-choose]').click(function(){
		console.log(this.value);
		$state.go($state.current,{
			category:this.value,
			page: 1,
			size: 10,
		},{reload:false});
	});
}]);
