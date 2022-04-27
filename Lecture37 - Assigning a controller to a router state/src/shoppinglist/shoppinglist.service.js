(function () {
    angular.module('ShoppingList')
    .service('ShoppingListService', ShoppingListService);

    ShoppingListService.$inject = ['$q', '$timeout'];
    function ShoppingListService($q, $timeout) 
    {
        var service = this;

        // List of shopping items
        var items = [];

        // Prepopulate a no cookie list
        items.push({
            name: "sugar",
            quantity: "2 bags",
            description: "Sugar used for baking delicious baked goods"
        });

        items.push({
            name: "flour",
            quantity: "1 bags",
            description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs"
        });

        items.push({
            name: "Chocalate Chips",
            quantity: "3 bags",
            description: "Put these in dough. No reason, really. Gotta store them somewhere!"
        });

        // Simulates call to the server
        // Returns a promise, not items directly
        service.getItems = function()
        {
            var deferred = $q.defer();

            // Wait 0.8s before returning result
            $timeout(function() {
                deferred.resolve(items);
            }, 800)

            return deferred.promise;
        };


    }
})();