/**
 * Created by Shinelon on 2017/5/30.
 */
angular.module("f_myApp")
    .controller('companyController',['$scope','infoService','$state','province','city','$stateParams',function($scope,infoService,$state,province,city,$stateParams){
    var vm = this;

    //获取参数
    vm.searchParams = $state.params;
    vm.id = $state.params.id;
    // 清空
    vm.f_clear = function(){
        angular.forEach(vm.searchParams,function(data,index,array){
            vm.searchParams[index] = '';
        });
        $state.go($state.current,vm.searchParams,{reload:true})
    };
    // 搜索功能
    vm.f_search = function(){
        vm.searchParams.page = '';
        $state.go($state.current,vm.searchParams,{reload:true})
    };
    // 获取信息
    infoService.getCompanyList(vm.searchParams).then(function(res){

        if(res.data.code == 0){
            vm.infos = res.data.data;
            vm.total = res.data.total;
        }
    });
    // 删除功能
    vm.f_delete = function($index){
        zeroModal.confirm({
            content: '确认删除吗？',
            okFn: function() {
                infoService.deleteCompanyInfo(vm.infos[$index].id).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }
                });
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
    // 认证状态切换
    vm.f_approved = function($index){
        vm.f_approveds = {type:1,status:1};
        zeroModal.confirm({
            content: '认证后该公司将被标记为推荐公司',
            okFn: function() {
                infoService.putCompanyStatus(vm.infos[$index].id,vm.f_approveds).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }
                });
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
    vm.f_unapproved = function($index){
        vm.f_unapproveds = {type:1,status:0};
        zeroModal.confirm({
            content: '解除认证后该公司将不再标记为推荐公司',
            okFn: function() {
                infoService.putCompanyStatus(vm.infos[$index].id,vm.f_unapproveds).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }
                });
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
    // 冻结状态切换
    vm.f_freezed = function($index){
        vm.f_freezeds = {type:0,status:1};
        zeroModal.confirm({
            content: '确认冻结吗？',
            okFn: function() {
                infoService.putCompanyStatus(vm.infos[$index].id,vm.f_freezeds).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }
                });
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
    vm.f_unfreezed = function($index){
        vm.f_unfreezeds = {type:0,status:0};
        zeroModal.confirm({
            content: '确认解冻吗？',
            okFn: function() {
                infoService.putCompanyStatus(vm.infos[$index].id,vm.f_unfreezeds).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }
                });
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
    // 三级联动
    vm.province = province;
    vm.city=[];
    vm.toCity = function(){
        vm.city=[];
        var data = city;
        var arr = [];
        for(i=0;i<data.length;i++){
            if (data[i].ProID==vm.searchParams.province){
                arr.push(data[i])
            }
        }
        vm.city = arr;
    };
    vm.toCity();
}]);