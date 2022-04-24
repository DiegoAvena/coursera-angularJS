(function () {
    'use strict';

    angular.module('ShoppingList')
    .component('shoppingList', {
        templateUrl: 'src/shoppinglist/shoppinglist.template.html',
        controller: ShoppingListComponentController, //not using controller as, simply allow angularJS to use $ctrl, we will reference it this way
        bindings: {
            items: '<', // 1 way binding
            title: '@title', // Dom attrib value binding
            onRemove: '&' // reference function from parent controller
        }
    });

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
})();