/**
 * Created by Shinelon on 2017/6/9.
 */
app.controller('NewArticleController',['$scope','infoService','$state','$stateParams','FileUploader',function($scope,infoService,$state,$stateParams,FileUploader){
    var vm = this;
    vm.params = {};
    vm.id = $stateParams.id;
    if(vm.id !== undefined){
        infoService.getArticleInfo(vm.id).then(function(res){
            vm.params = res.data.data;
        })
    }
    vm.f_save = function(){
        vm.params.status = 2;
        if(vm.id !== undefined){
            infoService.putArticleInfo(vm.id,vm.params).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.articleList')
                }else{alert(res.data.message)}
            })
        }else{
            infoService.postArticleInfo(vm.params).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.articleList')
                }else{alert(res.data.message)}
            })
        }
    };
    vm.f_online = function(){
        vm.params.status = 1;
        if(vm.id !== undefined){
            infoService.putArticleInfo(vm.id,vm.params).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.articleList')
                }else{alert(res.data.message)}
            })
        }else{
            infoService.postArticleInfo(vm.params).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.articleList')
                } else{alert(res.data.message)}
            })
        }
    };
    // 上传图片相关
    var uploader = $scope.uploader = new FileUploader({
        url : '/carrots-admin-ajax-FR/a/u/img/1'
    });
    uploader.filters.push({
        name : 'imageFilter',
        fn : function(item /*{File|FileLikeObject}*/, options){
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    uploader.onSuccessItem = function(fileItem, response, status, headers){
        vm.params.img = response.data.url;
    };
}]);