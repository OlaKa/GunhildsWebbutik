angular.module("order").
    controller("detailOrderController", ["$scope", "$routeParams", "orderService", "productService",
        function ($scope, $routeParams, orderService, productService) {

            orderService.getSpecificOrder($routeParams.orderId).then(function (response) {
                var orders = response.data;
                productArray = orders.products;
                //console.log(productArray);
                var products = [];
                var quantity = productArray.quantity;
                angular.forEach(productArray, function (product) {
                        var quant = product.quantity;
                        productService.getProductById(product.productId).then(function (response) {
                        response.data.quantity = quant;
                        products.push(response.data);
                        console.log(product.quantity);
                    });
                });
                $scope.orders = products;
                console.log($scope.orders);                
            });
        }]);