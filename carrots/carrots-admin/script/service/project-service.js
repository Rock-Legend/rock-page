/**
 * Created by Shinelon on 2017/5/31.
 */
app.factory('infoService',['pathProject','$http',function(pathProject,$http){
    return {
        //登录
        postLogin:function(params){
            return $http.post(pathProject.postLogin(),params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        },
        // postLogin:function(params){
        //     return $http.post(pathProject.postLogin(),{params:params})
        // },
        //公司列表
        getCompanyList:function(params){
            return $http.get(pathProject.getCompanyList(),{params:params})
        }
        // putCompanyStatus:function(id,params){
        //     return $http.put(pathProject.putCompanyStatus(id),{params:params})
        // }
        ,
        // 修改公司状态
        putCompanyStatus:function(id,params){
            return $http({method:'put',url:pathProject.putCompanyStatus(id),params:params,headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        },
        // 获取职位列表
        getVocationList:function(params){
            return $http.get(pathProject.getVocationList(),{params:params})
        },
        // 获取公司职位列表
        getCompanyVocationList:function(name,params){
            return $http.get(pathProject.getCompanyVocationList(name),{params:params})
        },
        // 获取公司职位信息
        getVocationInfo:function(id){
            return $http.get(pathProject.deleteVocationInfo(id))
        },
        // 修改职位信息
        putCompanyVocationList:function(id,params){
            return $http.put(pathProject.deleteVocationInfo(id),params,{headers:{'Content-Type':'application/json'}})
        },
        // 新增职位信息
        postVocationInfo:function(params){
            return $http.post(pathProject.postVocationInfo(),params,{headers:{'Content-Type':'application/json'}})
        },
        // 删除职位信息
        deleteVocationInfo:function(id){
            return $http.delete(pathProject.deleteVocationInfo(id))
        },
        // 获取单个公司信息
        getCompanyInfo:function(id){
            return $http.get(pathProject.getCompanyInfo(id))
        },
        // 删除公司信息
        deleteCompanyInfo:function(id){
            return $http.delete(pathProject.getCompanyInfo(id))
        },
        // 获取公司标签
        getCompanyTag:function(id){
            return $http.get(pathProject.getCompanyTag(id))
        },
        // putCompanyInfo:function(id,company){
        //     return $http({method:'put',url:pathProject.putCompanyInfo(id),params:company,headers:{'Content-Type':'application/json'}});
        // },
        // 修改公司信息
        putCompanyInfo:function(id,params){
            return $http.put(pathProject.getCompanyInfo(id),params,{headers:{'Content-Type':'application/json'}});
        },
        // 获取标签
        getTag:function(id){
            return $http.get(pathProject.getTag(id));
        },

        // article部分

        // 获取article信息
        getArticle:function(params){
            return $http.get(pathProject.getArticle(),{params:params});
        },
        // 获取article信息
        putArticleRank:function(ids){
            return $http.put(pathProject.putArticleRank(ids));
        },
        // 获取article详细信息
        getArticleInfo:function(id){
            return $http.get(pathProject.getArticleInfo(id));
        },
        // 删除article详细信息
        deleteArticleInfo:function(id){
            return $http.delete(pathProject.getArticleInfo(id));
        },
        // 修改article详细信息
        putArticleInfo:function(id,params){
            return $http.put(pathProject.getArticleInfo(id),params);
        },
        // 新增article详细信息
        postArticleInfo:function(params){
            return $http.post(pathProject.postArticle(),params);
        },
        // 修改article信息
        putArticleStatus:function(id,status){
            return $http.put(pathProject.putArticleStatus(id,status));
        },
        // postCompanyImg:function(params){
        //     return $http.post(pathProject.postCompanyImg(),params);
        // },
        // 新增公司信息
        postCompanyInfo:function(params){
            return $http.post(pathProject.postCompanyInfo(),params,{headers:{'Content-Type':'application/json'}});
        },
        // 修改职位状态
        putProfessionStatus:function(id,params){
            return $http({method:'put',url:pathProject.putProfessionStatus(id),params:params,headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        },

        // 后台部分

        // 获取账号列表
        getManager:function(){
            return $http.get(pathProject.getManager())
        },
        // 获取搜索账号列表
        getRoleManager:function(rid){
            return $http.get(pathProject.getRoleManager(rid))
        },
        // 新增账号
        postManager:function(params){
            return $http.post(pathProject.getManager(),params,{'Content-Type':'application/json'})
        },
        // 获取账号信息
        getManagerInfo:function(mid){
            return $http.get(pathProject.getManagerInfo(mid))
        },
        // 修改账号信息
        putManagerInfo:function(mid,params){
            return $http.put(pathProject.getManagerInfo(mid),params,{'Content-Type':'application/json'})
        },
        // 修改密码
        putPwd:function(params){
            return $http.put(pathProject.putPwd(),params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        },
        // 删除账号信息
        deleteManagerInfo:function(mid){
            return $http.delete(pathProject.getManagerInfo(mid))
        },
        // 获取账号列表
        getManagers:function(mid){
            return $http.get(pathProject.getManagers(mid))
        },

        // 角色部分

        // 获取角色列表
        getRole:function(){
            return $http.get(pathProject.getRole())
        },
        // 新增角色列表
        postRole:function(params){
            return $http.post(pathProject.getRole(),params,{'Content-Type':'application/json'})
        },
        // 获取角色详细信息
        getRoleInfo:function(rid){
            return $http.get(pathProject.getRoleInfo(rid))
        },
        // 删除角色详细信息
        deleteRoleInfo:function(rid){
            return $http.delete(pathProject.getRoleInfo(rid))
        },
        // 修改角色详细信息
        putRoleInfo:function(rid,params){
            return $http.put(pathProject.getRoleInfo(rid),params,{headers:{'Content-Type':'application/json'}})
        },
        // 批量获取角色详细信息
        getRoleInfos:function(rid){
            return $http.get(pathProject.getRoleInfos(rid))
        },

        // 模块部分

        // 获取module信息
        getModule:function(params){
            return $http.get(pathProject.getModule(),{params:params})
        },
        // 获取单个module信息
        getModuleInfo:function(mid){
            return $http.get(pathProject.getModuleInfo(mid))
        },
        // 修改单个module信息
        putModuleInfo:function(mid,params){
            return $http.put(pathProject.getModuleInfo(mid),params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        },
        // 删除module信息
        deleteModule:function(mid){
            return $http.delete(pathProject.deleteModule(mid))
        },
        // 新增module信息
        postModule:function(params){
            return $http.post(pathProject.getModule(),params,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        },
        // 批量获取module信息
        getModules:function(mid){
            return $http.get(pathProject.getModules(mid))
        },
        // 单词获取很多module信息
        getModuleSize:function(size){
            return $http.get(pathProject.getModuleSize(size))
        }
    }
}]);