(function () {
    'use strict';

    // Now spinner will be activated by the ShoppingList app!
    angular.module('ShoppingList', ['Spinner']);

    angular.module('ShoppingList')
    .config(function() {
        console.log("Shopping list config fired");
    })
    .run(function() {
        console.log("Shopping list run fired");
    });
})();