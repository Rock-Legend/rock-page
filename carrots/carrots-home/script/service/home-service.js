/**
 * 
 * @authors gaoxuefeng
 * @date    2017-06-03 10:58:40
 * @version $Id$
 */
 // 首页顶部banner图数据请求
 // app.service('homebanner', ['$http', function($http){
 // 	$http({
 // 		method: 'get',
 // 		url: '/carrots-ajax/',
 // 		params: {},
 // 		header: {'Content-Type': undefined}
 // 	}).success(function(){

 // 	}).error(function(){

 // 	});
 // }]);
 
//使用工厂对象建立向后台请求数据的集合
app.factory('fromEndService', ['$http', function($http){
	return {
		//首页最新职位轮播数据
		getNewJobBanner: function(){
			return $http({
		 		method: 'get',
		 		url: '/carrots-ajax-FR/a/profession/search',
		 		params: {recommend: 0, size: 20},
		 		header: {'Content-Type': undefined}
		 	});
		},
		getBanner: function(data){
			console.log(data);
			return $http({
		 		method: 'get',
		 		url: '/carrots-ajax-FR/a/article/search',
		 		params: {type: data},
		 		header: {'Content-Type': undefined}
		 	});
		},
		// 简单职位列表数据 （最新职位/推荐职位轮播/在招职位）
		getProfessionList: function(data){
			console.log(data);
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/profession/search',
				params: data,
				header: {'Content-Type': undefined}
			});
	    },
	    // 全部职位列表数据（最新职位/推荐职位列表/职位搜索页列表）
		getAllProfessionList: function(data){
			console.log(data);
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/professionInfo/search',
				params: data,
				header: {'Content-Type': undefined}
			});
	    },
	    // 职位详情信息数据
	    getProfessionOne: function(id){
	    	console.log(id);
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/profession/' + id,
				header: {'Content-Type': undefined}
			});
	    },
	    // 公司列表数据
	    getCompanyList: function(data){
	    	console.log(data);
	    	console.log(typeof(data));
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/company/search',
				params: data,
				header: {'Content-Type': undefined}
			});
	    },
	    // 公司详情信息数据
	    getCompanyOne: function(id){
	    	console.log(id);
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/company/' + id,
				header: {'Content-Type': undefined}
			});
	    },
	    // 公司标签数据
	    getCompanyTag: function(){
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/company_tag/' + id,
				header: {'Content-Type': undefined}
			});
	    },
	    // 普通公司/认证公司logo数据（8条/找职位页;8条/找精英成功案例）
	    getCompanyLogo: function(data){
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/company/logo/list',
				params: {approved: data},
				header: {'Content-Type': undefined}
			});
	    },
	    // 行业大图数据
	    getIndustryArticle: function(){
			return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/article/industry',
				header: {'Content-Type': undefined}
			});
	    },
	    getHotCompanyList: function(){
	    	return $http({
				method: 'get',
				url: '/carrots-ajax-FR/a/hotCompanyProfession/search',
				params: {page: 1, size: 4},
				header: {'Content-Type': undefined}
			});
	    },
	};
}]);