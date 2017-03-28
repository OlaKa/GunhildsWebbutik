angular.module("order").
    controller("orderController", ["$scope", "$location", "$routeParams", "productService", "orderService", "loginService",
        function ($scope, $location, $routeParams, productService, orderService, loginService) {
            $scope.products = productService.getProductList();
            var userId = loginService.getUser();
            var info = loginService.returnAddress();
            $scope.shipping = 40;
            $scope.date = new Date();
            var orderList = [];
            var userinfo = false;

            $scope.getTotal = function () {
                var total = 0;
                for (var i = 0; i < $scope.products.length; i++) {
                    var product = $scope.products[i];
                    total += (product.price * product.quantity);
                }
                if (!userinfo) {
                    $scope.name = info.name;
                    $scope.address = info.street;
                    $scope.city = info.stad;
                    $scope.mail = info.mail;
                    userinfo=false;                
                }
                return total;
            };

            $scope.putOrder = function () {
                angular.forEach($scope.products, function (product) {
                    var orderDetail = {
                        productId: product.id,
                        quantity: product.quantity
                    };
                    orderList.push(orderDetail);
                });
                var order = {
                    customerId: userId,
                    products: orderList
                };
                orderService.placeOrder(order).then(function (response) {
                    $scope.orderAnswer = response.data;
                    var name = loginService.getName();
                    var notify = {
                        type: 'info',
                        title: 'Din order har skickats!',
                        content: "Tack för din order " + name + " välkommen tillbaka.",
                        timeout: 5000 //time in ms
                    };
                    $scope.$emit('notify', notify);
                    $scope.orderList = [];
                    productService.emptyProductList();
                    $location.path("/");
                })
            };
        }]);