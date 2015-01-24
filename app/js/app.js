angular.module('ModuloDB-1.0',['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/route1")
      
      $stateProvider
        .state('route1', {
            url: "/route1",
            templateUrl: "html/form-new.html"
        })
        .state('route2',{
          url:'/tabla plena',
          templateUrl:'html/peo.html'
        })
          
          
       
    });
