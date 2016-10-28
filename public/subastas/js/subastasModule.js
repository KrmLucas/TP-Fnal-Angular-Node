/*
Declaracion del modulo de subastas
Manejo de las rutas del modulo
*/

(function(){
    'use strict';
    angular.module('Subastas',[])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/subastas/crear', {
                templateUrl: 'subastas/partials/form-subasta.html',
                controller: 'SubastasController'
            })
            .when('/subastas/editar/:subastaId', {
                templateUrl: 'subastas/partials/form-subasta.html',
                controller: 'SubastasController'
            })
            .when('/subastas/listar', {
                templateUrl: 'subastas/partials/list-subastas.html',
                controller: 'ListSubastasCtrl'
            })
            .when('/subastas/:subastaId', {
                templateUrl: 'subastas/partials/subasta.html',
                controller: 'PujasController'
            })
    }])
})();
