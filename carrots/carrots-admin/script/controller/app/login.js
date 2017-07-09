/**
 * Created by Shinelon on 2017/5/31.
 */

//post请求
app.controller('LoginController', function($scope, $http, $state, infoService){
    var vm = this;
    $scope.f_login = function(){
        params = $.param({name : vm.f_userName, pwd : vm.f_passWord});
        infoService.postLogin(params).then(function(rel){
            $("span").html(rel.data.message);
            if(rel.data.code == '0'){
                $state.go('field.welcome')
            }
        })
    };
    //    回车事件
    $(".f_login").keydown(function(){
        if(event.keyCode == 13){
            $("#login").click()
        }
    });
});
