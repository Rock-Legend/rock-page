/**
 * Created by Free Wang on 2017/6/17.
 */
(function(){
    'use strict';

    angular
        .module('f_myApp')
        .controller('NewAccountController', NewAccountControoler);

    NewAccountControoler.$inject = ['infoService','$state','$cookies'];

    /* @ngInject */
    function NewAccountControoler(infoService,$state,$cookies){
        var vm = this;
        vm.mid = $state.params.mid;
        activate();

        ////////////////

        function activate(){
            // 编辑还是新增
            if(vm.mid !== undefined){
                infoService.getManagerInfo(vm.mid).then(function(res){
                    vm.manager = res.data.data.manager;
                })
            }else { vm.manager = {}; }
        }
        // 获取roleID
        vm.id = $cookies.get("www.zonzii.com");
        vm.Rid = vm.id.split('|')[0];
        infoService.getManagers(vm.Rid).then(function(res){
            vm.manager.roleID = res.data.data.managerList[0].roleID;
        });
        vm.f_save = function(){
            // 修改部分
            if(vm.mid !== undefined){
                if(vm.pwd === vm.manager.pwd){
                    infoService.putManagerInfo(vm.mid, vm.manager).then(function(res){
                        if(res.data.code === 0){
                            alert('修改成功！');
                            $state.go('field.manager');
                        } else {
                            alert(res.data.message)
                        }
                    })
                } else {
                    alert('请确认输入信息！')
                }
            }
            // 新增部分
            else{
                if(vm.pwd === vm.manager.pwd){
                    infoService.postManager(vm.manager).then(function(res){
                        alert(res.data.message);
                        $state.go('field.manager')
                    })
                }else{alert('请确认输入信息！')}
            }
        };
    }
})();

