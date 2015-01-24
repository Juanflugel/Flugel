angular.module('ModuloDB-1.0',[])

.controller('ModuloDBController',['$scope', function($scope){
  var personas=[];
  $scope.archivo=$('#archivo-csv');
  $scope.archivo.on('click',function(){
    localStorage.clear();
  });
  $scope.archivo.on('change',function(){
    $scope.archivo.parse({
     config: {
      header:true,
      complete: function(results) {
       console.log("This file done:",results.data);
       personas=results.data;
       localStorage.setItem('personas',JSON.stringify(personas));
       
     }
   }      
 });
  });
}]);

// app.controller('table1', ['$scope', function($scope){
//   $scope.tabla = {
//     header: [],
//     tableClass: "table-striped table-hover table-responsive panel",
//     datos: []
//   };
  
// }]);