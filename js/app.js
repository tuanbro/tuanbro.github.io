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
                        thumb: value.thumb,
                        src: value.srcImg
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
            var assets = document.querySelector('a-assets');
            var item1 = document.createElement("img");
              item1.setAttribute('id', 'p' + value.id);
              item1.setAttribute('src', value.src);
              item1.setAttribute('crossorigin', 'anonymous');
              assets.appendChild(item1);
            var outer = document.getElementById( window.skyes.outer );
            var outerMaterial = Object.assign( {}, outer.getAttribute( 'material' ) );
            outerMaterial.src = '#p' + value.id;
            outer.setAttribute( 'material', outerMaterial );
            window.skyes._id = value.id;
            // console.log(value);
        }
    });

});