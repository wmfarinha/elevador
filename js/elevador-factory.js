(function() {
    'use strict';

    angular
        .module('elevador')
        .factory('ElevadorFactory', elevadorFactory);

    elevadorFactory.$inject = ['$http'];

    /* @ngInject */
    function elevadorFactory($http) {

        var Elevador = function() {
            this.qtdAndar = 6;
            this.qtdMaxPassageiros = 6;
            this.andar = 0;
            this.passageiros = [];
            this.display = "";
        };

        return Elevador;
    }


})();