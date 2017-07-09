/**
 * Created by Administrator on 2017/5/21 0021.
 */
// 路由
var app = angular.module("f_myApp",['ui.router','mgcrea.ngStrap','ngMessages','ngAnimate','ui.bootstrap','oc.lazyLoad','angularFileUpload','ngCookies','ui.sortable','ui.date']);
    app.config(function($stateProvider, $urlRouterProvider,$ocLazyLoadProvider){
        //全局配置
        // $ocLazyLoadProvider.config({
        //     debug: true, //知否启用调试模式
        //     events:true  //事件绑定是否启用

        var _lazyLoad = function(loaded) {//定义一个变量函数。这里不太理解，之后再搜搜资料。
            return function($ocLazyLoad) {
                return $ocLazyLoad.load(loaded, {serie: true});
            }
        };


// });
        // 路由配置
        $urlRouterProvider.otherwise("/login");
        // $urlRouterProvider.when("","/login");
        $stateProvider
            // 登录
            .state("login",{
                url:'/login',
                templateUrl:'page/admin/login.html',
                controller:'LoginController',
                controllerAs:'vm'
            })
            .state("field", {
                url : "/sidebar",
                templateUrl : "page/admin/sidebar.html",
                controller:'SidebarController',
                controllerAs:'vm'
            })
            .state("field.welcome", {
                url : "/welcome",
                template : "<h1>Welcome!</h1>"
            })
            // info
            .state("field.companyList", {
                url : "/company?page&name&finacing&province&city&productName&industry&freezed&approved",
                templateUrl : "page/info/company.html",
                controller:'companyController',
                controllerAs:'vm',
                // 开发版
                resolve: {//预加载处理器
                    loadMyFile:_lazyLoad([//懒加载这些文件，要在页面使用某个js文件的内容，都需要引入文件
                        'script/controller/info/company.js'
                    ])
                }

                // 嘉杰版
                // resolve: {
                //     loadMyservice: ['$ocLazyLoad', function($ocLazyLoad) {
                //         return $ocLazyLoad.load([
                //             'script/controller/info/company.js'
                //         ]);
                //     }]
                // }
                // 自己版
                // ,
                // resolve:{
                //     loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                //         return $ocLazyLoad.load(['script/controller/info/company.js'])
                //     }]
                // }

            })
            .state("field.newCompany", {
                url : "/newCompany?id&type&status&page",
                templateUrl : "page/info/newCompany.html",
                controller:'NewCompanyController',
                controllerAs:'vm'
            })
            .state("field.professionList", {
                url : "/vocation?id&page&status&companyName&name&recommend&education&experience&compensation&releaseAt&startAt&endAt&category&Cname&Cid",
                templateUrl : "page/info/vocation.html",
                controller:'VocationController',
                controllerAs:'vm'
            })
            .state("field.newVoca", {
                url : "/newVoca?id&Cid",
                templateUrl : "page/info/newVoca.html",
                controller:'newVocationController',
                controllerAs:'vm'
            })
            // article
            .state("field.articleList", {
                url : "/article?id&status&title&type&updateAt&startAt&endAt&createBy&author&page",
                templateUrl : "page/article/article.html",
                controller:'ArticleController',
                controllerAs:'vm'
            })
            .state("field.newArticle", {
                url : "/newArticle?id",
                templateUrl : "page/article/newArticle.html",
                controller:'NewArticleController',
                controllerAs:'vm'
            })
            // back
            .state("field.role", {
                url : "/role",
                templateUrl : "page/back/role.html",
                controller:'RoleController',
                controllerAs:'vm'
            })
            .state("field.newRole", {
                url : "/newRole?Rid",
                templateUrl : "page/back/newRole.html",
                controller:'NewRoleController',
                controllerAs:'vm'
            })
            .state("field.manager", {
                url : "/account?name&names&rid",
                templateUrl : "page/back/account.html",
                controller:'AccountController',
                controllerAs:'vm'
            })
            .state("field.newAccount", {
                url : "/newAccount?mid",
                templateUrl : "page/back/newAccount.html",
                controller:'NewAccountController',
                controllerAs:'vm'
            })
            .state("field.module", {
                url : "/module?page",
                templateUrl : "page/back/module.html",
                controller:'ModuleController',
                controllerAs:'vm'
            })
            .state("field.newModule", {
                url : "/newModule?mid",
                templateUrl : "page/back/newModule.html",
                controller:'NewModuleController',
                controllerAs:'vm'
            })
            .state("field.pwd", {
                url : "/modify",
                templateUrl : "page/back/modify.html",
                controller:'PwdController',
                controllerAs:'vm'
            })
        ;
    });
    app.run(['$rootScope','$state',function($rootScope,$state){
        $rootScope.$state = $state;
    }]);