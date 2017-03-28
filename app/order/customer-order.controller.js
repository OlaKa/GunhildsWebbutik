angular.module("order").
    controller("customerOrderController", ["$scope", "$routeParams", "$location", "orderService", "productService",
        function ($scope, $routeParams, $location, orderService, productService) {
            orderService.getOrders($routeParams.customerId).then(function (response) {
                var orders = response.data;
                angular.forEach(orders, function (order) {
                    var products = order.products;
                    angular.forEach(products, function (product, index) {
                        var quant = product.quantity;
                        productService.getProductById(product.productId).then(function (response) {
                            var product = response.data;
                             console.log(response.data);
                            products.sumPerOrder = +  product.price * quant;
                        });
                    });
                });
                $scope.orders = orders;
            }, function (errorResponse) {
            });
            $scope.orderClicked = function (orderid) {
                $location.path("/orders/" + orderid);
            }
        }]);