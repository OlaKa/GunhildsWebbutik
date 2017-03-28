angular.module("customer").
    controller("customerCreateController", ["$scope", "$routeParams", "$location", "customerService",
        function ($scope, $routeParams, $location, customerService) {

            $scope.customer = {};
            $scope.text = "";
            $scope.createCustomer = function (form) {
                var newCustomer = {
                    firstName: $scope.customer.firstname,
                    lastName: $scope.customer.lastname,
                    email: $scope.customer.email,
                    phone: $scope.customer.phone,
                    password: $scope.customer.password,
                    address: $scope.customer.address,
                    postalCode: $scope.customer.postalCode,
                    city: $scope.customer.city

                };

                customerService.createCustomer(newCustomer).then(function () {
                    var status = customerService.getStatus();
                    if (status == 'Bad Request') {
                        var notify = {
                            type: "error",
                            title: "Det gick ine att skapa användaren!",
                            content: "501: " + status,
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                        $scope.text = "Användaren kunde inte skapas."
                    } else {
                        var notify = {
                            type: "success",
                            title: "Användaren skapad!",
                            content: "Användare med namn " + newCustomer.firstName + " " + newCustomer.lastName + " skapad.",
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    }
                    $location.path("/customer");
                });
                $scope.customer = {};
                form.$setPristine();
                form.$setUntouched();
            };
        }]);