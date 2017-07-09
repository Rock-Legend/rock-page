/**
 * Created by Free Wang on 2017/6/13.
 */
(function(){
    'use strict';

    angular
        .module('f_myApp')
        .controller('RoleController', RoleController);

    RoleController.$inject = ['infoService','$state'];

    /* @ngInject */
    function RoleController(infoService,$state){
        var vm = this;
        vm.title = 'RoleController';

        activate();

        ////////////////

        function activate(){
            infoService.getRole().then(function(res){
                vm.id = res.data.data.ids;
                vm.ids = vm.id.join('&ids=');
                infoService.getRoleInfos(vm.ids).then(function(res){
                    vm.roles = res.data.data.roleList;
                })
            })
        }
        // 删除
        vm.f_delete = function($index){
            zeroModal.confirm({
                content: '确定要删吗',
                okFn: function() {
                    infoService.deleteRoleInfo(vm.roles[$index].id).then(function(res){
                        if(res.data.code ===0){
                            alert(res.data.message);
                            $state.go('field.role',{},{reload:true});
                        }else {alert(res.data.message)}
                    })
                },
                cancelFn: function() {
                }
            });
        };
    }
})();

