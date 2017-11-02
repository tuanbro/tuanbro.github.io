var app = angular.module('App', ['ngMaterial', 'ngResource', 'ngAnimate']);
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('red');

});

app.controller('AppCtrl', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function () {
        return $mdSidenav('left').toggle();
    };
});