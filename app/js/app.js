
var app= angular.module('flugel-datos',[]);// MODULO PARA DEPURACIÒN DE BASE DE DATOS

//var estudiantes=[{nombre:'Juan',apellido:'Garcia',edad:'24'},{nombre:'Jessica',apellido:'Junkes',edad:'24'},{nombre:'Lennin',apellido:'Suescun',edad:'24'}];

// motrar en pantalla los datos de la colecciòn estudiantes
app.controller('DatosController', ['$scope', '$http', function($scope,$http){
	$scope.alumnos=[];

  $http.get("/flugel/app/js/Json/estudiantes.json").
  success(function(data) {
    $scope.alumnos=data;
  }).
  error(function(data) {
    console.log("coman monda");
  });
}]);
// motrar en pantalla los datos de la colecciòn estudiantes

// directiva para tabla

app.directive('reviewtableDb',function(){
  return{
    restrict:'E',
    templateUrl:'/flugel/app/html/reviewtab-db.html'
  };
});

app.directive('inputDb',['$document',function($document){
 return{
  restrict:'A',
  link: function (scope, element, attr){
    element.on('click', function(event){
      console.log("funciona");});
    element.on('change',function(event){
      console.log("cargado");
    });
  },
  controller:['$scope', function($scope){

//       $scope.monda.parse($file, {
//   complete: function(results) {
//     console.log("Finished:", results.data);
//   }
// });


}],

}
}]);


app.controller('inputpruebaController',['$scope',function($scope){
  $scope.leer = $('#prueba');
  $(document).on('ready',function(){
    console.log('estoy listo');
    $scope.leer.on('change',function(){
      console.log('cargado');

      $scope.leer.parse({
        complete: function(results) {
          console.log("Finished:", results.data);
        }
      });









    });
  });
}]);













// directiva para formulario de nuevo estudiante con controlador
app.directive('formNewstudent',function(){
  return{
    restrict:'E',
    templateUrl:'/flugel/app/html/form-new.html',
    controller:['$scope',function($scope){
     $scope.nuevo={};
     $scope.addNuevo = function(nuevo){
       estudiantes.push($scope.nuevo);
       $scope.nuevo={};
       console.log("listo");
     };
   }]
 };
});
