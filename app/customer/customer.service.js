angular.module("customer")
    .factory("customerService", ["$http", function ($http) {
        var errorMessage;

        return {
            getCustomer: function () {
                return $http.get("http://nackbutik.azurewebsites.net/api/customer");
            },
            getCustomerById: function (id) {
                return $http.get("http://nackbutik.azurewebsites.net/api/customer/" + id);
            },
            createCustomer: function (contact) {
                return $http.post("http://nackbutik.azurewebsites.net/api/customer", contact)
                    .then(function (response) {
                        errorMessage = "";
                    }, function (error) {
                        if (error.status == 400) {
                            errorMessage = 'Bad Request';
                        }
                    });
            },
            getStatus: function () {
                return errorMessage;
            }
        };
    }]);