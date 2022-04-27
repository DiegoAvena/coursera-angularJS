(function() {
    'use strict';

    angular.module('CounterApp', [])
    .controller('CounterController', CounterController); 

    CounterController.$inject = ["$scope", '$timeout']
    function CounterController($scope, $timeout)
    {
        $scope.counter = 0; 
       
        $scope.upCounter = function()
        {
            /*setTimeout(function() {
                // Execute this code after set secs, this ends up getting placed as a regular 
                // event on the event queue, outside of the AngularJS context, meaning AngularJS does not 
                // know it has to do something (digest cycle will not run) when this event occurs! 
                // We make use of $digest and $apply to fix this
                $scope.$apply(function() 
                {
                    ++$scope.counter;
                    console.log("Counter incremented");
                });

                // Calling digest alone is not the best way though, because any errors thrown by the code before will not 
                // get reported by AngularJS. We must make AngularJS aware of any potential errors the above code can cause via 
                // $apply()
                // $scope.$digest();
            }, 2000) */ 

            // Can avoid having to manually kickoff the digest cycle by using a native AngularJS alternative
            $timeout(function() {
                ++$scope.counter;
                console.log("Counter incremented");
            }, 2000);            
        }
    }

})();