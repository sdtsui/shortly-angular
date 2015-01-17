angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.startSpinner = function() {
    // this.$el.find('img').show();
    this.$el.find('img').css('visibility', 'visible');
    this.$el.find('form input[type=submit]').attr('disabled', 'true');
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  },

  $scope.stopSpinner = function() {
    this.$el.find('img').fadeOut('fast');
    this.$el.find('form input[type=submit]').attr('disabled', null);
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  }
  $scope.shorten = function(url){
    Links.save(url);
    $scope.stopSpinner();
  };
});
