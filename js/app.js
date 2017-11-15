var app = angular.module('App', ['ngMaterial', 'ngResource', 'ngAnimate']);

app.controller('AppCtrl', function ($scope, $http, $resource, $filter) {
    $scope.searchRes = [];
    $scope.searchBarVis = false;
    $resource('js/data.json').get().$promise.then(function (data) {
        $scope.data = data;
        $scope.search = function () {
            $scope.searchRes = [];
            angular.forEach($scope.data.scene, function (value) {
                if ($filter('lowercase')(value.name).indexOf($filter('lowercase')($scope.searchtext)) >= 0) {
                    $scope.searchRes.push({
                        name: value.name,
                        thumb: value.thumb
                    });
                }
            });
        };

        $scope.$watch('searchtext', function () {
            if ($scope.searchtext !== undefined && $scope.searchtext !== '') {
                $scope.search();
            }
        })
    });

});