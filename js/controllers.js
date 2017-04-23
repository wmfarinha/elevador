function MainCtrl($scope) {
    var vm = this;
}

function ElevadorCtrl($scope, $filter) {
    var vm = this;

    vm.qtdAndar = 6;
    vm.passageiros = [];
    vm.qtdPassageiros = 0;
    vm.statusElevador = "Porta Aberta";
    vm.andarElevador = 0;

    function adicionaPassageiro(passageiro) {
        vm.passageiros.push({
            andar: 0,
            passageiro: passageiro
        });
    }

    vm.adicionaQtdPassageiros = function () {
        for (let i = 0; i < vm.qtdPassageiros; i++) {
            adicionaPassageiro(i);
        };
    }

    function sobe() {

        console.log('Fecha Porta')

        for (let i = 1; i <= vm.qtdAndar; i++) {

            vm.andarElevador = i;

            console.log('Vai para Andar -> ' + vm.andarElevador);

            //verfica que se tem passageiros para descer
            let passageiroDesce = $filter('filter')(vm.passageiros, {
                andar: vm.andarElevador
            });

            if (passageiroDesce != null && passageiroDesce.length > 0) {
                console.log('Abre a porta');

                for (let j = 0; j < passageiroDesce.length; j++) {
                    vm.passageiros.splice(vm.passageiros.indexOf(passageiroDesce[j]), 1);
                    console.log('Sai passageiro -> ' + passageiroDesce[j].passageiro);
                }

                console.log('Fecha porta');

            } else {
                console.log('Não tem passageiros para descer no andar ' + vm.andarElevador);
            }
        }
    }

    function desce() {
        for (let i = vm.qtdAndar; i <= vm.qtdAndar; i--) {

        }
    }

    vm.fecharPorta = function () {
        sobe();
    }
}

angular
    .module('elevador')
    .controller('MainCtrl', MainCtrl)
    .controller('ElevadorCtrl', ElevadorCtrl);