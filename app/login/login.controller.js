angular.module("login").
    controller("loginController", ["$scope", "$location", "$rootScope", "loginService",
        function ($scope, $location, $rootScope, loginService) {
            $scope.login = {};
            $scope.getLogin = function (form) {

                var newLogin = {
                    email: $scope.login.email,
                    password: $scope.login.password
                };

                $scope.text = "";

                loginService.login(newLogin).then(function (response) {
                    var error = loginService.getErrorMsg();
                    if (error == "Unauthorized") {
                        $scope.text = "Inloggningen misslyckades!";
                        $scope.notifier("error", "Din inloggning misslyckades","Kolla att du har skrivit rätt email och lösenord.", "");
                        $scope.login = {};
                    } else {
                        var name = loginService.getName();
                        $rootScope.$broadcast("loggedIn", name);
                        $location.path("/");
                        $scope.notifier("success","Väkommen tillbaka!","Du är inloggad som ", name);
                    }
                });
            };
            $scope.notifier = function (type, title, content, args) {
                var notify = {
                    type: type,
                    title: title,
                    content: content + args,
                    timeout: 5000 //time in ms
                };
                $scope.$emit('notify', notify);
            };
        }]);