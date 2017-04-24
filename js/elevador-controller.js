'use strict';

angular.module('elevador')
    .controller('ElevadorController', ['$scope', '$filter', 'ElevadorFactory', 'ElevadorService',
        function($scope, $filter, elevadorFactory, elevadorService) {
            var vm = this;

            vm.passageiros = [];
            vm.qtdPassageiros = 0;
            vm.ultimoAndar = 0;

            var elevador = new elevadorFactory();
            elevador.display = document.getElementById("output");

            function adicionaPassageiro(passageiro) {
                vm.passageiros.push({
                    andar: 0,
                    passageiro: passageiro,
                    validado: false
                });
            }

            vm.adicionaQtdPassageiros = function() {
                vm.passageiros = [];

                if (vm.qtdPassageiros <= elevador.qtdMaxPassageiros) {
                    for (let i = 1; i <= vm.qtdPassageiros; i++) {
                        adicionaPassageiro(i);
                    }
                    elevador.passageiros = vm.passageiros;
                } else {
                    alert('Quantidade de passageiros ultrapassou o limite máximo de ' + elevador.qtdMaxPassageiros + ' passageiros');
                }
            }

            function sobe() {
                vm.ultimoAndar = Math.max.apply(null, vm.array_andares[0]);

                if ((elevador.andar + 1) <= vm.ultimoAndar) {
                    elevador.display.innerHTML += "Fecha porta <br />";
                    elevador.display.innerHTML += "Subindo... <br />";

                    elevador = elevadorService.rotaSobe(elevador, vm.ultimoAndar);
                }
            }

            function desce() {
                vm.ultimoAndar = Math.min.apply(null, vm.array_andares[1]);

                if ((elevador.andar - 1) >= vm.ultimoAndar) {
                    elevador.display.innerHTML += "Fecha porta <br />";
                    elevador.display.innerHTML += "Descendo... <br />";

                    elevador = elevadorService.rotaDesce(elevador, vm.ultimoAndar);
                }
            }

            vm.fecharPorta = function() {
                elevador.display.innerHTML = "";
                elevador.display.innerHTML += "Elevador no andar " + elevador.andar + "<br />";

                var passageiroAndarErrado = elevadorService.validaAndarPassageiro(elevador);

                if (passageiroAndarErrado.length === 0) {
                    vm.array_andares = elevadorService.organizaAndares(elevador);

                    if (vm.array_andares[0].length > 0) {
                        sobe();
                    }

                    if (vm.array_andares[1].length > 0) {
                        desce();
                    }
                } else {
                    alert('Passageiro ' + passageiroAndarErrado[0].passageiro + ' selecionou um andar que não existe!');
                }
            }
        }
    ]);