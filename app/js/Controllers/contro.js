angular.module('ejeController',['ejeServi'])

.controller('DatosController',['$scope','loStorage', function ($scope,loStorage) {

	$scope.personas = loStorage.llamarLS('personas') || [{Bienvenido:'Por favor Cargue su archivo CSV'}]; 
	$scope.unComplete = loStorage.llamarLS('vacios')|| [{Bienvenido:'Por favor Cargue su archivo CSV'}];

	$scope.pru = function(){
		console.log(loStorage.todos);
		console.log(loStorage.vacios);
	};

	$scope.archivo=$('#archivo-csv');

	$scope.tabla = {
		datos:$scope.personas,
		header:$scope.personas[0]
	};

	$scope.tablavacios = {
		datos:$scope.unComplete,
		header:$scope.unComplete[0]
	};

	$scope.archivo.on('click',function (){
		loStorage.limpiarLS();
	}); 

	$scope.archivo.on('change',function(){
		$scope.archivo.parse({
			config: {
				worker:true,
				header:true,
				complete: function(results) {
					var u = [];
					var p = results.data;

					for( i=0 ; i<p.length ; i++ ){
						if(_.contains(p[i],"")){
							u.push(p[i]);
						}
					};

					$scope.personas=p;
					$scope.unComplete=u;


					
					
					loStorage.guardarLS('personas',$scope.personas);
					loStorage.guardarLS('vacios',$scope.unComplete);
					//console.log($scope.unComplete);
              // se llaman a las dos funciones de la directiva ls-Table antes del apply para que procesen los datos.
              // porque esas funciones se ejecutan al momento de cargas la directiva.
              $scope.tabla.datos = $scope.ObjtoArray($scope.personas); // hay que hacer console para ver aca cual es el undefinedh
              $scope.tabla.header = $scope.TablaHeader($scope.personas[0]);
              $scope.tablavacios.datos = $scope.ObjtoArray($scope.unComplete);
              $scope.tablavacios.header = $scope.TablaHeader($scope.unComplete[1]);
              $scope.$apply();   
              
          }
      }      
  });
}); 

}]);

