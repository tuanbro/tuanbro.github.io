var app = angular.module('App', ['ngMaterial', 'ngResource', 'ngAnimate']);

app.controller('AppCtrl', function ($scope, $http,$resource) {
    $scope.searchBarVis = false;
    $resource('js/data.json').get().$promise.then(function(data) {
        $scope.data = data;
        console.log($scope.data.scene);
    });
});