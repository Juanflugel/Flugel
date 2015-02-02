angular.module('ejeController',[])

.controller('DatosController',['$scope', function($scope){
	
	$scope.limpiarLS = function(){
		localStorage.clear();
	};
	$scope.guardarLS = function (Nombre,Datos) {
		localStorage.setItem(Nombre,JSON.stringify (Datos) );
	};
	$scope.llamarLS = function (Nombre) {
		JSON.parse(localStorage.getItem(Nombre));	
	};

	$scope.personas = $scope.llamarLS('personas') || [{Bienvenido:'Por favor Cargue su archivo CSV'}] ;
	$scope.unComplete = $scope.llamarLS('vacios') || [{vacios:'Por favor Cargue su archivo CSV'}];

	$scope.archivo=$('#archivo-csv');

	$scope.tabla = {
		datos:$scope.personas,
		header:$scope.personas[0]
	};

	$scope.tablavacios = {
		datos:$scope.unComplete,
		header:$scope.unComplete[0]
	};

	$scope.archivo.on('click',$scope.limpiarLS()); 

	$scope.archivo.on('change',function(){
		$scope.archivo.parse({
			config: {
				worker:true,
				header:true,
				complete: function(results) {
					$scope.personas=results.data;
					//console.log($scope.personas);          
					for(var i=0;i<$scope.personas.length;i++){

						if(_.contains($scope.personas[i],"")){
							$scope.unComplete.push($scope.personas[i]);
						}
					};
					
					$scope.guardarLS('personas',$scope.personas);
					$scope.guardarLS('vacios',$scope.unComplete);
					//console.log($scope.unComplete);
              // se llaman a las dos funciones de la directiva ls-Table antes del apply para que procesen los datos.
              // porque esas funciones se ejecutan al momento de cargas la directiva.
	                $scope.tabla.datos = $scope.ObjtoArray($scope.personas);
	                $scope.tabla.header = $scope.TablaHeader($scope.personas[0]);
	                $scope.tablavacios.datos = $scope.ObjtoArray($scope.unComplete);
	                $scope.tablavacios.header = $scope.TablaHeader($scope.unComplete[1]);
	                $scope.$apply();   
              
                }
            }      
        });
	}); 

}]);

