(function() {
    'use strict';

    // create the app
    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .provider('ShoppingListService', ShoppingListServiceProvider) // ShoppingListServiceProvider will call the $get property to return our service, so what we end up storing is the actual service instance
    .config(Config); 

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider)
    {
        ShoppingListServiceProvider.defaults.maxItems = 2;
    }

    // make sure to inject our service into the controllers
    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService)
    {
        var list = this; 
       
        list.items = ShoppingListService.getItems(); 
        list.itemName = "";
        list.itemQuantity = ""; 

        list.addItem = function()
        {
            try
            {
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            }
            catch (error)
            {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function(itemIndex)
        {
            ShoppingListService.removeItem(itemIndex);
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

    function ShoppingListServiceProvider()
    {
        var provider = this; 

        provider.defaults = 
        {
            maxItems: 10
        };

        provider.$get = function()
        {
            var shoppingList = new ShoppingListService(provider.defaults.maxItems);
            return shoppingList; 
        }
    }
})();