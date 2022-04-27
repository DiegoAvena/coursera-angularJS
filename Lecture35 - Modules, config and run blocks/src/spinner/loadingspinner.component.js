(function() {
    'use strict';

    angular.module('Spinner')
    .component('loadingSpinner', {
        templateUrl: 'src/spinner/spinner.template.html',
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
})();