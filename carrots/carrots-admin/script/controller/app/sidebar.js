/**
 * Created by Shinelon on 2017/5/25.
 */
/**
 * Created by SEE on 2017/6/10.
 */
app.controller('SidebarController',['$scope','infoService','$state','$cookies', '$cookieStore',function($scope,infoService,$state,$cookies,$cookieStore) {
    var vm = this;
    // 获取账号ID
    vm.id = $cookies.get("www.zonzii.com");
    if(vm.id == undefined){
        alert('请登录');
        $state.go('login');
    }
    vm.mid = vm.id.split('|')[0];

    // 请求账号信息
    infoService.getManagers(vm.mid).then(function(res){
        vm.manager = res.data.data.managerList[0];
        // 通过账号信息请求角色信息
        infoService.getRoleInfo(vm.manager.roleID).then(function(res){
            vm.role = res.data.data.role;
            vm.power = res.data.data.role.permissionsSet;
            // 处理账号信息
            vm.powers = [];
            angular.forEach(vm.power,function(data,index){
                vm.powers.push(index);
            });
            vm.mid = vm.powers.join('&ids=');
            // 通过账号信息请求模块详细信息
            infoService.getModules(vm.mid).then(function(res){
                // 处理模块信息
                // 找父级
                vm.parent = [];
                vm.modules = res.data.data.moduleList;
                angular.forEach(vm.modules,function(data,index){
                    if(data.parentID === 0){
                        vm.parent.push(data);
                    }
                });
                // 为父级添加子级
                angular.forEach(vm.parent,function(item){
                    item.child=[];
                    angular.forEach(vm.modules,function(item2){
                        if(item2.parentID === item.id){
                            item.child.push(item2)
                        }
                    })
                });
            })
        })
    });
    // 退出
    vm.f_logout = function(){
        $cookies.remove("JSESSIONID");
        $cookies.remove("www.zonzii.com");
        alert('退出成功！');
        $state.go('login');
    }
}]);