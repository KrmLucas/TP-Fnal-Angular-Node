/*
Servicio para las peticiones http al servidor
Rutas del seridor en app/routes/subastas.server.routes.js
Controller crud del servidor en app/controllers/subastas.server.controller.js
Model en app/models/subastas.server.model.js

ref para testear separado del backend

subasta={'producto':'prod1', 'initCost': 'cost1', 'fecha':'fecha1'}
          type: string        type: number         type: date
*/

(function(){
    'use strict';

    angular.module('Subastas')
    .factory('SubastasSrv', ['$http', function($http){
        return{
            saveSubasta: function(subasta, callback){
                $http
                    .post('api/subastas', subasta)
                    .then(
                        function(res){
                            return callback(false, res.data)
                        },
                        function(err){
                            return callback(err.data)
                        }
                    )
            },
            updateSubasta: function(id, subasta, callback){
                $http
                    .put('api/subastas/' + id, subasta)
                    .then(
                        function(res){
                            return callback(false, res.data)
                        },
                        function(err){
                            return callback(err.data)
                        }
                    )
            },
            deleteSubasta: function(id, callback){
                $http
                    .delete('api/subastas/' + id)
                    .then(
                        function(res){
                            return callback(false, res.data)
                        },
                        function(err){
                            return callback(err.data)
                        }
                    )
            },
            findAll: function(callback){
                $http
                    .get('api/subastas')
                    .then(
                        function(res){
                            return callback(false, res.data)
                        },
                        function(err){
                            return callback(err.data)
                        }
                    )
            },
            findById: function(id, callback){
                $http
                    .get('api/subastas/' + id)
                    .then(
                        function(res){
                            return callback(false, res.data)
                        },
                        function(err){
                            return callback(err.data)
                        }
                    )
            }
        }
    }])
})();
