(function() {

    'use strict'

    angular.module('MsgApp', [])
    .controller('MsgController', MsgController)
    .filter('loves', LovesFilterFactory)
    .filter('truth', TruthFilterFactory);

    var levelNames = ['newRainyCityScreenShot', 'newTrainingLevelScreenShot'];
    var currentLevelIndex = 0; 

    // to protect our dependency injection from minification
    MsgController.$inject = ['$scope', 'lovesFilter'];
    function MsgController($scope, lovesFilter)
    {
        $scope.name = "Diego Avena";
        $scope.sayMessage = function()
        {
            var msg = "Diego likes to watch Netflix late at night";
            return msg; 
        };

        $scope.sayLoves = function()
        {
            // Use custom filter
            var msg = lovesFilter($scope.sayMessage());
            return msg; 
        };

        $scope.gameCost = 0.0;
        
        $scope.levelName = levelNames[currentLevelIndex];

        $scope.showNextLevel = function()
        {
            currentLevelIndex = (currentLevelIndex + 1) % levelNames.length;
            $scope.levelName = levelNames[currentLevelIndex];
        }
    }

    // Loves filter
    function LovesFilterFactory()
    {
        // The actual filter function
        return function(input)
        {
            input = input || "";
            input = input.replace("likes", "loves");
            return input; 
        }
    }

    function TruthFilterFactory()
    {
        return function(input, target, replace)
        {
            input = input || "";
            input = input.replace(target, replace);
            return input; 
        }
    }

})();