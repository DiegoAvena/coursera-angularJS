// An iife: immediately invoked function expression to make sure no local variables bleed into the global scale
(function () {
    // Use strict will allow us to more easily be safe about the code we write by generating 
    // error messages telling us about particular mistakes that can hurt us later, like trying to 
    // set x = 10 before declaring it with a var keyword (as then x would otherwise be placed in the global space, 
    // which we do not want, that is the whole point of using an iife!)
    'use strict';
    
    // define our main app, the thing that will be responsible for some chunk of 
    // html in index 
    angular.module('myFirstApp', [])
    
    // Controller Defines a piece of our view model: 
    .controller('myFirstController', function($scope) {
        $scope.name = 'Diego Avena';
        $scope.sayHello = function()
        {
            return 'Hello There!'
        }
    });
})();