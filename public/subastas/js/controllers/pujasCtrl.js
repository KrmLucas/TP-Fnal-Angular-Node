/*
Controlador de la pantalla de pujas
Partial asociado: public/subastas/partials/subasta.html
Utiliza el servicio SubastasSrv para inicializar la pantalla con los datos de la subasta.
Maneja distintos flags para mostrar y ocultar contenidos
Gestiona los mensajes con socket.io
*/
(function(){
    'use strict';
    angular.module('Subastas')
    .controller('PujasController', ['$scope', '$routeParams', '$location', '$window', '$timeout', 'SubastasSrv', PujasController])

    function PujasController (vm, params, $location, $window, $timeout, service){
        var socket = io.connect(null,{reconnection:false});
        vm.subasta = {};
        vm.valActual; //variable para el valor de la subasta a que va cambiando
        vm.subastaNoFinalizada = true; //flag para hacer hide o show

        /* Metodo que pretendiamos llamar desde la directiva myTimeDirective
        vm.myFlag = false;
        vm.probarSiFunciona = function(variable){
            vm.myFlag = true;
        }
        */

        /*llamamos al metodo seach del servicio para inicializarPantalla() con los datos de la subasta*/
        vm.search = function(){
            service.findById(vm.subastaId, function(err, res){
                if (err) {
                    return setError('Ocurrio un error buscando una subasta: ' + err)
                }
                vm.subasta = res;
                inicializarPantalla(vm.subasta);
            })
        }
        /*El parametro de la ruta es el id de la subasta asi que lo capturamos y llamamos a search*/
        if (params.subastaId) {
            vm.subastaId = params.subastaId;
            vm.search();
        }

        function inicializarPantalla(subasta){
            vm.valActual = vm.subasta.initCost;
            vm.tiempoRes = 10;

            /*flags para hide y show*/
            vm.itsTheDay=false;
            vm.flagJumbotron = false;
            vm.flagComenzar = false;

            /*metodo para ocultar la pantalla de pujas hasta el dia y hs de la subasta*/
            var aux = vm.subasta.fecha;
            aux = aux.toString();
            var fecha = new Date(aux);
            var date = new Date();
            $timeout(function(){
                vm.$apply(vm.itsTheDay = true);
                vm.$apply(vm.flagJumbotron = true);
            }, fecha.getTime()-date.getTime())
        }

        /*Seteamos flags cuando el usuario ingresa su nombre y da click en comenzar*/
        vm.comenzar = function(){
            vm.itsTheDay = false;
            vm.flagComenzar = true;
            var message = {
                username: vm.username
            }
            socket.emit('new user', message);
        }



/*==============================Socket.io events=============================*/

        socket.on('new user', function(message){
            console.log(message);
        })


        /*Cronometro para maneajar la visualizacion del tiempo restante para ofertar*/
        var control;
        function reloj () {
        vm.$apply(vm.tiempoRes = 10);
        control = setInterval(cronometro,1000);
        }
        function cronometro () {
            if (vm.tiempoRes > 0) {
                vm.$apply(--vm.tiempoRes)
            }
        }

        /*Cuando el usuario oferta se emite el mensaje*/
        vm.pujar = function(val){
            console.log(vm.username);
            var message = {
                valor: val,
                username: vm.username
            };
            socket.emit('ofertar', message);
        };

        /*Cuando el servidor emite ofertar se actualiza el valor de la subasta y el tiempo restante para ofertar*/
        socket.on('ofertar', function(message){
            clearInterval(control);
            vm.$apply(vm.valActual = vm.valActual + message.valor);
            reloj();
        })

        /*Cuando el servidor emite 'time off' se oculta la pantalla de pujar y aparece un alert informando que la subasta finalizo y quien fue el ganador*/
        socket.on('time off', function(data){
            socket.emit('disconnect')
            vm.$apply(vm.subastaNoFinalizada = false);
            vm.$apply(vm.message = data.message + ' El usuario ' + data.username + ' ha ganado.');
        })
    }
})();
