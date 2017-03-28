angular.module("mainCtrl").
    controller("mainCtrlController", ["$scope", "$location", "$rootScope", "$routeParams", "productService", "orderService", "loginService",
        function ($scope, $location, $rootScope, $routeParams, productService, orderService, loginService) {
            $scope.userIsLoggedIn = false;
            $scope.name;

            $scope.resetCategory = function () {
                $rootScope.$broadcast("resetCategory");
            };
            $scope.$on("loggedIn", function (event, args) {
                $scope.userIsLoggedIn = true;
                $scope.name = args;
            });
            $scope.logOut = function () {
                loginService.logOut();
                $scope.userIsLoggedIn = false;
                var notify = {
                    type: 'info',
                    title: "Tack för ditt besök "+ $scope.name,
                    content: "Välkommen åter.",
                    timeout: 5000 //time in ms
                };
                $scope.$emit('notify', notify);
                $scope.name="";
                productService.emptyProductList();
                $location.path("/");
            };
            $scope.ordersClicked = function(){
                var userid = loginService.getUser();
                console.log(userid);
                $location.path("/order/" + userid);
            }
        }]);