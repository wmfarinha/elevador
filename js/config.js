function config($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/elevador.html",
            controller: "ElevadorCtrl"
        });
}

angular
    .module('elevador')
    .config(config)
    .run(function($rootScope) {
    });
