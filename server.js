/*
Archivo principal del servidor, llamado a express, mongo y socket.io
Manejo de eventos del servidor con soket.io
*/

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose'),
    express = require('./config/express');
    //passport = require('./config/passport');

var db = mongoose();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//var passport = passport();
server.listen(3000);
module.exports = app;

console.log('Servidor escuchando en http://localhost:3000/');

/*=================Socket.io events==========================*/
var chatEnabled = true;

io.on('connection', function(socket){

    socket.on('new user', function(message){
        socket.broadcast.emit('new user', message.username);
    })

    socket.on('ofertar', function(data){
        if (chatEnabled) {
            clearTimeout(control);
            socket.emit('ofertar', data);
            socket.broadcast.emit('ofertar', data);
            var control = setTimeout(function (){
                clearTimeout(control);
                chatEnabled = false;
                data = {
                    message:'Competencia finalizada.',
                    username: data.username
                }
                socket.broadcast.emit('time off', data);
                socket.emit('time off', data);
                socket.disconnect(true);
            },15000);
        }else {
            socket.emit('time off', data);
            socket.disconnect(true);
        }
     })
});



/*
El siguiente codigo comentado es el intento de crear namespaces dinamicamente para el manejo de las diferentes subastas
*/

/*=================Socket.io server events==========================*/
/*var chatEnabled = true;
var namespaces = [];

function searchNs (namespace, callback){
    var ns, bool;
    for(i = 0; i<namespaces.length; i++){
        if (namespaces[i] === namespace){
            ns = namespaces[i];
            bool = false;
        }else {
            bool = true;
        }
    }
    callback(bool, ns);
}

io.on('connection', function(socket){
    socket.emit('new connection',{message: 'nueva conexion'});

    socket.on('createNamespace', function(data){
        searchNs(data.ns, function(alreadyExists, paramNamespace){
            if (alreadyExists) {
                socket.emit('new connection',{message: 'ya existe el namespace'});
            }else {
                namespaces.push(data.ns);
                socket.emit('new connection',{message: 'namespace creado'});
            }
        })
    })

    socket.on('join namespace', function(data){

        searchNs(data.ns, function(doesntExists, paramNamespace){
            if (doesntExists) {

                socket.emit('failed connect', {message: 'Fallo la conexion'})

            }else {

                namespace = io.of('/' + paramNamespace);
                socket.emit('successful connection', {message: 'conexion exitosa'});

                namespace.on('connection', function(ns_socket){
                    ns_socket.emit('new user', {message:'nuevo usuario conectado al namespace'});

                    namespace.on('ofertar', function(data){
                        if (chatEnabled) {
                            ns_socket.emit('ofertar', data);
                            //socket.broadcast.emit('ofertar', data);
                            setTimeout(function (){
                                chatEnabled = false;
                                //socket.broadcast.emit('time off', {message: 'la subasta ha finalizado con un ganador'});
                                ns_socket.emit('time off', {message: 'la subasta ha finalizado con un ganador'});
                            },10000);
                        }else {
                            ns_socket.emit('time off', {message: 'la subasta ha finalizado ya no se puede ofertar'});
                        }
                    });

                })
            }
        })
    })
});


=================Socket.io client events================================
socket.on('new connection', function(message){
    console.log(message);
})
socket.on('failed connect', function(message){
    console.log(message);
});
socket.on('successful connection', function(message){
    flagNamespace = true;
})
while (flagNamespace) {
    var socketInNamespace = io('/' + socket_nameSpace);
    socketInNamespace.on('new user', function(message){
        console.log(message);
    })
    /*Esto es lo del cronometro*/
    /*var control;
    function reloj () {
    vm.$apply(vm.tiempoRes = 10);
    control = setInterval(cronometro,1000);
    }
    function cronometro () {
        if (vm.tiempoRes > 0) {
            vm.$apply(--vm.tiempoRes)
        }
    }

    vm.pujar = function(val){
        var message = {
            valor: val,
            username: vm.username
        };
        socketInNamespace.emit('ofertar', message);
    };
    socketInNamespace.on('ofertar', function(message){
        clearInterval(control);
        vm.$apply(vm.valActual = vm.valActual + message.valor);
        reloj();
    })

    socketInNamespace.on('time off', function(data){
        vm.$apply(vm.subastaNoFinalizada = false);
        vm.$apply(vm.message = data.message);
    })
}
}
*/
