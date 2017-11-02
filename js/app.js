var app = angular.module('App', ['ngMaterial', 'ngResource', 'ngAnimate']);

app.controller('AppCtrl', function ($scope, $mdSidenav) {
   $scope.searchBarVis=false;
});