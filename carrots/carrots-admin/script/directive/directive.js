/**
 * Created by Administrator on 2017/5/21 0021.
 */
(function(){
    'use strict';

    angular
        .module('moduleName')
        .controller('ControllerName', ControllerName);

    ControllerName.$inject = ['dependency'];

    /* @ngInject */
    function ControllerName(dependency){
        var vm = this;

        activate();

        ////////////////

        function activate(){
            code
        }
    }

})();

