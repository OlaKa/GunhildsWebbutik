angular.module("category")
    .factory("categoryService", ["$http", function ($http) {

        return {
            getCategories:function(){
                return $http.get("http://nackbutik.azurewebsites.net/api/category");
            },
             getCategoryById:function (id) {
               return $http.get("http://api-adressboken.azurewebsites.net/category/" + id);
            }
        };
    }]);