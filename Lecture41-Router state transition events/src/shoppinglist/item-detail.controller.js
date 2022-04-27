(function() {
    'use strict'

    angular.module('ShoppingList')
    .controller('ItemDetailController', ItemDetailController);

    ItemDetailController.$inject = ['items', '$stateParams'];
    function ItemDetailController(items, $stateParams) {
        var itemDetail = this;

        var item = items[$stateParams.itemId];
        itemDetail.name = item.name;
        itemDetail.quantity = item.quantity;
        itemDetail.description = item.description;
    }
})();