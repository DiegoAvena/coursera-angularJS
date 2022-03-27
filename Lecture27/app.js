(function() {
    'use strict';

    // create the app
    angular.module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('listItemDescription', listItemDescription)
    .directive('listItem', listItem);

    function listItem()
    {
        var ddo = {
            restrict: 'E',
            templateUrl: 'listItem.html'
        }
        return ddo; 
    }

    function listItemDescription()
    {
        var ddo = {
            restrict: 'E',
            template: '{{item.quantity}} of {{item.name}}'
        };

        return ddo; 
    }

    // make sure to inject our service into the controllers
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory)
    {
        var list = this; 

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory(); 
        console.log(shoppingList); 

        list.items = shoppingList.getItems(); 
        list.itemName = "";
        list.itemQuantity = ""; 

        list.addItem = function()
        {
            shoppingList.addItem(list.itemName, list.itemQuantity);
        };

        list.removeItem = function(itemIndex)
        {
            shoppingList.removeItem(itemIndex);
        };
    }

    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2 (ShoppingListFactory)
    {
        var list = this; 

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory(3);
        
        list.items = shoppingList.getItems(); 
        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function()
        {
            try 
            {
                shoppingList.addItem(list.itemName, list.itemQuantity);
            }
            catch (error)
            {
                list.errorMessage = error.message; 
            }
        };

        list.removeItem = function(itemIndex)
        {
            list.errorMessage = null;
            shoppingList.removeItem(itemIndex);
        };
    }

    // The service constructor to share data for the contents of the shopping list
    function ShoppingListService(maxItems)
    {
        var service = this; 

        // This list is internal, it is not exposed on the service: 
        var items = []; 

        service.addItem = function(itemName, itemQuantity)
        {
            if((maxItems === undefined) || (items.length < maxItems))
            {
                var item = {
                    name: itemName,
                    quantity: itemQuantity
                };
    
                items.push(item);
            }
            else 
            {
                throw new Error("Max items (" + maxItems +") reached.");
            }
        };

        service.removeItem = function(itemIndex)
        {
            items.splice(itemIndex, 1);
        };

        service.getItems = function()
        {
            return items;
        };
    }

    function ShoppingListFactory()
    {
        var factory = function(maxItems)
        {
            return new ShoppingListService(maxItems);
        }
        return factory; 
    }
})();