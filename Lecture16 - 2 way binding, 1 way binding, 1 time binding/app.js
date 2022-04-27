(function() {

    'use strict'

    angular.module('BindingApp', [])
    .controller('BindingController', BindingController);

    BindingController.$inject = ["$scope"];
    function BindingController($scope)
    {
        $scope.firstName = "Diego"; 

        $scope.showNumberOfWatchers = function()
        {
            console.log("# of watchers: ", $scope.$$watchersCount);
        };

        $scope.setFullName = function()
        {
            // This will remove the watcher on this property as well, since it was setup for 1 time binding
            $scope.fullName = $scope.firstName + " Avena";
        };

        $scope.logFirstName = function() 
        {
            console.log($scope.firstName);
        };

        $scope.logFullName = function()
        {
            console.log($scope.fullName);
        };

    }
})();