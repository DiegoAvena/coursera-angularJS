(function () {

    'use strict'

    angular.module('DIApp', [])
    .controller('DIController', DIController);

    // Again this is an example of dependency injection: we allow the AngularJS system to call the controller, and 
    // angular JS does this when it has created the scope and filter dependencies, "INJECTING" those dependencies into 
    // our controller!
    function DIController($scope, $filter, $injector)
    {
        $scope.name = "Diego Avena"
        
        // Function for changing all text to caps
        $scope.upper = function()
        {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        }

        console.log($injector.annotate(DIController));

    }

    console.log(DIController.toString());
})();