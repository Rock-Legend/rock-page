/**
 * Created by Free Wang on 2017/6/17.
 */
(function(){
    'use strict';

    angular
        .module('f_myApp')
        .controller('PwdController', PwdController);

    PwdController.$inject = ['infoService','$state'];

    /* @ngInject */
    function PwdController(infoService,$state){
        var vm = this;

        activate();

        ////////////////

        function activate(){

        }
        vm.f_save = function(){
            if(vm.params.newPwdAgain === vm.params.newPwd){
                infoService.putPwd($.param(vm.params)).then(function(res){
                    if(res.data.message === 0){
                        alert(res.data.message);
                        $state.go('field.welcome')
                    }else {alert(res.data.message)}
                })
            }else{alert('两次密码不同！')}
        }
    }

})();



