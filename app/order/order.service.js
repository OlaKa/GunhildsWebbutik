angular.module("order")
    .factory("orderService", ["$http", function ($http) {
        return {
            placeOrder: function (order) {
                return $http.post("http://nackbutik.azurewebsites.net/api/order",order);
            }, 
            getOrders:function(customerid){
                return $http.get("http://nackbutik.azurewebsites.net/api/order?customerid=" + customerid);
            },
             getSpecificOrder:function(orderid){
                return $http.get("http://nackbutik.azurewebsites.net/api/order/" + orderid);
            }            
        };
    }]);