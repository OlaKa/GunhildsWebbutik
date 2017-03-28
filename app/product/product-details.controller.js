angular.module("product").
controller("productDetailsController", ["$scope", "$location", "$routeParams","productService",
function($scope, $location, $routeParams, productService){
    productService.getProductById($routeParams.productId).then(function(response){
        $scope.products = response.data;
        console.log(response.data);
    }, function(errorResponse){
    });
}]);