function MainCtrl($scope) {
    var vm = this;
}

function ElevadorCtrl($scope){
    var vm = this;

    vm.andar = [0,1,2,3];
    vm.passageiros = [];
    vm.qtdPassageiros = 0;
    vm.statusElevador = "Porta Aberta";
    vm.andarElevador = 0;

    function adicionaPassageiro(passageiro){
        vm.passageiros.push({
                andar: 0,
                passageiro: passageiro
            });
    }

    vm.adicionaQtdPassageiros = function() {
        for(let i = 0; i < vm.qtdPassageiros; i++){
            adicionaPassageiro(i);
        };
    }

    function iniciaRota(){

    }
}

angular
    .module('elevador')
    .controller('MainCtrl', MainCtrl)
    .controller('ElevadorCtrl', ElevadorCtrl);