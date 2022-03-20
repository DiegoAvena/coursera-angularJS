(function () {

    'use strict'

    angular.module('DIApp', [])
    .controller('DIController',  /*this also allows us to protect the code from minification['$scope', '$filter', DIController]*/ DIController);

    // protect our dependency injection from minification (more elegant way)
    DIController.$inject = ['$scope', '$filter'];
    
    // Again this is an example of dependency injection: we allow the AngularJS system to call the controller, and 
    // angular JS does this when it has created the scope and filter dependencies, "INJECTING" those dependencies into 
    // our controller!
    function DIController($scope, $filter)
    {
        $scope.name = "Diego Avena"
        
        // Function for changing all text to caps
        $scope.upper = function()
        {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        }
    }
})();

//!function(){"use strict";function e(e,n){e.name="Diego Avena",e.upper=function(){var o=n("uppercase");e.name=o(e.name)}}angular.module("DIApp",[]).controller("DIController",e),e.$inject=["$scope","$filter"]}();