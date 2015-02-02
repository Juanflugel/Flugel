var app=angular.module('Modulo-DB',[]);

  // Controllador del Input-funciòn parse Datos
  app.controller('inputDbController',['$scope', function($scope){

    $scope.limpiar=function(){
      localStorage.clear();
    };
    
    $scope.personas= JSON.parse(localStorage.getItem('personas')) || [{Bienvenido:'Por favor Cargue su archivo CSV'}] ;
    $scope.unComplete=[];
    $scope.detalles=[];
    $scope.archivo=$('#archivo-csv');
    $scope.tabla = {
      datos:$scope.personas,
      header:$scope.personas[0]
    };

    $scope.archivo.on('click',$scope.limpiar()); 

    $scope.archivo.on('change',function(){
      $scope.archivo.parse({
       config: {
        worker:true,
        header:true,
        complete: function(results, file) {
         $scope.personas=results.data;
         console.log($scope.personas);
               //console.log(file,$scope.personas.length);
               $scope.detalles=file;
               for(var i=0;i<$scope.personas.length;i++){

                if(_.contains($scope.personas[i],"")){
                  $scope.unComplete.push($scope.personas[i]);
                }

              };

              localStorage.setItem('personas',JSON.stringify($scope.personas));
              console.log($scope.unComplete);
              // se llaman a las dos funciones de la directiva ls-Table antes del apply para que procesen los datos.
              // porque esas funciones se ejecutan al momento de cargas la directiva.
              $scope.tabla.datos = $scope.ObjtoArray($scope.personas);
              $scope.tabla.header = $scope.TablaHeader($scope.personas[0]);
              $scope.$apply();   
              
            }
          }      
        });
});  
}]);


// Directiva Tabla lsTable
app.directive('lsTable', function(){

   function link(scope, element, attrs){

        scope.ObjtoArray = function(array){
         return _.map(array, function(obj){
                        //console.log(obj);
                        //console.log(_.toArray(obj));
                        return _.toArray(obj);
                     });
        };

        scope.TablaHeader = function(obj){
            //console.log(_.keys(obj));
            return _.keys(obj);
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
        scope.tabla.header= scope.TablaHeader(scope.tabla.header);
      // scope.limite = scope.tabla.datos.length;
   };
   
   return{
      restrict: 'E',      
      templateUrl: "/flugel/app/html/tabla.html",
      link: link
   };  
});