/**
 * Created by Shinelon on 2017/6/8.
 */
app.controller('ArticleController',['$scope','infoService','$state','$stateParams','$timeout',function($scope,infoService,$state,$stateParams,$timeout){
    var vm = this;
    //对日期选择器的日期显示样式进行修改
    $scope.dateOptions = {
        dateFormat: 'yy-mm-dd',
        yearRange: '2015:-0',
    };
    vm.searchParams = $state.params;
    // if(isNaN(vm.searchParams.startAt)){
    //     vm.searchParams.startAt = undefined;
    // }
    // if(isNaN(vm.searchParams.endAt)){
    //     vm.searchParams.endAt = undefined;
    // }
    infoService.getArticle(vm.searchParams).then(function(res){
        if(res.data.code === 0){
            vm.article = res.data.data;
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
    // 清空
    vm.f_clear = function(){
        angular.forEach(vm.searchParams,function(data,index){
            vm.searchParams[index] = '';
        });
        $state.go($state.current,vm.searchParams,{reload:true});
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
        $state.go($state.current,vm.searchParams,{reload:true});
    };
    // 拖动
    var tmpList = [];

    // 成功拖动，结果稍差
    $scope.cannotSort = false;
    $scope.sortableOptions = {
        // 数据有变化
        update: function(e, ui) {
            //需要使用延时方法，否则会输出原始数据的顺序，可能是BUG？
            $timeout(function() {
                vm.resArr = [];
                for (var y = 0; y < vm.article.length; y++) {
                    vm.resArr.push(vm.article[y].id);
                }
                console.log(vm.resArr);
            })
        },
        // 完成拖拽动作
        stop: function(e, ui) {
            console.log(vm.article);
        }
    };
    // 保存排序
    vm.sorting = function(){
        vm.ranks = vm.resArr.join('&rank=');
        infoService.putArticleRank(vm.ranks).then(function(res){
            console.log(res);
        })

    };
    // 删除
    vm.f_delete = function($index){
        zeroModal.confirm({
            content: '确定要删吗',
            okFn: function() {
                infoService.deleteArticleInfo(vm.article[$index].id).then(function(res){
                })
            },
            cancelFn: function() {
            }
        });
    };
    vm.f_putaway = function($index){
        zeroModal.confirm({
            content: '确认上线吗',
            okFn: function() {
                infoService.putArticleStatus(vm.article[$index].id,1).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }
                });
            },
            cancelFn: function() {
            }
        });
    };
    vm.f_unputaway = function($index){
        zeroModal.confirm({
            content: '确认下线吗',
            okFn: function() {
                infoService.putArticleStatus(vm.article[$index].id,2).then(function(res){
                    if(res.data.code == 0){
                        $state.go($state.current,{},{reload:true})
                    }
                });
            },
            cancelFn: function() {
            }
        });
    };
}
]);