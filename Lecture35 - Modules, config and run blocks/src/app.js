(function () {
    'use strict'

    angular.module('ShoppingListEventsApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .service('WeightLossFilterService', WeightLossFilterService)
    .component('shoppingList', {
        templateUrl: 'shoppingList.html',
        controller: ShoppingListComponentController, //not using controller as, simply allow angularJS to use $ctrl, we will reference it this way
        bindings: {
            items: '<', // 1 way binding
            title: '@title', // Dom attrib value binding
            onRemove: '&' // reference function from parent controller
        }
    })
    .component('loadingSpinner', {
        templateUrl: 'spinner.html',
        controller: SpinnerController
    });

    SpinnerController.$inject = ['$rootScope']
    function SpinnerController($rootScope)
    {
        var $ctrl = this;
        
        // Subscribe to the shoppinglist::processing event
        var cancelListener = $rootScope.$on('shoppinglist::processing', function(event, data)
        {
            console.log('Event: ', event);
            console.log('Data: ', data);

            if (data.on)
            {
                $ctrl.showSpinner = true;
            }
            else 
            {
                $ctrl.showSpinner = false;
            }
        });

        // Prevent memory leak with callback above so we unsubscribe from the event when we change views
        $ctrl.$onDestroy = function()
        {
            cancelListener();
        }
    }

    ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
    function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService)
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

        // This get's called everytime the digest cycle loops, so we do not need to define a watcher, can just directly check 
        // for changes here: kinda like an update method from Unity...this allows us to get rid of postlink, and $scope: the most important is that we can now avoid
        // injecting properties into $scope since we do not pass it in at all with a $doCheck
        $ctrl.$doCheck = function()
        {
            if ($ctrl.items.length !== totalItems)
            {
                totalItems = $ctrl.items.length;
                
                // Use rootscope because the component we want to catch this, spinner, is NOT in path of this components
                // scope chain if you take a look at where we placed it in index.html
                $rootScope.$broadcast('shoppinglist::processing', {on: true});
                var promises = [];
                for (var i = 0; i < $ctrl.items.length; i++)
                {
                    promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
                }

                $q.all(promises)
                .then(function (result) {
                    // ALL SUCCESS, Remove cookie warning
                    var warningElem = $element.find('div.error');
                    warningElem.slideUp(900);
                })
                .catch(function(result) {
                    // FAILURE, Show cookie warning
                    var warningElem = $element.find('div.error');
                    warningElem.slideDown(900);
                })
                .finally(function() {
                    // ALWAYS DO THIS when all async promises done
                    $rootScope.$broadcast('shoppinglist::processing', {on: false});
                });
            }
        }
    }

    WeightLossFilterService.$inject = ['$q', '$timeout']
    function WeightLossFilterService($q, $timeout)
    {
        var service = this;
        service.checkName = function(name)
        {
            var deferred = $q.defer();
            var result = {
                message: ""
            };

            $timeout(function() {
                // check for cookies
                if (name.toLowerCase().indexOf('cookie') === -1)
                {
                    deferred.resolve(result);
                }
                else
                {
                    result.message = "Stay away from cookies!";
                    deferred.reject(result);
                }
            }, 4000);

            return deferred.promise;
        };
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