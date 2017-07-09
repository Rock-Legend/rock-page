/**
 * Created by Shinelon on 2017/6/7.
 */
app.controller('newVocationController',['$scope','infoService','$state','$stateParams',function($scope,infoService,$state,$stateParams){
    var vm = this;
    vm.id = $stateParams.id;
    vm.Cid = $stateParams.Cid;

    if(vm.id !== undefined) {
        infoService.getVocationInfo(vm.id).then(function(res){
            if(res.data.code === 0){
                vm.voca = res.data.data;
                infoService.getTag(vm.Cid).then(function(res){
                    vm.voca.companyTagList = res.data.data;
                    console.log(vm.voca)
                });
            }
        });
    }else{
        infoService.getCompanyInfo(vm.Cid).then(function(res){
            vm.voca = {
                recommend:'0',
                category:'1',
                compensation:'0',
                education:'0',
                experience:'0'
            };
            vm.voca.companyName = res.data.data.name;
            vm.company = res.data.data;
            infoService.getTag(vm.Cid).then(function(res){
                vm.voca.companyTagList = res.data.data;
            });
        });
    }
    vm.test = function(){
        console.log(vm.tag);
    };

    // 删除标签
    vm.f_deleteTag = function($index){
        vm.voca.companyTagList.splice($index,1);
    };

    vm.f_save = function(){
        if(vm.id !== undefined){
            vm.tag = [];
            angular.forEach(vm.voca.companyTagList,function(data,index){
                vm.tag.push(data.id);
            });
            vm.voca.tagId = vm.tag.join(',');

            delete vm.voca.professionTagList;
            delete vm.voca.companyTagList;
            // var params = {pro}
            infoService.putCompanyVocationList(vm.id,vm.voca).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.professionList')
                }
            })
        }else{
            vm.tag = [];
            angular.forEach(vm.voca.companyTagList,function(data,index){
                vm.tag.push(data.id);
            });
            delete vm.voca.companyTagList;

            vm.voca.tagId = vm.tag.join(',');
            infoService.postVocationInfo(vm.voca).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.professionList',{Cname:vm.voca.companyName,Cid:vm.Cid,id:vm.id})
                }
            })
        }
    }
}
]);