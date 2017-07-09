/**
 * Created by Free Wang on 2017/6/18.
 */
(function(){
    'use strict';

    angular
        .module('f_myApp')
        .controller('NewModuleController', NewModuleController);

    NewModuleController.$inject = ['$state','infoService'];

    /* @ngInject */
    function NewModuleController($state,infoService){
        var vm = this;
        vm.title = 'NewModuleController';

        vm.mid = $state.params.mid;
        if(vm.mid !== undefined){
            activate();

        }

        ////////////////
        function activate(){
            infoService.getModuleInfo(vm.mid).then(function(res){
                vm.module = res.data.data.module;
            })
        }
        vm.f_save = function(){
            if(vm.mid !== undefined){
                console.log($.param(vm.module),vm.module);
                infoService.putModuleInfo(vm.mid,$.param(vm.module)).then(function(res){
                    if(res.data.code === 0){
                        alert('修改成功！');
                        $state.go('field.module');
                    }else{alert((res.data.message))}
                })
            }else{
                infoService.postModule($.param(vm.module)).then(function(res){
                    if(res.data.code === 0){
                        alert('新增成功！');
                        $state.go('field.module');
                    }else{alert((res.data.message))}
                })
            }
        };

    }

})();

