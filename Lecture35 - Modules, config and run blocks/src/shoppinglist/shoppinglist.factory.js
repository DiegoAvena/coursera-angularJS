(function() {
    'use strict';

    angular.module('ShoppingList')
    .factory('ShoppingListFactory', ShoppingListFactory);

    function ShoppingListFactory()
    {
        var factory = function(maxItems)
        {
            return new ShoppingListService(maxItems);
        }

        return factory;
    }

    // The service constructor to share data for the contents of the shopping list
    function ShoppingListService(maxItems)
    {
        var service = this;

        // This list is internal, it is not exposed on the service
        var items = [];

        service.addItem = function(itemName, itemQuantity)
        {
            if ((maxItems === undefined) || (items.length < maxItems))
            {
                var item = {
                    name: itemName,
                    quantity: itemQuantity
                };

                items.push(item);
            }
            else
            {
                throw new Error("Max items (" + maxItems + ") reached");
            }
        };

        service.removeItem = function(itemIndex)
        {
            items.splice(itemIndex, 1);
        }

        service.getItems = function()
        {
            return items;
        };
    }
})();