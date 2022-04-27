(function() {
    'use strict';

    // create the app
    angular.module('ShoppingListApp', [])
    .controller('ShoppingListAddController', ShoppingListAddController)
    .controller('ShoppingListShowController', ShoppingListShowController)
    .service('ShoppingListService', ShoppingListService);

    // make sure to inject our service into the controllers
    ShoppingListAddController.$inject = ['ShoppingListService'];
    function ShoppingListAddController(ShoppingListService)
    {
        var itemAdder = this; 
        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";
        
        itemAdder.addItem = function()
        {
            ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        }
    }

    ShoppingListShowController.$inject = ['ShoppingListService'];
    function ShoppingListShowController(ShoppingListService)
    {
        var showList = this; 
        showList.items = ShoppingListService.getItems();
        showList.removeItem = function(itemIndex)
        {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    // The service constructor to share data for the contents of the shopping list
    function ShoppingListService()
    {
        var service = this; 

        // This list is internal, it is not exposed on the service: 
        var items = []; 

        service.num = 0; 

        service.addItem = function(itemName, itemQuantity)
        {
            var item = {
                name: itemName,
                quantity: itemQuantity
            };

            items.push(item);
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
})();