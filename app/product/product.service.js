angular.module("product")
    .factory("productService", ["$http", function ($http) {
        var productList = [];

        return {
            getProducts: function () {
                return $http.get("http://nackbutik.azurewebsites.net/api/product");
            },
            getProductById: function (id) {
                return $http.get("http://nackbutik.azurewebsites.net/api/product/" + id);
            },
            addProduct: function (newObj, inputNum) {
                var added = false;
                angular.forEach(productList, function (product) {
                    if (product.id == newObj.id) {
                        product.quantity += newObj.quantity;
                        added = true;
                    }
                });
                if (!added) {
                    productList.push(newObj);
                }
            },
            getProductList: function () {
                return productList;
            },
            resetCategory: function () {
                $scope.filters.categoryId = '';
            },
            emptyProductList: function () {
                productList = [];
            }
        };
    }]);