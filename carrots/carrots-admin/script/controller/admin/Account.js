/**
 * Created by Free Wang on 2017/6/13.
 */
(function(){
    'use strict';

    angular
        .module('f_myApp')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$state','infoService'];

    /* @ngInject */
    function AccountController($state,infoService){
        var vm = this;
        vm.title = 'AccountController';
        vm.searchParams = $state.params;

        activate();

        ////////////////

        function activate(){
            // 获取角色列表
            infoService.getRole().then(function(res){
                vm.rid = res.data.data.ids;
                vm.rids = vm.rid.join('&ids=');
                infoService.getRoleInfos(vm.rids).then(function(res){
                    vm.roles = res.data.data.roleList;
                })
            });
            if(vm.searchParams.rid !== undefined){
                infoService.getRoleManager(vm.searchParams.rid).then(function(res){
                    vm.role = res.data.data.ids;
                    vm.roles = vm.role.join('&ids=');
                    infoService.getManagers(vm.roles).then(function(res){
                        vm.managers = res.data.data.managerList;
                        var rids = [];
                        angular.forEach(vm.managers,function(data){
                            rids.push(data.roleID)
                        });
                        vm.rids = rids.join('&ids=');
                        infoService.getRoleInfos(vm.rids).then(function(res){
                            vm.role = res.data.data.roleList;
                            angular.forEach(vm.role,function(data,index){
                                vm.managers[index].names = data.name;
                            });
                        })
                    })
                })
            }else{     // 获取账户列表
                infoService.getManager().then(function(res){
                    vm.id = res.data.data.ids;
                    vm.ids = vm.id.join('&ids=');

                    infoService.getManagers(vm.ids).then(function(res){
                        vm.managers = res.data.data.managerList;
                        var rids = [];
                        angular.forEach(vm.managers,function(data){
                            rids.push(data.roleID)
                        });
                        vm.rids = rids.join('&ids=');
                        infoService.getRoleInfos(vm.rids).then(function(res){
                            vm.role = res.data.data.roleList;
                            angular.forEach(vm.role,function(data,index){
                                vm.managers[index].names = data.name;
                            });
                        })
                    })
                })
            }

        }
        // 搜索
        vm.f_search = function(){
            $state.go($state.current,{rid:vm.searchParams.rid},{reload:true})
        };
        vm.f_delete = function($index){
            zeroModal.confirm({
                content: '确认删除吗',
                okFn: function() {
                    infoService.deleteManagerInfo(vm.managers[$index].id).then(function(res){
                        if(res.data.code == 0){
                            $state.go($state.current,{},{reload:true})
                        }else {alert(res.data.message)}
                    });
                },
                cancelFn: function() {
                }
            });
        };
    }

})();

