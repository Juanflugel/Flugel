var app= angular.module('flugel-datos',[]);// MODULO PARA DEPURACIÒN DE BASE DE DATOS
//var estudiantes=[{nombre:'Juan',apellido:'Garcia',edad:'24'},{nombre:'Jessica',apellido:'Junkes',edad:'24'},{nombre:'Lennin',apellido:'Suescun',edad:'24'}];

var estudiantes=JSON.parse(localStorage.getItem('juan'));

// motrar en pantalla los datos de la colecciòn estudiantes
app.controller('DatosController', ['$scope', '$http', function($scope,$http){
	$scope.alumnos=estudiantes;

  // $http.get("/flugel/app/js/Json/estudiantes.json").
  // success(function(data) {
  //   $scope.alumnos=data;
  // }).
  // error(function(data) {
  //   console.log("coman monda");
  // });

}]);
// motrar en pantalla los datos de la colecciòn estudiantes

// directiva para tabla
app.directive('reviewtableDb',function(){
  return{
    restrict:'E',
    templateUrl:'/flugel/app/html/reviewtab-db.html'
  };
});
// app.directive('inputDb',['$document',function($document){
//  return{
//   restrict:'A',
//   link: function (scope, element, attr){
//     element.on('click', function(event){
//       console.log("funciona");});
//     element.on('change',function(event){
//       console.log("cargado");

//     });
//   },
//  }
// }]);
app.controller('inputDbController',['$scope', function($scope){
  $scope.alumnos=estudiantes;
  $scope.archivo=$('#archivo-csv');
  $scope.archivo.on('click',function(){
    localStorage.clear();
  });

  $scope.archivo.on('change',function(){

    $scope.archivo.parse({
      config: {
        header:true,
        complete: function(results, file) {
          //console.log("This file done:", file, results.data);
          estudiantes=results.data;
          console.log(estudiantes,'sacaloooooooooooooo');
          localStorage.setItem('juan',JSON.stringify(estudiantes));
          $scope.$apply();
        }
      }

    });
// aqui no es
  });
// aqui no es  
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


// tabla lennin 
app.directive('lsTable', function(){

    function link(scope, element, attrs){
      scope.ObjtoArray = function(array){
        return _.map(array, function(obj){
          console.log(obj);
          console.log(_.toArray(obj));
          return _.toArray(obj);
        });     
      };

      scope.predicate = '0';
      scope.reverse = false;
      scope.tableOrder = function(val){
        if (scope.predicate == val.toString()) {
          scope.reverse = !scope.reverse;
        }else{
          scope.reverse = false;
          scope.predicate = val.toString();
        }
        
      };

      scope.tabla.datos = scope.ObjtoArray(scope.tabla.datos);
      scope.limite = scope.tabla.datos.length;
      
    };
    return{
      restrict: 'E',      
      templateUrl: "/flugel/app/html/tabla.html",
      link: link
    };  
  });
  app.controller('table1', ['$scope', function($scope){
    $scope.tabla = {
      header: ['Link', 'Nombre', 'Icon', 'Otro', 'Anita'],
      tableClass: "table-striped table-hover table-responsive panel",
      datos: [
        {link:'Aome', nombre: 'Formularios', icon: 'fa-list-alt', otro: 'mama', Bueno: 1},
        {link:'Bbout', nombre:'Gstudiantes', icon:'fa-user', otro: 'mama', Bueno: 2},
        {link:'Cbout Lorem ipsum olor si voluptas nobis reicien', nombre:'Aocentes', icon:'fa-group', otro: 'mama', Bueno: 3},
        {link:'Dstadistica', nombre:'Bstadisticas', icon:'fa-bar-chart-o', otro: 'mama', Bueno: 2},
        {link:'Estadistica', nombre:'Estadisticas', icon:'fa-bar-chart-o', otro: 'mama', Bueno: 5}
      ]   
    };
  }]);
// hasta aca todo funciona

// cabeza de la tabla 
