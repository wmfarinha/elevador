(function () {
    'use strict';

    angular.module('elevador')
        .service('ElevadorService', elevadorService);
    elevadorService.$inject = ['$http', '$filter'];

    function elevadorService($http, $filter) {
        var service = this;
        var vm = {};
        vm.output = document.getElementById("output");

        service.executaRota = function (nroAndar, andarElevador, passageiros) {
            andarElevador = nroAndar;
            vm.output.innerHTML += "Vai para Andar [ " + andarElevador + " ]<br />";

            let passageiroSai = $filter('filter')(passageiros, {
                andar: andarElevador
            });

            if (passageiroSai != null && passageiroSai.length > 0) {
                vm.output.innerHTML += "Abre a porta <br />";

                for (let i = 0; i < passageiroSai.length; i++) {
                    passageiros.splice(vm.passageiros.indexOf(passageiroSai[i]), 1);
                    vm.output.innerHTML += "Sai passageiro ->" + passageiroSai[i].passageiro + "<br />";
                }

                if (nroAndar == vm.ultimoAndar) {
                    vm.output.innerHTML += "Porta esta aberta <br />";
                } else {
                    vm.output.innerHTML += "Porta esta fechada <br />";
                }
            }
        }
    }
})();