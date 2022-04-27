(function() {
    'use strict';

    // create the app
    angular.module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('shoppingList', ShoppingList);

    function ShoppingList() 
    {
        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                list: '=myList',
                title: '@title'
            }
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

        var origTitle = 'Shopping list 1';
        list.title = origTitle + " (" + list.items.length + " items)";

        list.addItem = function()
        {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + " (" + list.items.length + " items)";
        };

        list.removeItem = function(itemIndex)
        {
            shoppingList.removeItem(itemIndex);
            list.title = origTitle + " (" + list.items.length + " items)";
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

        var origTitle = 'Shopping List #2 (Limited to 3 items)';
        list.title = origTitle + " (" + list.items.length + " items)";

        list.addItem = function()
        {
            try 
            {
                shoppingList.addItem(list.itemName, list.itemQuantity);
                list.title = origTitle + " (" + list.items.length + " items)";
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
            list.title = origTitle + " (" + list.items.length + " items)";
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