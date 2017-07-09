/**
 * Created by Free Wang on 2017/6/13.
 */
app.factory('clean', clean);
function clean() {
    return function (obj) {
        angular.forEach(obj,function (data,key) {
            obj[key]=null
        });
        return obj
    }
}