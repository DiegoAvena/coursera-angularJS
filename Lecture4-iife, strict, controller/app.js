// An iife: immediately invoked function expression to make sure no local variables bleed into the global scale
(function () {
    'use strict';
    
    // define our main app, the thing that will be responsible for some chunk of 
    // html in index 
    angular.module('myFirstApp', [])
    
    // Controller Defines a piece of our view model: 
    .controller('myFirstController', function() {

    });
})();