function MainCtrl($scope) {
    var vm = this;
}

function ElevadorCtrl($scope, $filter) {
    var vm = this;

    vm.qtdAndar = 6;
    vm.passageiros = [];
    vm.qtdPassageiros = 0;
    vm.qtdMaxPassageiros = 6;
    vm.andarElevador = 0;
    vm.ultimoAndar = 0;
    vm.elevador_sobe = [];
    vm.elevador_desce = [];
    vm.output = document.getElementById("output");

    function adicionaPassageiro(passageiro) {
        vm.passageiros.push({
            andar: 0,
            passageiro: passageiro
        });
    }

    vm.adicionaQtdPassageiros = function () {
        vm.passageiros = [];

        if (vm.qtdPassageiros <= vm.qtdMaxPassageiros) {
            for (let i = 1; i <= vm.qtdPassageiros; i++) {
                adicionaPassageiro(i);
            };
        } else {
            alert('Quantidade de passageiros ultrapassou o limite máximo de ' + vm.qtdMaxPassageiros + ' passageiros');
        }
    }

    function orginizaAndares() {
        var array_andar = [];

        for (let k = 0; k < vm.passageiros.length; k++) {

            if (parseInt(vm.passageiros[k].andar) > vm.andarElevador) {
                vm.elevador_sobe.push(parseInt(vm.passageiros[k].andar));
            } else if (parseInt(vm.passageiros[k].andar) < vm.andarElevador) {
                vm.elevador_desce.push(vm.passageiros[k].andar);
            }
        }

        array_andar.push(vm.elevador_sobe);
        array_andar.push(vm.elevador_desce);

        vm.elevador_sobe = [];
        vm.elevador_desce = [];

        return array_andar;
    }

    function sobe() {
        vm.array_andares = orginizaAndares()[0];

        vm.ultimoAndar = Math.max.apply(null, vm.array_andares);

        if ((vm.andarElevador + 1) <= vm.ultimoAndar) {
            vm.output.innerHTML += "Fecha porta <br />";
            vm.output.innerHTML += "Subindo... <br />";

            for (let i = (vm.andarElevador + 1); i <= vm.ultimoAndar; i++) {
                rotaElevador(i);
            }
        }
    }

    function desce() {
        vm.array_andares = orginizaAndares()[1];
        vm.ultimoAndar = Math.min.apply(null, vm.array_andares);

        if ((vm.andarElevador - 1) >= vm.ultimoAndar) {
            vm.output.innerHTML += "Fecha porta <br />";
            vm.output.innerHTML += "Descendo... <br />";
            for (let i = (vm.andarElevador - 1); i >= vm.ultimoAndar; i--) {
                rotaElevador(i);
            }
        }
    }

    vm.fecharPorta = function () {
        vm.output.innerHTML = "";
        vm.output.innerHTML += "Elevador no andar " + vm.andarElevador + "<br />";

        sobe();
        desce();

    }

    function rotaElevador(nroAndar) {
        vm.andarElevador = nroAndar;
        vm.output.innerHTML += "Vai para Andar [ " + vm.andarElevador + " ]<br />";

        let passageiroSai = $filter('filter')(vm.passageiros, {
            andar: vm.andarElevador
        });

        if (passageiroSai != null && passageiroSai.length > 0) {
            vm.output.innerHTML += "Abre a porta <br />";

            for (let j = 0; j < passageiroSai.length; j++) {
                vm.passageiros.splice(vm.passageiros.indexOf(passageiroSai[j]), 1);
                vm.output.innerHTML += "Sai passageiro ->" + passageiroSai[j].passageiro + "<br />";
            }

            if (nroAndar == vm.ultimoAndar) {
                vm.output.innerHTML += "Porta esta aberta <br />";
            } else {
                vm.output.innerHTML += "Porta esta fechada <br />";
            }
        }
    }
}

angular
    .module('elevador')
    .controller('MainCtrl', MainCtrl)
    .controller('ElevadorCtrl', ElevadorCtrl);