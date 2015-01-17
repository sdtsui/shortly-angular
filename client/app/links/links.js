angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  Links.fetch(function(links){
    $scope.links = links;
  });
});
