/*
Controlador crud de las subastas
Partial asociado: public/subastas/partials/form-subasta.html
*/

(function () {
  'use strict';

  // Subastas controller
  angular
    .module('Subastas')
    .controller('SubastasController', ['$scope', '$routeParams', '$location', '$window', 'SubastasSrv', SubastasController]);

  function SubastasController (vm, params, $location, $window, service) {
        vm.mostrarDelete = false; //el boton delete en el form
        vm.subasta = {};
        vm.flagForm = false;
        vm.seeForm = function (){
            vm.flagForm=true;
        }
        vm.reset = function(){
            clearMessages();
            vm.subasta = {}
        }
        vm.update = function(){
            clearMessages();
            if (vm.subasta._id) {
                service.updateSubasta(vm.subasta._id, vm.subasta, function(err, res) {
                        if (err) {
                            return setError('Ocurrio el error: ' + err)
                        }
                        $location.path('/subastas/' + res._id);
                    });
            }else {
                service.saveSubasta(vm.subasta, function(err, res) {
                        if (err) {
                            return setError('Ocurrio el error: ' + err)
                        }
                        $location.path('/subastas/' + res._id);
                    });
            }
        }
        vm.delete = function(){
            service.deleteSubasta(params.subastaId, function(err, res){
                if (err) {
                    return setError('Ocurrio el error: ' + err)
                }else {
                    $window.location.href ='#/subastas/listar';
                }
            })
        }
        vm.search = function(){
            clearMessages();
            service.findById(vm.subastaId, function(err, res){
                if (err) {
                    return setError('Ocurrio un error buscando una subasta: ' + err)
                }
                vm.subasta = res;
            })
        }
        if (params.subastaId) {
            vm.mostrarDelete = true;
            vm.subastaId = params.subastaId;
            vm.search();
        }
        function setMessage(message){
        vm.message = message;
        }

        function setError(error){
            vm.error = error;
        }

        function clearMessages(){
            setError('')
            setMessage('')
        }
/*====================DATA PIKER ui-bootstrap DIRECTIVE =================*/

            vm.today = function today() {
              vm.subasta.fecha = new Date();
            };
            vm.today();

            vm.clear = function() {
              vm.subasta.fecha = null;
            };

            vm.inlineOptions = {
              minDate: new Date(),
              showWeeks: false
          };

            vm.dateOptions = {
              formatYear: 'yy',
              maxDate: new Date(2020, 5, 22),
              minDate: new Date(),
              startingDay: 1
            };


            vm.toggleMin = function() {
              vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
              vm.dateOptions.minDate = vm.inlineOptions.minDate;
            };

            vm.toggleMin();

            vm.open1 = function() {
              vm.popup1.opened = true;
            };

            vm.popup1 = {
              opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            vm.events = [
              {
                date: tomorrow,
                status: 'full'
              },
              {
                date: afterTomorrow,
                status: 'partially'
              }
            ];

            vm.ismeridian = false;
            vm.hstep = 1;
            vm.mstep = 1;
    }
})();
