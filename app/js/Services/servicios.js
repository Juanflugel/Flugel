angular.module('ejeServi',[])

.factory('loStorage', function(){

	var store={ todos:[], vacios:[],

		limpiarLS: function(){
			window.localStorage.clear();
		},
		guardarLS: function (Nombre,Datos) {
			window.localStorage.setItem(Nombre,JSON.stringify (Datos));
		},
		llamarLS: function (Nombre) {
			return JSON.parse(window.localStorage.getItem(Nombre));	
		}
	};
    
	return store;
});