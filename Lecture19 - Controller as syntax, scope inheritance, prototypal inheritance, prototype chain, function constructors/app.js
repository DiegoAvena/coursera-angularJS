(function() {
    'use strict';

    angular.module('ControllerAsApp', [])
    .controller('ParentController1', ParentController1)
    .controller('ChildController1', ChildController1)
    .controller('ParentController2', ParentController2)
    .controller('ChildController2', ChildController2);

    ParentController1.$inject = ['$scope'];
    function ParentController1($scope)
    {
        $scope.parentValue = 1; 
        /*
        In this case this will point to ParentController1 because 
        .controller('ParentController1', ParentController1) will use this ParentController1 
        as a function constructor with the new keyword eventually, so this ends up getting pointed
        to the instance created by this function in this case
        */ 
        $scope.pc = this; 
        $scope.pc.parentValue = 1;
    }

    ChildController1.$inject = ['$scope'];
    function ChildController1($scope)
    {
        // this will go up the prototype chain into ParentController1 and print out 1 as a result
        /*console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("CHILD $scope: ", $scope);

        // This will mask the parentValue in ParentController1: child gets its own unique copy now, the value of 
        // this should still be 1 in the ParentController
        $scope.parentValue = 5; 
        console.log("***CHANGED: $scope.parentValue = 5***");
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log($scope);

        // This will change the value of parent value in the parent controller as well, 
        // because we go up the prototype chain to the pc pointer, which copies that pointer and 
        // makes us go to the same memory address that ParentController1 instance uses for its parentValue.
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue); 
        $scope.pc.parentValue = 5;
        console.log("** CHANGED: $scope.pc.parentValue = 5; **");
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        console.log("$scope: ", $scope);
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);*/
    }

    // Controller As Syntax (again, dont have to inject scope into the controller function now! See notes): 
    function ParentController2()
    {
        // Good practice to rename this to what you named the property storing the instance
        // of this controller in html 
        var parent = this; 
        parent.value = 1;
    }

    ChildController2.$inject = ['$scope'];
    function ChildController2($scope)
    {
        // Good practice to rename this to what you named the property in html 
        var child = this; 
        child.value = 5;
        // Note that this fixes the masking issue mentioned in my notes: the value of child in no way affects the value 
        // in parent, because the controller as syntax created 2 distinct objects of these controllers on the scope! child.value and 
        // parent.value no longer point to the same mem addresses because they are owned by 2 distinct instances on the scope!
        console.log("ChildController2 $scope: ", $scope);
    }
})();