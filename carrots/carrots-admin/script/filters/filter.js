/**
 * Created by Shinelon on 2017/5/31.
 */
// 公司行业
app.filter('f_company', function(){
    return function(indus){
        if(indus === "0"){
            return "互联网"
        } else if(indus === "1"){
            return "电子商务"
        } else if(indus === "2"){
            return "企业服务"
        } else if(indus === "3"){
            return "O2O"
        } else if(indus === "4"){
            return "教育"
        } else if(indus === "5"){
            return "金融"
        } else if(indus === "6"){
            return "游戏"
        }
    }
})
// 融资规模
    .filter('f_financing', function(){
        return function(scale){
            if(scale === "0"){
                return "无需融资"
            } else if(scale === "1"){
                return "天使轮"
            } else if(scale === "2"){
                return "A轮"
            } else if(scale === "3"){
                return "B轮"
            } else if(scale === "4"){
                return "C轮"
            } else if(scale === "5"){
                return "D轮及以上"
            } else if(scale === "6"){
                return "上市公司"
            }
        }
    })
    // 认证状态
    .filter('f_approved', function(){
        return function(approved){
            if(approved === "0"){
                return "未认证"
            } else if(approved === "1"){
                return "已认证"
            }
        }
    })
    // 冻结状态
    .filter('f_freezed', function(){
        return function(freezed){
            if(freezed === "0"){
                return "正常"
            } else if(freezed === "1"){
                return "冻结"
            }
        }
    })
    // 薪资水平
    .filter('f_compensation', function(){
        return function(compensation){
            if(compensation === "0"){
                return "8K"
            } else if(compensation === "1"){
                return "8~15K"
            } else if(compensation === "2"){
                return "16~25K"
            } else if(compensation === "3"){
                return "26K及以上"
            }
        }
    })
    // 学历要求
    .filter('f_education', function(){
        return function(education){
            if(education === "0"){
                return "大专"
            } else if(education === "1"){
                return "本科"
            } else if(education === "2"){
                return "硕士"
            } else if(education === "3"){
                return "博士及以上"
            }
        }
    })
    // 工作经验
    .filter('f_experience', function(){
        return function(experience){
            if(experience === "0"){
                return "应届"
            } else if(experience === "1"){
                return "1~2年"
            } else if(experience === "2"){
                return "3~5年"
            } else if(experience === "3"){
                return "6~9年"
            } else if(experience === "4"){
                return "10年以上"
            }
        }
    })
    // 职位状态
    .filter('f_vocaStatus', function(){
        return function(vocaStatus){
            if(vocaStatus === "0"){
                return "上架"
            } else if(vocaStatus === "1"){
                return "下架"
            }
        }
    })
    // article上下线
    .filter('f_article', function(){
        return function(article){
            if(article === "1"){
                return "上线"
            } else if(article === "2"){
                return "下线"
            }
        }
    })
    // article type
    .filter('f_articleType', function(){
        return function(article){
            if(article === "0"){
                return "首页banner"
            } else if(article === "1"){
                return "找职位banner"
            } else if(article === "2"){
                return "找精英banner"
            } else if(article === "3"){
                return "行业大图"
            }
        }
    })
    .filter('f_inArr', function(){
        return function(companyTag,pro){
            var inArr = false;
            angular.forEach(pro, function(data){
                if(companyTag == data.tag){
                    inArr = true;
                }
            });
            return inArr;
        }
    })
    // 省
    .filter('f_province', function(province){
        return function(id){
            if(id != undefined && id != ''){
                var name;
                angular.forEach(province, function(data){
                    if(data.ProID == id){
                        name = data.ProName;
                    }
                });
                return name;
            }
        }
    })
    // 市
    .filter('f_city', function(city){
        return function(value){
            angular.forEach(city, function(data){
                if(value == data.CityID){
                    value = data.CityName;
                }
            });
            return value;
        }
    })
.filter('inTag',function () {
    return function (companyTag,pro) {
        var inArr=false;
        angular.forEach(pro,function (item) {
            if(companyTag.tag==item.tag){
                inArr = true;
            }
        })
        return inArr;
    }
})