/*
Ruta al home
*/

(function(){
    'use strict';
    angular.module('MainRoutes', []).config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/core/partials/home.html'
            })
            /* Default */
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
