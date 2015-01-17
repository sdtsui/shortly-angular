// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, $sanitize, Auth) {
  $scope.user = {};

  $scope.sanitizeCredentials =  function(credentials) {
    return {
        username: $sanitize(credentials.username),
        password: $sanitize(credentials.password)
    };
  };

  $scope.signin = function () {
    $scope.user = $scope.sanitizeCredentials($scope.user);
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    $scope.user = $scope.sanitizeCredentials($scope.user);
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
