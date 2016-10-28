/*
Controlador de la lista de subastas
Partial asociado: public/subastas/partials/list-subastas.html
Utiliza el metodo findAll del servicio 'SubastasSrv' (public/subastas/js/subastasSrv.js)
para inicializar el partial con la lista de todas las subastas
*/
(function(){
    'use strict';
    angular.module('Subastas')
      .controller('ListSubastasCtrl', ['$scope','SubastasSrv', '$routeParams', '$location', ListSubastasCtrl]);

      function ListSubastasCtrl (vm, SubastasSrv, params, location){
            vm.service = SubastasSrv;
            vm.subastas = [];

            vm.service.findAll(function(err, res){
                if(err){
                    return alert('Ocurrió un error buscando un usuario: ' + err)
                }
                vm.subastas = res;
            })
        };
})();
