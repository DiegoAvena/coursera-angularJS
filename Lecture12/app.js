(function() {

    'use strict'

    angular.module('MsgApp', [])
    .controller('MsgController', MsgController);

    var levelNames = ['newRainyCityScreenShot', 'newTrainingLevelScreenShot'];
    var currentLevelIndex = 0; 

    // to protect our dependency injection from minification
    MsgController.$inject = ['$scope', '$filter'];
    function MsgController($scope, $filter)
    {
        $scope.name = "Diego Avena";
        $scope.sayMessage = function()
        {
            var msg = "Diego likes to watch Netflix late at night";
            var output = $filter('uppercase')(msg);
            return output; 
        }

        $scope.gameCost = 0.0;
        
        $scope.levelName = levelNames[currentLevelIndex];

        $scope.showNextLevel = function()
        {
            currentLevelIndex = (currentLevelIndex + 1) % levelNames.length;
            $scope.levelName = levelNames[currentLevelIndex];
        }
    }
})();