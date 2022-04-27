(function() {
    'use strict';

    angular.module('MenuCategoriesApp', [])
    .controller('MenuCategoriesController', MenuCategoriesController)
    .service('MenuCategoriesService', MenuCategoriesService)
    .constant('ApiBasePath', 'http://davids-restaurant.herokuapp.com');

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService)
    {
        var menu = this; 
        // Get the promise
        var promise = MenuCategoriesService.getMenuCategories(); 

        // Set up how promise is to be resolved
        promise.then(function(response) {
            menu.categories = response.data; 
        })
        .catch(function(errorResponse) {
            console.log('Something went wrong');
        });

        menu.logMenuItems = function(shortName)
        {
            var promise = MenuCategoriesService.getMenuForCategory(shortName); 

            promise.then(function(response) {
                console.log(response.data);
            })
            .catch(function(errorResponse) {
                console.log(errorResponse.message);
            });
            
        }
    }

    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath)
    {
        var service = this; 

        service.getMenuCategories = function()
        {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")    
            });

            return response;
        }

        service.getMenuForCategory = function(shortName)
        {
            var response = $http({
                method: 'GET',
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: shortName
                }
            });

            return response; 
        }
    }

})();