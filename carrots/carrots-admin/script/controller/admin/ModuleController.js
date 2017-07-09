/**
 * Created by Free Wang on 2017/6/14.
 */
(function(){
    'use strict';

    angular
        .module('f_myApp')
        .controller('ModuleController', ModuleController);

    ModuleController.$inject = ['$state','infoService'];

    /* @ngInject */
    function ModuleController($state,infoService){
        var vm = this;
        vm.searchParams = $state.params;
        activate();

        ////////////////

        function activate(){
            infoService.getModule(vm.searchParams).then(function(res){
                vm.ids = res.data.data.ids;
                vm.total = res.data.data.total;
                infoService.getModules(vm.ids.join('&ids=')).then(function(res){
                    vm.modules = res.data.data.moduleList;
                })
            })
        }
        vm.f_delete = function($index){
            zeroModal.confirm({
                content: '确认删除吗',
                okFn: function() {
                    infoService.deleteModule(vm.modules[$index].id).then(function(res){
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

