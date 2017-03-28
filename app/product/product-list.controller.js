angular.module("product")
    .controller("productListController", ["$scope", "$location", "$rootScope", "productService", "categoryService", "loginService",
        function ($scope, $location, $rootScope, productService, categoryService, loginService) {
            $scope.isLoggedIn = loginService.isLoggedIn();
            $scope.filters = {};
            $scope.produkter = "Alla produkter";
            categoryService.getCategories().then(function (response) {
                var categories = response.data;
                productService.getProducts().then(function (response) {
                    var products = response.data;
                    // console.log(response.data);
                    angular.forEach(products, function (product) {
                        // för varje contact ta category id och hämta category.name
                        angular.forEach(categories, function (category) {
                            if (product.categoryId == category.id) {
                                product.categoryName = category.name;
                                product.quantity = 1;
                            }
                        });
                    });
                    $scope.products = products;
                });
                $scope.$on('$routeChangeSuccess', function (next, current) {
                    $scope.filters = {};
                });
                $scope.$on("resetCategory", function (event, args) {
                    $scope.filters = {};
                });
                $scope.addProductToCart = function (currObj) {
                    if (!loginService.isLoggedIn()) {
                        var notify = {
                            type: 'warning',
                            title: "Du måste vara inloggad för att beställa",
                            content: "Skapa ett konto eller logga in. ",
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                        $location.path("/login");
                        return;
                    }
                    productService.addProduct(currObj);
                    $scope.isClicked = true;
                };
                $scope.setProductName = function (prodName) {
                    $scope.produkter = prodName;
                };
                $scope.notifyOrder = function (name) {
                    if (!loginService.isLoggedIn()) {
                        return;
                    }
                    var notify = {
                        type: 'success',
                        title: 'Kundvagnen är uppdaterad!',
                        content: name + " är lagd i kundvagnen.",
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                };

                $scope.isLoggedIn = function () {
                    if (!loginService.isLoggedIn()) {
                        var notify = {
                            type: 'warning',
                            title: "Du måste vara inloggad för att beställa",
                            content: "Skapa ett konto eller logga in. ",
                            timeout: 5000 //time in ms
                        };
                        $location.path("/login");
                        $scope.$emit('notify', notify);                    
                    }else{
                         $location.path("/order");
                    }
                };
            });
        }]);