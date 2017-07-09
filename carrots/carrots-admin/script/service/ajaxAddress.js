/**
 * Created by Shinelon on 2017/5/31.
 */
app.factory('pathProject',[function(){
    return {
        //登录
        postLogin:function(){
            return '/carrots-admin-ajax-FR/a/login'
        },
        //-----info
        //公司列表
        getCompanyList:function(){
            return '/carrots-admin-ajax-FR/a/u/company/search'
        },
        putCompanyStatus:function(id){
            return '/carrots-admin-ajax-FR/a/u/company/status/'+id
        },
        getVocationList:function(){
            return '/carrots-admin-ajax-FR/a/u/profession/search/'
        },
        getCompanyVocationList:function(name){
            return '/carrots-admin-ajax-FR/a/u/profession/search?companyName='+name
        },
        deleteVocationInfo:function(id){
            return '/carrots-admin-ajax-FR/a/u/profession/'+id
        },
        postVocationInfo:function(){
            return '/carrots-admin-ajax-FR/a/u/profession'
        },
        getCompanyInfo:function(id){
            return '/carrots-admin-ajax-FR/a/u/company/'+id
        },
        putProfessionStatus:function(id){
            return '/carrots-admin-ajax-FR/a/u/profession/status/'+id
        },
        getCompanyTag:function(id){
            return '/carrots-admin-ajax-FR/a/u/companyTag/list/'+id
        },
        postCompanyInfo:function(){
            return '/carrots-admin-ajax-FR/a/u/company'
        },
        getTag:function(id){
            return '/carrots-admin-ajax-FR/a/u/companyTag/list/'+id;
        },

        // article部分

        getArticle:function(){
            return '/carrots-admin-ajax-FR/a/u/article/search'
        },
        putArticleRank:function(id){
            return '/carrots-admin-ajax-FR/a/u/article/rank?rank='+id;
        },
        postArticle:function(){
            return '/carrots-admin-ajax-FR/a/u/article'
        },
        getArticleInfo:function(id){
            return '/carrots-admin-ajax-FR/a/u/article/'+id
        },
        putArticleStatus:function(id,status){
            return '/carrots-admin-ajax-FR/a/u/article/status/?id='+id+'&status='+status
        },
        postCompanyImg:function(){
            return '/carrots-admin-ajax-FR/a/u/img/module/'
        },
        // 后台部分
        // 获取账号列表
        getManager:function(){
            return '/carrots-admin-ajax-FR/a/u/manager/'
        },
        // 获取账号信息
        getManagerInfo:function(mid){
            return '/carrots-admin-ajax-FR/a/u/manager/'+mid
        },
        // 搜索账号信息
        getRoleManager:function(rid){
            return '/carrots-admin-ajax-FR/a/u/role/'+rid+'/manager'
        },
        // 获取账号列表
        getManagers:function(mid){
            return '/carrots-admin-ajax-FR/a/u/multi/manager?ids='+mid
        },

        // 角色部分

        // 获取角色列表
        getRole:function(){
            return '/carrots-admin-ajax-FR/a/u/role/'
        },
        // 获取角色详细信息
        getRoleInfo:function(rid){
            return '/carrots-admin-ajax-FR/a/u/role/'+rid;
        },
        // 批量获取角色详细信息
        getRoleInfos:function(rid){
            return '/carrots-admin-ajax-FR/a/u/multi/role?ids='+rid;
        },

        // 模块部分

        // 获取模块信息
        getModule:function(){
            return '/carrots-admin-ajax-FR/a/u/module/';
        },
        // 获取很多模块信息
        getModuleSize:function(size){
            return '/carrots-admin-ajax-FR/a/u/module/?size='+size;
        },
        // 获取单个模块信息
        getModuleInfo:function(mid){
            return '/carrots-admin-ajax-FR/a/u/module/'+mid;
        },
        // 删除模块信息
        deleteModule:function(mid){
            return '/carrots-admin-ajax-FR/a/u/module/'+mid;
        },
        // 批量获取模块信息
        getModules:function(mid){
            return '/carrots-admin-ajax-FR/a/u/multi/module?ids='+mid;
        },



        // 修改密码
        putPwd:function(params){
            return '/carrots-admin-ajax-FR/a/u/pwd';
        }
        // ,
        // deletetCompanyInfo:function(id){
        //     return '/a/u/company'+id
        // }
    }
}]);