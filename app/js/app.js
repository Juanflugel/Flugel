angular.module('eje',[
  'ui.router',
  'ejeController',
  'ejeDirect'])

.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  // Now set up the states
  $stateProvider
    .state('Inicio', {
      url: "/Inicio",
      templateUrl: "/flugel/app/html/nuevo.html",
      controller:'DatosController'
    })
    .state('tabla', {
      url: "/vacios",
      templateUrl: "/flugel/app/html/vacios.html",
      controller:'DatosController'
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});