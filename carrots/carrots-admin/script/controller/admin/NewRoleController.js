/**
 * Created by Free Wang on 2017/6/14.
 */
(function(){
    'use strict';


    angular.module("f_myApp").controller('NewRoleController', ControllerName);

    // ControllerName.$inject = ['dependency'];

    /* @ngInject */
    function ControllerName($state,infoService){
        var vm = this;
        vm.role = {};
        vm.role.id = $state.params.Rid;
        vm.all = [];
        activate();
        ////////////////
        function activate(){
            vm.size = 999;
            infoService.getModuleSize(vm.size).then(function(res){
                vm.ids = res.data.data.ids;
                vm.total = res.data.data.total;
                infoService.getModules(vm.ids.join('&ids=')).then(function(res){
                    vm.modules = res.data.data.moduleList;
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
            });

            // 如果是编辑初始默认值

            if(vm.role.id !== undefined){
                infoService.getRoleInfo(vm.role.id).then(function(res){
                    vm.mid = res.data.data.role.permissionsSet;
                    console.log(vm.mid)

                });

            }
        }
        vm.f_save = function(){
            if(vm.role.id !== undefined){
                infoService.putRoleInfo(vm.role.id,vm.role).then(function(res){
                    if(res.data.code ===0){
                        alert(res.data.message);
                        $state.go('field.role',{},{reload:true});
                    }else {alert(res.data.message)}
                })
            }else{
                infoService.postRole(vm.role).then(function(res){
                    if(res.data.code ===0){
                        alert(res.data.message);
                        $state.go('field.role',{},{reload:true});
                    }
                })
            }
        }
    }

})();

