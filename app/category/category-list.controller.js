angular.module("category").
    controller("categoryListController", ["$scope", "$routeParams", "$location", "categoryService",
        function ($scope, $routeParams, $location, categoryService) {
           var categorySelected;
            categoryService.getCategories().then(function (response) {
                $scope.categories = response.data;
            });
             $scope.getCategoryId = function (category) {
                $scope.categorySelected = category.id;
                console.log($scope.categorySelected);
            }  
        }]);