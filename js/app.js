var app = angular.module('App', ['ngMaterial', 'ngResource', 'ngAnimate']);

app.controller('AppCtrl', function ($scope, $http, $resource, $filter) {
    $scope.cardwhiteframe = "3";
    $scope.btnWhiteframe = "-1";
    $scope.searchRes = [];
    $scope.searchBarVis = false;
    $resource('js/data.json').get().$promise.then(function (data) {
        $scope.data = data;
        console.log($scope.data.scene);
        $scope.search = function () {
            $scope.searchRes = [];
            angular.forEach($scope.data.scene, function (value) {
                if ($filter('lowercase')(value.name).indexOf($filter('lowercase')($scope.searchtext)) >= 0) {
                    $scope.searchRes.push({
                        id: value.id,
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
        });


        $scope.click = function (value) {
            console.log(value);
        }
    });

});