/*
NO FUNCIONA
Esta usada en la view ubicada en public/subastas/partials/subasta.html comentada entre las lineas 8-10.
En el controlador public/subastas/js/controllers/pujasCtrl.js en las lineas 12-17 se puede ver comentado el metodo al que qeuriamos llamar luego del timeout generado en la directva

La idea era poder declarar en el html
<myDirectiva fecha="fecha" funcion="functionDelCtrl()"></myDirectiva>
y que la directiva llamara a la ejecucion de la funcion 'functionDelCtrl()', definida en el controlador padre, en la fecha y hora que le llegaran por parametro.  
*/

(function(){
    'use strict';
    angular.module('myDelayDirective',[])
    .directive('myTimeDirective', ['$timeout', function($timeout){
        return{
            restrict: 'E',
            scope:{
              fecha: "=",
              funcion: "&"
            },
            link: function(scope, elem, attrs){
                var fecha = new Date(scope.fecha);
                var date = new Date();
                console.log(scope.fecha);
                console.log(date);
                $timeout(function(){
                    scope.funcion();
                }, fecha.getTime() - date.getTime());
            }
        }
    }])
})();
