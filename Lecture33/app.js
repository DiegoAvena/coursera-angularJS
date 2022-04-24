(function () {
    'use strict'

    angular.module('ShoppingListComponentApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .component('shoppingList', {
        templateUrl: 'shoppingList.html',
        controller: ShoppingListComponentController, //not using controller as, simply allow angularJS to use $ctrl, we will reference it this way
        bindings: {
            items: '<', // 1 way binding
            title: '@title', // Dom attrib value binding
            onRemove: '&' // reference function from parent controller
        }
    });

    ShoppingListComponentController.$inject = [/*'$scope',*/ '$element'];
    function ShoppingListComponentController(/*'$scope',*/ $element)
    {
        var $ctrl = this;
        var totalItems;

        $ctrl.cookiesInList = function()
        {
            for (var i = 0; i < $ctrl.items.length; i++)
            {
                var name = $ctrl.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1)
                {
                    return true;
                }
            }

            return false;
        };

        $ctrl.remove = function(myIndex)
        {
            // use index cuz have to match what we are mapping in the html index file, line 21
            $ctrl.onRemove({index: myIndex})
        }

        // Lifecycle methods angularJS knows about
        $ctrl.$onInit = function()
        {
            // Only executed once
            totalItems = 0;
        }

        // Only watches the pointer to the array of items, DOES NOT watch when the contents of 
        // this array change. This is why we must use postLink below or check
        $ctrl.$onChanges = function(changeObj)
        {
            console.log("Changes: ", changeObj);
        }

        // The same thing as the link function with directives, we define watchers in here
        /*$ctrl.$postLink = function()
        {
            $scope.$watch('$ctrl.cookiesInList()', function(newValue, oldValue)
            {
                console.log($element);
                if (newValue === true)
                {
                    // Show warning
                    var warningElem = $element.find("div.error");
                    warningElem.slideDown(900);
                }
                else 
                {
                    // Hide warning
                    var warningElem = $element.find("div.error");
                    warningElem.slideUp(900);
                }
            });
        }*/

        // This get's called everytime the digest cycle loops, so we do not need to define a watcher, can just directly check 
        // for changes here: kinda like an update method from Unity...this allows us to get rid of postlink, and $scope: the most important is that we can now avoid
        // injecting properties into $scope since we do not pass it in at all with a $doCheck
        $ctrl.$doCheck = function()
        {
            if ($ctrl.items.length !== totalItems)
            {
                console.log("Number of items changed. Checking for cookies");
                totalItems = $ctrl.items.length;
                
                var warningElem = $element.find("div.error");
                if ($ctrl.cookiesInList())
                {
                    console.log("OH NO COOKIES");
                    warningElem.slideDown(900);
                }
                else 
                {
                    console.log("No cookies here, mvoe right along");
                    warningElem.slideUp(900);
                }
            }
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