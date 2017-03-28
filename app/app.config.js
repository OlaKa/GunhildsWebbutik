angular.module("app")
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/product/product-list.template.html",
                controller: "productListController"
            })
            .when("/products", {
                templateUrl: "app/product/product-list.template.html",
                controller: "productListController"
            })
            .when("/login", {
                templateUrl: "app/login/login.template.html",
                controller: "loginController"
            })
            .when("/customer", {
                templateUrl: "app/customer/customer-create.template.html",
                controller: "customerCreateController"
            })
            .when("/order", {
                templateUrl: "app/order/order.template.html",
                controller: "orderController"
            })
             .when("/order/:customerId", {
                templateUrl: "app/order/customer-order.template.html",
                controller: "customerOrderController"
            })
             .when("/orders/:orderId", {
                templateUrl: "app/order/detail-order.template.html",
                controller: "detailOrderController"
            })
            .when("/about", {
                templateUrl: "app/about/about.template.html",
                controller: "productListController"
            })
            .otherwise("/");
        $locationProvider.html5Mode(true);
    }]);