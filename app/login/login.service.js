angular.module("login")
    .factory("loginService", ["$http", function ($http) {
        var isLoggedIn = false;
        var errorMessage = "";
        var custObj={};

        return {
            login: function (obj) {
                return $http.post("http://nackbutik.azurewebsites.net/api/customer/login", obj)
                    .then(function (response) {
                        custObj = response.data;
                        isLoggedIn = true;
                        errorMessage = "";
                    }, function (error) {
                        if (error.status == -1 || error.status==401) {
                            errorMessage = "Unauthorized";
                        }
                    });
            },
            isLoggedIn: function () {
                return isLoggedIn;
            },
            logOut: function () {
                isLoggedIn = false;
                custObj = {};
                errorMessage = "";
            },
            getErrorMsg: function () {
                return errorMessage;
            },
            getUser: function () {
                return custObj.customerId;
            },
            getName: function () {
                var fullName = custObj.firstName + " " + custObj.lastName;
                return fullName;
            },
            returnAddress: function () {
                var fullName = custObj.firstName + " " + custObj.lastName;
                return { name: fullName, street: custObj.address, stad: custObj.city, mail: custObj.email };
            },
        };
    }]);