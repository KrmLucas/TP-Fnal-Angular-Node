/*
Modulo core de la aplicacion frontend
*/
(function(){
    'use strict';
    angular.module('mainModule', ['ngRoute', 'ngResource', 'ui.bootstrap','btford.socket-io', 'MainRoutes', 'Navigation','Subastas', 'myKeyPressDirective', 'myDelayDirective']);
    angular.element(document).ready(function(){
        angular.bootstrap(document, ['mainModule']);
    })
})();
