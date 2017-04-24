function config($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/elevador.html",
            controller: "ElevadorController"
        });
}

angular
    .module('elevador')
    .config(config)
    .run(function($rootScope) {
    });
