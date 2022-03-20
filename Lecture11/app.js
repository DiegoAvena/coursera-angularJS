(function() {

    'use strict'

    angular.module('MsgApp', [])
    .controller('MsgController', MsgController);

    var levelNames = ['newRainyCityScreenShot', 'newTrainingLevelScreenShot'];
    var currentLevelIndex = 0; 

    // to protect our dependency injection from minification
    MsgController.$inject = ['$scope'];
    function MsgController($scope)
    {
        $scope.name = "Diego Avena";
        $scope.sayMessage = function()
        {
            return "Diego likes to watch Netflix late at night";
        }


        $scope.levelName = levelNames[currentLevelIndex];

        $scope.showNextLevel = function()
        {
            currentLevelIndex = (currentLevelIndex + 1) % levelNames.length;
            $scope.levelName = levelNames[currentLevelIndex];
        }
    }
})();