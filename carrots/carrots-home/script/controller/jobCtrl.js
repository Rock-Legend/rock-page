/**
 * 
 * @authors gaoxuefeng
 * @date    2017-06-22 03:22:30
 * @version $Id$
 */
//最新职位/推荐职位列表页控制
app.controller('NewjobCtrl', ['$scope', '$state', '$stateParams', 'fromEndService', '$window', '$location', '$rootScope', '$anchorScroll', function($scope, $state, $stateParams, fromEndService, $window, $location, $rootScope, $anchorScroll){
	//页面跳转置顶显示，使用以下两行代码
	$location.hash(''); 
	$anchorScroll();
	var vm = this;
	vm.formData = new FormData();
	vm.formData.recommend = $stateParams.recommend;
	vm.formData.page = $stateParams.page;
	vm.formData.size = $stateParams.size;
	vm.formData.name = $stateParams.name;
	vm.formData.province = $stateParams.province;
	vm.formData.industry = $stateParams.industry;
	vm.formData.education = $stateParams.education;
	vm.formData.experience = $stateParams.experience;
	vm.formData.compensation = $stateParams.compensation;
	vm.formData.releaseAt = $stateParams.releaseAt;
	//调用工厂对象中的最新职位列表的数据
	fromEndService.getAllProfessionList(vm.formData).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.total = response.data.total;
		console.log(vm.total);
		console.log(response.data.size);
		vm.jBParams = response.data.data;
		console.log(vm.jBParams);
		//无搜索结果的话，跳转到职位无搜索结果页
		if(vm.jBParams.length === 0){
			$state.go('jobNotfind',{
				page: 1,
				size: 3,
			},{reload:true});
		}
		//根据上次的请求结果渲染表单页面
		$scope.recommend = $stateParams.recommend;
		$scope.name = $stateParams.name;
		$scope.province = $stateParams.province || '';
        $scope.industry = $stateParams.industry || '';
        $scope.education = $stateParams.education || '';
        $scope.experience = $stateParams.experience || '';
        $scope.compensation = $stateParams.compensation || '';
        $scope.releaseAt = $stateParams.releaseAt || '';
        $scope.day = $stateParams.releaseAt;
	}, function error(response){
		console.log(response.data);
	});
	//清除选项
	$scope.reset= function(){
		$state.go($state.current,{
			name: '',
			province: '',
			industry: '',
			education: '',
			experience: '',
			compensation: '',
			releaseAt: '',
			page: '1',
			size: '8',
		},{reload:true});
	};
}]);
//职位详情页控制
app.controller('JobDetailsCtrl', ['$scope', '$stateParams', 'fromEndService', function($scope, $stateParams, fromEndService){
	var vm = this;
	//显示从顶部开始
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	//传递职位id和公司id
	vm.profId = $stateParams.profId;
	vm.comId = $stateParams.comId;
	//调用工厂对象中的职位详情的数据
	fromEndService.getProfessionOne(vm.profId).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.jDParams = response.data.data;
		console.log(vm.jDParams);
		vm.jDParams.resp = vm.jDParams.responsibility.split('\n');
		vm.jDParams.requi = vm.jDParams.requisite.split('\n');
		vm.jDParams.bo = vm.jDParams.boon.split('\n');
	}, function error(response){
		console.log(response.data);
	});
	//调用工厂对象中的公司详情的数据
	fromEndService.getCompanyOne(vm.comId).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.cDParams = response.data.data;
		console.log(vm.cDParams);
	}, function error(response){
		console.log(response.data);
	});
}]);
//找职位跳转-职位搜索页控制
app.controller('SearchJobCtrl', ['$scope', '$state', '$stateParams', 'fromEndService',  '$window', '$location', '$rootScope', '$anchorScroll', function($scope, $state, $stateParams, fromEndService,  $window, $location, $rootScope, $anchorScroll){
	var vm = this;
	//页面跳转置顶显示，使用以下两行代码
	$location.hash(''); 
	$anchorScroll();
	vm.formData = new FormData();
	// vm.formData.recommend = 0;
	vm.formData.page = $stateParams.page;
	vm.formData.size = 10;
	vm.formData.name = $stateParams.name;
	vm.formData.province = $stateParams.province;
	vm.formData.industry = $stateParams.industry;
	vm.formData.education = $stateParams.education;
	vm.formData.experience = $stateParams.experience;
	vm.formData.compensation = $stateParams.compensation;
	vm.formData.releaseAt = $stateParams.releaseAt;
	console.log(vm.formData);
	//调用工厂对象中的职位列表的数据
	fromEndService.getAllProfessionList(vm.formData).then(function success(response){
		console.log(response.data.code);
		console.log(response.data.message);
		vm.total = response.data.total;
		vm.jSParams = response.data.data;
		console.log(vm.jSParams);
		//如果返回数据是空的，跳转到推荐职位页
		if (vm.jSParams.length === 0){
			$state.go('jobNotfind',{
				page: 1,
				size: 3,
			},{reload:true});
		}
		$scope.name = $stateParams.name;
		$scope.recommend = $stateParams.recommend;
		$scope.companyName = $stateParams.companyName;
		$scope.province = $stateParams.province || '';
        $scope.industry = $stateParams.industry || '';
        $scope.education = $stateParams.education || '';
        $scope.experience = $stateParams.experience || '';
        $scope.compensation = $stateParams.compensation || '';
        $scope.releaseAt = $stateParams.releaseAt || '';
        $scope.day = $stateParams.releaseAt;
	}, function error(response){
		console.log(response.data);
	});
	//清除选项
	$scope.reset= function(){
		$state.go($state.current,{
			name: '',
			province: '',
			industry: '',
			education: '',
			experience: '',
			compensation: '',
			releaseAt: '',
			page: '1',
			size: '10',
		},{reload:true});
	};
}]);
//无搜索职位信息页的显示控制
app.controller('JobNotCtrl', ['$scope', '$stateParams', 'fromEndService', function($scope, $stateParams, fromEndService){
	var vm = this;
	vm.formData = new FormData();
	vm.formData.recommend = '1';
	vm.formData.page = $stateParams.page;
	vm.formData.size = $stateParams.size;
	//调用工厂对象中的公司详情的数据
	fromEndService.getProfessionList(vm.formData).then(function success(response){
		console.log(response.data.message);
		vm.notCParams = response.data.data;
	}, function error(response){
		console.log(response.data);
	});
}]);