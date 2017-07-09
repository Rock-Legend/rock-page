/**
 * Created by Shinelon on 2017/6/2.
 */
app.controller('VocationController',['$scope','infoService','$state','$stateParams',function($scope,infoService,$state,$stateParams){
    var vm = this;
    //对日期选择器的日期显示样式进行修改
    $scope.dateOptions = {
        dateFormat: 'yy-mm-dd',
        yearRange: '2015:-0'
    };
    //获取参数
    vm.searchParams = $state.params;
    vm.name = $state.params.Cname;
    vm.id = $state.params.id;
    vm.Cid = $state.params.Cid;
    // 清空
    vm.f_clear = function(){
        angular.forEach(vm.searchParams,function(data,index,array){
            vm.searchParams[index] = '';
        });
        $state.go($state.current,vm.searchParams,{reload:true})
    };
    // 搜索
    vm.f_search = function(){
        //将日期转换成时间戳，初始日期为undefined不做处理
        if ( vm.searchParams.startAt !== undefined) {
           vm.searchParams.startAt = Date.parse(vm.searchParams.startAt);
        }
        if(isNaN(vm.searchParams.startAt)){
            vm.searchParams.startAt = undefined;
        }
        if ( vm.searchParams.endAt !== undefined) {
           vm.searchParams.endAt = Date.parse(vm.searchParams.endAt);
        }
        if(isNaN(vm.searchParams.startAt)){
            vm.searchParams.startAt = undefined;
        }
        if(isNaN(vm.searchParams.endAt)){
            vm.searchParams.endAt = undefined;
        }
        $state.go($state.current,vm.searchParams,{reload:true})
    };
    //某公司职位列表
    if(vm.name !== undefined){
        infoService.getCompanyVocationList(vm.name).then(function(res){
            if(res.data.code === 0){
                vm.infos = res.data.data;
                vm.total = res.data.total;
            }
            // 对时间戳转换成日期
            if (vm.searchParams.startAt !== undefined) {
                vm.searchParams.startAt = new Date(parseInt(vm.searchParams.startAt)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            }
            if (vm.searchParams.endAt !== undefined) {
                vm.searchParams.endAt = new Date(parseInt(vm.searchParams.endAt)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            }

        });
    }
    //默认职位列表请求
    else {infoService.getVocationList(vm.searchParams).then(function(res){
        if(res.data.code === 0){
            vm.infos = res.data.data;
            vm.total = res.data.total;
        }
        // 对时间戳转换成日期
        if (vm.searchParams.startAt !== undefined) {
            vm.searchParams.startAt = new Date(parseInt(vm.searchParams.startAt)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        }
        if (vm.searchParams.endAt !== undefined) {
            vm.searchParams.endAt = new Date(parseInt(vm.searchParams.endAt)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        }
    });}
    // 删除
    vm.f_delete = function($index){
        zeroModal.confirm({
            content: '确定删除吗？',
            okFn: function() {
                infoService.deleteVocationInfo(vm.infos[$index].id).then(function(res){
                    if(res.data.code === 0){
                        $state.go($state.current,{},{reload:true})
                    }else{alert(res.data.message)}
                })
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
    // 切换上架状态
    vm.f_putaway = function($index){
        vm.f_putaways = {status:0};
        zeroModal.confirm({
            content: '确定上架吗？',
            okFn: function() {
                infoService.putProfessionStatus(vm.infos[$index].id,vm.f_putaways).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }else{alert(res.data.message)}
                });
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
    // 切换下架状态
    vm.f_unputaway = function($index){
        vm.f_unputaways = {status:1};
        zeroModal.confirm({
            content: '确定下架吗？',
            okFn: function() {
                infoService.putProfessionStatus(vm.infos[$index].id,vm.f_unputaways).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }else{alert(res.message)}
                });
            },
            cancelFn: function() {
                //                alert('cancel');
            }
        });
    };
}]);