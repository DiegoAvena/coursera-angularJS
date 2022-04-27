(function () {
    'use strict'

    angular.module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('shoppingList', ShoppingListDirective);

    function ShoppingListDirective()
    {
        var ddo = {
            templateUrl: 'shoppingList.html',
            scope: {
                items: '<',
                title: '@title',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: ShoppingListDirectiveLink,
            transclude: true // Will allow us to feed in data to our template html with {{}}
        };

        return ddo;
    }

    function ShoppingListDirectiveController()
    {
        var list = this;

        list.cookiesInList = function()
        {
            for (var i = 0; i < list.items.length; i++)
            {
                var name = list.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1)
                {
                    return true;
                }
            }

            return false;
        };
    }

    function ShoppingListDirectiveLink(scope, element, attrs, controller)
    {
        console.log("Link scope is: ", scope);
        console.log("Controller instance is: ", controller);
        console.log("Element is: ", element);

        // This will now fire when list on the scope changes, to check if cookies are in the list and display an error message as a result
        // with this, we no longer need to use ng-if in the html to check for this, which again is more in line with our need to keep all this stuff 
        // separate from the html: manipulating the DOM through angularJS, as opposed to with html
        scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
            console.log("Old Value: ", oldValue);
            console.log("New Value: ", newValue);

            if (newValue === true)
            {
                displayCookieWarning();
            }
            else
            {
                removeCookieWarning();
            }
        });

        function displayCookieWarning()
        {
            // Using angular JQLite, with .find, it starts at the element
            // the directive spawns, and goes down from there, so in this case, it would
            // start from the top of our shoppingList.html template: this is good, now if we have a HUGE 
            // html page, it only looks through this small subset, so it is performant!
            /*var warningElement = element.find("div");
            console.log(warningElement);
            warningElement.css('display', 'block');*/

            // If jquery included prior to angular, the find of jquery can be more specific, in this case,
            // we look for a div with class error
            var warningElement = element.find("div.error");
            console.log(warningElement);
            warningElement.slideDown(900);
        }

        function removeCookieWarning()
        {
            // Using angular JQLite
            /*var warningElement = element.find("div");
            console.log(warningElement);
            warningElement.css('display', 'none');*/

            // If jQuery included before Angular
            var warningElement = element.find("div.error");
            warningElement.slideUp(900);
        }
    }

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