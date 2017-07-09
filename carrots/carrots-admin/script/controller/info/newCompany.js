/**
 * Created by Shinelon on 2017/6/2.
 */
"use strict";
app.controller('NewCompanyController', ['$scope', 'infoService', '$state', '$stateParams', 'province', 'city', 'FileUploader', '$timeout', function($scope, infoService, $state, $stateParams, province, city, FileUploader, $timeout){
    var vm = this;
    vm.id = $stateParams.id;
    vm.page = $stateParams.page;



    if(vm.id !== undefined){
        infoService.getCompanyInfo(vm.id).then(function(res){
            if(res.data.code == 0){
                vm.company = res.data.data;
                vm.toCity();
            }
        })
    }else{        vm.company = {approved : '0',companyTagList:[]}}

    // 添加标签
    vm.addTag = function(){
        if(vm.constructor.companyTagList !== undefined){
            for(var i=0;i<vm.company.companyTagList.length;i++){
                if(vm.tag == vm.company.companyTagList[i].tag||''){
                    alert('请勿输入相同标签');
                    return;
                }
            }
        }
        vm.company.companyTagList.push({tag:vm.tag});
        vm.tag = '';
    };
    // 删除标签
    vm.deleteTag = function($index){
        vm.company.companyTagList.splice($index,1);
    };


    // 立即上线
    vm.f_online = function(){
        vm.tags = [];
        angular.forEach(vm.company.companyTagList,function(data){
            vm.tags.push(data.tag);
        });
        vm.finalTag = vm.tags.join(',');
        if(vm.id !== undefined){
            delete vm.company.companyTagList;
            delete vm.company.approvedAt;
            delete vm.company.createAt;
            delete vm.company.createBy;
            delete vm.company.professionCount;
            delete vm.company.releaseAt;
            delete vm.company.updateAt;
            delete vm.company.updateBy;
            // delete vm.company.county;
            // 公司标签备案
            vm.tags = "";
            if(vm.tag !== undefined){
                for(var i=0;i<vm.tag.length;i++){
                    vm.tags.push(vm.tag[i].tag)
                }
            }
            var company = {company : vm.company, tag :vm.finalTag};
            infoService.putCompanyInfo(vm.id, company).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.companyList')
                }else{
                    alert(res.data.message);
                }
            })
        } else {
            // 新增
            var params = {company : vm.company, tag : vm.finalTag};
            delete vm.company.companyTagList;

            infoService.postCompanyInfo(params).then(function(res){
                if(res.data.code === 0){
                    $state.go('field.companyList')
                }else{
                    alert(res.data.message);
                }
            })
        }
    };

    // 三级联动
    vm.province = province;
    vm.city = [];
    vm.toCity = function(){
        vm.city = [];
        var data = city;
        var arr = [];
        for(var i = 0; i < data.length; i++){
            if(data[i].ProID == vm.company.province){
                arr.push(data[i])
            }
        }
        vm.city = arr;
    };

    // 三个上传图片
    var uploaderC = $scope.uploaderC = new FileUploader({
        url : '/carrots-admin-ajax-FR/a/u/img/1'
    });
    uploaderC.filters.push({
        name : 'imageFilter',
        fn : function(item /*{File|FileLikeObject}*/, options){
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    uploaderC.onSuccessItem = function(fileItem, response, status, headers){
        vm.company.logo = response.data.url;
    };
    uploaderC.onCancelItem = function(fileItem, response, status, headers) {
        vm.company.logo = '';
    };

    // A
    var uploaderA = $scope.uploaderA = new FileUploader({
        url : '/carrots-admin-ajax-FR/a/u/img/1'
    });
    uploaderA.filters.push({
        name : 'imageFilter',
        fn : function(item /*{File|FileLikeObject}*/, options){
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    uploaderA.onSuccessItem = function(fileItem, response, status, headers){
        vm.company.productLogo = response.data.url;
    };
    uploaderA.onCancelItem = function(fileItem, response, status, headers) {
        vm.company.productLogo = '';
    };
    // B
    var uploaderB = $scope.uploaderB = new FileUploader({
        url : '/carrots-admin-ajax-FR/a/u/img/1'
    });
    uploaderB.filters.push({
        name : 'imageFilter',
        fn : function(item /*{File|FileLikeObject}*/, options){
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    uploaderB.onSuccessItem = function(fileItem, response, status, headers){
        vm.company.map = response.data.url;
    };
    uploaderB.onCancelItem = function(fileItem, response, status, headers) {
        vm.company.map = '';
    };
}
]);