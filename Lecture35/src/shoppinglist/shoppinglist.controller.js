(function() {
    'use strict';

    angular.module('ShoppingList')
    .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory)
    {
        var list = this;

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory();
        console.log(shoppingList);

        list.warning = "COOKIES DETECTED!";

        list.items = shoppingList.getItems();
        list.itemName = "";
        list.itemQuantity = "";

        var origTitle = "Shopping List";
        list.title = origTitle + " (" + list.items.length + " items)";

        list.addItem = function()
        {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + " (" + list.items.length + " items)";
        };

        list.removeItem = function(itemIndex)
        {
            console.log("'this' is: ", this);
            this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            list.title = origTitle + " (" + list.items.length + " items)"; 
        };
    }

})();