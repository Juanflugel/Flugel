var app=angular.module('Modulo-DB',[]);

var personas= JSON.parse(localStorage.getItem('personas'))  || [{Bienvenido:'Por favor Cargue su archivo CSV'}];
// Controllador del Input-funciòn parse Datos
app.controller('inputDbController',['$scope', function($scope){
	$scope.archivo=$('#archivo-csv');
  $scope.archivo.on('click',function(){
    localStorage.clear();
  });
	$scope.archivo.on('change',function(){
		$scope.archivo.parse({
			config: {
				header:true,
				complete: function(results, file) {
					console.log("This file done:", file, results.data);
          personas=results.data;
          localStorage.setItem('personas',JSON.stringify(personas));
          location.reload();

				}
			}      
		});
	});
}]);

// Controlador tabla
app.controller('table1', ['$scope', function($scope){
	$scope.tabla = {
		header: personas[0],
		tableClass: "table-striped table-hover table-responsive panel",
		datos: personas
	};
}]);

// Directiva Tabla 
app.directive('lsTable', function(){

    function link(scope, element, attrs){

// experimento
scope.tableHeader=function(obj){
 return _.keys(obj);
        console.log(_.keys(obj));
};

// experimento

      scope.ObjtoArray = function(array){
        return _.map(array, function(obj){
          //console.log(obj);
         //console.log(_.toArray(obj));
          return _.toArray(obj);
        });
        return _.keys(obj);
        console.log(_.keys(obj));
    
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
      scope.tabla.header = scope.tableHeader(scope.tabla.header);
      scope.tabla.datos = scope.ObjtoArray(scope.tabla.datos);
      scope.limite = scope.tabla.datos.length;
      
    };
    return{
      restrict: 'E',      
      templateUrl: "/flugel/app/html/tabla.html",
      link: link
    };  
  });