(function() {
    'use strict';

    angular.module('CounterApp', [])
    .controller('CounterController', CounterController); 

    CounterController.$inject = ["$scope"]
    function CounterController($scope)
    {
        $scope.onceCounter = 0; 
        $scope.counter = 0; 
        $scope.name = "Diego"; 
        
        $scope.showNumberOfWatchers = function()
        {
            console.log("# of watchers: ", $scope.$$watchersCount);
        };

        $scope.upCounter = function()
        {
            ++$scope.counter;
        }

        $scope.countOnce = function ()
        {
            $scope.onceCounter = 1;
        };

        $scope.$watch(function () {
            console.log("Digest loop fired!");
        });

        /*
        $scope.$watch('onceCounter', function(newValue, oldValue)
        {
            console.log("Old value: " + oldValue);
            console.log("New value: " + newValue);
        });

        $scope.$watch('counter', function(newValue, oldValue)
        {
            console.log("Counter Old value: " + oldValue);
            console.log("Counter New value: " + newValue);
        }); */
    }

})();