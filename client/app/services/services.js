angular.module('shortly.services', [])

.factory('Links', function ($http) {
  var links = {};
  links.fetch = function(cb){
    $http.get('/api/links')
    .success(function(data, status, headers, config){
      cb(data);
    })
    .error(function(data, status, headers, config){
      console.log('failed to get links', status, data);
    });
  };
  links.save = function(url){
    $http.post('/api/links', {url: url})
    .success(function(data, status, headers, config){
      console.log('saved link', data);
    })
    .error(function(data, status, headers, config){
      console.log('failed to save link', status, data);
    });
  };
  return links;
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
