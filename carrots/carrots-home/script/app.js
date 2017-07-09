/**
 * Created by gaoxuefeng on 2017/6/2 0941.
 */
var app=angular.module('rApp', ['ui.router', "oc.lazyLoad"]);
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider.state("home",{     //首页
		url:"/home",
		templateUrl: "html/home.html",
		controller:"HomeCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/home.css');
          }]}
	}).state("newjob",{                 //最新职位/推荐职位列表页
		url:"/newjob?recommend&province&industry&education&experience&compensation&releaseAt&name&page&size",
		templateUrl: "html/job/newjob.html",
		controller:"NewjobCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/companyandjobsearch.css');
          }]}
	}).state("jobDetails",{                 //职位详情页
		url:"/job-details?profId&comId",
		templateUrl: "html/job/job-details.html",
		controller:"JobDetailsCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/jobdetails.css');
          }]}
	}).state("jobHunting", {                 //找职位页
		url:"/job-hunting?recommend",
		templateUrl: "html/job-hunting.html",
		controller:"JobHuntingCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(['style/every/findwork.css', 'style/every/carousel-vertical.css']);
          }]}
	}).state("search", {                 //搜索公司/职位页
		url:"/search",
		templateUrl: "html/search.html",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/companyandjobsearch.css');
          }]}
	}).state("search.searchCompany", {                 //-进入公司搜索
		url:"/search-company?approved&name&province&industry&financing&page&size",
		templateUrl: "html/company/company-search.html",
		controller:"SearchCompanyCtrl",
		controllerAs:"vm"
	}).state("companyNotfind", {                 //-无公司搜索结果
		url:"/search-company/notfindCompany?page&size",
		templateUrl: "html/company/notfind-company.html",
		controller:"CompanyNotCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/notfind.css');
          }]}
	}).state("search.searchJob", {                 // -进入职位搜索
		url:"/search-job?name&province&industry&education&experience&compensation&releaseAt&page&size",
		templateUrl: "html/job/job-search.html",
		controller:"SearchJobCtrl",
		controllerAs:"vm"
	}).state("jobNotfind", {                 //-无职位搜索结果
		url:"/search-company/notfindJob?page&size",
		templateUrl: "html/job/notfind-job.html",
		controller:"JobNotCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/notfind.css');
          }]}
	}).state("companyDetails", {                 //公司详情页
		url:"/company-details?comId",
		templateUrl: "html/company/company-details.html",
		controller:"CompanyDetailsCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/companydetails.css');
          }]}
	}).state("companyDetails.product", {                 //公司详情页 公司产品
		url:"/company-details/product",
		templateUrl: "html/company/company-details-company.html",
	}).state("companyDetails.position", {                 //公司详情页 在招职位
		url:"/company-details/position?companyName&category&page&size",
		templateUrl: "html/company/company-details-jobs.html",
		controller:"CompanyDetailsPositionCtrl",
		controllerAs:"vm"
	}).state("outstanding", {         //找精英页
		url:"/outstanding",
		templateUrl: "html/outstandingman.html",
		controller:"OutstandingCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/outstanding.css');
          }]}
	}).state("companyList", {         //成功案例公司列表页
		url:"/company-list?approved&province&financing&industry&page&size",
		templateUrl: "html/company/company-list.html",
		controller:"CompanyListCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/companylist.css');
          }]}
	}).state("withus", {              //关于我们页
		url:"/withus",
		templateUrl: "html/aboutus/withus.html",
		controller:"WithusCtrl",
		controllerAs:"vm",
		resolve: {
          loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('style/every/aboutus.css');
          }]}
	}).state("withus.callus", {       //以下是关于我们页的二级跳转跳转
		url:"/withus1",
		templateUrl: "html/aboutus/callus.html",
		controller:function(){
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		},
	}).state("withus.aboutus", {
		url:"/withus2",
		templateUrl: "html/aboutus/aboutus.html",
		controller:function(){
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		},
	});
}]);
//导航栏状态显示注入$state
app.run(['$rootScope','$state', function($rootScope, $state){
	$rootScope.$state = $state;
}]);
