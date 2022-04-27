(function () {
    'use strict';

    angular.module('ShoppingListPromiseApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .service('ShoppingListService', ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService)
    {
        var list = this; 

        list.items = ShoppingListService.getItems(); 

        list.itemName = '';
        list.itemQuantity = '';

        list.addItem = function() 
        {
            ShoppingListService.addItem(list.itemName, list.itemQuantity);
        }

        list.removeItem = function(index)
        {
            ShoppingListService.removeItem(index);
        }
    }

    /*ShoppingListService.$inject = ['$q', 'WeightLossFilterService']; 
    function ShoppingListService($q, WeightLossFilterService)
    {
        var service = this; 

        var items = []; 

        service.addItem = function(name, quantity)
        {
            var promise = WeightLossFilterService.checkName(name);
            promise.then(function (response) {
                // Success code, fired if deferred.resolve is called
                var nextPromise = WeightLossFilterService.checkQuantity(quantity); 
                nextPromise.then(function (result) {
                    // Success code
                    var item = {
                        name: name, 
                        quantity: quantity
                    };
                    items.push(item);
                }, function(errorResponse) {
                    // Failure code fired when deferred.reject is called
                    console.log(errorResponse.message);
                });
            }, 
            function (errorResponse) {
                // Failure code
                console.log(errorResponse.message);
            });
        }

        service.removeItem = function(index)
        {
            items = items.splice(index, 1);
        }

        service.getItems = function()
        {
            return items; 
        }
    }*/

    // Cleaner way of using the promise: RECALL FROM NOTES we can nest our promises, and 
    // any errors that occur in 1 promise will get propagated down into a .catch block we can use
    // which makes the code more simple: we no longer have to handle a rejection in every single case, can use 
    // the fact that we can propagate it down into our .catch block
    /*ShoppingListService.$inject = ['$q', 'WeightLossFilterService']; 
    function ShoppingListService($q, WeightLossFilterService)
    {
        var service = this; 

        var items = []; 

        service.addItem = function(name, quantity)
        {
            var promise = WeightLossFilterService.checkName(name);
            promise
            .then(function (response) {
                return WeightLossFilterService.checkQuantity(quantity);
            })
            .then(function (response) {
                var item = 
                {
                    name: name, 
                    quantity: quantity
                };
                items.push(item);
            })
            .catch(function(errorResponse) {
                console.log(errorResponse.message);
            });
        }

        service.removeItem = function(index)
        {
            items = items.splice(index, 1);
        }

        service.getItems = function()
        {
            return items; 
        }
    }*/

    // This version does both promises in parallel, via capturing the namePromise and quantityPromise and using the q.all service
    // to resolve both, and attach a .then which gets called once every single promise in the all array gets resolved; however, if any of 
    // the promises in that array result in a rejection, ALL promises are cancelled immediately and we jump into the catch, meaning we do 
    // not need to wait for the namePromise to finish in order to display an error from the quantity promise!
    ShoppingListService.$inject = ['$q', 'WeightLossFilterService']; 
    function ShoppingListService($q, WeightLossFilterService)
    {
        var service = this; 

        var items = []; 

        service.addItem = function(name, quantity)
        {
            var namePromise = WeightLossFilterService.checkName(name); 
            var quantityPromise = WeightLossFilterService.checkQuantity(quantity); 

            $q.all([namePromise, quantityPromise])
            .then(function (response) {
                var item = {
                    name: name, 
                    quantity: quantity
                };
                items.addItem(item);
            })
            .catch(function (errorResponse) {
                console.log(errorResponse.message);
            });
        };

        service.removeItem = function(index)
        {
            items = items.splice(index, 1);
        }

        service.getItems = function()
        {
            return items; 
        }
    }

    WeightLossFilterService.$inject = ['$q', '$timeout']
    function WeightLossFilterService($q, $timeout)
    {
        var service = this; 

        service.checkName = function (name)
        {
            var deferred = $q.defer(); 

            var result = {
                message: ""
            };

            // Going to use timeout function to illustrate the point that resolve and reject can be done asynchronously
            $timeout(function() {
                // Check for cookies
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
        }

        service.checkQuantity = function(quantity)
        {
            var deferred = $q.defer(); 
            var result = {
                message: ""
            }

            $timeout(function() {
                if (quantity < 6)
                {
                    deferred.resolve(result);
                }
                else
                {
                    result.message = "Too much food!"
                    deferred.reject(result);
                }
            }, 500);

            return deferred.promise;
        }
    }

})();