(function() {

    'use strict'

    var shoppingList1 = [
        "Milk",
        "Donuts",
        "Cookies",
        "Chocolate",
        "Peanut Butter",
        "Pepto Bismol",
        "Pepto Bismol (Chocolate flavor)",
        "Pepto Bismol (Cookie flavor)"
    ];
    
    angular.module("ShoppingListApp", [])
    .controller("ShoppingListController", ShoppingListController);

    ShoppingListController.$inject = ["$scope"]; 
    function ShoppingListController($scope)
    {
        $scope.shoppingList1 = shoppingList1;
    }

})()