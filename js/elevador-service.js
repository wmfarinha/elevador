(function() {
    'use strict';

    angular
        .module('elevador')
        .service('ElevadorService', elevadorService);

    elevadorService.$inject = ['$filter'];

    /* @ngInject */
    function elevadorService($filter) {

        var service = this;

        service.removePassageiro = function(listaPassageiro, passageiroSai) {
            listaPassageiro.splice(listaPassageiro.indexOf(passageiroSai), 1);

            return listaPassageiro;
        }

        service.organizaAndares = function(elevador) {
            var array_andar = [];
            var elevador_sobe = [];
            var elevador_desce = [];

            for (let i = 0; i < elevador.passageiros.length; i++) {

                if (parseInt(elevador.passageiros[i].andar) > elevador.andar) {
                    elevador_sobe.push(parseInt(elevador.passageiros[i].andar));
                } else if (parseInt(elevador.passageiros[i].andar) < elevador.andar) {
                    elevador_desce.push(elevador.passageiros[i].andar);
                }
            }

            array_andar.push(elevador_sobe);
            array_andar.push(elevador_desce);

            return array_andar;
        }

        service.validaAndarPassageiro = function(elevador) {

            elevador = validaRotas(elevador);

            let passageiroAndarErrado = $filter('filter')(elevador.passageiros, {
                validado: false
            });

            return passageiroAndarErrado;
        }

        function validaRotas(elevador) {

            for (let i = 0; i < elevador.passageiros.length; i++) {
                if (parseInt(elevador.passageiros[i].andar) >= 0 && parseInt(elevador.passageiros[i].andar) <= elevador.qtdAndar) {
                    elevador.passageiros[i].validado = true;
                }
            }

            return elevador;
        }

        service.rotaSobe = function(elevador, ultimoAndar) {
            for (let i = (elevador.andar + 1); i <= ultimoAndar; i++) {
                elevador.andar = i;
                elevador = executaRota(elevador, ultimoAndar, i);

            }

            return elevador;
        }

        service.rotaDesce = function(elevador, ultimoAndar) {
            for (let i = (elevador.andar - 1); i >= ultimoAndar; i--) {
                elevador.andar = i;
                elevador = executaRota(elevador, ultimoAndar, i);
            }

            return elevador;
        }

        function executaRota(elevador, ultimoAndar, proximoAndar) {
            elevador.display.innerHTML += "Vai para Andar [ " + proximoAndar + " ]<br />";

            let passageiroSai = $filter('filter')(elevador.passageiros, {
                andar: elevador.andar
            });

            if (passageiroSai != null && passageiroSai.length > 0) {
                elevador.display.innerHTML += "Abre a porta <br />";

                for (let i = 0; i < passageiroSai.length; i++) {
                    elevador.passageiros = service.removePassageiro(elevador.passageiros, passageiroSai[i]);
                    elevador.display.innerHTML += "Sai passageiro ->" + passageiroSai[i].passageiro + "<br />";
                }

                if (elevador.andar == ultimoAndar) {
                    elevador.display.innerHTML += "Porta esta aberta <br />";
                } else {
                    elevador.display.innerHTML += "Porta esta fechada <br />";
                }
            }

            return elevador;
        }

    }


})();