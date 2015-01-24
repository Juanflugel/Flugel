angular.module('ModuloDB-1.0',[])

  .directive('lsTable', function(){
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