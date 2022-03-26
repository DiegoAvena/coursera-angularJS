(function() {
    'use strict';

    // create the app
    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory);

    // make sure to inject our service into the controllers
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory)
    {
        var list1 = this; 

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory(); 
        console.log(shoppingList); 

        list1.items = shoppingList.getItems(); 
        list1.itemName = "";
        list1.itemQuantity = ""; 

        list1.addItem = function()
        {
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
        };

        list1.removeItem = function(itemIndex)
        {
            shoppingList.removeItem(itemIndex);
        };
    }

    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2 (ShoppingListFactory)
    {
        var list2 = this; 

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory(3);
        
        list2.items = shoppingList.getItems(); 
        list2.itemName = "";
        list2.itemQuantity = "";

        list2.addItem = function()
        {
            try 
            {
                shoppingList.addItem(list2.itemName, list2.itemQuantity);
            }
            catch (error)
            {
                list2.errorMessage = error.message; 
            }
        };

        list2.removeItem = function(itemIndex)
        {
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